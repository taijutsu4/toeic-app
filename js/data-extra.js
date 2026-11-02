/*
 * Câu hỏi bổ sung, biên soạn mới theo format TOEIC L&R từ 2019.
 * Không sao chép đề ETS hay đề của bên thứ ba. Ảnh Part 1 dùng bộ ảnh tự do đã có.
 * Phần nghe phát bằng giọng đọc của trình duyệt từ script bên dưới.
 */
window.BANK = window.BANK || [];

/* ============================ PART 2 ============================ */
(function () {
  const P2 = [
    ["Where did you put the signed contract?", ["It's in the blue folder on my desk.", "I signed it this morning.", "To the legal department."], 0,
      "Câu hỏi Where hỏi vị trí của hợp đồng. Đáp án đúng chỉ chỗ để ('in the blue folder'). Câu nhắc việc đã ký là bẫy thì/hành động; 'to the legal department' trả lời hướng gửi đi, không phải chỗ đang để.", "wh", 1],
    ["When will the quarterly newsletter go out?", ["By the editor.", "Early next week.", "To all the subscribers."], 1,
      "When hỏi thời điểm. 'Early next week' là mốc thời gian. 'By the editor' trả lời Who; 'to all the subscribers' trả lời Where/Who nhận.", "wh", 1],
    ["Who's taking minutes at the board meeting?", ["The meeting starts at two.", "I asked Priya to do it.", "About twenty pages."], 1,
      "Who hỏi người. 'I asked Priya to do it' là trả lời gián tiếp, chỉ người phụ trách. Hai câu kia trả lời When và How long.", "wh", 2],
    ["Why was the product demonstration postponed?", ["The sample units haven't arrived yet.", "It will be in the showroom.", "The demonstration was impressive."], 0,
      "Why hỏi lý do. Hàng mẫu chưa tới nên buổi demo bị hoãn. Câu còn lại nói địa điểm hoặc khen buổi demo, không giải thích nguyên nhân.", "wh", 2],
    ["How long will the road closure last?", ["Until Friday evening.", "Take the highway instead.", "It's a very busy road."], 0,
      "How long hỏi khoảng thời gian. 'Until Friday evening' là thời hạn. Câu gợi ý đường khác là lời khuyên, không trả lời độ dài.", "wh", 1],
    ["How are we getting to the client's office?", ["The new account manager will join us.", "A driver is picking us up at nine.", "I enjoyed the last visit."], 1,
      "How hỏi cách di chuyển. Có tài xế đón là phương tiện. Câu nhắc người tham gia hoặc chuyến đi cũ không nói cách đi.", "wh", 2],
    ["Which printer should I use for the color brochures?", ["The one in the marketing room.", "About fifty copies.", "They were printed yesterday."], 0,
      "Which hỏi lựa chọn cụ thể. 'The one...' chỉ đúng chiếc máy. Số bản và thì quá khứ là bẫy từ 'print/copies'.", "wh", 1],
    ["What did the client think of the revised proposal?", ["She said it was much clearer.", "By Friday afternoon.", "It's a ten-page document."], 0,
      "What did X think hỏi đánh giá. Khách nói bản sửa dễ hiểu hơn. Thời hạn và độ dài tài liệu không phải ý kiến.", "wh", 2],
    ["Have the name badges been printed yet?", ["The printer is still jammed.", "Yes, she already has a badge.", "At the registration desk."], 0,
      "Câu hỏi Yes/No nhưng đáp án đúng là câu gián tiếp: máy in đang kẹt, nên huy hiệu chưa in xong. Không cần nói thẳng 'No'.", "yn", 3],
    ["Didn't you already submit your timesheet?", ["The extra sheets are on the shelf.", "I sent it yesterday morning.", "I think it's time for a break."], 1,
      "Câu phủ định vẫn trả lời như câu hỏi thường. 'I sent it yesterday morning' = đã nộp. 'Sheets' và 'time' là bẫy phát âm/từ gần nghĩa.", "yn", 2],
    ["Can the workshop be moved to a larger room?", ["I'll check with the facilities team.", "The workshop was very useful.", "Room service is available all night."], 0,
      "Lời nhờ/hỏi khả năng. 'I'll check...' là nhận xử lý, không khẳng định ngay. 'Room service' bẫy từ room.", "yn", 2],
    ["The cafeteria is closed for renovations, isn't it?", ["I usually eat lunch there.", "Yes, it reopens on Monday.", "The renovation looks modern."], 1,
      "Câu hỏi đuôi cần xác nhận. 'Yes, it reopens on Monday' vừa xác nhận đang đóng vừa thêm thông tin. Nói mình hay ăn ở đó không trả lời có đóng hay không.", "yn", 2],
    ["Will you be able to cover the front desk at noon?", ["The desk is made of oak.", "Sure, I don't have a meeting then.", "Noon is our busiest time."], 1,
      "Will you be able to... là lời nhờ. 'Sure, I don't have a meeting then' = nhận. Câu tả chất liệu bàn là bẫy từ desk.", "yn", 1],
    ["I can't find the receipt for the office supplies.", ["Try looking in your e-mail.", "Those supplies are on sale this week.", "The supply room is upstairs."], 0,
      "Câu trần thuật nêu vấn đề. Lời khuyên tìm trong e-mail là phản hồi phù hợp. Đang giảm giá hoặc phòng kho không giúp tìm hóa đơn.", "stmt", 2],
    ["Some figures in this report don't match the spreadsheet.", ["I'll go through it with you after lunch.", "The spreadsheet software was expensive.", "The page numbers are at the bottom."], 0,
      "Người nói chỉ ra số liệu lệch. Đề nghị cùng rà sau giờ trưa là bước xử lý. Giá phần mềm và số trang là bẫy từ figures/numbers.", "stmt", 2],
    ["The keynote speaker just canceled.", ["Then we should move the panel to the morning.", "She spoke very clearly last year.", "The keys are in my coat pocket."], 0,
      "Thông báo diễn giả hủy. Đề xuất đổi phiên thảo luận lên buổi sáng là cách xử lý. 'Keys' chỉ gần âm với keynote.", "stmt", 2],
    ["Our table by the window is ready.", ["Great. We've been waiting for twenty minutes.", "The window was replaced last week.", "I prefer a table in the corner."], 0,
      "Nhân viên báo bàn đã sẵn sàng. Phản hồi tự nhiên là nhận bàn. Câu nói thích bàn góc không hợp vì bàn này vừa được báo sẵn.", "stmt", 1],
    ["The airport shuttle leaves every half hour.", ["Then we should head to the lobby soon.", "I left my suitcase in the room.", "Half of the guests have checked out."], 0,
      "Thông tin lịch xe. Kết luận nên ra sảnh sớm là phản hồi logic. 'Half' trong 'half of the guests' bẫy từ half hour.", "stmt", 2],
    ["Someone left the conference-room lights on all night.", ["I'll remind the team to switch them off.", "The conference was a success.", "The switch is on the left."], 0,
      "Nêu một sự cố nhỏ. Nhận sẽ nhắc mọi người tắt đèn là giải pháp. 'Switch' và 'conference' là bẫy từ trong câu.", "stmt", 1],
    ["Why don't we order lunch for the project team?", ["Because I'm getting hungry.", "The project ends in June.", "Good idea. I'll pick up some menus."], 2,
      "'Why don't we...?' là lời đề nghị, không hỏi nguyên nhân. Không chọn câu Because. Câu nhận lời và xin thực đơn là đáp án.", "invite", 2],
    ["Would you like me to forward the client's comments?", ["Yes, please send them to the design group.", "The comments were mostly positive.", "I like the new design."], 0,
      "Lời đề nghị làm giúp. 'Yes, please...' là chấp nhận và nói rõ gửi cho ai. Khen nhận xét không trả lời có muốn chuyển tiếp hay không.", "invite", 1],
    ["How about reviewing the slides together this afternoon?", ["There are twelve slides in the deck.", "I have a call at four, but three o'clock works.", "Yesterday's review was helpful."], 1,
      "How about... là lời rủ. Câu chọn được giờ cụ thể là nhận lời có điều chỉnh. Số slide và buổi review hôm qua không hẹn giờ.", "invite", 2],
    ["Let's take the early train so we miss the traffic.", ["The training session starts at nine.", "That's fine with me.", "The traffic light on Main Street is broken."], 1,
      "Let's... là đề nghị. 'That's fine with me' đồng ý. 'Training' gần âm với train; 'traffic light' bẫy từ traffic.", "invite", 2],
    ["Should I call the supplier or send an e-mail?", ["An e-mail is better. They're in another time zone.", "Yes, I called them yesterday.", "The supplies arrived this morning."], 0,
      "Câu hỏi lựa chọn A or B không trả lời bằng Yes/No. Đáp án chọn e-mail và nêu lý do múi giờ.", "alt", 2],
    ["Do you want to present the results, or should I?", ["Why don't you go ahead? You prepared the charts.", "The results were better than we expected.", "Yes, I want a copy."], 0,
      "Câu or yêu cầu chọn người trình bày. Nhường cho người đã làm biểu đồ là lựa chọn rõ. Câu khen kết quả không chỉ ai sẽ nói.", "alt", 2]
  ];
  P2.forEach((x, i) => window.BANK.push({
    id: "p2x-" + (i + 1), part: 2, kind: x[4], level: x[5],
    script: [{ s: "Q", t: x[0] }],
    questions: [{ q: x[0], o: x[1], a: x[2], e: x[3], audioOptions: true, hideText: true }]
  }));
})();

/* ============================ PART 3 ============================ */
window.BANK.push(
  {
    id: "p3x-1", part: 3, level: 2,
    script: [
      { s: "W", t: "Hi, I ordered a textbook two weeks ago under the name Elena Cho." },
      { s: "M", t: "Let me check. Yes, it came in yesterday, but the publisher sent the previous edition." },
      { s: "W", t: "The course requires the newest one. The chapter numbers are different." },
      { s: "M", t: "I can reorder it. It should arrive by Thursday. Or you can take this copy, and we'll refund the difference if your professor accepts it." },
      { s: "W", t: "I'd rather wait. Could you e-mail me when the new one is here?" },
      { s: "M", t: "Of course." }
    ],
    questions: [
      { q: "Why is the woman at the store?", o: ["To sell a used textbook", "To pick up an order", "To speak to a professor", "To apply for a job"], a: 1, e: "Cô nói đã đặt sách giáo khoa hai tuần trước → đến lấy đơn hàng, không phải đến bán sách." },
      { q: "What is the problem?", o: ["The order was lost.", "The store charged the wrong price.", "An older edition was delivered.", "The class has been canceled."], a: 2, e: "'the publisher sent the previous edition' → nhà xuất bản gửi bản cũ hơn. Đây là paraphrase của older edition." },
      { q: "What does the woman decide to do?", o: ["Take the copy in stock", "Wait for another shipment", "Ask her professor for advice", "Cancel the course"], a: 1, e: "'I'd rather wait' và nhờ báo khi sách mới về → cô chọn đợi lô hàng khác, không lấy bản đang có." }
    ]
  },
  {
    id: "p3x-2", part: 3, level: 1,
    script: [
      { s: "M", t: "Hi, I'm locked out of my e-mail. It says my password has expired." },
      { s: "W", t: "I can reset it. Your new password needs at least ten characters." },
      { s: "M", t: "Can I finish this later? I have to leave for a client meeting." },
      { s: "W", t: "Yes. I'll text you a link. It will stay active for two hours." },
      { s: "M", t: "Perfect. Thank you." }
    ],
    questions: [
      { q: "Why is the man calling?", o: ["He cannot open his e-mail.", "He forgot a client's address.", "He wants a new phone.", "He is late for a meeting."], a: 0, e: "'I'm locked out of my e-mail' → không vào được hộp thư. Cuộc họp là lý do anh muốn làm sau, không phải lý do cuộc gọi." },
      { q: "What does the woman say about the new password?", o: ["It must be changed every week.", "It must have a minimum length.", "It will be chosen by the company.", "It cannot include numbers."], a: 1, e: "'at least ten characters' → độ dài tối thiểu. Không nói ai chọn giúp hay cấm chữ số." },
      { q: "What will the woman do?", o: ["Call the client", "Send the man a link", "Extend a meeting", "Replace his computer"], a: 1, e: "'I'll text you a link' → gửi đường link. Text là hình thức gửi, đáp án paraphrase thành send a link." }
    ]
  },
  {
    id: "p3x-3", part: 3, level: 3,
    script: [
      { s: "M", t: "I put the updated budget on the shared drive last night." },
      { s: "W", t: "I saw it. The shipping figures are still last year's." },
      { s: "M", t: "Really? I thought accounting hadn't sent the new rates." },
      { s: "W", t: "They did. The e-mail came in on Monday." },
      { s: "M", t: "Then I must have missed it. I'll fix the spreadsheet before the three o'clock review." },
      { s: "W", t: "Good. The director always starts with the cost section." }
    ],
    questions: [
      { q: "What problem are the speakers discussing?", o: ["A missing spreadsheet", "An error in a budget", "A late director", "A canceled review"], a: 1, e: "Số cước vận chuyển vẫn là số năm ngoái → bảng ngân sách đang sai, không phải mất file." },
      { q: "What does the woman imply when she says, \"They did. The e-mail came in on Monday\"?", o: ["Accounting refused to help.", "The man overlooked information he already received.", "The rates will be sent next Monday.", "The e-mail system is broken."], a: 1, e: "Câu hàm ý: người nam tưởng kế toán chưa gửi, người nữ nói họ đã gửi từ thứ Hai → anh đã bỏ sót thông tin có sẵn." },
      { q: "What will the man do before 3:00 P.M.?", o: ["Lead the review", "E-mail the director", "Correct a document", "Call the accounting department"], a: 2, e: "'I'll fix the spreadsheet before the three o'clock review' → sửa tài liệu. Không nói anh sẽ chủ trì buổi review." }
    ]
  },
  {
    id: "p3x-4", part: 3, speakers: 3, level: 2,
    script: [
      { s: "M", t: "Naomi, Chris, the client moved the Osaka meeting from Thursday to Wednesday morning." },
      { s: "W", t: "Wednesday is fine for me. My flight lands on Tuesday night." },
      { s: "M2", t: "Mine doesn't. I was going to fly out on Wednesday morning. I'll have to leave a day earlier." },
      { s: "W", t: "The airline we used last time lets you change a ticket online without a fee." },
      { s: "M", t: "Chris, can you do that today? Naomi and I will move your section to the afternoon so you won't have to present as soon as you arrive." },
      { s: "M2", t: "I'll change the ticket after this call." }
    ],
    questions: [
      { q: "Why are the speakers talking?", o: ["A meeting has been rescheduled.", "A client has canceled a contract.", "An airline has raised its fares.", "A presentation has received poor feedback."], a: 0, e: "Khách dời họp từ thứ Năm sang sáng thứ Tư → cuộc họp đổi lịch, không bị hủy." },
      { q: "What problem does Chris mention?", o: ["He has lost his passport.", "His original flight is too late.", "The hotel is fully booked.", "He cannot present in the afternoon."], a: 1, e: "Chris định bay sáng thứ Tư, trong khi họp đã chuyển thành sáng thứ Tư → chuyến bay cũ không còn kịp." },
      { q: "What will Chris most likely do next?", o: ["Book a hotel", "Revise the slides", "Change a flight reservation", "Call the client"], a: 2, e: "'I'll change the ticket after this call' → đổi vé máy bay. Naomi và người nam mới là người sửa phần trình bày." }
    ]
  },
  {
    id: "p3x-5", part: 3, speakers: 3, level: 3,
    script: [
      { s: "W", t: "The banners for the product launch came out darker than the sample we approved." },
      { s: "M", t: "The printer told me they followed the file we sent." },
      { s: "M2", t: "I opened that file this morning. The colors look right on my screen." },
      { s: "W", t: "Well, we can't hang these in the lobby. The logo is almost brown." },
      { s: "M", t: "Then we'll need a reprint, but the launch is on Friday." },
      { s: "M2", t: "If we approve it before noon, they promised a two-day turnaround. I'll call them now and ask for a printed proof before they run the whole batch." }
    ],
    questions: [
      { q: "What is the problem?", o: ["The launch date was moved.", "The printed banners do not match the sample.", "The design file cannot be opened.", "The lobby is not available."], a: 1, e: "Banner in ra tối hơn mẫu đã duyệt → thành phẩm không khớp mẫu. File vẫn mở được trên màn hình." },
      { q: "What does the woman mean when she says, \"The logo is almost brown\"?", o: ["She wants the logo printed in brown.", "She thinks the banners are unacceptable.", "She prefers a darker brand color.", "She is describing a new design."], a: 1, e: "Câu hàm ý: ngay trước đó cô nói không thể treo những banner này ở sảnh. Logo gần như màu nâu là cách nói thành phẩm bị lệch màu, không dùng được." },
      { q: "What will the second man do?", o: ["Design a new logo", "Call the print shop", "Cancel the launch", "Hang the banners"], a: 1, e: "M2 nói 'I'll call them now' — them là xưởng in — và xin bản in thử. Không phải người thiết kế lại logo." }
    ]
  },
  {
    id: "p3x-6", part: 3, level: 2,
    graphic: `<table class="gtable"><caption>Harbor Ferry — Saturday</caption>
      <tr><th>Departs City Pier</th><th>Arrives North Island</th></tr>
      <tr><td>9:00 A.M.</td><td>9:40 A.M.</td></tr>
      <tr><td>10:30 A.M.</td><td>11:10 A.M.</td></tr>
      <tr><td>12:00 P.M.</td><td>12:40 P.M.</td></tr>
      <tr><td>1:30 P.M.</td><td>2:10 P.M.</td></tr></table>`,
    script: [
      { s: "W", t: "We need to be at the island museum before noon. The guided tour starts at twelve." },
      { s: "M", t: "The ride takes forty minutes, and I'd like to be there a little early." },
      { s: "W", t: "Then let's take the last ferry that gets us there before eleven thirty." },
      { s: "M", t: "Good. I'll buy the tickets online so we don't have to wait at the pier." }
    ],
    questions: [
      { q: "Where are the speakers going?", o: ["To a train station", "To a museum", "To a ferry office", "To a tour-boat company"], a: 1, e: "'the island museum' và tour lúc 12 giờ → điểm đến là bảo tàng. Phà chỉ là phương tiện." },
      { q: "Look at the graphic. Which ferry will the speakers most likely take?", o: ["The 9:00 A.M. ferry", "The 10:30 A.M. ferry", "The 12:00 P.M. ferry", "The 1:30 P.M. ferry"], a: 1, e: "Họ muốn chuyến cuối cùng đến trước 11:30. Chuyến 10:30 đến lúc 11:10. Chuyến 12:00 đến 12:40, muộn hơn giờ tour." },
      { q: "What will the man do?", o: ["Reserve tickets on a Web site", "Meet a tour guide", "Change the tour time", "Drive to the museum"], a: 0, e: "'I'll buy the tickets online' → đặt vé trên mạng. Không nói anh sẽ gặp hướng dẫn viên." }
    ]
  },
  {
    id: "p3x-7", part: 3, level: 3,
    graphic: `<table class="gtable"><caption>Saturday Photography Workshop</caption>
      <tr><th>Session</th><th>Hours</th><th>Fee</th></tr>
      <tr><td>Morning</td><td>9:00–12:00</td><td>$40</td></tr>
      <tr><td>Afternoon</td><td>1:00–4:00</td><td>$55</td></tr>
      <tr><td>Full day</td><td>Both sessions</td><td>$80</td></tr></table>`,
    script: [
      { s: "W", t: "Hello, I'd like to sign up for the photography workshop this Saturday." },
      { s: "M", t: "We have a morning session and an afternoon session, or you can attend both." },
      { s: "W", t: "I can only come after lunch. And I don't want to rent a camera if I can avoid it." },
      { s: "M", t: "You won't have to. The afternoon fee already includes a camera. The morning fee does not." },
      { s: "W", t: "Then the afternoon session is what I need. Can I pay by card?" },
      { s: "M", t: "Yes. I'll e-mail you a receipt." }
    ],
    questions: [
      { q: "Who most likely is the man?", o: ["A photographer hiring an assistant", "A staff member taking a registration", "A camera repair technician", "A travel agent"], a: 1, e: "Ông giải thích các buổi học và nhận đăng ký → nhân viên ghi danh, không phải thợ sửa máy ảnh." },
      { q: "Look at the graphic. How much will the woman most likely pay?", o: ["$40", "$55", "$80", "$95"], a: 1, e: "Cô chỉ học sau bữa trưa, tức buổi chiều, và phí buổi chiều đã gồm máy ảnh nên không cộng thêm. Buổi chiều là $55." },
      { q: "What does the man say about the afternoon session?", o: ["It is already full.", "It costs more if a camera is rented separately.", "Its price includes equipment.", "It is longer than the morning session."], a: 2, e: "'The afternoon fee already includes a camera' → học phí đã gồm thiết bị. Cả hai buổi đều 3 tiếng nên không dài hơn." }
    ]
  },
  {
    id: "p3x-8", part: 3, level: 1,
    script: [
      { s: "W", t: "Dr. Shah's office, this is Megan." },
      { s: "M", t: "Hello, this is Andre Silva. I need to move my dental cleaning from Friday to sometime next week." },
      { s: "W", t: "Dr. Shah will be away all next week. The earliest opening after that is Monday the eighteenth, at nine A.M." },
      { s: "M", t: "Monday works. Please put me down for that." },
      { s: "W", t: "Done. You'll receive a text confirmation shortly." }
    ],
    questions: [
      { q: "Why is the man calling?", o: ["To cancel a treatment", "To reschedule an appointment", "To ask about a bill", "To request a prescription"], a: 1, e: "'I need to move my dental cleaning' → dời lịch, không hủy hẳn." },
      { q: "What does the woman say about next week?", o: ["The office will be closed for good.", "The dentist will not be in.", "Only morning visits are available.", "The cleaning will take longer."], a: 1, e: "'Dr. Shah will be away all next week' → bác sĩ vắng cả tuần sau. Văn phòng không nói là đóng cửa vĩnh viễn." },
      { q: "When is the man's new appointment?", o: ["Friday at 9:00 A.M.", "Next Monday at 9:00 A.M.", "Monday the 18th at 9:00 A.M.", "Monday the 18th at 5:00 P.M."], a: 2, e: "Tuần sau bác sĩ đi vắng, lịch sớm nhất SAU đó là Monday the eighteenth lúc 9 giờ. Không phải thứ Hai tuần sau." }
    ]
  }
);

/* ============================ PART 4 ============================ */
window.BANK.push(
  {
    id: "p4x-1", part: 4, level: 1,
    script: [{ s: "M", t: "Attention, passengers at Central Station. The four-fifteen train to Brookfield has been delayed by twenty minutes because of a signal problem. It will now depart from platform six, not platform two. Passengers holding tickets for this train may wait in the lounge on the upper level, where complimentary coffee is being served. We apologize for the inconvenience." }],
    questions: [
      { q: "Where is the announcement being made?", o: ["On a train", "At a train station", "At an airport", "In a coffee shop"], a: 1, e: "'Attention, passengers at Central Station' và nói về sân ga → thông báo tại ga tàu, không phải trên tàu." },
      { q: "What caused the delay?", o: ["Bad weather", "A late conductor", "A signal problem", "A track closure"], a: 2, e: "'because of a signal problem' → sự cố tín hiệu. Không nhắc thời tiết hay đường ray bị đóng." },
      { q: "What are passengers offered?", o: ["A fare refund", "Free coffee", "A taxi voucher", "A seat upgrade"], a: 1, e: "'complimentary coffee' = cà phê miễn phí. Không có hoàn tiền hay xe taxi." }
    ]
  },
  {
    id: "p4x-2", part: 4, level: 2,
    script: [{ s: "M", t: "Hello, Ms. Okonkwo. This is Carl from Westbridge Auto. Your car is ready to pick up, but only the brake repair has been finished. The part we ordered for the air conditioner was the wrong size, so that work is not done. The correct part arrives on Thursday, and the extra work should take about an hour. There is no charge for the second visit. Please call me at 555-0144 to choose a time. We are open until six P.M." }],
    questions: [
      { q: "What is the purpose of the call?", o: ["To sell a new car", "To say that a repair is only partly finished", "To request payment for a second visit", "To ask the listener to order a part"], a: 1, e: "Xe lấy được nhưng mới xong phanh; điều hòa chưa sửa vì sai phụ tùng → sửa chữa mới hoàn thành một phần." },
      { q: "What work has been completed?", o: ["The air conditioner", "The brakes", "An oil change", "A paint job"], a: 1, e: "'only the brake repair has been finished' → mới xong phanh. Điều hòa chưa làm." },
      { q: "What should the listener do?", o: ["Pay an extra fee", "Call to arrange a return visit", "Bring the car in on Thursday morning", "Order a replacement part"], a: 1, e: "'Please call me ... to choose a time' → gọi để hẹn lần quay lại. Phụ tùng do gara đặt, và lần hai không tính phí." }
    ]
  },
  {
    id: "p4x-3", part: 4, level: 3,
    script: [{ s: "W", t: "Thanks, everyone, for staying late. The client wants the campaign photos by Monday, and the photographer we booked cannot work this weekend. I know the notice is short. But we have been promising these images for a month, and another delay is not an option. So I will ask the studio on Oak Street, the one that helped us last spring, to shoot on Saturday. Nina, please send them the shot list tonight. The rest of you do not need to come in. Nina and I will handle it." }],
    questions: [
      { q: "What problem does the speaker describe?", o: ["A client has rejected the photos.", "A photographer is unavailable.", "A studio has closed.", "A deadline has been extended."], a: 1, e: "Nhiếp ảnh gia đã đặt không làm việc cuối tuần này → người chụp không có mặt. Hạn giao vẫn là thứ Hai, không được gia hạn." },
      { q: "What does the speaker mean when she says, \"another delay is not an option\"?", o: ["The team may choose a new deadline.", "The photos must be delivered on time.", "The client has offered more time.", "The Saturday shoot might be canceled."], a: 1, e: "Câu hàm ý: đã hứa ảnh suốt một tháng, không thể trễ thêm → phải giao đúng hạn." },
      { q: "What will Nina do tonight?", o: ["Photograph the products", "Send a list of required shots", "Call the client", "Book a train ticket"], a: 1, e: "'send them the shot list tonight' → gửi danh sách các cảnh cần chụp. Người nói mới là người liên hệ studio." }
    ]
  },
  {
    id: "p4x-4", part: 4, level: 2,
    script: [{ s: "W", t: "Looking for a quiet place to work outside the office? Harbor Desk has opened a coworking space on Pier Avenue. A day pass costs fifteen dollars and includes high-speed Internet, a locker, and unlimited coffee. Members who reserve a private room receive a twenty percent discount on weekdays. This month, the first fifty people who sign up for a monthly plan will receive a free day pass for a guest. Visit our Web site to book a tour." }],
    questions: [
      { q: "What is being advertised?", o: ["A coffee shop", "A shared workspace", "A computer store", "A hotel"], a: 1, e: "'coworking space' và day pass gồm Internet, tủ khóa → không gian làm việc chung, không phải quán cà phê dù có cà phê miễn phí." },
      { q: "What is included in a day pass?", o: ["A private room", "Internet, a locker, and coffee", "A monthly membership", "A discount of twenty percent"], a: 1, e: "Day pass $15 gồm 'high-speed Internet, a locker, and unlimited coffee'. Phòng riêng và giảm 20% là quyền lợi khác, dành cho member đặt phòng." },
      { q: "What special offer is available this month?", o: ["Free coffee for a year", "A guest pass for some new members", "A free private room", "Half-price day passes"], a: 1, e: "50 người đầu tiên đăng ký gói tháng được 'a free day pass for a guest' → vé ngày miễn phí cho khách mời." }
    ]
  },
  {
    id: "p4x-5", part: 4, level: 2,
    graphic: `<table class="gtable"><caption>City Museum — Guided Tours</caption>
      <tr><th>Time</th><th>Tour</th></tr>
      <tr><td>10:00 A.M.</td><td>Highlights</td></tr>
      <tr><td>11:30 A.M.</td><td>Ancient Art</td></tr>
      <tr><td>1:00 P.M.</td><td>Modern Art</td></tr>
      <tr><td>2:30 P.M.</td><td>Architecture</td></tr></table>`,
    script: [{ s: "M", t: "Welcome to the city museum. Because the ancient-art gallery is closed for installation this week, the tour of that collection will not run. Guests who bought tickets for it will join the modern-art tour instead, at no extra cost. Please meet your guide in the lobby five minutes before the tour begins. Audio guides for the permanent galleries can be picked up at the information desk." }],
    questions: [
      { q: "What is closed?", o: ["The whole museum", "The ancient-art gallery", "The information desk", "The lobby"], a: 1, e: "'the ancient-art gallery is closed for installation this week' → chỉ phòng nghệ thuật cổ đại đóng để lắp đặt." },
      { q: "Look at the graphic. Which tour will some guests attend instead?", o: ["Highlights", "Ancient Art", "Modern Art", "Architecture"], a: 2, e: "Khách đã mua tour nghệ thuật cổ đại được chuyển sang 'the modern-art tour'. Trên bảng, Modern Art là 1:00 P.M." },
      { q: "What are listeners told to do?", o: ["Pay an additional fee", "Arrive in the lobby early", "Return next week", "Reserve a new ticket online"], a: 1, e: "'meet your guide in the lobby five minutes before' → có mặt ở sảnh sớm. Vé chuyển tour không mất thêm phí." }
    ]
  },
  {
    id: "p4x-6", part: 4, level: 3,
    graphic: `<table class="gtable"><caption>City Transit Passes</caption>
      <tr><th>Pass</th><th>Price</th></tr>
      <tr><td>1 day</td><td>$8</td></tr>
      <tr><td>3 days</td><td>$14</td></tr>
      <tr><td>7 days</td><td>$28</td></tr>
      <tr><td>30 days</td><td>$70</td></tr></table>`,
    script: [{ s: "W", t: "Thank you for calling City Transit. You asked about getting around during your four-day conference. Buying a one-day pass each day would cost more, and a three-day pass would not cover your last day. The seven-day pass is the better value for a four-day stay. You can buy it at any station ticket machine. Have a pleasant visit." }],
    questions: [
      { q: "Why did the person call?", o: ["To report a lost pass", "To ask about local transportation", "To register for a conference", "To apply for a job"], a: 1, e: "Người gọi hỏi cách đi lại trong bốn ngày hội nghị → hỏi về phương tiện công cộng địa phương." },
      { q: "Look at the graphic. Which pass does the speaker recommend?", o: ["The 1-day pass", "The 3-day pass", "The 7-day pass", "The 30-day pass"], a: 2, e: "Ở lại bốn ngày: vé 3 ngày không đủ, mua bốn vé 1 ngày đắt hơn. Người nói chọn 'the seven-day pass', giá $28." },
      { q: "Where can the pass be purchased?", o: ["At a conference booth", "At a station machine", "On the bus, in cash only", "At a hotel desk"], a: 1, e: "'at any station ticket machine' → máy bán vé ở ga. Không nói quầy khách sạn hay chỉ trả tiền mặt trên xe." }
    ]
  },
  {
    id: "p4x-7", part: 4, level: 2,
    script: [{ s: "W", t: "This is a message for residents of Building C. The water will be turned off tomorrow from ten A.M. to two P.M. while the main valve is replaced. Please fill containers tonight if you will need water during those hours. The parking garage will remain open. Technicians must be able to reach the utility closet on each floor, so please do not leave bicycles or boxes in the hallway. Questions can be directed to the management office." }],
    questions: [
      { q: "What is the purpose of the message?", o: ["To announce a rent increase", "To notify residents of a water shutoff", "To introduce new technicians", "To close a parking garage"], a: 1, e: "Nước sẽ bị cắt ngày mai từ 10 giờ đến 2 giờ để thay van → báo gián đoạn nước. Hầm xe vẫn mở." },
      { q: "What should residents do tonight?", o: ["Store some water", "Move their cars", "Meet the technicians", "Pay a service fee"], a: 0, e: "'fill containers tonight if you will need water' → tích trữ nước. Không yêu cầu dời xe." },
      { q: "What are residents asked not to do?", o: ["Use the elevator", "Block the hallways", "Contact the office", "Park in the garage"], a: 1, e: "'do not leave bicycles or boxes in the hallway' → không chặn hành lang. Hầm xe vẫn sử dụng được." }
    ]
  }
);

/* ============================ PART 5 ============================ */
(function () {
  const P5 = [
    ["The maintenance crew ------- the lobby floors every night after the store closes.",
      ["clean", "cleans", "cleaning", "are cleaned"], 1, "verb", 2,
      "Trong đề TOEIC, 'crew' được coi là danh từ số ít. 'Every night' cho thấy thói quen → hiện tại đơn 'cleans'. 'Are cleaned' là bị động và không hợp chủ ngữ crew đang làm việc."],
    ["Had the shipment arrived yesterday, we ------- the client's deadline.",
      ["will meet", "would meet", "would have met", "have met"], 2, "verb", 3,
      "Đảo ngữ 'Had the shipment arrived' = If the shipment had arrived → điều kiện loại 3. Mệnh đề chính dùng 'would have + V3': 'would have met'."],
    ["All visitors are required to have their bags ------- at the security desk.",
      ["inspect", "inspected", "inspecting", "inspection"], 1, "verb", 2,
      "Cấu trúc 'have something done': túi được kiểm tra → 'have their bags inspected'."],
    ["The seminar was ------- organized, so every session ended on time.",
      ["care", "careful", "carefully", "caring"], 2, "form", 1,
      "Cần trạng từ bổ nghĩa cho phân từ 'organized' → 'carefully'. 'Careful' là tính từ, không bổ nghĩa cho một phân từ."],
    ["There has been a ------- increase in online orders this quarter.",
      ["notice", "noticeable", "noticeably", "noticed"], 1, "form", 2,
      "Trước danh từ 'increase' cần tính từ → 'noticeable' (có thể nhận thấy). 'Noticeably' là trạng từ."],
    ["------- the terms of the contract, either party may cancel with thirty days' notice.",
      ["Under", "Over", "Between", "Against"], 0, "function", 2,
      "Cụm cố định 'under the terms of' = theo các điều khoản. Các giới từ còn lại không đi với 'terms' theo nghĩa này."],
    ["The copies are identical ------- the signature at the bottom of the last page.",
      ["except for", "except", "beside", "despite"], 0, "function", 2,
      "'Except for + danh từ' = ngoại trừ. 'Except' đứng một mình thường cần mệnh đề hoặc cụm khác; 'despite' mang nghĩa nhượng bộ, không hợp."],
    ["Sales staff are expected to ------- customer complaints on the same day.",
      ["address", "forward", "postpone", "withdraw"], 0, "vocab", 2,
      "'Address a complaint' = xử lý khiếu nại. 'Forward' chỉ chuyển tiếp; 'postpone' là hoãn; 'withdraw' là rút lại."],
    ["The two companies agreed to ------- the project until the financing is confirmed.",
      ["put up", "put off", "put out", "put on"], 1, "vocab", 3,
      "'Put off' = hoãn. 'Put up' là dựng/đăng; 'put out' là dập tắt hoặc đưa ra; 'put on' là mặc hoặc tổ chức."],
    ["Mr. Adeyemi has a reputation for being fair and -------.",
      ["impartial", "impatient", "impossible", "impersonal"], 0, "vocab", 2,
      "Song song với 'fair' (công bằng) là 'impartial' (không thiên vị). 'Impatient' (mất kiên nhẫn) chỉ giống về mặt chữ."],
    ["Please ------- the attached form and return it by Friday.",
      ["complete", "completely", "completion", "completed"], 0, "verb", 1,
      "Câu mệnh lệnh lịch sự 'Please + động từ nguyên mẫu' → 'complete'."],
    ["The new policy applies to part-time as well as ------- employees.",
      ["fully", "full", "fullness", "full-time"], 3, "vocab", 2,
      "Cặp 'part-time as well as full-time'. 'Full' đứng một mình không đối xứng với 'part-time'."],
    ["Ms. Cho expressed ------- about the tight production schedule.",
      ["concern", "concerned", "concerning", "concernedly"], 0, "form", 2,
      "Sau 'expressed' cần danh từ làm tân ngữ → 'concern'. 'Concerned' là tính từ."],
    ["The director asked that the proposal ------- before the board meeting.",
      ["submit", "be submitted", "is submitted", "submitting"], 1, "verb", 3,
      "Sau 'ask/request that' dùng thể giả định: (should) + V nguyên mẫu. 'Proposal' là vật được nộp → bị động 'be submitted'."],
    ["Reservations can be changed ------- no extra charge up to 24 hours before arrival.",
      ["at", "of", "for", "with"], 0, "function", 1,
      "Cụm 'at no extra charge' = không mất thêm phí. Giới từ trong cụm cố định là 'at'."],
    ["The hotel can ------- special meals for guests with food allergies.",
      ["accommodate", "accumulate", "accompany", "accomplish"], 0, "vocab", 2,
      "'Accommodate' ở đây nghĩa là đáp ứng, thu xếp được. 'Accumulate' là tích lũy; 'accompany' là đi cùng; 'accomplish' là hoàn thành."],
    ["Both lawyers will ------- the contract before either party signs it.",
      ["review", "reveal", "reverse", "revert"], 0, "vocab", 2,
      "'Review' = xem lại. 'Reveal' là tiết lộ; 'reverse' là đảo ngược; 'revert' là quay lại trạng thái cũ."],
    ["This afternoon's seminar will ------- budgeting, hiring, and time management.",
      ["cover", "discover", "replace", "invent"], 0, "vocab", 1,
      "'Cover a topic' = đề cập, bao quát một chủ đề. Các động từ còn lại không đi với danh sách chủ đề theo nghĩa này."],
    ["The survey results were ------- in choosing which product to launch.",
      ["instrumental", "reluctant", "occasional", "temporary"], 0, "vocab", 3,
      "'Instrumental in' = đóng vai trò quyết định. 'Reluctant' là miễn cưỡng; 'occasional' là thỉnh thoảng; 'temporary' là tạm thời."]
  ];
  P5.forEach((x, i) => window.BANK.push({
    id: "p5x-" + (i + 1), part: 5, kind: x[3], level: x[4],
    questions: [{ q: x[0], o: x[1], a: x[2], e: x[5], kind: x[3] }]
  }));
})();

/* ============================ PART 6 ============================ */
window.BANK.push(
  {
    id: "p6x-1", part: 6, level: 2,
    passage: `<p><b>To:</b> Conference participants<br><b>From:</b> Registration office<br><b>Subject:</b> Badge pickup</p>
<p>Thank you for registering for the Harbor Logistics Conference. Your name badge and printed program will be -<b>(1)</b>- at the desk in the main lobby on May 12, beginning at 8:00 A.M.</p>
<p>Please bring the confirmation message we sent last week. -<b>(2)</b>-. Staff will also be able to print a replacement if you cannot find the message.</p>
<p>Workshops have a limited number of seats. If a workshop you chose is already full, we will place you on a -<b>(3)</b>- list and contact you if a seat opens.</p>
<p>-<b>(4)</b>-. We look forward to seeing you in May.</p>`,
    questions: [
      { q: "(1)", o: ["available", "avail", "availability", "availably"], a: 0, e: "Sau 'will be' cần tính từ → 'available' (sẵn để nhận). 'Availability' là danh từ." },
      { q: "(2)", o: ["The conference was canceled last year.", "A photo ID is also required.", "Badges were mailed to your home.", "Please do not arrive before noon."], a: 1, e: "Câu trước yêu cầu mang thư xác nhận; câu sau nói có thể in lại nếu không tìm thấy thư. Câu xen vào hợp lý nhất là vẫn cần giấy tờ tùy thân. Các câu khác mâu thuẫn với việc nhận thẻ tại sảnh." },
      { q: "(3)", o: ["wait", "waiting", "waited", "waits"], a: 1, e: "Cụm danh từ 'waiting list' = danh sách chờ. Trước 'list' cần tính từ/danh động từ 'waiting'." },
      { q: "(4)", o: ["Badges must be returned at the end of each day.", "Questions about registration can be sent to events@harborlogistics.example.", "The lobby desk will be closed all week.", "Programs will not be printed this year."], a: 1, e: "Đoạn kết, trước câu chào kết, thường để thông tin liên hệ. Các câu còn lại trái với nội dung: thẻ không phải trả mỗi ngày, quầy không đóng cửa, chương trình có in." }
    ]
  },
  {
    id: "p6x-2", part: 6, level: 2,
    passage: `<p><b>Greenline Market to Open a Second Store</b></p>
<p>Greenline Market, a grocery store known for local produce, -<b>(1)</b>- a second location on Cedar Avenue this fall. The new store will be nearly twice as large as the original shop on Hill Street.</p>
<p>Owner Marta Ellis said the expansion was a response to customer requests. -<b>(2)</b>-. The Cedar Avenue store will keep the same early closing time, 7:00 P.M.</p>
<p>The company is now hiring cashiers and stock clerks. Experience is helpful but not -<b>(3)</b>-, because training will be provided during the first week.</p>
<p>Applications are -<b>(4)</b>- on the store's Web site through September 30.</p>`,
    questions: [
      { q: "(1)", o: ["open", "opened", "will open", "has opened"], a: 2, e: "'This fall' là thời điểm tương lai so với lúc viết bài → 'will open'. 'Has opened' dùng cho việc đã xảy ra." },
      { q: "(2)", o: ["Many shoppers asked for a location closer to downtown.", "The Hill Street store will close permanently.", "Ms. Ellis plans to retire this year.", "Cedar Avenue has no parking."], a: 0, e: "Câu trước nói việc mở rộng là đáp lại yêu cầu của khách. Câu phù hợp nêu nội dung yêu cầu đó. Câu đóng cửa Hill Street hoặc nghỉ hưu không có căn cứ và làm đứt mạch." },
      { q: "(3)", o: ["require", "required", "requiring", "requirement"], a: 1, e: "Sau 'is not' cần tính từ → 'required' (không bắt buộc). 'Requirement' là danh từ, không đứng sau 'is not' trong cấu trúc này." },
      { q: "(4)", o: ["accept", "accepting", "accepted", "acceptance"], a: 2, e: "Đơn được nhận trên web → bị động 'are accepted'." }
    ]
  },
  {
    id: "p6x-3", part: 6, level: 3,
    passage: `<p><b>To:</b> Project team<br><b>From:</b> Diane Okada<br><b>Subject:</b> Client review</p>
<p>The client has asked to see the revised floor plans one day earlier than we expected. Please send me your sections by 3:00 P.M. today so I can -<b>(1)</b>- them into a single file.</p>
<p>Focus on the changes we discussed on Monday. -<b>(2)</b>-. The client already has the original drawings.</p>
<p>If you are waiting for a cost estimate from a contractor, note that in your message -<b>(3)</b>- leaving the space blank. I would rather see an explanation than a missing number.</p>
<p>-<b>(4)</b>-.</p>`,
    questions: [
      { q: "(1)", o: ["combine", "combination", "combined", "combining"], a: 0, e: "Sau 'can' dùng động từ nguyên mẫu → 'combine' (gộp thành một file)." },
      { q: "(2)", o: ["There is no need to resend pages that have not changed.", "Please ignore the Monday meeting.", "The client has canceled the review.", "Floor plans are no longer required."], a: 0, e: "Câu trước bảo tập trung vào phần đã sửa; câu sau nói khách đã có bản vẽ gốc. Câu xen vào đúng mạch: không cần gửi lại trang không đổi." },
      { q: "(3)", o: ["instead of", "because of", "according to", "in spite of"], a: 0, e: "'Instead of leaving the space blank' = thay vì để trống. Cần ghi chú nếu đang chờ báo giá, chứ không bỏ trống ô số." },
      { q: "(4)", o: ["I will be out of the office until next month.", "Thank you for turning this around so quickly.", "The client prefers to meet next year.", "Do not send any files today."], a: 1, e: "Câu kết thư nội bộ, sau khi đã giao việc gấp, lời cảm ơn vì làm nhanh là tự nhiên. Các câu khác mâu thuẫn với việc đang xin file trong hôm nay." }
    ]
  },
  {
    id: "p6x-4", part: 6, level: 1,
    passage: `<p><b>Summer hours at the East Branch Library</b></p>
<p>From June 15 to August 31, the East Branch Library will close at 6:00 P.M. on weekdays -<b>(1)</b>- of 8:00 P.M. Weekend hours will stay the same.</p>
<p>The change allows the staff to complete an inventory of the children's collection. -<b>(2)</b>-. Patrons can still return books in the outdoor box after closing.</p>
<p>Story time for preschool children will continue on Wednesday mornings. No -<b>(3)</b>- is necessary for that program.</p>
<p>A regular schedule will -<b>(4)</b>- on September 1.</p>`,
    questions: [
      { q: "(1)", o: ["instead", "because", "despite", "during"], a: 0, e: "'Instead of 8:00 P.M.' = thay vì 8 giờ tối. Thư viện đóng lúc 6 giờ thay cho giờ cũ." },
      { q: "(2)", o: ["The building will be locked during those hours.", "The library is moving to a new address.", "Story time has been canceled for the year.", "The children's collection has been removed."], a: 0, e: "Họ kiểm kê nên đóng sớm. Câu sau nói vẫn trả sách được ở hộp ngoài trời. Câu 'The building will be locked' nối hai ý đó. Các câu kia trái với việc thư viện vẫn mở cửa ban ngày và story time vẫn có." },
      { q: "(3)", o: ["register", "registration", "registered", "registering"], a: 1, e: "Chủ ngữ của 'is necessary' là danh từ → 'registration'." },
      { q: "(4)", o: ["resume", "resumed", "resuming", "resumption"], a: 0, e: "Sau 'will' dùng động từ nguyên mẫu 'resume' (trở lại lịch cũ)." }
    ]
  }
);

/* ============================ PART 7 ============================ */
window.BANK.push(
  {
    id: "p7x-1", part: 7, form: "single", level: 1,
    passage: `<p><b>Memo</b></p>
<p><b>To:</b> All employees<br><b>From:</b> Facilities<br><b>Date:</b> April 8<br><b>Subject:</b> South lot paving</p>
<p>The south parking lot will be closed on Friday, April 11, from 6:00 A.M. to 6:00 P.M. so that it can be paved. Please use the north lot or the public garage on Market Street that day.</p>
<p>The company will validate garage tickets dated April 11 only. The south lot will reopen on Monday morning. Overnight vehicles must be moved by Thursday at 8:00 P.M.</p>`,
    questions: [
      { q: "What is the purpose of the memo?", o: ["To assign new parking spaces permanently", "To announce a one-day parking closure", "To raise the price of garage parking", "To introduce a shuttle service"], a: 1, e: "Bãi nam đóng trong ngày 11 tháng 4 để trải nhựa, rồi mở lại sáng thứ Hai → thông báo đóng cửa một ngày." },
      { q: "What is true about the public garage?", o: ["It will be closed on Friday.", "Tickets will be covered for April 11 only.", "It is reserved for visitors.", "Employees may not use it on Monday."], a: 1, e: "'validate garage tickets dated April 11 only' → công ty xác nhận/trả phí vé gara chỉ trong ngày 11 tháng 4." }
    ]
  },
  {
    id: "p7x-2", part: 7, form: "single", level: 2,
    passage: `<p><b>Invoice 4481</b></p>
<p><b>From:</b> Northwind Printing<br><b>To:</b> Lark &amp; Co.<br><b>Date:</b> May 2</p>
<table class="gtable"><caption>Charges</caption>
<tr><th>Item</th><th>Amount</th></tr>
<tr><td>500 brochures</td><td>$450</td></tr>
<tr><td>20 posters</td><td>$180</td></tr>
<tr><td>Rush fee</td><td>$40</td></tr>
<tr><td><b>Total due</b></td><td><b>$670</b></td></tr>
</table>
<p>Payment is due within 15 days. A 2 percent discount applies if payment is received by May 9. Please include the invoice number with your payment.</p>`,
    questions: [
      { q: "What is the invoice for?", o: ["Office rent", "Printing services", "Shipping insurance", "A design consultation"], a: 1, e: "Người gửi là Northwind Printing; các mục là brochure và poster → dịch vụ in." },
      { q: "How can Lark &amp; Co. pay less than $670?", o: ["By refusing the posters", "By paying on or before May 9", "By canceling the rush order", "By paying within 15 days"], a: 1, e: "Giảm 2% nếu tiền tới đúng hoặc trước May 9. Hạn 15 ngày chỉ là hạn trả đủ $670, không kèm giảm giá." },
      { q: "What is the amount of the rush fee?", o: ["$20", "$40", "$180", "$450"], a: 1, e: "Dòng Rush fee trên hóa đơn là $40." }
    ]
  },
  {
    id: "p7x-3", part: 7, form: "single", level: 2,
    passage: `<p><b>Clayroom — Weekend Workshops</b></p>
<table class="gtable"><caption>Schedule</caption>
<tr><th>When</th><th>Class</th><th>Fee</th></tr>
<tr><td>Saturday 9:00–12:00</td><td>Beginner wheel</td><td>$60</td></tr>
<tr><td>Saturday 1:00–4:00</td><td>Intermediate wheel</td><td>$75</td></tr>
<tr><td>Sunday 9:00–12:00</td><td>Glazing</td><td>$50</td></tr>
</table>
<p>All classes include clay and tools. The intermediate class is open only to students who have used a pottery wheel before. Register by Thursday to receive $10 off any class.</p>`,
    questions: [
      { q: "What is offered on Sunday morning?", o: ["A beginner class", "An intermediate class", "A glazing class", "A private lesson"], a: 2, e: "Dòng Sunday 9:00–12:00 ghi Glazing → lớp tráng men." },
      { q: "What is suggested about the intermediate class?", o: ["It is the least expensive.", "Participants should already have some experience.", "It does not include materials.", "It is held on Sunday."], a: 1, e: "'only to students who have used a pottery wheel before' → người học cần đã có kinh nghiệm dùng bàn xoay." },
      { q: "How can a student pay a lower fee?", o: ["By attending two classes", "By registering by Thursday", "By bringing their own tools", "By choosing the Sunday class"], a: 1, e: "'Register by Thursday to receive $10 off' → đăng ký trước thứ Năm được giảm $10. Lớp Chủ nhật rẻ hơn nhưng đó không phải cách giảm thêm được mô tả." }
    ]
  },
  {
    id: "p7x-4", part: 7, form: "single", level: 3,
    passage: `<p><b>Text message chain</b></p>
<p><b>Amina Shah (8:02 A.M.):</b> The caterer cannot provide the seafood platter. Their supplier is closed today.</p>
<p><b>Ben Ito (8:04 A.M.):</b> The dinner is tomorrow night. We told the clients there would be grilled shrimp.</p>
<p><b>Amina Shah (8:05 A.M.):</b> I found another caterer, Hale Kitchen. They can do the shrimp, but it costs $80 more.</p>
<p><b>Ben Ito (8:07 A.M.):</b> That's fine. The clients care more about the menu than the budget. Please ask Hale Kitchen to deliver by 5:00, not 6:00.</p>
<p><b>Amina Shah (8:08 A.M.):</b> I'll call them now.</p>
<p><b>Ben Ito (8:09 A.M.):</b> Also, I'll write to the first caterer and cancel only the seafood. We still want their vegetarian trays.</p>`,
    questions: [
      { q: "What problem are the writers discussing?", o: ["A venue has canceled.", "Part of a food order cannot be filled.", "The clients have changed the date.", "A delivery arrived too early."], a: 1, e: "Bên nấu ăn không làm được món hải sản vì nhà cung cấp đóng cửa → một phần đơn hàng không thực hiện được." },
      { q: "At 8:07 A.M., what does Mr. Ito most likely mean when he writes, \"That's fine\"?", o: ["He wants to remove the shrimp from the menu.", "He accepts the higher price.", "He thinks 6:00 P.M. is early enough.", "He will cook the meal himself."], a: 1, e: "Ngay sau thông tin đội giá $80, ông nói khách quan tâm thực đơn hơn ngân sách → chấp nhận mức giá cao hơn. Ông vẫn yêu cầu giao lúc 5 giờ, nên không đồng ý 6 giờ." },
      { q: "What will Ms. Shah do next?", o: ["E-mail the clients", "Contact Hale Kitchen", "Cancel the vegetarian trays", "Visit the supplier"], a: 1, e: "'I'll call them now' — them là Hale Kitchen, vừa được nhắc ở tin trước." },
      { q: "What will Mr. Ito do?", o: ["Cancel the entire original order", "Cancel one part of the original order", "Pay Hale Kitchen in cash", "Move the dinner to another night"], a: 1, e: "'cancel only the seafood' và vẫn giữ khay chay → chỉ hủy một phần đơn với bên nấu ăn ban đầu." }
    ]
  },
  {
    id: "p7x-5", part: 7, form: "single", level: 2,
    passage: `<p><b>Elm Street Clinic Adds Evening Hours</b></p>
<p>Elm Street Clinic will begin offering appointments until 8:00 P.M. on Tuesdays and Thursdays, starting June 1. — [1] —. The change follows requests from patients who could not leave work during the day.</p>
<p>"We kept a waiting list for months," said director Dr. Helen Cho. — [2] —. Two additional nurses have been hired to staff the later shift.</p>
<p>Patients who want an evening appointment should call the main desk or use the clinic's Web site. — [3] —. Walk-in visits will still be accepted only in the mornings.</p>
<p>The clinic's pharmacy hours will not change. — [4] —.</p>`,
    questions: [
      { q: "What is the article mainly about?", o: ["A new clinic location", "Longer appointment hours", "A shortage of medicine", "A change in walk-in rules"], a: 1, e: "Tiêu đề và câu mở nói phòng khám bắt đầu nhận bệnh đến 8 giờ tối hai ngày trong tuần → kéo dài giờ hẹn." },
      { q: "What is indicated about the clinic?", o: ["It has hired more nurses.", "It will close in the mornings.", "It no longer accepts walk-in patients.", "Its pharmacy will stay open later."], a: 0, e: "'Two additional nurses have been hired' → đã tuyển thêm y tá. Nhà thuốc không đổi giờ; walk-in vẫn nhận vào buổi sáng." },
      { q: "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n\"Those slots are expected to fill quickly.\"", o: ["[1]", "[2]", "[3]", "[4]"], a: 2, e: "'Those slots' phải chỉ các suất tối vừa được nhắc cách đặt chỗ. Vị trí [3] đứng ngay sau hướng dẫn gọi điện hoặc đặt trên web, và trước câu nói walk-in chỉ có buổi sáng. Các vị trí khác chưa có 'suất' để từ 'those' chỉ tới." },
      { q: "The word \"staff\" in paragraph 2, line 2, is closest in meaning to", o: ["hire", "work", "count", "pay"], a: 1, e: "'Hired to staff the later shift' = được tuyển để làm việc trong ca muộn. 'Hire' trùng với việc đã tuyển rồi, không phải nghĩa của staff trong câu này." }
    ]
  },
  {
    id: "p7x-6", part: 7, form: "single", level: 1,
    passage: `<p><b>Found</b></p>
<p>A black laptop bag was found in Conference Room 2 on March 3. The bag contains a charger but no computer. The owner may claim it at the security desk on the ground floor. Please bring identification.</p>
<p>Items that are not claimed within 30 days are donated to a local school.</p>`,
    questions: [
      { q: "Where should the owner go?", o: ["Conference Room 2", "A local school", "The security desk", "The third floor"], a: 2, e: "'claim it at the security desk on the ground floor' → quầy bảo vệ tầng trệt. Phòng họp là nơi tìm thấy túi." },
      { q: "What is inside the bag?", o: ["A laptop", "A charger", "An ID card", "A set of keys"], a: 1, e: "'contains a charger but no computer' → trong túi có sạc, không có máy tính." }
    ]
  },
  {
    id: "p7x-7", part: 7, form: "double", level: 2,
    passage: `<p><b>E-mail</b></p>
<p><b>From:</b> Luis Ortega, Pine Hotel<br><b>To:</b> Grace Lin<br><b>Date:</b> August 1<br><b>Subject:</b> Quote for October 12</p>
<p>Dear Ms. Lin,</p>
<p>Thank you for considering the Pine Hotel for your company dinner. For 80 guests on October 12, we can reserve the garden room from 6:00 P.M. to 10:00 P.M. The room rental is $500. Dinner is $45 per person, and a vegetarian option is available at the same price. A projector can be added for $75.</p>
<p>Please confirm by August 20 so that we can hold the date.</p>
<p>Sincerely,<br>Luis Ortega</p>
<p>━━━━━━━━━━━━━━━━━━━</p>
<p><b>E-mail</b></p>
<p><b>From:</b> Grace Lin<br><b>To:</b> Luis Ortega<br><b>Date:</b> August 4<br><b>Subject:</b> Re: Quote for October 12</p>
<p>Dear Mr. Ortega,</p>
<p>We would like to book the garden room. Our final count is 90 guests, not 80. Please keep the vegetarian option. We will not need the projector, because there will be no presentation. I will send the deposit this week.</p>
<p>Could the room be ready at 5:30 P.M. so that our staff can set out name cards?</p>
<p>Sincerely,<br>Grace Lin</p>`,
    questions: [
      { q: "Why did Mr. Ortega write to Ms. Lin?", o: ["To request a deposit", "To provide a price quote", "To cancel a reservation", "To suggest a different date"], a: 1, e: "Tiêu đề 'Quote' và thư nêu giá phòng, giá suất ăn, giá máy chiếu → gửi báo giá." },
      { q: "What did Ms. Lin change?", o: ["The date of the dinner", "The number of guests", "The room she wants", "The price of the meal"], a: 1, e: "'Our final count is 90 guests, not 80' → đổi số khách. Ngày 12 tháng 10 và garden room được giữ." },
      { q: "What will Ms. Lin most likely not pay for?", o: ["The room rental", "The dinners", "A projector", "A vegetarian meal"], a: 2, e: "'We will not need the projector' → không thuê máy chiếu nên không trả $75 đó. Suất chay vẫn được giữ và cùng giá với suất thường." },
      { q: "What does Ms. Lin request?", o: ["A lower room rate", "An earlier opening time", "A different menu", "A later confirmation deadline"], a: 1, e: "Bà hỏi phòng sẵn sàng lúc 5:30 thay vì 6:00 để xếp thẻ tên → xin mở phòng sớm hơn." },
      { q: "What is indicated about the vegetarian meals?", o: ["They cost more than other meals.", "They cost the same as other meals.", "They are no longer available.", "They are served in another room."], a: 1, e: "Thư của khách sạn: 'a vegetarian option is available at the same price'. Bà Lin vẫn yêu cầu giữ lựa chọn này." }
    ]
  },
  {
    id: "p7x-8", part: 7, form: "triple", level: 3,
    passage: `<p><b>Job posting</b></p>
<p>Harbor Freight Logistics is hiring a night-shift warehouse supervisor in Busan. Applicants need three years of warehouse experience and a valid forklift license. The salary is 42 million won per year. Apply by April 30. Interviews will be held in person during the week of May 6.</p>
<p>━━━━━━━━━━━━━━━━━━━</p>
<p><b>E-mail</b></p>
<p><b>From:</b> Mina Park<br><b>To:</b> Recruiting<br><b>Date:</b> April 28</p>
<p>I am applying for the night-shift supervisor position. I have worked in warehouses for five years, and my forklift license is valid. I live in Seoul but can relocate to Busan. I cannot interview on May 6 or 7 because I will be traveling. May 8 or 9 would be possible.</p>
<p>━━━━━━━━━━━━━━━━━━━</p>
<p><b>E-mail</b></p>
<p><b>From:</b> Jonah Reed, Human Resources<br><b>To:</b> Mina Park<br><b>Date:</b> April 29</p>
<p>Thank you, Ms. Park. Your background matches the posting. We can see you on May 8 at 2:00 P.M. at our Busan warehouse. Please bring your license. We will reimburse your train fare from Seoul.</p>`,
    questions: [
      { q: "What is required for the job?", o: ["A college degree", "A forklift license", "Experience in Seoul", "Fluency in Japanese"], a: 1, e: "Tin tuyển dụng yêu cầu ba năm kinh nghiệm kho và 'a valid forklift license'. Không yêu cầu bằng đại học." },
      { q: "What problem does Ms. Park mention?", o: ["She does not have a license.", "She cannot attend the earliest interview dates.", "She does not want to work nights.", "She cannot move to Busan."], a: 1, e: "Cô không phỏng vấn được ngày 6 và 7 tháng 5 vì đi vắng. Cô nói có thể chuyển đến Busan và bằng lái còn hiệu lực." },
      { q: "What does Mr. Reed offer to pay for?", o: ["A hotel in Busan", "Ms. Park's train travel", "A new forklift license", "Dinner after the interview"], a: 1, e: "'reimburse your train fare from Seoul' → hoàn tiền vé tàu từ Seoul." },
      { q: "When is Ms. Park's interview?", o: ["April 30 at 2:00 P.M.", "May 6 at 2:00 P.M.", "May 8 at 2:00 P.M.", "May 9 at 2:00 P.M."], a: 2, e: "Thư HR: 'May 8 at 2:00 P.M.'. April 30 là hạn nộp hồ sơ." },
      { q: "What can be inferred about Ms. Park?", o: ["She has more experience than the job requires.", "She already works for Harbor Freight.", "She missed the application deadline.", "She refused the May 8 interview."], a: 0, e: "Tin yêu cầu ba năm; cô viết đã làm kho năm năm → nhiều kinh nghiệm hơn mức yêu cầu. Hồ sơ gửi ngày 28 tháng 4, trước hạn 30 tháng 4." }
    ]
  },
  {
    id: "p7x-9", part: 7, form: "triple", level: 3,
    passage: `<p><b>Notice</b></p>
<p>BrightLamp is recalling model BL-20 desk lamps sold in March. The switch can overheat. Customers should stop using the lamp and request a free replacement. Model BL-10 is not included in the recall. Replacement lamps ship within ten days of a request.</p>
<p>━━━━━━━━━━━━━━━━━━━</p>
<p><b>Online review — April 12</b></p>
<p>Chris Dalton: I bought a BL-20 in March. After I read the recall, I unplugged the lamp. Support answered the same day and said I could receive a newer BL-30 at no cost, or I could choose a refund. I asked for the replacement.</p>
<p>━━━━━━━━━━━━━━━━━━━</p>
<p><b>E-mail</b></p>
<p><b>From:</b> BrightLamp Support<br><b>To:</b> Chris Dalton<br><b>Date:</b> April 13</p>
<p>Your BL-30 shipped today. You should receive it by April 20. Please put the old lamp in the prepaid box included in the shipment and leave that box at any post office. You will not be charged for the return.</p>`,
    questions: [
      { q: "Why was the notice published?", o: ["To advertise a new lamp", "To warn that a product may be unsafe", "To announce a price reduction", "To close a repair center"], a: 1, e: "Thu hồi BL-20 vì công tắc có thể quá nóng → cảnh báo sản phẩm không an toàn." },
      { q: "Which model is not part of the recall?", o: ["BL-10", "BL-20", "BL-30", "Every lamp sold in March"], a: 0, e: "'Model BL-10 is not included in the recall'." },
      { q: "What did Mr. Dalton decide to do?", o: ["Keep using the BL-20", "Receive a newer model", "Ask for his money back", "Buy a BL-10"], a: 1, e: "Hỗ trợ cho chọn BL-30 miễn phí hoặc hoàn tiền. 'I asked for the replacement' → ông chọn nhận mẫu mới hơn." },
      { q: "What must Mr. Dalton do with the old lamp?", o: ["Take it to a BrightLamp store", "Mail it back without paying postage", "Throw it away", "Donate it to a school"], a: 1, e: "Bỏ đèn cũ vào hộp đã trả cước sẵn và gửi ở bưu điện. 'will not be charged for the return' → không mất phí gửi." },
      { q: "The word \"overheat\" in the notice, line 1, is closest in meaning to", o: ["become too hot", "turn off", "change color", "cost more"], a: 0, e: "'Overheat' = trở nên quá nóng. Đó là lý do phải ngừng dùng đèn." }
    ]
  },
  {
    id: "p7x-10", part: 7, form: "triple", level: 2,
    passage: `<p><b>Westbridge Book Fair</b></p>
<p>The Westbridge Book Fair will be held on September 14 and 15 at the Civic Hall. Author talks are free, but seating is limited. Workshops cost $20 and must be booked in advance. Children under 12 may enter at no charge.</p>
<p>━━━━━━━━━━━━━━━━━━━</p>
<p><b>E-mail to volunteers</b></p>
<p><b>Saturday</b><br>10:00 Registration desk — Nora<br>11:00 Children's tent — Omar<br>1:00 Author talk, Room A — Nora</p>
<p><b>Sunday</b><br>10:00 Registration desk — Omar<br>1:00 Workshop check-in — Nora</p>
<p>Please arrive 20 minutes before your first shift. Nora, the author talk was moved from Room B to Room A because Room B has no microphone.</p>
<p>━━━━━━━━━━━━━━━━━━━</p>
<p><b>Text messages — Saturday</b></p>
<p><b>Omar (9:10 A.M.):</b> I'm on the bus. I'll be about 15 minutes late for registration.</p>
<p><b>Nora (9:12 A.M.):</b> I'll cover the desk until you arrive. Can you still do the children's tent at 11:00?</p>
<p><b>Omar (9:14 A.M.):</b> Yes. I'll go straight there after I help at the desk.</p>
<p><b>Nora (9:15 A.M.):</b> Thanks. I have to be in Room A at 1:00, so I can't stay at the tent.</p>`,
    questions: [
      { q: "What is indicated about the author talks?", o: ["They cost $20.", "They are free, but seats are limited.", "They are only for children.", "They were canceled."], a: 1, e: "Trang hội chợ: 'Author talks are free, but seating is limited'. Workshop mới mất $20." },
      { q: "Why was an event moved to Room A?", o: ["The author requested a larger room.", "Room B has no microphone.", "The Civic Hall closed Room A.", "Omar will be late."], a: 1, e: "E-mail tình nguyện viên: buổi nói chuyện chuyển từ Room B sang Room A 'because Room B has no microphone'." },
      { q: "What does Nora agree to do on Saturday morning?", o: ["Lead the children's tent", "Work at registration until Omar arrives", "Cancel the author talk", "Sell workshop tickets"], a: 1, e: "Tin nhắn 9:12: 'I'll cover the desk until you arrive' → Nora trông quầy đăng ký đến khi Omar tới. Lịch gốc đã ghi Nora ở quầy lúc 10:00; tin nhắn nói thêm việc cô ở đó cho đến khi Omar đến." },
      { q: "Who will be at the children's tent at 11:00 A.M. on Saturday?", o: ["Nora", "Omar", "A guest author", "No one"], a: 1, e: "Lịch ghi Omar lúc 11:00 ở lều thiếu nhi, và Omar nhắn vẫn làm ca đó." },
      { q: "What will Nora do at 1:00 P.M. on Saturday?", o: ["Check in workshop participants", "Stay at the children's tent", "Help with an author talk", "Leave the fair"], a: 2, e: "Lịch thứ Bảy 1:00 là Author talk, Room A — Nora. Tin nhắn cũng nói cô phải có mặt ở Room A lúc 1:00. Check-in workshop là ca Chủ nhật." }
    ]
  }
);

