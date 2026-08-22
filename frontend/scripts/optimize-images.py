#!/usr/bin/env python3
"""
Готовит AVIF/WebP-варианты и манифест к ним.

Зачем: исходники — JPEG по 1200–1600 px, а показываются они местами в 310 px.
Браузер тянет мегабайты ради картинки размером с визитку, и это главный тормоз
LCP, который Google считает фактором ранжирования.

Что делает:
  public/work-alice.jpg  →  public/img/work-alice-640.avif  (+ .webp, + 1200)
  public/blog/foo.jpg    →  public/img/blog/foo-640.avif    (+ .webp, + 1280)
  src/data/images.generated.ts — размеры и список ширин для <Picture>

Исходные JPEG остаются на месте: это фолбэк для браузеров без AVIF/WebP
и то, что скачивают соцсети. og-cover.jpg не трогаем совсем — скрейперы
Facebook и LinkedIn понимают только JPEG/PNG.

Запускать после добавления новых картинок:
    cd frontend && python3 scripts/optimize-images.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT_DIR = PUBLIC / "img"
MANIFEST = ROOT / "src" / "data" / "images.generated.ts"

SKIP = {"og-cover.jpg"}
QUALITY = {"avif": 58, "webp": 76}

# Больше 1280 не отдаём: самая широкая картинка на сайте занимает ~660 CSS-px,
# то есть 1320 на экране с двойной плотностью.
BREAKPOINTS = (640, 1280)


def widths_for(src_width: int) -> list[int]:
    widths = [w for w in BREAKPOINTS if w <= src_width]
    if src_width < BREAKPOINTS[-1] and src_width not in widths:
        widths.append(src_width)
    return sorted(widths) or [src_width]


def main() -> None:
    sources = sorted(PUBLIC.glob("*.jpg")) + sorted(PUBLIC.glob("blog/*.jpg"))
    entries: list[str] = []
    written = saved_from = saved_to = 0

    for src in sources:
        if src.name in SKIP:
            continue
        rel = src.relative_to(PUBLIC)
        stem = rel.with_suffix("")
        image = Image.open(src).convert("RGB")
        widths = widths_for(image.width)

        for width in widths:
            height = round(image.height * width / image.width)
            resized = image if width == image.width else image.resize((width, height), Image.LANCZOS)
            for fmt, quality in QUALITY.items():
                target = OUT_DIR / f"{stem}-{width}.{fmt}"
                target.parent.mkdir(parents=True, exist_ok=True)
                resized.save(target, format=fmt.upper(), quality=quality)
                written += 1
                if width == max(widths) and fmt == "avif":
                    saved_from += src.stat().st_size
                    saved_to += target.stat().st_size

        entries.append(
            f"  '/{rel.as_posix()}': {{ base: '/img/{stem.as_posix()}', "
            f"width: {image.width}, height: {image.height}, "
            f"widths: [{', '.join(str(w) for w in widths)}] }},"
        )

    MANIFEST.write_text(
        "/**\n"
        " * Сгенерировано scripts/optimize-images.py — руками не править.\n"
        " *\n"
        " * base    — префикс вариантов: `${base}-${width}.avif`\n"
        " * width/height — размеры оригинала, из них <Picture> ставит атрибуты\n"
        " *   width и height: без них браузер не знает высоту до загрузки и\n"
        " *   страница дёргается — это и есть CLS в Core Web Vitals.\n"
        " */\n"
        "export type ImageSet = { base: string; width: number; height: number; widths: number[] }\n\n"
        "export const imageSets: Record<string, ImageSet> = {\n" + "\n".join(entries) + "\n}\n",
        encoding="utf-8",
    )

    print(f"{written} файлов в public/img, манифест на {len(entries)} картинок")
    print(f"самый широкий AVIF против исходного JPEG: {saved_from // 1024} КБ → {saved_to // 1024} КБ")


if __name__ == "__main__":
    main()
