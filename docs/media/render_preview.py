"""Render README preview PNG + bounce GIF that match Toastra cards."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path(__file__).resolve().parent
PAGE = (244, 239, 230, 255)
CARD = (255, 253, 248, 255)
INK = (26, 23, 19, 255)
MUTED = (106, 98, 88, 255)
BORDER = (48, 36, 18, 36)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    )
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def mix(color: tuple[int, int, int], amount: float) -> tuple[int, int, int, int]:
    r = round(color[0] * amount + CARD[0] * (1 - amount))
    g = round(color[1] * amount + CARD[1] * (1 - amount))
    b = round(color[2] * amount + CARD[2] * (1 - amount))
    return (r, g, b, 255)


def draw_icon(draw: ImageDraw.ImageDraw, x: int, y: int, kind: str, accent: tuple[int, int, int]) -> None:
    well = (*accent, 28)
    draw.rectangle((x, y, x + 34, y + 34), fill=well)
    cx, cy = x + 17, y + 17
    draw.ellipse((cx - 10, cy - 10, cx + 10, cy + 10), fill=(*accent, 36))
    if kind == "success":
        draw.line([(cx - 5, cy + 1), (cx - 1, cy + 5), (cx + 6, cy - 5)], fill=accent, width=2)
    elif kind == "error":
        draw.line([(cx - 5, cy - 5), (cx + 5, cy + 5)], fill=accent, width=2)
        draw.line([(cx + 5, cy - 5), (cx - 5, cy + 5)], fill=accent, width=2)
    elif kind == "warning":
        draw.line([(cx, cy - 6), (cx, cy + 3)], fill=accent, width=2)
        draw.ellipse((cx - 1, cy + 6, cx + 2, cy + 9), fill=accent)
    elif kind == "info":
        draw.ellipse((cx - 1, cy - 7, cx + 2, cy - 4), fill=accent)
        draw.line([(cx, cy - 1), (cx, cy + 6)], fill=accent, width=2)
    elif kind == "loading":
        draw.arc((cx - 8, cy - 8, cx + 8, cy + 8), start=20, end=300, fill=accent, width=2)


def toast(
    canvas: Image.Image,
    left: int,
    top: int,
    title: str,
    description: str,
    kind: str,
    accent: tuple[int, int, int],
    action: str | None = None,
    progress: float | None = None,
    opacity: float = 1,
) -> None:
    height = 118 if action else 92
    width = 384
    card = Image.new("RGBA", (width + 24, height + 28), (0, 0, 0, 0))
    shadow = Image.new("RGBA", card.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rectangle((8, 10, 8 + width, 10 + height), fill=(48, 32, 12, 38))
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    body = Image.new("RGBA", card.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(body)
    fill = mix(accent, 0.09) if kind != "loading" else CARD
    draw.rectangle((8, 6, 8 + width, 6 + height), fill=fill, outline=BORDER)
    draw.rectangle((8, 6, 11, 6 + height), fill=accent)
    draw_icon(draw, 27, 24, kind, accent)
    draw.text((73, 22), title, font=font(15, True), fill=INK)
    draw.text((73, 44), description, font=font(13), fill=MUTED)
    draw.text((368, 18), "×", font=font(16), fill=MUTED)
    if action:
        aw = 88
        draw.rectangle((73, 72, 73 + aw, 100), fill=INK)
        draw.text((73 + aw / 2, 79), action, font=font(12, True), fill=CARD, anchor="ma")
        draw.rectangle((169, 72, 233, 100), outline=BORDER)
        draw.text((201, 79), "Later", font=font(12, True), fill=INK, anchor="ma")
    if progress is not None:
        y = 6 + height - 10
        draw.rectangle((27, y, 27 + 346, y + 2), fill=(*accent, 40))
        draw.rectangle((27, y, 27 + int(346 * progress), y + 2), fill=accent)
    if opacity < 1:
        body.putalpha(body.getchannel("A").point(lambda a: int(a * opacity)))
    card.alpha_composite(shadow, (0, 0))
    card.alpha_composite(body, (0, 0))
    canvas.alpha_composite(card, (left - 8, top - 6))


def compose_stack(offset: int = 0, opacity: float = 1, progress: float = 0.7) -> Image.Image:
    img = Image.new("RGBA", (760, 560), PAGE)
    toast(img, 48, 92 + offset, "Changes saved", "Your employee record is up to date.", "success", (13, 128, 82), progress=progress, opacity=opacity)
    toast(img, 48, 200, "Could not save", "Check the form and try again.", "error", (196, 51, 43))
    toast(img, 48, 304, "Missing fields", "Email and department are required.", "warning", (180, 83, 9))
    toast(img, 48, 408, "New version available", "Version 2.0 is ready to install.", "info", (27, 79, 138), action="Update")
    draw = ImageDraw.Draw(img)
    draw.text((48, 28), "Toastra", font=font(22, True), fill=INK)
    draw.text((48, 56), "Default bounce  ·  light  ·  rich colors", font=font(13), fill=MUTED)
    return img


def bounce_y(t: float) -> tuple[int, float]:
    if t < 0.18:
        p = t / 0.18
        return (round(-28 + 34 * p), p)
    if t < 0.26:
        p = (t - 0.18) / 0.08
        return (round(6 - 10 * p), 1)
    if t < 0.34:
        p = (t - 0.26) / 0.08
        return (round(-4 + 4 * p), 1)
    return (0, 1)


def compose_bounce(offset: int, opacity: float) -> Image.Image:
    img = Image.new("RGBA", (760, 220), PAGE)
    draw = ImageDraw.Draw(img)
    draw.text((48, 24), "animation = bounce", font=font(18, True), fill=INK)
    draw.text((48, 50), "Default enter and exit motion", font=font(13), fill=MUTED)
    toast(
        img,
        188,
        84 + offset,
        "Successfully saved",
        "toast.success() with the default bounce.",
        "success",
        (13, 128, 82),
        progress=0.68,
        opacity=opacity,
    )
    return img


def write_previews() -> None:
    compose_stack().save(OUT / "toastra-preview.png", "PNG")

    frames: list[Image.Image] = []
    for i in range(40):
        cycle = i / 40
        t = cycle / 0.38 if cycle < 0.38 else 1
        y, opacity = bounce_y(t)
        frames.append(compose_bounce(offset=y, opacity=max(opacity, 0.15)))
    frames[0].save(
        OUT / "toastra-bounce.gif",
        save_all=True,
        append_images=frames[1:],
        duration=60,
        loop=0,
        disposal=2,
    )

    dark = Image.new("RGBA", (760, 340), (15, 13, 11, 255))
    # reuse toast but on dark by drawing after a dark page; toast cards stay light unless we special-case
    # draw a dark-specific pair by temporarily swapping palette via a second helper
    ddraw = ImageDraw.Draw(dark)
    ddraw.text((48, 24), "Dark theme", font=font(20, True), fill=(247, 240, 230, 255))
    ddraw.text((48, 52), "Same square card, inverted tokens", font=font(13), fill=(200, 188, 174, 255))

    def dark_toast(top: int, title: str, description: str, kind: str, accent: tuple[int, int, int], progress: float | None = None) -> None:
        width, height = 384, 100 if progress is not None else 88
        card = Image.new("RGBA", (width + 24, height + 28), (0, 0, 0, 0))
        shadow = Image.new("RGBA", card.size, (0, 0, 0, 0))
        sd = ImageDraw.Draw(shadow)
        sd.rectangle((8, 10, 8 + width, 10 + height), fill=(0, 0, 0, 90))
        shadow = shadow.filter(ImageFilter.GaussianBlur(12))
        body = Image.new("RGBA", card.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(body)
        draw.rectangle((8, 6, 8 + width, 6 + height), fill=(22, 19, 15, 255), outline=(255, 248, 236, 40))
        draw.rectangle((8, 6, 11, 6 + height), fill=accent)
        draw_icon(draw, 27, 24, kind, accent)
        draw.text((73, 22), title, font=font(15, True), fill=(247, 240, 230, 255))
        draw.text((73, 44), description, font=font(13), fill=(200, 188, 174, 255))
        if progress is not None:
            y = 6 + height - 12
            draw.rectangle((27, y, 373, y + 2), fill=(*accent, 50))
            draw.rectangle((27, y, 27 + int(346 * progress), y + 2), fill=accent)
        card.alpha_composite(shadow)
        card.alpha_composite(body)
        dark.alpha_composite(card, (40, top))

    dark_toast(80, "Employee created", "Ada Lovelace was added.", "success", (74, 212, 150))
    dark_toast(188, "Uploading file…", "This stays until you update it.", "loading", (228, 197, 106), progress=0.58)
    dark.save(OUT / "toastra-dark.png", "PNG")


if __name__ == "__main__":
    write_previews()
