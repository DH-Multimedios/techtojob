import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const builtPagePath = resolve(".next/server/app/index.html");
const html = await readFile(builtPagePath, "utf8");
const demoMarker = 'data-newsletter-demo="true"';
const demoIndex = html.indexOf(demoMarker);
const demoEnd = html.indexOf("<noscript", demoIndex);

assert.notEqual(
  demoIndex,
  -1,
  "The built page must contain the newsletter demo.",
);
assert.notEqual(demoEnd, -1, "The newsletter demo markup must be bounded.");
assert.equal(
  /<form(?:\s|>)/i.test(html),
  false,
  "The built page must not expose a native form submission path.",
);

const newsletterMarkup = html.slice(demoIndex, demoEnd);
const emailInput = newsletterMarkup.match(
  /<input(?=[^>]*\bid="newsletter-email")[^>]*>/i,
)?.[0];

assert.ok(emailInput, "The newsletter demo must contain its email input.");
assert.doesNotMatch(
  emailInput,
  /\sname(?:\s*=|\s|>)/i,
  "The no-JavaScript markup must not expose a serializable email field name.",
);

const radioInputs = newsletterMarkup.match(
  /<input(?=[^>]*\btype="radio")[^>]*>/gi,
);
assert.equal(radioInputs?.length, 2, "Frequency must expose exactly two radios.");
assert.ok(
  radioInputs.every((input) => /\bname="newsletter-frequency"/i.test(input)),
  "Frequency radios must share a native radio group.",
);

const monthlyRadio = radioInputs.find((input) => /\bvalue="monthly"/i.test(input));
const weeklyRadio = radioInputs.find((input) => /\bvalue="weekly"/i.test(input));
assert.ok(monthlyRadio, "The monthly frequency radio must exist.");
assert.match(monthlyRadio, /\bchecked(?:=""|(?=\s|>))/i, "Monthly must be selected by default.");
assert.ok(weeklyRadio, "The weekly frequency radio must exist.");
assert.doesNotMatch(weeklyRadio, /\bchecked(?:=""|(?=\s|>))/i, "Weekly must not be selected by default.");

const checkboxInputs = newsletterMarkup.match(
  /<input(?=[^>]*\btype="checkbox")[^>]*>/gi,
);
assert.equal(
  checkboxInputs?.length,
  4,
  "Content interests must expose exactly four independent checkboxes.",
);

const submitButton = newsletterMarkup.match(
  /<button(?=[^>]*\bnewsletter-form__submit\b)[^>]*>([\s\S]*?)<\/button>/i,
);
assert.ok(submitButton, "The newsletter activation button must exist.");
assert.match(submitButton[0], /\btype="button"/i, "The newsletter control must be an inert button.");
const submitText = submitButton[1].replace(/<[^>]+>/g, "").trim();
assert.equal(submitText, "Recibir novedades", "The compact submit label must remain visible.");

assert.match(newsletterMarkup, /<fieldset[\s>]/i, "Preferences must use fieldsets.");
assert.match(newsletterMarkup, /<legend[^>]*>Frecuencia<\/legend>/i, "Frequency must have a visible legend.");
assert.match(newsletterMarkup, /<legend[^>]*>Temas que te interesan<\/legend>/i, "Interests must have a visible legend.");

console.log(
  "Newsletter no-JS invariant passed: inert semantic controls, monthly default, and no serializable email field.",
);
