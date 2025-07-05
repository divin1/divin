// Over-simplified function to remove most of the md & html tags
function mdxToText(mdxContent: string): string {
  return (
    mdxContent
      // HTML
      .replace(/<[^>]+>/g, "")
      // Strikethrough
      .replace(/~~/g, "")
      // Emphasis (applied twice to handle nested emphasis)
      .replace(/([\*\_]){1,3}([a-zA-Z0-9]+)\1/g, "$2")
      .replace(/([\*\_]){1,3}([a-zA-Z0-9]+)\1/g, "$2")
      // Inline code
      .replace(/`(.+)`/g, "$1")
      // Images
      .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, "")
      // Links
      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1")
      // Blockquotes
      .replace(/^\s{0,3}>\s?/g, "")
      .replace(/(^|\n)\s{0,3}>\s?/g, "\n\n")
      // Horizontal rules
      .replace(/[\*\-\_]{3, }\n/g, "")
      // New lines
      .replace(/\n+/g, "s")
  );
}

export function getReadTime(mdxContent: string): number {
  const text = mdxToText(mdxContent);
  const words = text.trim().split(/\s+/).length;
  const wpm = 200;
  return Math.ceil(words / wpm);
}
