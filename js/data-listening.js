/*
 * Ngân hàng câu hỏi LISTENING (Part 1, 2, 3, 4)
 * Âm thanh được phát bằng Web Speech API (giọng đọc tổng hợp của trình duyệt).
 * script: mảng các lượt nói {s: 'M'|'W'|'N', t: 'text'}  (M = nam, W = nữ, N = người dẫn)
 * Với Part 1: scene = mô tả bức tranh (hiển thị bằng emoji + chữ), các lựa chọn được đọc to.
 * Với Part 2: câu hỏi + 3 lựa chọn đều được đọc, không hiển thị chữ cho tới khi trả lời.
 */
window.BANK = window.BANK || [];

/* ============================ PART 1 ============================ */
(function () {
  const P1 = [
    ["👩‍💼💻🪟", "Một người phụ nữ đang ngồi gõ máy tính xách tay cạnh cửa sổ.",
      ["She's opening a window.", "She's typing on a laptop.", "She's repairing a computer.", "She's putting on her glasses."], 1,
      "Mô tả đúng hành động đang diễn ra: đang gõ máy tính. Bẫy: 'window' (có trong tranh nhưng không mở), 'computer' (không sửa)."],
    ["📦📦📦🧑‍🔧🚚", "Một công nhân đang chất các thùng hàng lên xe tải.",
      ["A man is driving a truck.", "Some boxes are being loaded onto a vehicle.", "A truck is parked in a garage.", "Some boxes are being opened."], 1,
      "Bị động tiếp diễn 'are being loaded' = đang được chất lên. Người đàn ông không lái xe; hộp không được mở."],
    ["🪑🪑🪑🍽️ (trống)", "Một nhà hàng trống không có ai, ghế được xếp quanh bàn.",
      ["Some people are eating a meal.", "A waiter is setting a table.", "Chairs have been arranged around a table.", "The tables are being cleaned."], 2,
      "Tranh không có người → loại các câu có người hoặc hành động đang diễn ra ('being'). 'have been arranged' = đã được sắp xếp (trạng thái)."],
    ["🧑‍🤝‍🧑🚶‍♂️🌉", "Hai người đang đi bộ qua một cây cầu.",
      ["They're crossing a bridge.", "They're fishing in a river.", "They're painting a bridge.", "They're waiting for a boat."], 0,
      "'crossing a bridge' = đi qua cầu. Các hành động khác không có trong tranh."],
    ["📚📚🗄️ (kệ sách)", "Các cuốn sách được xếp trên kệ trong thư viện, không có người.",
      ["A woman is reading a book.", "Books have been placed on shelves.", "Some shelves are being installed.", "Some books are lying on the floor."], 1,
      "Không có người, sách đã được đặt lên kệ → 'have been placed on shelves'."],
    ["👨‍🍳🥕🔪", "Một đầu bếp đang thái rau trên thớt.",
      ["A chef is cutting some vegetables.", "A chef is washing the dishes.", "Some vegetables are being cooked in a pot.", "A man is serving food to customers."], 0,
      "Đang thái rau → 'cutting some vegetables'."]
  ];
  P1.forEach((x, i) => window.BANK.push({
    id: "p1-" + (i + 1), part: 1, scene: { icon: x[0], desc: x[1] },
    script: [],
    questions: [{ q: "Chọn câu mô tả đúng nhất bức tranh.", o: x[2], a: x[3], e: x[4], audioOptions: true }]
  }));
})();

/* ============================ PART 2 ============================ */
(function () {
  const P2 = [
    ["Where is the nearest post office?", ["It's two blocks from here.", "At three o'clock.", "Yes, I sent it yesterday."], 0,
      "Câu hỏi 'Where' → trả lời địa điểm. (B) trả lời 'When'; (C) trả lời Yes/No không hợp với câu hỏi Wh-."],
    ["When does the meeting start?", ["In the conference room.", "Right after lunch.", "Mr. Brown will lead it."], 1,
      "Câu hỏi 'When' → thời gian: 'Right after lunch'. (A) Where; (C) Who."],
    ["Who's in charge of the new project?", ["It's due next Friday.", "Ms. Lee is.", "A very interesting project."], 1,
      "Câu hỏi 'Who' → người: 'Ms. Lee is'. (C) lặp từ 'project' – bẫy âm giống."],
    ["Why was the flight delayed?", ["Because of bad weather.", "Gate 12.", "About two hours."], 0,
      "Câu hỏi 'Why' → lý do: 'Because of bad weather'. (C) trả lời 'How long'."],
    ["How often do you visit the main office?", ["By train.", "Once a month.", "For three days."], 1,
      "'How often' → tần suất: 'Once a month'. (A) How; (C) How long."],
    ["Would you like some coffee?", ["Yes, I'd love some.", "It's in the kitchen.", "I like it very much."], 0,
      "Lời mời 'Would you like...?' → chấp nhận/từ chối: 'Yes, I'd love some'."],
    ["Didn't you receive my e-mail?", ["The mail carrier came at noon.", "No, I haven't checked my inbox yet.", "I'll send it to you."], 1,
      "Câu hỏi phủ định → trả lời như câu hỏi thường: 'No, I haven't checked...'. (A) bẫy từ 'mail'."],
    ["Should we take a taxi or walk to the restaurant?", ["Yes, I took one.", "It's close enough to walk.", "The food was great."], 1,
      "Câu hỏi lựa chọn (A or B) → chọn một: 'close enough to walk'. Câu hỏi lựa chọn không trả lời Yes/No."],
    ["Can you help me move these boxes?", ["Sure, where should I put them?", "They're from the supplier.", "I moved last year."], 0,
      "Lời nhờ 'Can you...?' → đồng ý 'Sure' + hỏi tiếp. (C) bẫy từ 'move'."],
    ["The printer on the third floor is out of order.", ["I'll call the technician.", "Three copies, please.", "In alphabetical order."], 0,
      "Câu trần thuật nêu vấn đề → phản hồi giải pháp: 'I'll call the technician'. (C) bẫy từ 'order'."],
    ["Which hotel are you staying at?", ["For two nights.", "The one near the convention center.", "Yes, it was comfortable."], 1,
      "'Which hotel' → 'The one near the convention center' (cấu trúc 'the one' rất hay gặp)."],
    ["Who's going to pick up the clients from the airport?", ["I thought Kevin was.", "At terminal B.", "They're very important clients."], 0,
      "Trả lời gián tiếp 'I thought Kevin was' (tôi tưởng Kevin đi) – dạng trả lời vòng phổ biến trong đề mới."],
    ["How much does it cost to rent a car?", ["About fifty dollars a day.", "A red one.", "At the rental counter."], 0,
      "'How much' → giá tiền."],
    ["Isn't the store open on Sundays?", ["Only in the afternoon.", "I bought some groceries.", "Store it in the cabinet."], 0,
      "Câu hỏi phủ định → 'Only in the afternoon' (có mở, chỉ buổi chiều). (C) bẫy 'store' (động từ: cất giữ)."],
    ["Let's review the budget before the meeting.", ["That's a good idea.", "It was over budget.", "I'll meet you there."], 0,
      "Lời đề nghị 'Let's...' → đồng ý: 'That's a good idea'."],
    ["Have you finished the sales report yet?", ["The sale ends tomorrow.", "I'm still waiting for some figures.", "Yes, it was reported."], 1,
      "Trả lời gián tiếp: 'Tôi vẫn đang chờ số liệu' → ngụ ý chưa xong. (A) bẫy 'sale'; (C) bẫy 'report'."],
    ["Where should I submit my travel expenses?", ["Didn't you get the new form?", "It was an expensive trip.", "Next Tuesday."], 0,
      "Trả lời bằng câu hỏi ngược lại – dạng phổ biến từ 2019: 'Bạn chưa nhận mẫu đơn mới à?' (ngụ ý quy trình đã thay đổi)."],
    ["Why don't we hold the training session online?", ["Some staff don't have reliable Internet access.", "It was held last week.", "On the second floor."], 0,
      "'Why don't we...?' là lời đề nghị; câu trả lời đưa lý do phản đối hợp lý."],
    ["What time does the bank close today?", ["At 5 P.M.", "Down the street.", "I need to open an account."], 0,
      "'What time' → giờ cụ thể."],
    ["You've met our new director, haven't you?", ["Yes, at the conference last month.", "The meeting is at ten.", "Direct flights only."], 0,
      "Câu hỏi đuôi → xác nhận: 'Yes, at the conference last month'. (C) bẫy âm 'director – direct'."]
  ];
  P2.forEach((x, i) => window.BANK.push({
    id: "p2-" + (i + 1), part: 2,
    script: [{ s: "M", t: x[0] }],
    questions: [{ q: x[0], o: x[1], a: x[2], e: x[3], audioOptions: true, hideText: true }]
  }));
})();

/* ============================ PART 3 ============================ */
window.BANK.push(
  {
    id: "p3-1", part: 3,
    script: [
      { s: "W", t: "Hi, I'm calling about the apartment for rent on Pine Street. Is it still available?" },
      { s: "M", t: "Yes, it is. It's a two-bedroom unit on the third floor, and the rent is twelve hundred dollars a month." },
      { s: "W", t: "That sounds good. Does the building have parking?" },
      { s: "M", t: "There's a parking garage underneath, but it costs an extra fifty dollars a month. Would you like to come and see the apartment this weekend?" },
      { s: "W", t: "Saturday morning would be perfect." }
    ],
    questions: [
      { q: "Why is the woman calling?", o: ["To report a problem", "To ask about an apartment", "To pay her rent", "To cancel an appointment"], a: 1, e: "'I'm calling about the apartment for rent' → hỏi về căn hộ." },
      { q: "What does the man say about parking?", o: ["It is free for tenants.", "It requires an additional fee.", "It is located across the street.", "It is currently full."], a: 1, e: "'it costs an extra fifty dollars a month' → mất thêm phí." },
      { q: "What will the woman most likely do on Saturday?", o: ["Move into the apartment", "Sign a contract", "View the apartment", "Pay a deposit"], a: 2, e: "Người đàn ông mời đến xem căn hộ cuối tuần, cô ấy chọn sáng thứ Bảy → xem căn hộ." }
    ]
  },
  {
    id: "p3-2", part: 3,
    script: [
      { s: "M", t: "Sandra, have you seen the figures for the new product launch? Sales are much lower than we expected." },
      { s: "W", t: "I saw that. I think the problem is that our advertising campaign started too late. Many customers didn't even know the product was available." },
      { s: "M", t: "You may be right. What do you suggest?" },
      { s: "W", t: "Let's increase our social media advertising this month. I can prepare a proposal and send it to the marketing director by Thursday." }
    ],
    questions: [
      { q: "What problem are the speakers discussing?", o: ["A product is defective.", "Sales are disappointing.", "A shipment is late.", "A budget was cut."], a: 1, e: "'Sales are much lower than we expected' → doanh số đáng thất vọng." },
      { q: "According to the woman, what caused the problem?", o: ["High prices", "Poor product quality", "A late advertising campaign", "A shortage of staff"], a: 2, e: "'our advertising campaign started too late'." },
      { q: "What does the woman offer to do?", o: ["Contact customers directly", "Prepare a proposal", "Lower the price", "Hire a consultant"], a: 1, e: "'I can prepare a proposal and send it to the marketing director'." }
    ]
  },
  {
    id: "p3-3", part: 3,
    script: [
      { s: "W", t: "Good afternoon. I'd like to return this jacket. I bought it last week, but it's too small." },
      { s: "M", t: "I'm sorry to hear that. Do you have your receipt?" },
      { s: "W", t: "Yes, here it is. Actually, I'd rather exchange it for a larger size, if you have one." },
      { s: "M", t: "Let me check. Hmm, we don't have a large in blue right now, but we have it in black." },
      { s: "W", t: "Black is fine. I'll take it." }
    ],
    questions: [
      { q: "Where most likely are the speakers?", o: ["At a clothing store", "At a dry cleaner", "At a post office", "At a factory"], a: 0, e: "Đổi/trả áo khoác, kiểm tra size → cửa hàng quần áo." },
      { q: "What does the man ask for?", o: ["A credit card", "A receipt", "A phone number", "An order form"], a: 1, e: "'Do you have your receipt?'" },
      { q: "What does the woman decide to do?", o: ["Get a refund", "Wait for a new shipment", "Take an item in a different color", "Order online"], a: 2, e: "Không còn size lớn màu xanh, cô chọn màu đen → lấy sản phẩm màu khác." }
    ]
  },
  {
    id: "p3-4", part: 3,
    script: [
      { s: "M", t: "Hi Rachel, the conference organizers just called. The keynote speaker's flight was canceled, so she won't arrive until Friday afternoon." },
      { s: "W", t: "But her talk is scheduled for Friday morning. That's a problem." },
      { s: "M", t: "Exactly. I was thinking we could switch her session with the panel discussion in the afternoon." },
      { s: "W", t: "That should work. I'll update the online schedule and send an e-mail to all registered attendees." }
    ],
    questions: [
      { q: "What is the problem?", o: ["A venue is unavailable.", "A speaker will arrive late.", "Registration numbers are low.", "A panel was canceled."], a: 1, e: "Chuyến bay bị hủy, diễn giả sẽ đến muộn (chiều thứ Sáu)." },
      { q: "What does the man suggest?", o: ["Finding another speaker", "Canceling the conference", "Changing the order of sessions", "Booking a new flight"], a: 2, e: "'switch her session with the panel discussion' → đổi thứ tự các phiên." },
      { q: "What will the woman do next?", o: ["Call the speaker", "Update a schedule", "Reserve a room", "Print name tags"], a: 1, e: "'I'll update the online schedule and send an e-mail'." }
    ]
  }
);

/* ============================ PART 4 ============================ */
window.BANK.push(
  {
    id: "p4-1", part: 4,
    script: [
      { s: "N", t: "Attention, shoppers. Thank you for shopping at Valley Mart. Today only, all fresh fruit and vegetables are thirty percent off. In addition, customers who spend more than fifty dollars will receive a free reusable shopping bag at the checkout. Don't forget to visit our new bakery section near the entrance, where you can sample our freshly baked bread. Valley Mart will close at nine P.M. tonight." }
    ],
    questions: [
      { q: "Where is the announcement being made?", o: ["At a bakery", "At a supermarket", "At a farm", "At a restaurant"], a: 1, e: "'Attention, shoppers... Valley Mart', bán rau quả, quầy thanh toán → siêu thị." },
      { q: "How can customers receive a free item?", o: ["By spending over fifty dollars", "By signing up for a membership", "By visiting the bakery", "By shopping before noon"], a: 0, e: "'customers who spend more than fifty dollars will receive a free reusable shopping bag'." },
      { q: "What are listeners invited to do?", o: ["Fill out a survey", "Try some bread", "Attend a cooking class", "Use a new parking lot"], a: 1, e: "'sample our freshly baked bread' → nếm thử bánh mì." }
    ]
  },
  {
    id: "p4-2", part: 4,
    script: [
      { s: "N", t: "Hello, this message is for Mr. Thomas Grant. This is Emily from Dr. Hassan's dental office. I'm calling to remind you of your appointment tomorrow at ten thirty A.M. Please arrive fifteen minutes early to complete some paperwork, since this is your first visit. Also, please bring your insurance card. If you need to reschedule, call us at five five five, three four one two. Thank you." }
    ],
    questions: [
      { q: "What is the purpose of the call?", o: ["To cancel an appointment", "To confirm an upcoming appointment", "To request a payment", "To offer a job"], a: 1, e: "'I'm calling to remind you of your appointment tomorrow' → nhắc lịch hẹn sắp tới." },
      { q: "Why should the listener arrive early?", o: ["To fill out forms", "To find parking", "To meet the dentist", "To pay a bill"], a: 0, e: "'arrive fifteen minutes early to complete some paperwork' → điền giấy tờ." },
      { q: "What is the listener asked to bring?", o: ["A photo ID", "An insurance card", "A medical report", "A payment receipt"], a: 1, e: "'please bring your insurance card'." }
    ]
  },
  {
    id: "p4-3", part: 4,
    script: [
      { s: "N", t: "Good morning, everyone, and welcome to your first day at Norland Technologies. My name is Greg, and I'm the training coordinator. This morning, we'll start with a tour of the building, including the cafeteria and the fitness center. After that, you'll meet with your department managers. Then, at one o'clock, the IT team will help you set up your computer accounts. Before we begin, please take a name badge from the table by the door." }
    ],
    questions: [
      { q: "Who most likely are the listeners?", o: ["New employees", "Visiting clients", "IT technicians", "Fitness instructors"], a: 0, e: "'welcome to your first day at Norland Technologies' → nhân viên mới." },
      { q: "What will happen at one o'clock?", o: ["A building tour", "A lunch break", "Computer accounts will be set up", "A meeting with managers"], a: 2, e: "'at one o'clock, the IT team will help you set up your computer accounts'." },
      { q: "What are listeners asked to do first?", o: ["Sign a form", "Pick up a name badge", "Visit the cafeteria", "Log in to a computer"], a: 1, e: "'Before we begin, please take a name badge from the table by the door'." }
    ]
  }
);
