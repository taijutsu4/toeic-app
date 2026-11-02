#!/usr/bin/env python3
"""Gộp index.html + css + js thành 1 file duy nhất: toeic-app.html (mở offline được, không cần host)."""
import re, pathlib
root = pathlib.Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">',
              lambda m: "<style>\n" + (root / m.group(1)).read_text(encoding="utf-8") + "</style>", html)
html = re.sub(r'<script src="([^"]+)"></script>',
              lambda m: "<script>\n" + (root / m.group(1)).read_text(encoding="utf-8").replace("</script", "<\\/script") + "</script>", html)
(root / "toeic-app.html").write_text(html, encoding="utf-8")
print("Đã tạo toeic-app.html")
