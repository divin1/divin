import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { mdxToText } from "@/lib/util";

// prices are in USD - source: https://cloud.google.com/text-to-speech/pricing?hl=en
const CHIRP_3_COST_PER_CHAR = 0.00003;
const CUSTOM_VOICE_COST_PER_CHAR = 0.00006;
const WAIVE_NET_COST_PER_CHAR = 0.000016;

function estimateCosts(directory: string): void {
  if (!fs.existsSync(directory)) {
    console.error(`Error: Directory ${directory} does not exist.`);
    process.exit(1);
  }

  const files = fs.readdirSync(directory);

  let chars = 0;

  for (const file of files) {
    if (path.extname(file) !== ".mdx") continue;
    const filePath = path.join(directory, file);

    const source = fs.readFileSync(filePath, "utf-8");
    const { content } = matter(source);

    const text = mdxToText(content);

    chars += text.length;
  }

  console.log(`Estimated costs for directory: ${directory}`);
  const cost = {
    chirp3: chars * CHIRP_3_COST_PER_CHAR,
    customVoice: chars * CUSTOM_VOICE_COST_PER_CHAR,
    waiveNet: chars * WAIVE_NET_COST_PER_CHAR,
  };
  console.log(`Total files: ${files.length}`);
  console.log(`Total characters: ${chars}`);
  console.log(`Average characters per file: ${(chars / files.length).toFixed(2)}`);
  console.log(`Chirp 3: $${cost.chirp3.toFixed(4)}`);
  console.log(`Custom Voice: $${cost.customVoice.toFixed(4)}`);
  console.log(`Waive Net: $${cost.waiveNet.toFixed(4)}`);
}

function main() {
  const args = process.argv.slice(2);
  const directory: string | undefined = args[0];

  if (!directory) {
    console.error("Error: No directory provided. Usage: npm run costs <your/path>");
    process.exit(1);
  }

  estimateCosts(directory);
}

main();
