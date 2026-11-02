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
PACKAGING = Path.home() / "Downloads" / "taiwanway_10_product_photos_original_packaging"
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
    # 原包裝實拍（1:1 → 裁成 2:3 海報）
    ("../products/plums-honey-dried-plum-seedless.jpg", PACKAGING / "01_Honey_Dried_Plum.jpg", (2, 3), 800, 0.5, 0.5, 1.0),
    ("../products/jin-he-tai-traditional-handmade-plum-cakes.jpg", PACKAGING / "02_Handmade_Plum_Wafer.jpg", (2, 3), 800, 0.5, 0.5, 1.0),
    ("../products/jin-he-tai-sugar-kumquat-candy.jpg", PACKAGING / "03_Sugar_Kumquat.jpg", (2, 3), 800, 0.5, 0.5, 1.0),
    ("../products/tang-ding-brown-sugar-longan-red-date.jpg", PACKAGING / "04_Longan_Red_Dates.jpg", (2, 3), 800, 0.5, 0.5, 1.0),
    ("../products/huixiang-red-date-chips.jpg", PACKAGING / "05_Red_Date_Crisps.jpg", (2, 3), 800, 0.5, 0.5, 1.0),
    ("../products/jin-he-tai-licorice-preserved-plum.jpg", PACKAGING / "07_Dried_Sour_Plum.jpg", (2, 3), 800, 0.5, 0.5, 1.0),
    ("bakery-pineapple-cake.jpg", DESKTOP / "暖陽下的鳳梨酥與鳳梨.png", (4, 5), 800, 0.42, 0.55, 1.0),
    ("bakery-egg-rolls.jpg", DESKTOP / "暖陽下的蛋捲.webp", (4, 5), 800, 0.45, 0.55, 1.0),
    ("bakery-cookie-chocolate.jpg", DESKTOP / "暖陽下的巧克力軟餅乾.webp", (8, 5), 800, 0.47, 0.55, 0.85),
    ("bakery-cookie-matcha.jpg", DESKTOP / "暖陽下的抹茶軟餅乾.webp", (8, 5), 800, 0.5, 0.55, 0.85),
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


# 加購三圖：一張橫圖裡並排三個圓，切成三等分並把白底去掉，讓它浮在淡杏色區塊上
COMBO_SOURCE = DESKTOP / "加購_珍奶熱茶起司蛋糕.png"
COMBO_NAMES = ["combo-bubble-tea.png", "combo-hot-tea.png", "combo-cheesecake.png"]


def white_to_alpha(im: Image.Image) -> Image.Image:
    rgba = im.convert("RGBA")
    px = rgba.load()
    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, a0 = px[x, y]
            # 原圖已有透明度（透明處顏色存成黑色）；再把接近純白的地方也變透明，淡米色圓底保持不透明
            a = min(a0, max(0, min(255, int((255 - min(r, g, b)) * 255 / 25))))
            px[x, y] = (r, g, b, a)
    return rgba


def prepare_combo() -> None:
    im = ImageOps.exif_transpose(Image.open(COMBO_SOURCE)).convert("RGBA")
    w = im.width // 3
    for i, name in enumerate(COMBO_NAMES):
        tile = im.crop((i * w, 0, (i + 1) * w, im.height))
        side = min(tile.size)
        left = (tile.width - side) // 2
        tile = tile.crop((left, 0, left + side, side)).resize((360, 360), Image.Resampling.LANCZOS)
        dest = OUT / name
        white_to_alpha(tile).save(dest, "PNG", optimize=True)
        print(f"{name}: 360x360, {dest.stat().st_size // 1024} KB")


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
    prepare_combo()


if __name__ == "__main__":
    main()
