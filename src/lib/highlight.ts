const KEYWORDS: Record<string, string> = {
  rust: "fn let mut if else loop while for in match return break continue struct enum impl pub use mod Some None Ok Err self Self true false as where async await move const static ref",
  go: "func var const if else for range return break continue type struct interface map chan go defer select switch case default package import nil true false",
  ts: "const let var function return if else for of in while new class public private protected readonly this await async import export from type interface true false null undefined",
  js: "const let var function return if else for of in while new class this await async import export from true false null undefined",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>]/g, (char) => {
    if (char === "&") return "&amp;";
    if (char === "<") return "&lt;";
    return "&gt;";
  });
}

/** Tiny highlighter: comments, strings, numbers, and keywords. Same rules as the reference. */
export function highlightLine(line: string, lang: string): string {
  const keywords = new Set((KEYWORDS[lang] ?? "").split(" "));
  const re =
    /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d[\d_.]*\b)|([A-Za-z_][A-Za-z0-9_]*)/g;
  let out = "";
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(line))) {
    out += escapeHtml(line.slice(last, match.index));
    if (match[1]) out += `<span class="c">${escapeHtml(match[1])}</span>`;
    else if (match[2]) out += `<span class="s">${escapeHtml(match[2])}</span>`;
    else if (match[3]) out += `<span class="n">${escapeHtml(match[3])}</span>`;
    else out += keywords.has(match[4]) ? `<span class="k">${match[4]}</span>` : escapeHtml(match[4]);
    last = re.lastIndex;
  }
  return out + escapeHtml(line.slice(last));
}

export function highlightCode(code: string, lang: string, startLine: number): string {
  return code
    .split("\n")
    .map((line, index) => {
      const highlighted = highlightLine(line, lang);
      return `<span class="ln" data-n="${startLine + index}">${highlighted || " "}</span>`;
    })
    .join("");
}
