/*
 * Ngân hàng câu hỏi LISTENING (Part 1–4) – bám theo format đề TOEIC L&R hiện hành (ETS/IIBC):
 *  - Part 1 (6 câu/đề): 1 bức ảnh, 4 câu mô tả CHỈ ĐƯỢC ĐỌC, không in trong đề.
 *  - Part 2 (25 câu/đề): câu hỏi + 3 câu trả lời CHỈ ĐƯỢC ĐỌC, không in.
 *  - Part 3 (39 câu/đề, 13 đoạn): hội thoại 2 hoặc 3 người; câu hỏi + 4 đáp án ĐƯỢC IN và cũng được đọc.
 *    Có câu hỏi hàm ý ("What does the man mean when he says ...?") và câu hỏi kèm biểu đồ ("Look at the graphic").
 *  - Part 4 (30 câu/đề, 10 bài nói): 1 người nói; cũng có câu hỏi hàm ý & biểu đồ.
 *  - Mọi nội dung nghe chỉ phát MỘT lần trong đề thật.
 *
 * Âm thanh: giọng đọc tổng hợp (Web Speech API), luân phiên giọng Mỹ / Anh / Úc / Canada nếu máy có.
 * script: [{s, t}] với s = 'M' | 'W' | 'M2' | 'W2' (người nói), 'N' = người dẫn chương trình.
 * Ảnh Part 1: Wikimedia Commons, giấy phép tự do – xem assets/p1/CREDITS.md.
 */
window.BANK = window.BANK || [];

/* ============================ PART 1 ============================ */
(function () {
  const C = (artist, license, file) => ({ artist, license, link: "https://commons.wikimedia.org/wiki/File:" + file });
  const P1 = [
    ["p1-01", C("Shixart1985", "CC BY 2.0", "Woman_stretches_at_home_office_desk_while_working_on_laptop.jpg"),
      ["She's hanging a clock on the wall.", "She's stretching her arms above her head.", "She's closing a laptop computer.", "She's arranging some flowers in a vase."], 1,
      "Người phụ nữ đang vươn hai tay lên trên đầu → 'stretching her arms above her head'. Bẫy: đồng hồ, laptop, bình hoa đều CÓ trong ảnh nhưng hành động (treo, gập máy, cắm hoa) thì không."],
    ["p1-02", C("Shixart1985", "CC BY 2.0", "Elderly_woman_sitting_at_her_office_table_and_holding_a_cup_of_coffee_while_working_on_her_laptop._Croissant_and_a_donut_on_the_trays_next_to_her.jpg"),
      ["She's pouring coffee into a cup.", "She's eating a pastry.", "She's holding a cup in one hand.", "She's putting on her glasses."], 2,
      "Cô ấy đang cầm cốc bằng một tay → 'holding a cup'. Bẫy: có cốc nhưng không rót (pouring); có bánh sừng bò nhưng không ăn."],
    ["p1-03", C("Goterrestrial", "CC BY 4.0", "Container_loading_with_forklift_at_warehouse_in_Thailand.jpg"),
      ["A truck is being repaired in a garage.", "A forklift is being used to load a container.", "Some workers are unloading a ship.", "Boxes are stacked along a sidewalk."], 1,
      "Xe nâng đang chất hàng vào container trên xe tải → bị động tiếp diễn 'is being used to load'. Không có tàu thủy, không phải ga-ra sửa xe."],
    ["p1-04", C("Axisadman", "CC BY-SA 3.0", "Modern_warehouse_with_pallet_rack_storage_system.jpg"),
      ["Shelves are stocked with boxes.", "A worker is climbing a ladder.", "Boxes are being loaded onto a truck.", "The warehouse floor is being painted."], 0,
      "Nhà kho với các kệ cao chất đầy thùng hàng → 'Shelves are stocked with boxes' (trạng thái). Không thấy ai leo thang hay xe tải."],
    ["p1-05", C("U.S. Department of Defense", "Public domain", "Deputy_Secretary_of_Defense_Kathleen_Hicks_greets_members_of_the_Defense_Business_Board_during_a_meeting_at_the_Pentagon,_Washington,_D.C.,_August_2,_2023_-_230802-D-PM193-1011.jpg"),
      ["A woman is standing at a podium.", "Name tags are being printed.", "Some people are seated at a long table.", "Chairs are stacked against a wall."], 2,
      "Nhiều người đang ngồi quanh một bàn họp dài → 'seated at a long table'. Bảng tên đã đặt sẵn trên bàn, không phải 'đang được in'."],
    ["p1-06", C("Alexas Fotos", "CC0", "Meeting_Table.png"),
      ["People are having a meeting.", "A tablecloth is being spread.", "Some plants are being watered.", "Chairs have been placed along both sides of a table."], 3,
      "Ảnh KHÔNG có người → loại mọi câu có người hoặc 'being + V3' (cần người thực hiện). Ghế đã được xếp dọc hai bên bàn → hiện tại hoàn thành bị động."],
    ["p1-07", C("Wolfmann", "CC BY-SA 4.0", "Extra_Coop_supermarket,_Bergen_Storsenter,_Norway_2017-11-01_cashier_checkout_a.jpg"),
      ["Customers are waiting in line outside a store.", "A cashier is working at a checkout counter.", "Checkout counters are being installed.", "Shopping carts are lined up at an entrance."], 1,
      "Nhân viên áo đỏ đang ngồi ở quầy tính tiền → 'A cashier is working at a checkout counter'. Không có ai xếp hàng bên ngoài, không có xe đẩy."],
    ["p1-08", C("Andy Li", "CC0", "Passengers_waiting_for_the_first_train_of_the_day_at_Bishops_Lydeard_station_2025-07-27.jpg"),
      ["A train is crossing a bridge.", "Passengers are getting off a bus.", "A crowd has gathered beside a train.", "People are buying tickets at a counter."], 2,
      "Đám đông đứng trên sân ga cạnh đoàn tàu → 'A crowd has gathered beside a train'. Bẫy: 'bus' (không phải tàu), 'bridge'."],
    ["p1-09", C("ItzANormalFioko", "CC BY-SA 4.0", "Bicycles_parked_at_bicycle_rack_in_front_of_building_and_shops.jpg"),
      ["Some bicycles are being repaired.", "Two bicycles have been parked next to a building.", "Cyclists are riding down a street.", "A door is being painted."], 1,
      "Hai chiếc xe đạp đậu sát tường tòa nhà, không có người → 'have been parked'. Không ai đang sửa hay đạp xe."],
    ["p1-10", C("Shixart1985", "CC BY 2.0", "Chef_prepares_fresh_ingredients_by_chopping_red_vegetables.jpg"),
      ["A man is washing some plates.", "Food is being served in a bowl.", "A man is sharpening a knife.", "Someone is chopping food on a cutting board."], 3,
      "Hai bàn tay đang băm thực phẩm trên thớt gỗ → 'chopping food on a cutting board'. Bẫy: có dao nhưng không mài (sharpening); có đĩa nhưng không rửa."],
    ["p1-11", C("Retired electrician", "CC0", "Moscow,_Bolotnaya_Embankment,_sandblasting_granite,_Aug_2026_01.jpg"),
      ["A man is swimming in a river.", "A worker is hanging against the side of a wall.", "A ladder is lying on the ground.", "A fence is being taken down."], 1,
      "Một công nhân đeo dây đai treo mình sát bức tường đá → 'hanging against the side of a wall'. Thang đang dựng/treo, không 'nằm trên mặt đất'."],
    ["p1-12", C("Bill Bradford", "CC BY 2.0", "Passengers_waiting_on_the_Houston_station_platform,_February_2005.jpg"),
      ["A train is pulling into the station.", "Workers are repairing the tracks.", "Some people are standing on a platform.", "Passengers are boarding a train."], 2,
      "Hai người đứng trên sân ga, đường ray trống → 'standing on a platform'. Không có tàu đang vào ga hay khách đang lên tàu."],
    ["p1-13", C("Adam Jones", "CC BY-SA 2.0", "Woman_Watering_Plants_-_Uzhhorod_-_Ukraine_(36491904991)_(2).jpg"),
      ["A woman is tending some plants.", "A woman is hanging a sign.", "Some barrels are being rolled down a street.", "A woman is paying for some groceries."], 0,
      "Người phụ nữ đang chăm sóc chậu cây đặt trên thùng gỗ → 'tending some plants'. Bẫy: có biển hiệu, có thùng gỗ nhưng không ai treo biển hay lăn thùng."]
  ];
  P1.forEach((x, i) => window.BANK.push({
    id: "p1-" + (i + 1), part: 1,
    img: { src: "assets/p1/" + x[0] + ".jpg", credit: x[1] },
    script: [],
    questions: [{ q: "Look at the picture. Choose the statement that best describes it.", o: x[2], a: x[3], e: x[4], audioOptions: true, hideText: true }]
  }));
})();

/* ============================ PART 2 ============================ */
(function () {
  const P2 = [
    ["Where is the nearest post office?", ["It's two blocks from here.", "At three o'clock.", "Yes, I sent it yesterday."], 0,
      "Câu hỏi 'Where' → trả lời địa điểm. (B) trả lời 'When'; (C) trả lời Yes/No – không dùng cho câu hỏi Wh-."],
    ["When does the meeting start?", ["In the conference room.", "Right after lunch.", "Mr. Brown will lead it."], 1,
      "Câu hỏi 'When' → thời gian: 'Right after lunch'. (A) trả lời Where; (C) trả lời Who."],
    ["Who's in charge of the new project?", ["It's due next Friday.", "Ms. Lee is.", "A very interesting project."], 1,
      "Câu hỏi 'Who' → người: 'Ms. Lee is'. (C) lặp lại từ 'project' – bẫy lặp từ rất hay gặp."],
    ["Why was the flight delayed?", ["Because of bad weather.", "Gate 12.", "About two hours."], 0,
      "Câu hỏi 'Why' → lý do: 'Because of bad weather'. (C) trả lời 'How long'."],
    ["How often do you visit the main office?", ["By train.", "Once a month.", "For three days."], 1,
      "'How often' → tần suất: 'Once a month'. (A) trả lời How (phương tiện); (C) trả lời How long."],
    ["Would you like some more coffee?", ["Yes, I'd love some.", "It's in the kitchen.", "I like it very much."], 0,
      "Lời mời 'Would you like...?' → nhận lời/từ chối: 'Yes, I'd love some'."],
    ["Didn't you receive my e-mail?", ["The mail carrier came at noon.", "No, I haven't checked my inbox yet.", "I'll send it to you."], 1,
      "Câu hỏi phủ định → trả lời như câu hỏi thường: 'No, I haven't checked...'. (A) bẫy âm 'mail'."],
    ["Should we take a taxi or walk to the restaurant?", ["Yes, I took one.", "It's close enough to walk.", "The food was great."], 1,
      "Câu hỏi lựa chọn (A or B) → chọn một phương án; không trả lời Yes/No."],
    ["Can you help me move these boxes?", ["Sure, where should I put them?", "They're from the supplier.", "I moved last year."], 0,
      "Lời nhờ 'Can you...?' → đồng ý 'Sure' rồi hỏi thêm. (C) bẫy lặp từ 'move'."],
    ["The printer on the third floor is out of order.", ["I'll call the technician.", "Three copies, please.", "In alphabetical order."], 0,
      "Câu trần thuật nêu vấn đề → phản hồi bằng giải pháp. (C) bẫy từ 'order'."],
    ["Which hotel are you staying at?", ["For two nights.", "The one near the convention center.", "Yes, it was comfortable."], 1,
      "'Which hotel' → 'The one near...' (cấu trúc 'the one' rất hay gặp)."],
    ["Who's going to pick up the clients from the airport?", ["I thought Kevin was.", "At terminal B.", "They're very important clients."], 0,
      "Trả lời gián tiếp 'I thought Kevin was' – dạng trả lời vòng rất phổ biến trong đề mới."],
    ["How much does it cost to rent a car?", ["About fifty dollars a day.", "A red one.", "At the rental counter."], 0,
      "'How much' → giá tiền."],
    ["Isn't the store open on Sundays?", ["Only in the afternoon.", "I bought some groceries.", "Store it in the cabinet."], 0,
      "Câu hỏi phủ định → 'Only in the afternoon' (có mở, chỉ buổi chiều). (C) bẫy 'store' (động từ: cất giữ)."],
    ["Let's review the budget before the meeting.", ["That's a good idea.", "It was over budget.", "I'll meet you there."], 0,
      "Lời đề nghị 'Let's...' → đồng ý: 'That's a good idea'."],
    ["Have you finished the sales report yet?", ["The sale ends tomorrow.", "I'm still waiting for some figures.", "Yes, it was reported."], 1,
      "Trả lời gián tiếp 'Tôi vẫn đang chờ số liệu' → ngụ ý chưa xong. (A) bẫy 'sale'; (C) bẫy 'report'."],
    ["Where should I submit my travel expenses?", ["Didn't you get the new form?", "It was an expensive trip.", "Next Tuesday."], 0,
      "Trả lời bằng một câu hỏi ngược lại – dạng phổ biến từ 2019: 'Bạn chưa nhận mẫu đơn mới à?'."],
    ["Why don't we hold the training session online?", ["Some staff don't have reliable Internet access.", "It was held last week.", "On the second floor."], 0,
      "'Why don't we...?' là LỜI ĐỀ NGHỊ (không hỏi lý do); đáp án nêu lý do phản đối hợp lý."],
    ["What time does the bank close today?", ["At 5 P.M.", "Down the street.", "I need to open an account."], 0,
      "'What time' → giờ cụ thể."],
    ["You've met our new director, haven't you?", ["Yes, at the conference last month.", "The meeting is at ten.", "Direct flights only."], 0,
      "Câu hỏi đuôi → xác nhận: 'Yes, at the conference...'. (C) bẫy âm 'director – direct'."],
    ["Where can I find the updated price list?", ["Ms. Wong just e-mailed it to everyone.", "Prices went up last month.", "A list of ten items."], 0,
      "Không nói địa điểm trực tiếp nhưng cho biết cách lấy (đã gửi e-mail) → trả lời gián tiếp. (B) bẫy 'price', (C) bẫy 'list'."],
    ["Who approved the travel budget?", ["By plane.", "The finance director did.", "About two thousand dollars."], 1,
      "'Who' → người: 'The finance director did'."],
    ["Would you mind closing the window?", ["It's a nice view.", "I closed the deal.", "Not at all."], 2,
      "'Would you mind...?' → đồng ý là 'Not at all / No problem' (nghĩa: không phiền). (B) bẫy 'close'."],
    ["When will the new printer be installed?", ["On the second floor.", "The technician is coming on Monday.", "Black and white copies."], 1,
      "'When' → thời điểm, trả lời gián tiếp qua lịch kỹ thuật viên đến."],
    ["Why don't you join us for lunch?", ["Because it's delicious.", "At the Italian restaurant.", "I'd love to, but I have a meeting."], 2,
      "'Why don't you...?' là lời mời → nhận/từ chối. (A) bẫy 'Because' – người học hay chọn nhầm vì câu bắt đầu bằng 'Why'."]
  ];
  P2.forEach((x, i) => window.BANK.push({
    id: "p2-" + (i + 1), part: 2,
    script: [{ s: "Q", t: x[0] }],
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
      { q: "What does the man say about parking?", o: ["It is free for tenants.", "It requires an additional fee.", "It is located across the street.", "It is currently full."], a: 1, e: "'it costs an extra fifty dollars a month' → mất thêm phí (paraphrase: extra → additional fee)." },
      { q: "What will the woman most likely do on Saturday?", o: ["Move into the apartment", "Sign a contract", "View the apartment", "Pay a deposit"], a: 2, e: "Được mời đến xem căn hộ cuối tuần, cô chọn sáng thứ Bảy → xem căn hộ." }
    ]
  },
  {
    id: "p3-2", part: 3,
    script: [
      { s: "M", t: "Sandra, have you seen the figures for the new product launch? Sales are much lower than we expected." },
      { s: "W", t: "I saw that. I think the problem is that our advertising campaign started too late. A lot of customers didn't even know the product was available." },
      { s: "M", t: "You may be right. What do you suggest?" },
      { s: "W", t: "Let's increase our social media advertising this month. I can put together a proposal and send it to the marketing director by Thursday." }
    ],
    questions: [
      { q: "What problem are the speakers discussing?", o: ["A product is defective.", "Sales are disappointing.", "A shipment is late.", "A budget was cut."], a: 1, e: "'Sales are much lower than we expected' → doanh số đáng thất vọng." },
      { q: "According to the woman, what caused the problem?", o: ["High prices", "Poor product quality", "A late advertising campaign", "A shortage of staff"], a: 2, e: "'our advertising campaign started too late'." },
      { q: "What does the woman offer to do?", o: ["Contact customers directly", "Prepare a proposal", "Lower a price", "Hire a consultant"], a: 1, e: "'I can put together a proposal' (put together = prepare)." }
    ]
  },
  {
    id: "p3-3", part: 3,
    script: [
      { s: "W", t: "Good afternoon. I'd like to return this jacket. I bought it last week, but it's too small." },
      { s: "M", t: "I'm sorry to hear that. Do you have your receipt?" },
      { s: "W", t: "Yes, here it is. Actually, I'd rather exchange it for a larger size, if you have one." },
      { s: "M", t: "Let me check. Hmm, we don't have a large in blue right now, but we have one in black." },
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
      { s: "M", t: "Hi, Rachel. The conference organizers just called. The keynote speaker's flight was canceled, so she won't arrive until Friday afternoon." },
      { s: "W", t: "But her talk is scheduled for Friday morning." },
      { s: "M", t: "Exactly. I was thinking we could switch her session with the panel discussion in the afternoon." },
      { s: "W", t: "That should work. I'll update the online schedule and send an e-mail to all registered attendees." }
    ],
    questions: [
      { q: "What is the problem?", o: ["A venue is unavailable.", "A speaker will arrive late.", "Registration numbers are low.", "A panel was canceled."], a: 1, e: "Chuyến bay bị hủy, diễn giả chỉ đến được chiều thứ Sáu." },
      { q: "What does the man suggest?", o: ["Finding another speaker", "Canceling the conference", "Changing the order of two sessions", "Booking a new flight"], a: 2, e: "'switch her session with the panel discussion' → đổi thứ tự hai phiên." },
      { q: "What will the woman do next?", o: ["Call the speaker", "Update a schedule", "Reserve a room", "Print name tags"], a: 1, e: "'I'll update the online schedule'." }
    ]
  },
  {
    // Hội thoại 3 người + câu hỏi hàm ý
    id: "p3-5", part: 3, speakers: 3,
    script: [
      { s: "W", t: "Daniel, Mark, have you two had a chance to look at the floor plans for the new office?" },
      { s: "M", t: "I have. I like that the design team put the break room right next to the windows." },
      { s: "M2", t: "Me too. But I'm worried there aren't enough meeting rooms. We have over sixty employees now." },
      { s: "W", t: "Well, the lease doesn't start until April." },
      { s: "M", t: "Then we still have time to ask the architect for changes. I'll call her this afternoon." },
      { s: "M2", t: "Good. And could you also ask about adding more electrical outlets in the open work area?" }
    ],
    questions: [
      { q: "What are the speakers mainly discussing?", o: ["Hiring new employees", "Plans for a new office", "A company anniversary", "A rental payment"], a: 1, e: "Cả ba bàn về bản vẽ mặt bằng (floor plans) của văn phòng mới." },
      { q: "Why does the woman say, \"the lease doesn't start until April\"?", o: ["To explain why a move was delayed", "To complain about a rental cost", "To suggest that changes are still possible", "To correct a mistake in a schedule"], a: 2, e: "Câu hỏi HÀM Ý: ngay sau đó Daniel nói 'Then we still have time to ask the architect for changes' → ý cô ấy là vẫn còn kịp thay đổi thiết kế." },
      { q: "What will Daniel do this afternoon?", o: ["Contact an architect", "Visit the new building", "Order some furniture", "Install some outlets"], a: 0, e: "'I'll call her this afternoon' – 'her' = the architect. Daniel là người được gọi tên đầu tiên và nói câu này." }
    ]
  },
  {
    // Câu hỏi hàm ý
    id: "p3-6", part: 3,
    script: [
      { s: "M", t: "Excuse me. I ordered the grilled salmon about forty minutes ago, and it still hasn't come out." },
      { s: "W", t: "I'm so sorry, sir. We're very short-staffed tonight. Two of our cooks called in sick." },
      { s: "M", t: "I see. Well, I have a train to catch at eight thirty." },
      { s: "W", t: "Let me check with the kitchen right away. And your dessert will be on the house tonight." }
    ],
    questions: [
      { q: "Where does the conversation most likely take place?", o: ["At a train station", "At a restaurant", "At a grocery store", "At a fish market"], a: 1, e: "Gọi món cá hồi nướng, đầu bếp, món tráng miệng → nhà hàng." },
      { q: "Why does the man say, \"I have a train to catch at eight thirty\"?", o: ["To ask for directions to a station", "To explain why he will arrive late", "To indicate that he is in a hurry", "To request a takeout container"], a: 2, e: "Câu hỏi HÀM Ý: món ăn ra chậm + anh ấy có chuyến tàu lúc 8:30 → ngụ ý anh đang vội." },
      { q: "What does the woman offer the man?", o: ["A discount on his meal", "A free dessert", "A ride to the station", "A different table"], a: 1, e: "'your dessert will be on the house' = món tráng miệng miễn phí." }
    ]
  },
  {
    // Câu hỏi biểu đồ
    id: "p3-7", part: 3,
    graphic: `<table class="gtable"><caption>Grand Plaza Hotel – Airport Shuttle</caption>
      <tr><th>Departs Hotel</th><th>Arrives Airport</th></tr>
      <tr><td>7:00 A.M.</td><td>7:45 A.M.</td></tr>
      <tr><td>8:30 A.M.</td><td>9:15 A.M.</td></tr>
      <tr><td>10:00 A.M.</td><td>10:45 A.M.</td></tr>
      <tr><td>11:30 A.M.</td><td>12:15 P.M.</td></tr></table>`,
    script: [
      { s: "W", t: "Good morning. I'm checking out today, and I need to get to the airport. My flight leaves at twelve fifteen." },
      { s: "M", t: "Is it an international flight? If so, you'll want to be there at least two hours early." },
      { s: "W", t: "Yes, it is. So I should take the last shuttle that gets me there before ten fifteen." },
      { s: "M", t: "That's right. Is there anything else I can help you with?" },
      { s: "W", t: "Actually, could I leave my suitcase here until then? I'd like to have breakfast first." },
      { s: "M", t: "Of course. I'll give you a claim ticket." }
    ],
    questions: [
      { q: "Who most likely is the man?", o: ["A flight attendant", "A taxi driver", "A hotel clerk", "A travel agent"], a: 2, e: "Khách trả phòng (checking out), xe đưa đón của khách sạn, giữ hành lý → nhân viên lễ tân khách sạn." },
      { q: "Look at the graphic. Which shuttle will the woman most likely take?", o: ["The 7:00 A.M. shuttle", "The 8:30 A.M. shuttle", "The 10:00 A.M. shuttle", "The 11:30 A.M. shuttle"], a: 1, e: "Câu hỏi BIỂU ĐỒ: cần đến sân bay trước 10:15 → chuyến cuối cùng đến kịp là chuyến đến lúc 9:15, tức khởi hành 8:30." },
      { q: "What does the woman ask about?", o: ["Changing her flight", "Storing her luggage", "Ordering room service", "Extending her stay"], a: 1, e: "'could I leave my suitcase here until then?' → gửi hành lý." }
    ]
  },
  {
    // Câu hỏi biểu đồ
    id: "p3-8", part: 3,
    graphic: `<table class="gtable"><caption>Harmon Building – Directory</caption>
      <tr><th>Floor</th><th>Department</th></tr>
      <tr><td>4</td><td>Human Resources</td></tr>
      <tr><td>3</td><td>Marketing</td></tr>
      <tr><td>2</td><td>Accounting</td></tr>
      <tr><td>1</td><td>Reception / Café</td></tr></table>`,
    script: [
      { s: "M", t: "Hi, I have a job interview with Ms. Clark at ten o'clock. Could you tell me where to go?" },
      { s: "W", t: "Sure. Ms. Clark is in Human Resources. Oh, but the H R team moved down one floor last week while their offices are being renovated. They're sharing space with another department for now." },
      { s: "M", t: "Thanks. Is there an elevator I can take?" },
      { s: "W", t: "It's just past the café, but it's really slow in the mornings. The stairs to your left might be faster." }
    ],
    questions: [
      { q: "Why is the man visiting the building?", o: ["To make a delivery", "To attend a job interview", "To repair an elevator", "To meet a client for lunch"], a: 1, e: "'I have a job interview with Ms. Clark'." },
      { q: "Look at the graphic. Which floor will the man go to?", o: ["Floor 1", "Floor 2", "Floor 3", "Floor 4"], a: 2, e: "Câu hỏi BIỂU ĐỒ: phòng Nhân sự (tầng 4) đã chuyển xuống MỘT tầng → tầng 3." },
      { q: "What does the woman say about the elevator?", o: ["It is out of order.", "It is slow in the mornings.", "It requires a key card.", "It is being renovated."], a: 1, e: "'it's really slow in the mornings'." }
    ]
  },
  {
    // Hội thoại 3 người
    id: "p3-9", part: 3, speakers: 3,
    script: [
      { s: "M", t: "Thanks for meeting with us, Ms. Ortiz. As you know, we're looking for a caterer for our company's annual awards dinner." },
      { s: "W", t: "Happy to help. How many guests are you expecting?" },
      { s: "W2", t: "About one hundred and fifty. And quite a few of them have asked for vegetarian options." },
      { s: "W", t: "That's no problem. We have a full vegetarian menu. I'll e-mail you some sample menus with prices this afternoon." },
      { s: "M", t: "Great. Could you also include the cost of renting tables and chairs? Our venue doesn't provide them." }
    ],
    questions: [
      { q: "Who most likely is Ms. Ortiz?", o: ["A hotel manager", "A caterer", "An event speaker", "A furniture designer"], a: 1, e: "'we're looking for a caterer' + Ms. Ortiz nói 'We have a full vegetarian menu' → cô ấy là bên cung cấp dịch vụ ăn uống." },
      { q: "What does the second woman mention about the guests?", o: ["Some want vegetarian meals.", "Many will arrive late.", "Most are new employees.", "They will receive awards."], a: 0, e: "'quite a few of them have asked for vegetarian options'." },
      { q: "What does the man ask Ms. Ortiz to include?", o: ["A list of guests", "Directions to the venue", "Prices for renting furniture", "Photos of past events"], a: 2, e: "'include the cost of renting tables and chairs' → giá thuê bàn ghế (furniture)." }
    ]
  }
);

/* ============================ PART 4 ============================ */
window.BANK.push(
  {
    id: "p4-1", part: 4,
    script: [{ s: "W", t: "Attention, shoppers. Thank you for shopping at Valley Mart. Today only, all fresh fruit and vegetables are thirty percent off. In addition, customers who spend more than fifty dollars will receive a free reusable shopping bag at the checkout. Don't forget to visit our new bakery section near the entrance, where you can sample our freshly baked bread. Valley Mart will close at nine P.M. tonight." }],
    questions: [
      { q: "Where is the announcement being made?", o: ["At a bakery", "At a supermarket", "At a farm", "At a restaurant"], a: 1, e: "'Attention, shoppers', rau quả giảm giá, quầy thanh toán → siêu thị." },
      { q: "How can customers receive a free item?", o: ["By spending over fifty dollars", "By signing up for a membership", "By visiting the bakery", "By shopping before noon"], a: 0, e: "'customers who spend more than fifty dollars will receive a free reusable shopping bag'." },
      { q: "What are listeners invited to do?", o: ["Fill out a survey", "Try some bread", "Attend a cooking class", "Use a new parking lot"], a: 1, e: "'sample our freshly baked bread' → nếm thử bánh mì (sample = try)." }
    ]
  },
  {
    id: "p4-2", part: 4,
    script: [{ s: "W", t: "Hello, this message is for Mr. Thomas Grant. This is Emily from Doctor Hassan's dental office. I'm calling to remind you of your appointment tomorrow at ten thirty A.M. Since this is your first visit, please arrive fifteen minutes early to complete some paperwork. Also, please bring your insurance card. If you need to reschedule, call us at five five five, three four one two. Thank you." }],
    questions: [
      { q: "What is the purpose of the call?", o: ["To cancel an appointment", "To confirm an upcoming appointment", "To request a payment", "To offer a job"], a: 1, e: "'I'm calling to remind you of your appointment tomorrow' → nhắc lịch hẹn." },
      { q: "Why should the listener arrive early?", o: ["To fill out forms", "To find parking", "To meet the dentist", "To pay a bill"], a: 0, e: "'arrive fifteen minutes early to complete some paperwork' → điền giấy tờ (paperwork = forms)." },
      { q: "What is the listener asked to bring?", o: ["A photo ID", "An insurance card", "A medical report", "A payment receipt"], a: 1, e: "'please bring your insurance card'." }
    ]
  },
  {
    id: "p4-3", part: 4,
    script: [{ s: "M", t: "Good morning, everyone, and welcome to your first day at Norland Technologies. My name is Greg, and I'm the training coordinator. This morning, we'll start with a tour of the building, including the cafeteria and the fitness center. After that, you'll meet with your department managers. Then, at one o'clock, the I T team will help you set up your computer accounts. Before we begin, please take a name badge from the table by the door." }],
    questions: [
      { q: "Who most likely are the listeners?", o: ["New employees", "Visiting clients", "I.T. technicians", "Fitness instructors"], a: 0, e: "'welcome to your first day at Norland Technologies' → nhân viên mới." },
      { q: "What will happen at one o'clock?", o: ["A building tour", "A lunch break", "Computer accounts will be set up.", "A meeting with managers"], a: 2, e: "'at one o'clock, the I.T. team will help you set up your computer accounts'." },
      { q: "What are listeners asked to do first?", o: ["Sign a form", "Pick up a name badge", "Visit the cafeteria", "Log in to a computer"], a: 1, e: "'Before we begin, please take a name badge'." }
    ]
  },
  {
    // Câu hỏi hàm ý
    id: "p4-4", part: 4,
    script: [{ s: "W", t: "Before we finish today's meeting, I want to talk about the results of our customer survey. Overall, customers are happy with our products. However, many of them complained about how long it takes to get a reply from our support team. Some waited more than three days. Now, I know we've all been busy with the product launch. But three days is three days. So, starting next week, we'll be adding an online chat service so customers can get answers right away. Jenna from the I T department will give us a short demonstration on Friday." }],
    questions: [
      { q: "What did customers complain about?", o: ["Product prices", "Slow responses from support staff", "Damaged packaging", "A confusing Web site"], a: 1, e: "'complained about how long it takes to get a reply from our support team'." },
      { q: "What does the speaker imply when she says, \"But three days is three days\"?", o: ["The survey took three days to complete.", "She needs three days to make a decision.", "The delay is unacceptable regardless of the reason.", "The product launch was three days late."], a: 2, e: "Câu hỏi HÀM Ý: cô thừa nhận mọi người bận ('I know we've all been busy'), NHƯNG chờ 3 ngày vẫn là quá lâu → không thể chấp nhận dù có lý do." },
      { q: "What will happen on Friday?", o: ["A new service will be demonstrated.", "A survey will be sent to customers.", "A product will be launched.", "New staff will be hired."], a: 0, e: "'Jenna ... will give us a short demonstration on Friday' (về dịch vụ chat trực tuyến)." }
    ]
  },
  {
    // Câu hỏi biểu đồ
    id: "p4-5", part: 4,
    graphic: `<table class="gtable"><caption>Greenville – 4-Day Forecast</caption>
      <tr><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr>
      <tr><td>🌧️<br>Heavy rain</td><td>☁️<br>Cloudy</td><td>☀️<br>Sunny</td><td>☀️<br>Sunny</td></tr></table>`,
    script: [{ s: "M", t: "Hello, everyone. This is Paul Lin from the Greenville Parks Department with an update on the community clean-up event. As you know, it was originally scheduled for this Tuesday. But the forecast is calling for heavy rain that day, so we've decided to move the event to the first sunny day after that. Volunteers should meet at the north entrance of Riverside Park at nine A.M. Gloves and trash bags will be provided, but please bring your own water bottle." }],
    questions: [
      { q: "Who most likely is the speaker?", o: ["A weather reporter", "A city employee", "A park visitor", "A store owner"], a: 1, e: "'Paul Lin from the Greenville Parks Department' → nhân viên của thành phố." },
      { q: "Look at the graphic. On which day will the event most likely be held?", o: ["Tuesday", "Wednesday", "Thursday", "Friday"], a: 2, e: "Câu hỏi BIỂU ĐỒ: dời sang 'ngày nắng đầu tiên sau thứ Ba' → thứ Tư nhiều mây, thứ Năm nắng → thứ Năm." },
      { q: "What are listeners asked to bring?", o: ["Gloves", "Trash bags", "A water bottle", "A lunch"], a: 2, e: "Găng tay và túi rác được phát sẵn ('will be provided'); người nghe cần mang 'your own water bottle'." }
    ]
  },
  {
    // Câu hỏi biểu đồ
    id: "p4-6", part: 4,
    graphic: `<table class="gtable"><caption>Fitwell Gym – Monthly Plans</caption>
      <tr><th>Plan</th><th>Includes</th><th>Price</th></tr>
      <tr><td>Basic</td><td>Gym</td><td>$20</td></tr>
      <tr><td>Plus</td><td>Gym + Pool</td><td>$35</td></tr>
      <tr><td>Premium</td><td>Gym + Pool + Classes</td><td>$50</td></tr>
      <tr><td>Family</td><td>Premium for 4 people</td><td>$80</td></tr></table>`,
    script: [{ s: "W", t: "Hi, this is Rosa from Fitwell Gym, returning your call. You mentioned that you'd like to use our swimming pool, but you're not interested in the group fitness classes. In that case, I'd recommend the plan that includes exactly those facilities. Also, this month we're waiving the registration fee for all new members. If you can stop by before Saturday, I'll be happy to give you a tour of the facility. Just call me back at five five five, zero one four seven." }],
    questions: [
      { q: "Why is the speaker calling?", o: ["To respond to an inquiry", "To cancel a membership", "To announce a new class", "To request a payment"], a: 0, e: "'returning your call' → gọi lại để trả lời yêu cầu/thắc mắc của người nghe." },
      { q: "Look at the graphic. How much will the listener most likely pay per month?", o: ["$20", "$35", "$50", "$80"], a: 1, e: "Câu hỏi BIỂU ĐỒ: muốn dùng hồ bơi nhưng không cần lớp tập nhóm → gói Plus (Gym + Pool) = $35." },
      { q: "What is being offered this month?", o: ["A free personal trainer", "A discount on classes", "No registration fee", "A free swimsuit"], a: 2, e: "'waiving the registration fee' = miễn phí đăng ký." }
    ]
  }
);
