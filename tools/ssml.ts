import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
import fs from 'fs';

const nlp = winkNLP(model);

export function parseMdxToSsml(mdxContent: string): string {
    // pre-process mdx content
    let ssmlContent = removeFootnotes(mdxContent);
    ssmlContent = removeReferencesChapter(ssmlContent);
    ssmlContent = parseSpecialEncodings(ssmlContent);
    ssmlContent = ssmlContent.replace(/<[^>]+>/g, ""); // remove HTML tags

    // break down mdx content into chapters
    const chapters = ssmlContent.split(/(?<=\n\n)(?=### )/g);

    let ssml = "<speak>\n";
    for (const chapter of chapters) {
        const processedChapter = processChapter(chapter);
        ssml += `${processedChapter}\n`;
    }

    ssml += "</speak>";
    return ssml;
}

function processChapter(mdxContent: string): string {
  const header = mdxContent.match(/### (.+)/);
  const chapterTitle = header ? header[1].trim(): "";

  // remove the header from the content
  const contentWithoutHeader = header ? mdxContent.replace(header[0], '') : mdxContent;

  // tokenization into paragraphs and sentences
  const paragraphs = contentWithoutHeader.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);

  let ssml = "";
  for (const paragraph of paragraphs) {
    ssml += "<p>\n";
      const doc = nlp.readDoc(paragraph);
      const sentences = doc.sentences().out();
      for (const sentence of sentences) {
          ssml += `<s>${parseMarkdown(sentence)}</s>\n`;
      }
    ssml += "</p>\n";
  }

  // add chapter title
  if (chapterTitle) {
    ssml = `<p><s><emphasis level=\"strong\">${chapterTitle}</emphasis></s></p><break time=\"1s\"/>\n` + ssml;
  }

  return ssml.trimEnd();
}

function parseMarkdown(mdxContent: string): string {
  let text = mdxContent;

  // parse strong emphasis
  text = text.replace(/\*\*(.+?)\*\*/g, '<emphasis level="strong">$1</emphasis>');

  // parse emphasis
  text = text.replace(/_(.+?)_/g, '<emphasis level="moderate">$1</emphasis>');

  return text;
}

function parseSpecialEncodings(mdxContent: string): string {
  return mdxContent.replace(/&mdash;/g, '—')
                   .replace(/&ndash;/g, '–')
                   .replace(/&quot;/g, '"')
                   .replace(/&apos;/g, "'")
                   .replace(/&amp;/g, '&');
}


function removeFootnotes(mdxContent:string) :string {
  return mdxContent.replace(/[\u00B9\u00B2\u00B3\u2070-\u2079]+/g, '');
}

function removeReferencesChapter(mdxContent: string): string {
    const headerRegex = /^### (References|Footnotes|Resources)\s*$/gmi;

    const matches = [...mdxContent.matchAll(headerRegex)];  
    if (matches.length === 0) {
      return mdxContent;
    }
  
    // get the last match and cut index
    const lastMatch = matches[matches.length - 1];
    const cutIndex = lastMatch.index ?? mdxContent.length;

    return mdxContent.slice(0, cutIndex).trimEnd();
}

function test() {
  const mdxContent = fs.readFileSync('./tools/sample2.mdx', 'utf-8');

  const ssml = parseMdxToSsml(mdxContent);

  console.log(ssml);
}

test();