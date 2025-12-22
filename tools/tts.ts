import fs from "fs";
import path from "path";
import { mdxToText } from "@/lib/util";
import { getPosts } from "@/lib/api";
import { TextToSpeechLongAudioSynthesizeClient } from "@google-cloud/text-to-speech";
import { Storage } from "@google-cloud/storage";

// TTS model prices per char in USD - source: https://cloud.google.com/text-to-speech/pricing?hl=en
const CHIRP_3_COST_PER_CHAR = 0.00003;
const CUSTOM_VOICE_COST_PER_CHAR = 0.00006;
const WAIVE_NET_COST_PER_CHAR = 0.000016;

const GOOGLE_BUCKET_NAME = process.env.GOOGLE_BUCKET_NAME || "";
const client = new TextToSpeechLongAudioSynthesizeClient();
const storage = new Storage();

async function plan(directory: string): Promise<void> {
  const posts = await getPosts(directory);

  const chars = posts.reduce((total, post) => {
    const text = mdxToText(post.content);
    return total + text.length;
  }, 0);

  console.log(`Estimated costs for directory: ${directory}`);
  const cost = {
    chirp3: chars * CHIRP_3_COST_PER_CHAR,
    customVoice: chars * CUSTOM_VOICE_COST_PER_CHAR,
    waiveNet: chars * WAIVE_NET_COST_PER_CHAR,
  };
  console.log(`Total files: ${posts.length}`);
  console.log(`Total characters: ${chars}`);
  console.log(`Average characters per file: ${(chars / posts.length).toFixed(2)}`);
  console.log(`Chirp 3: $${cost.chirp3.toFixed(4)}`);
  console.log(`Custom Voice: $${cost.customVoice.toFixed(4)}`);
  console.log(`Waive Net: $${cost.waiveNet.toFixed(4)}`);
}

async function generate(srcDirectory: string, dstDirectory: string): Promise<void> {
  const posts = await getPosts(srcDirectory);

  for (const post of posts) {
    const text = mdxToText(post.content);
    const outputPath = path.join(dstDirectory, `${post.slug}.wav`);
    await synthesizeLongSpeech(text, outputPath);
    console.log(`Generated audio for post: ${post.slug}`);
  }

  console.log("All audios processed and saved successfully.");
}

async function synthesizeLongSpeech(text: string, outputPath: string): Promise<void> {
  const gcsFileName = path.basename(outputPath);
  const gcsUri = `gs://${GOOGLE_BUCKET_NAME}/${gcsFileName}`;

  console.log(`Starting long text synthesis for: ${gcsFileName} to GCS URI: ${gcsUri}`);

  const request = {
    parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
    input: { text: text },
    voice: {
      languageCode: "en-US",
      ssmlGender: "MALE",
      name: "en-US-Wavenet-J", // voices reference: https://cloud.google.com/text-to-speech/docs/voices
    },
    audioConfig: { audioEncoding: "LINEAR16" },
    outputGcsUri: gcsUri,
  };

  try {
    const [operation] = await client.synthesizeLongAudio(request);

    // polling for the operation to complete
    console.log(`Operation started for ${gcsFileName}. Waiting for completion...`);
    let currentOperation = operation;
    while (!currentOperation.done) {
      // wait 5s
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log("Checking progress...");
      const progressResponse = await client.checkSynthesizeLongAudioProgress(currentOperation.name);
      currentOperation = progressResponse;
    }

    // handle errors
    if (currentOperation.error) {
      throw new Error(
        `Long audio synthesis for ${gcsFileName} failed: ${currentOperation.error.message}`
      );
    }

    console.log(`Long audio synthesis complete for ${gcsFileName}`);

    // download audio file locally
    console.log(`Downloading audio from GCS to local file: ${outputPath}...`);
    const bucket = storage.bucket(GOOGLE_BUCKET_NAME);
    const file = bucket.file(gcsFileName);
    await file.download({ destination: outputPath });
    console.log(`Audio successfully downloaded to: ${outputPath}`);
  } catch (error) {
    console.error("Error during long text synthesis or download:", error);
    throw error;
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: npm run tts:costs <function> [params]");
    console.log("Functions:");
    console.log("  plan <directory>");
    console.log("  generate <source_directory> <destination_directory>");
    process.exit(0);
  }

  const func = args[0];
  const funcParams = args.slice(1);

  switch (func) {
    case "plan":
      await handlePlan(funcParams);
      break;
    case "generate":
      await handleGenerate(funcParams);
      break;
    default:
      console.error(`Error: Unknown function "${func}"`);
      console.log("Supported functions: plan, generate");
      process.exit(1);
  }
}

async function handlePlan(params: string[]): Promise<void> {
  if (params.length !== 1) {
    console.error('Error: "plan" function requires exactly one parameter: <directory>');
    process.exit(1);
  }
  const directory = params[0];

  if (!fs.existsSync(directory)) {
    console.error(`Error: Directory not found: "${directory}"`);
    process.exit(1);
  }
  if (!fs.statSync(directory).isDirectory()) {
    console.error(`Error: Path is not a directory: "${directory}"`);
    process.exit(1);
  }

  return plan(directory);
}

async function handleGenerate(params: string[]): Promise<void> {
  if (params.length !== 2) {
    console.error(
      'Error: "generate" function requires two parameters: <source_directory> <destination_directory>'
    );
    process.exit(1);
  }
  const sourceDir = params[0];
  const destDir = params[1];

  // srcDir validation
  if (!fs.existsSync(sourceDir)) {
    console.error(`Error: Source directory not found: "${sourceDir}"`);
    process.exit(1);
  }
  if (!fs.statSync(sourceDir).isDirectory()) {
    console.error(`Error: Source path is not a directory: "${sourceDir}"`);
    process.exit(1);
  }

  // dstDir validation
  if (!fs.existsSync(destDir)) {
    console.error(`Error: Source directory not found: "${destDir}"`);
    process.exit(1);
  }
  if (!fs.statSync(destDir).isDirectory()) {
    console.error(`Error: Source path is not a directory: "${destDir}"`);
    process.exit(1);
  }

  return generate(sourceDir, destDir);
}

main();
