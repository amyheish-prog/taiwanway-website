#!/usr/bin/env python3
"""把首頁用的原始照片裁切、縮圖後輸出到 public/images/home/。

重拍後只要改 PHOTOS 的來源路徑，再執行：
    python3 scripts/prepare-home-photos.py
"""
from pathlib import Path

from PIL import Image, ImageOps

DESKTOP = Path.home() / "Desktop"
MENU = DESKTOP / "TaiwanWay_行銷素材" / "菜單照片"
STORE = DESKTOP / "Taiwanway 照片"
WEB8 = DESKTOP / "taiwanway_web_8_images"
OUT = Path(__file__).resolve().parent.parent / "public" / "images" / "home"

# (輸出檔名, 來源, 寬高比, 輸出寬度, 焦點 x, 焦點 y, 縮放)
# 縮放 < 1 會往焦點裁進去，用來切掉 Gemini 修圖留在右下角的星形標記
PHOTOS = [
    ("hero.jpg", DESKTOP / "暖陽下的台式紅燒牛肉麵.png", (3, 2), 1536, 0.5, 0.5, 1.0),
    ("category-kitchen.jpg", DESKTOP / "暖陽下的滷肉飯.png", (4, 5), 900, 0.5, 0.5, 1.0),
    ("category-drinks.jpg", DESKTOP / "暖陽下的黑糖珍珠鮮奶.png", (4, 5), 900, 0.5, 0.5, 1.0),
    ("category-shop.jpg", DESKTOP / "暖陽下的鳳梨酥禮盒_店內實際包裝.png", (4, 5), 900, 0.55, 0.5, 1.0),
    ("pick-beef-noodle.jpg", DESKTOP / "暖陽下的牛肉麵_外帶碗.png", (1, 1), 800, 0.58, 0.52, 0.85),
    ("pick-pork-rice.jpg", WEB8 / "02_braised_pork_rice.jpg", (1, 1), 800, 0.5, 0.5, 1.0),
    ("pick-chicken-rice.jpg", DESKTOP / "暖陽下的雞肉飯.png", (1, 1), 800, 0.52, 0.54, 0.78),
    ("pick-matcha.jpg", DESKTOP / "暖陽下的黑糖抹茶珍珠.png", (1, 1), 800, 0.5, 0.48, 0.92),
    ("pick-pineapple-cake.jpg", DESKTOP / "暖陽下的鳳梨酥與鳳梨.png", (1, 1), 800, 0.42, 0.6, 0.85),
    ("bakery-gift-box.jpg", DESKTOP / "暖陽下的鳳梨酥禮盒_店內實際包裝.png", (1, 1), 1000, 0.55, 0.55, 1.0),
    ("../products/freshly-baked-pineapple-cake-gift-box.jpg", DESKTOP / "暖陽下的鳳梨酥禮盒_店內實際包裝.png", (2, 3), 1000, 0.6, 0.5, 1.0),
    ("visit-exterior.jpg", MENU / "Taiwanway flower.jpg", (4, 5), 1000, 0.5, 0.55, 1.0),
    ("visit-interior.jpg", STORE / "IMG_4969.JPG", (3, 2), 1400, 0.5, 0.5, 1.0),
]


def crop(im: Image.Image, ratio, fx: float, fy: float, zoom: float) -> Image.Image:
    w, h = im.size
    target = ratio[0] / ratio[1]
    cw, ch = (w, w / target) if w / h < target else (h * target, h)
    cw, ch = cw * zoom, ch * zoom
    left = min(max(fx * w - cw / 2, 0), w - cw)
    top = min(max(fy * h - ch / 2, 0), h - ch)
    return im.crop((round(left), round(top), round(left + cw), round(top + ch)))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, src, ratio, width, fx, fy, zoom in PHOTOS:
        im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
        im = crop(im, ratio, fx, fy, zoom)
        if im.width > width:
            im = im.resize((width, round(width * im.height / im.width)), Image.Resampling.LANCZOS)
        dest = OUT / name
        im.save(dest, "JPEG", quality=82, optimize=True, progressive=True)
        print(f"{name}: {im.width}x{im.height}, {dest.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
