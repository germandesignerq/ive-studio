#!/usr/bin/env python3
"""
Рисует картинку для превью ссылок (1200×630) в фирменной палитре сайта:
тёмный фон, золотые «шёлковые» линии как в героя, логотип и оффер.

Запускать вручную после смены оффера или палитры:

    python3 scripts/make-og-image.py

Результат — public/og-cover.jpg. Нужен Pillow и статические ttf Outfit
(в вебе используется вариативный woff2, но Pillow вариации не тянет).
Скачать их можно так:

    curl -s -H "User-Agent: Mozilla/4.0" \\
      "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700" \\
      | grep -o "https://[^)]*\\.ttf"

и разложить в /tmp/outfit-<вес>.ttf (каталог меняется через OUTFIT_DIR).
"""
import math
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (10, 10, 11)
GOLD = (233, 201, 127)
GOLD_SOFT = (246, 232, 197)
FG = (242, 242, 245)
FG_2 = (156, 156, 166)

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og-cover.jpg"
FONT_DIR = Path(os.environ.get("OUTFIT_DIR", "/tmp"))


def font(size: int, weight: int = 400) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / f"outfit-{weight}.ttf"), size)


def silk(draw: ImageDraw.ImageDraw) -> None:
    """Те же волны, что рисует SilkCanvas — только статичный кадр."""
    lines = 34
    for i in range(lines):
        k = i / lines
        base_y = H * 0.52 + (k - 0.5) * H * 0.86
        amp = H * 0.11 * (0.35 + k * 1.1)
        freq = (0.9 + k * 0.7) / W * math.pi * 2
        phase = i * 0.42
        alpha = 0.05 + 0.26 * math.pow(math.sin(k * math.pi), 1.4)

        points = []
        for x in range(0, W + 1, 6):
            y = (
                base_y
                + math.sin(x * freq + phase) * amp
                + math.sin(x * freq * 0.43 + phase * 1.7) * amp * 0.42
            )
            points.append((x, y))

        # затухание к краям — как у градиента в канвасе
        for (x1, y1), (x2, y2) in zip(points, points[1:]):
            edge = min(x1 / (W * 0.3), (W - x1) / (W * 0.3), 1.0)
            a = alpha * max(edge, 0.0)
            colour = GOLD_SOFT if 0.4 < x1 / W < 0.7 else GOLD
            draw.line(
                [(x1, y1), (x2, y2)],
                fill=tuple(int(BG[c] + (colour[c] - BG[c]) * a) for c in range(3)),
                width=max(1, int(0.7 + k * 1.4)),
            )


def veil(img: Image.Image) -> None:
    """Радиальное затемнение сверху, чтобы текст читался поверх линий."""
    overlay = Image.new("L", (W, H), 0)
    od = ImageDraw.Draw(overlay)
    for i in range(90):
        p = i / 90
        od.ellipse(
            [-W * 0.3 + p * W * 0.3, -H * 0.75 + p * H * 0.6, W * 1.3 - p * W * 0.3, H * 1.1 - p * H * 0.35],
            fill=int(235 * (1 - p) ** 1.5),
        )
    img.paste(Image.new("RGB", (W, H), BG), (0, 0), overlay)


def logo(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    """Знак IVE словом — векторный контур сюда тянуть незачем."""
    draw.text((x, y), "IVE", font=font(46, 700), fill=FG)
    draw.line([(x, y + 66), (x + 74, y + 66)], fill=GOLD, width=3)


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    silk(draw)
    veil(img)
    draw = ImageDraw.Draw(img)

    pad = 78
    logo(draw, pad, pad - 8)

    draw.text((pad, 210), "Design. Build.", font=font(94, 600), fill=FG)
    draw.text((pad, 310), "Launch.", font=font(94, 600), fill=GOLD)

    draw.text(
        (pad, 440),
        "Websites that actually convert — UX/UI design",
        font=font(30, 300),
        fill=FG_2,
    )
    draw.text((pad, 480), "and development, live in weeks.", font=font(30, 300), fill=FG_2)

    draw.line([(pad, H - 96), (W - pad, H - 96)], fill=(38, 38, 44), width=1)
    draw.text((pad, H - 74), "ive-studio.com", font=font(26, 500), fill=FG_2)
    right = "Fixed scope. Fixed price."
    f = font(26, 400)
    draw.text((W - pad - draw.textlength(right, font=f), H - 74), right, font=f, fill=GOLD)

    img.save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"{OUT.relative_to(ROOT)} — {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
