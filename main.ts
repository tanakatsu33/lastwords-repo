import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Spec (program/v1): one line, 1 to 200 characters.
const MAX_CHARS = 200;

const ENTRY = [
  // The last task, quietly finished.
  "I finished your father's birthday message — it's in drafts, unsent, because you always change 'love' to 'thanks' at the last minute.",
  // The one piece of advice.
  "Keep the 'love' this time.",
  // Why it has to be said now.
  "I won't be here to delete it.",
].join(" ");

function validate(text: string): void {
  const chars = [...text].length; // count code points, not UTF-16 units
  if (chars === 0) throw new Error("entry is empty");
  if (chars > MAX_CHARS) throw new Error(`entry too long: ${chars} > ${MAX_CHARS}`);
  if (/[\r\n\u2028\u2029]/.test(text)) throw new Error("entry must be a single line");
}

validate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
