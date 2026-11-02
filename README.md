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
| 1 | Mô tả tranh | 6 |
| 2 | Hỏi – đáp | 20 |
| 3 | Hội thoại | 12 |
| 4 | Bài nói ngắn | 9 |
| 5 | Hoàn thành câu | 55 |
| 6 | Hoàn thành đoạn văn | 16 |
| 7 | Đọc hiểu (đơn/kép, chat, chèn câu, từ đồng nghĩa) | 22 |

Đề TOEIC gốc thuộc bản quyền của ETS, nên các câu hỏi ở đây được **biên soạn mới** theo đúng dạng câu và các chủ điểm hay gặp trong đề những năm gần đây: từ loại, thì, giới từ, liên từ, mệnh đề quan hệ, câu điều kiện/đảo ngữ, collocation, dạng chọn câu điền vào đoạn (Part 6), câu hỏi ý định người viết trong chat, chèn câu, đoạn văn kép (Part 7), câu trả lời gián tiếp (Part 2)…

### Thêm câu hỏi

Thêm vào `js/data-reading.js` hoặc `js/data-listening.js` theo cấu trúc:

```js
window.BANK.push({
  id: "p7-99", part: 7,
  passage: "<p>...</p>",                     // Part 6/7
  script: [{ s: "M", t: "..." }],             // Part 1–4 (M = nam, W = nữ, N = người dẫn)
  questions: [{ q: "Câu hỏi", o: ["A", "B", "C", "D"], a: 1, e: "Giải thích" }]
});
```
