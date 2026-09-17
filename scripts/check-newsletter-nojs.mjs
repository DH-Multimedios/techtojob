import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const builtPagePath = resolve(".next/server/app/index.html");
const html = await readFile(builtPagePath, "utf8");
const inputMarker = 'id="newsletter-email"';
const inputIndex = html.indexOf(inputMarker);

assert.notEqual(
  inputIndex,
  -1,
  "The built page must contain the newsletter email input.",
);
assert.equal(
  /<form(?:\s|>)/i.test(html),
  false,
  "The built page must not expose a native form submission path.",
);

const newsletterMarkup = html.slice(inputIndex, inputIndex + 2500);

assert.match(
  newsletterMarkup,
  /<button[^>]*type="button"/i,
  "The newsletter activation control must be an inert button without JavaScript.",
);
assert.doesNotMatch(
  newsletterMarkup,
  /name="email"/i,
  "The no-JavaScript markup must not expose a serializable email field name.",
);

console.log(
  "Newsletter no-JS invariant passed: no form action and no serializable email field.",
);
