"""Render a Foot+ promo graphic as a PNG and a 7-second MP4.

Needs: pip install playwright && playwright install chromium, plus ffmpeg.

Example:
  python docs/brand/templates/render-promo.py new-year-new-toes \
    --eyebrow "January offer" --line1 "New Year," --line2 "New Toes." \
    --offer-bold "£5 off" --offer "your first home visit"

Outputs go to docs/brand/examples/<name>.png and <name>.mp4.
"""
import argparse
import pathlib
import shutil
import subprocess
import tempfile
import urllib.parse

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / "examples"
FPS, SECONDS = 30, 7

ap = argparse.ArgumentParser()
ap.add_argument("name", help="file name for the output, e.g. new-year-new-toes")
ap.add_argument("--eyebrow")
ap.add_argument("--line1")
ap.add_argument("--line2")
ap.add_argument("--offer-bold", dest="offerBold")
ap.add_argument("--offer")
ap.add_argument("--sub")
ap.add_argument("--tagline")
ap.add_argument("--theme", choices=["light", "dark"])
ap.add_argument("--no-video", action="store_true")
args = vars(ap.parse_args())

name = args.pop("name")
no_video = args.pop("no_video")
query = urllib.parse.urlencode({k: v for k, v in args.items() if v is not None})
url = (HERE / "promo-graphic.html").as_uri() + ("?" + query if query else "")
OUT.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1200, "height": 900})
    page.goto(url)
    page.wait_for_load_state("networkidle")
    page.evaluate("document.fonts.ready")
    page.screenshot(path=str(OUT / f"{name}.png"))

    if not no_video:
        frames = pathlib.Path(tempfile.mkdtemp())
        for f in range(FPS * SECONDS):
            page.evaluate(f"setT({f / FPS})")
            page.screenshot(path=str(frames / f"{f:04d}.png"))
    browser.close()

if not no_video:
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS),
         "-i", str(frames / "%04d.png"), "-c:v", "libx264", "-preset", "veryfast",
         "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
         str(OUT / f"{name}.mp4")],
        check=True,
    )
    shutil.rmtree(frames)

print(f"Saved {OUT / name}.png" + ("" if no_video else " and .mp4"))
