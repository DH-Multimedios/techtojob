from __future__ import annotations

import json
import subprocess
import textwrap
from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MESSAGES_PATH = ROOT / "messages" / "es.json"
OUTPUT_DIRECTORY = ROOT / "public" / "social"
OUTPUT_PATH = OUTPUT_DIRECTORY / "techtojob-social.png"
SYMBOL_URI = (ROOT / "public" / "brand" / "symbol-mint.svg").as_uri()


def build_svg() -> str:
    messages = json.loads(MESSAGES_PATH.read_text(encoding="utf-8"))
    site_name = escape(messages["site"]["name"])
    heading = messages["hero"]["heading"]
    context = escape(messages["hero"]["context"])
    headline_lines = textwrap.wrap(
        heading,
        width=29,
        break_long_words=False,
        break_on_hyphens=False,
    )
    headline_markup = "\n".join(
        f'    <tspan x="96" dy="{0 if index == 0 else 78}">{escape(line)}</tspan>'
        for index, line in enumerate(headline_lines)
    )

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#2f3436"/>
  <path d="M-80 540 C220 180 480 180 700 470 S1100 760 1300 350" fill="none" stroke="#84c0bf" stroke-width="2" opacity="0.45"/>
  <path d="M620 -80 C710 160 910 160 1280 20" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.2"/>
  <rect x="64" y="60" width="1072" height="510" rx="64" fill="none" stroke="#84c0bf" stroke-width="2"/>
  <image href="{SYMBOL_URI}" x="96" y="92" width="64" height="64"/>
  <text x="184" y="139" fill="#84c0bf" font-family="Sora, sans-serif" font-size="34" font-weight="700">{site_name}</text>
  <text x="96" y="265" fill="#ffffff" font-family="Sora, sans-serif" font-size="62" font-weight="700">
{headline_markup}
  </text>
  <text x="96" y="480" fill="#dce3e2" font-family="Sora, sans-serif" font-size="26">{context}</text>
  <circle cx="1054" cy="476" r="38" fill="#84c0bf"/>
  <path d="M1038 476h31m-12-12 12 12-12 12" fill="none" stroke="#2f3436" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>"""


def main() -> None:
    OUTPUT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    svg = build_svg()
    subprocess.run(
        ["rsvg-convert", "--width", "1200", "--height", "630", "--output", str(OUTPUT_PATH)],
        input=svg.encode("utf-8"),
        check=True,
    )
    print(f"Generated {OUTPUT_PATH.relative_to(ROOT)} (1200x630)")


if __name__ == "__main__":
    main()
