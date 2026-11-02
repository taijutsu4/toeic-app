# TOEIC Prep – Web app ôn thi TOEIC

Web app tĩnh (HTML/CSS/JS thuần, không cần cài đặt hay build) để ôn thi TOEIC Listening & Reading theo format mới (2019+).

## Tính năng

- **2 cách làm bài**
  - ⚡ **Luyện tập – Chấm ngay**: nhấn đáp án là biết ngay đúng/sai. Nếu sai sẽ hiện đáp án đúng và giải thích chi tiết bằng tiếng Việt; phần nghe hiện thêm transcript.
  - ⏱️ **Thi thử – Chấm khi nộp bài**: có đồng hồ đếm ngược (mặc định theo nhịp đề thật ≈ 200 câu / 120 phút). Được đổi đáp án và nhảy qua lại giữa các câu; nộp bài (hoặc hết giờ) mới chấm. Kết quả gồm điểm từng part, điểm TOEIC quy đổi ước tính và phần xem lại có giải thích từng câu.
- **Đủ 7 part**: Part 1–4 (Listening, đọc bằng giọng tổng hợp của trình duyệt, nghe lại được, chỉnh được tốc độ) và Part 5–7 (Reading).
- Chọn part, số câu, xáo trộn câu hỏi; thứ tự đáp án được xáo mỗi lượt.
- **Câu sai cần ôn**: tự lưu các câu làm sai, luyện lại riêng; làm đúng thì câu tự được xóa khỏi danh sách.
- **Lịch sử làm bài** lưu trong trình duyệt (localStorage).
- Phím tắt: `←`/`→` chuyển câu, `A–D` hoặc `1–4` chọn đáp án, `Space` nghe lại.
- Hỗ trợ giao diện tối (dark mode) và điện thoại.

## Chạy

**Cách nhanh nhất:** tải file `toeic-app.html` (đã gộp sẵn tất cả) về máy/điện thoại rồi mở bằng trình duyệt – không cần host, chạy offline (phần nghe dùng giọng đọc của máy).
Sau khi sửa câu hỏi, chạy `python3 build.py` để tạo lại file này.


Mở `index.html` trực tiếp bằng trình duyệt, hoặc:

```bash
python3 -m http.server 8000   # rồi mở http://localhost:8000
```

Có thể deploy lên GitHub Pages: Settings → Pages → chọn branch.

Nên dùng Chrome, Edge hoặc Safari bản mới để có giọng đọc tiếng Anh tốt cho phần Listening.

## Ngân hàng câu hỏi

| Part | Nội dung | Số câu |
|---|---|---|
| 1 | Mô tả tranh – **ảnh chụp thật** (Wikimedia Commons, giấy phép tự do) | 13 |
| 2 | Hỏi – đáp | 25 |
| 3 | Hội thoại (có hội thoại **3 người**, câu hỏi **hàm ý**, câu hỏi **biểu đồ**) | 27 |
| 4 | Bài nói ngắn (có câu hỏi hàm ý, biểu đồ) | 18 |
| 5 | Hoàn thành câu | 55 |
| 6 | Hoàn thành đoạn văn | 16 |
| 7 | Đọc hiểu (đơn/kép, chat, chèn câu, từ đồng nghĩa) | 22 |

### Phần Listening bám theo format thật

Theo mô tả chính thức của ETS/IIBC:

- **Part 1 và 2:** câu mô tả / câu trả lời **không in trong đề**, chỉ được đọc. App chỉ hiện nút (A)(B)(C)(D).
- **Part 3 và 4:** câu hỏi và đáp án được in; người dẫn đọc lại từng câu hỏi.
- **Mô phỏng thi thật** (bật trong chế độ thi thử):
  - mỗi đoạn chỉ phát **1 lần**;
  - người dẫn đọc *"Number…"* / *"Questions … through … refer to the following conversation"*;
  - chừa 5 giây (Part 1–2), 8 giây mỗi câu (Part 3–4) hoặc 12 giây với câu hỏi biểu đồ, rồi **tự chuyển**, không quay lại được.
- **Giọng đọc:** luân phiên giọng Mỹ / Anh / Úc / Canada nếu thiết bị có, nam/nữ đúng vai, và giọng khác nhau cho hội thoại 3 người.
- **Âm thanh:** dùng giọng đọc tổng hợp của trình duyệt (Web Speech API). Chất lượng phụ thuộc thiết bị. Chrome/Edge trên máy tính, hoặc Safari trên iPhone, thường có giọng tự nhiên nhất.

Nguồn ảnh: xem `assets/p1/CREDITS.md`.

Đề TOEIC gốc (kể cả audio, ảnh) thuộc bản quyền của ETS, nên các câu hỏi ở đây được **biên soạn mới** theo đúng dạng câu và các chủ điểm hay gặp trong đề những năm gần đây.

### Thêm câu hỏi

Thêm vào `js/data-reading.js` hoặc `js/data-listening.js` theo cấu trúc:

```js
window.BANK.push({
  id: "p7-99", part: 7,
  passage: "<p>...</p>",                     // Part 6/7
  script: [{ s: "M", t: "..." }],             // Part 2–4 (M/M2 = nam, W/W2 = nữ)
  graphic: "<table class=\"gtable\">…</table>", // Part 3/4: câu hỏi 'Look at the graphic'
  img: { src: "assets/p1/xx.jpg", credit: {…} }, // Part 1
  questions: [{ q: "Câu hỏi", o: ["A", "B", "C", "D"], a: 1, e: "Giải thích" }]
});
```
