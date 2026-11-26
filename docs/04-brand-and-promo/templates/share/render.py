"""Render the Foot+ share and search images into public/images.

    pip install playwright && playwright install chromium   # once
    python docs/04-brand-and-promo/templates/share/render.py

Needs Poppins and Inter installed locally (the template uses the system fonts).
- foot-plus-share.jpg (1200x630): og:image for WhatsApp, Facebook and other link previews (Option A, Nov 2026).
- foot-plus-practitioners.jpg, adam-james-square.jpg, katie-preston-square.jpg (1200x1200): the square,
  text-free pictures offered to Google as search thumbnails (primaryImageOfPage). Google advises against
  logos or text in these, so keep them as portraits only.
"""
import asyncio
from pathlib import Path

from PIL import Image
from playwright.async_api import async_playwright

HERE = Path(__file__).resolve().parent
OUT = HERE.parents[3] / "public" / "images"
JOBS = [
    ("v=A&s=wide", 630, "foot-plus-share"),
    ("v=F&s=square&who=both", 1200, "foot-plus-practitioners"),
    ("v=F&s=square&who=adam", 1200, "adam-james-square"),
    ("v=F&s=square&who=katie", 1200, "katie-preston-square"),
]


async def main() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=["--allow-file-access-from-files"])
        for query, height, name in JOBS:
            page = await browser.new_page(viewport={"width": 1200, "height": height})
            await page.goto(f"{(HERE / 'share-card.html').as_uri()}?{query}")
            await page.wait_for_timeout(700)
            png = HERE / f"{name}.png"
            await page.screenshot(path=str(png))
            Image.open(png).convert("RGB").save(OUT / f"{name}.jpg", quality=86, optimize=True, progressive=True)
            png.unlink()
            print("wrote", OUT / f"{name}.jpg")
        await browser.close()


asyncio.run(main())
