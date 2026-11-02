#!/usr/bin/env python3
"""Gộp index.html + css + js + ảnh thành 1 file duy nhất: toeic-app.html (mở offline được, không cần host)."""
import re, json, base64, pathlib
root = pathlib.Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")

# Ảnh được tham chiếu trong dữ liệu → nhúng base64 qua window.ASSETS
srcs = set()
for js in (root / "js").glob("data-*.js"):
    srcs |= set(re.findall(r'"(assets/[^"]+\.(?:jpg|png))"', js.read_text(encoding="utf-8")))
    srcs |= {"assets/p1/%s.jpg" % m for m in re.findall(r'"(p1-\d+)"', js.read_text(encoding="utf-8"))}
assets = {}
for s in sorted(srcs):
    f = root / s
    if f.exists():
        mime = "image/png" if s.endswith(".png") else "image/jpeg"
        assets[s] = "data:%s;base64,%s" % (mime, base64.b64encode(f.read_bytes()).decode())

def inline_script(m):
    return "<script>\n" + (root / m.group(1)).read_text(encoding="utf-8").replace("</script", "<\\/script") + "</script>"

html = re.sub(r'<link rel="stylesheet" href="([^"]+)">',
              lambda m: "<style>\n" + (root / m.group(1)).read_text(encoding="utf-8") + "</style>", html)
html = re.sub(r'<script src="([^"]+)"></script>', inline_script, html)
html = html.replace("<script>\n", "<script>window.ASSETS=" + json.dumps(assets) + ";</script>\n<script>\n", 1)
(root / "toeic-app.html").write_text(html, encoding="utf-8")
print("Đã tạo toeic-app.html (%d ảnh nhúng, %.1f MB)" % (len(assets), (root / "toeic-app.html").stat().st_size / 1e6))
