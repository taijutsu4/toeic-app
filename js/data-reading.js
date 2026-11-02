/*
 * Ngân hàng câu hỏi READING (Part 5, 6, 7)
 * Câu hỏi được biên soạn mới theo đúng format & chủ điểm thường gặp trong đề TOEIC
 * (format mới từ 2019 đến nay). Không sao chép nguyên văn đề ETS (có bản quyền).
 *
 * Cấu trúc: mỗi "group" gồm: id, part, (passage), questions[{q, o[], a (index đáp án), e (giải thích)}]
 */
window.BANK = window.BANK || [];

/* ============================ PART 5 ============================ */
(function () {
  const P5 = [
    ["Members of the marketing team will present ------- findings at the quarterly meeting next Tuesday.",
      ["it", "its", "their", "them"], 2,
      "Cần tính từ sở hữu đứng trước danh từ 'findings'. Chủ ngữ 'Members' là số nhiều → 'their'. 'its' dùng cho danh từ số ít; 'it/them' là đại từ, không đứng trước danh từ."],
    ["Ms. Tanaka was promoted to regional manager because of her ------- performance over the past two years.",
      ["exception", "exceptional", "exceptionally", "except"], 1,
      "Trước danh từ 'performance' cần tính từ → 'exceptional' (xuất sắc). 'exceptionally' là trạng từ, 'exception' là danh từ, 'except' là giới từ."],
    ["All employees must submit their expense reports ------- the end of the month.",
      ["by", "until", "within", "since"], 0,
      "'by + mốc thời gian' = trước/chậm nhất là (hạn chót). 'until' dùng cho hành động kéo dài liên tục đến mốc đó; 'within' đi với khoảng thời gian (within two days); 'since' dùng với thì hoàn thành."],
    ["The new software allows users to track shipments ------- and accurately.",
      ["quick", "quicker", "quickly", "quickness"], 2,
      "Cần trạng từ bổ nghĩa cho động từ 'track', song song với trạng từ 'accurately' qua 'and' → 'quickly'."],
    ["------- the heavy rain, the outdoor concert was held as scheduled.",
      ["Although", "Despite", "Because", "However"], 1,
      "Sau chỗ trống là cụm danh từ 'the heavy rain' (không có động từ) → dùng giới từ 'Despite' (mặc dù). 'Although/Because' cần mệnh đề; 'However' là trạng từ liên kết."],
    ["Applicants who wish to be considered for the position should send a résumé ------- a cover letter.",
      ["as well", "along with", "in addition", "together"], 1,
      "'along with + danh từ' = cùng với. 'as well' và 'in addition' cần 'as' / 'to' phía sau ('as well as', 'in addition to'); 'together' cần 'with'."],
    ["The board of directors ------- the proposal to expand into Asian markets at yesterday's meeting.",
      ["approve", "approves", "approved", "will approve"], 2,
      "Có 'yesterday's meeting' → hành động trong quá khứ → thì quá khứ đơn 'approved'."],
    ["Please ------- that all lights are turned off before leaving the office.",
      ["ensure", "assure", "insure", "secure"], 0,
      "'ensure that + mệnh đề' = đảm bảo rằng. 'assure' cần tân ngữ chỉ người (assure someone that...); 'insure' = mua bảo hiểm; 'secure' = giành được/bảo vệ."],
    ["The hotel offers a complimentary shuttle service for guests ------- to the airport.",
      ["travel", "traveled", "traveling", "travels"], 2,
      "Rút gọn mệnh đề quan hệ chủ động: 'guests (who are) traveling' → V-ing. 'traveled' mang nghĩa bị động, không hợp."],
    ["Due to unexpected demand, the product is ------- out of stock.",
      ["temporary", "temporarily", "temporariness", "temporal"], 1,
      "Bổ nghĩa cho cụm tính từ 'out of stock' → cần trạng từ 'temporarily' (tạm thời)."],
    ["Mr. Lee has worked at the company ------- he graduated from university.",
      ["for", "since", "during", "while"], 1,
      "Thì hiện tại hoàn thành 'has worked' + mốc bắt đầu là một mệnh đề ('he graduated...') → 'since'. 'for' đi với khoảng thời gian; 'during' + danh từ."],
    ["The conference room is not available this afternoon, so the meeting has been ------- until Thursday.",
      ["postponed", "canceled", "reserved", "extended"], 0,
      "'postpone ... until + thời điểm' = hoãn tới. 'canceled' (hủy) không đi với 'until Thursday'."],
    ["Customers can return items ------- 30 days of purchase for a full refund.",
      ["within", "during", "between", "among"], 0,
      "'within + khoảng thời gian' = trong vòng. Cụm cố định 'within 30 days of purchase'."],
    ["Neither the manager ------- her assistant was able to attend the training session.",
      ["or", "nor", "and", "but"], 1,
      "Cặp liên từ 'neither ... nor ...' (không ... cũng không ...)."],
    ["The company's profits increased ------- after the launch of its new product line.",
      ["significant", "significance", "significantly", "signify"], 2,
      "Bổ nghĩa cho động từ 'increased' → trạng từ 'significantly' (đáng kể)."],
    ["The survey results will be ------- to all department heads by Friday.",
      ["distribute", "distributing", "distributed", "distribution"], 2,
      "Cấu trúc bị động tương lai 'will be + V3' → 'distributed'."],
    ["Ms. Garcia is ------- for overseeing the renovation of the main lobby.",
      ["responsible", "responsibility", "responsibly", "respond"], 0,
      "Cụm 'be responsible for' = chịu trách nhiệm về."],
    ["If the shipment ------- on time, we would have been able to meet the deadline.",
      ["arrives", "arrived", "had arrived", "has arrived"], 2,
      "Câu điều kiện loại 3 (mệnh đề chính 'would have been') → mệnh đề 'if' dùng quá khứ hoàn thành 'had arrived'."],
    ["The training workshop is designed for new employees ------- have joined the company in the last six months.",
      ["who", "which", "whose", "whom"], 0,
      "Đại từ quan hệ thay cho người ('employees') và làm chủ ngữ cho 'have joined' → 'who'."],
    ["The CEO thanked the staff for their ------- to the success of the project.",
      ["contribute", "contributed", "contributions", "contributor"], 2,
      "Sau tính từ sở hữu 'their' cần danh từ; 'contribution to' = sự đóng góp vào → 'contributions'. 'contributor' chỉ người, không hợp nghĩa."],
    ["The newly hired accountant is very ------- and always double-checks her work.",
      ["thorough", "thoroughly", "thoroughness", "through"], 0,
      "Sau 'is very' cần tính từ → 'thorough' (kỹ lưỡng). 'through' là giới từ."],
    ["Parking spaces in the north lot are reserved ------- for visitors.",
      ["exclusive", "exclusively", "exclusion", "exclude"], 1,
      "Bổ nghĩa cho cụm giới từ 'for visitors' → trạng từ 'exclusively' (dành riêng)."],
    ["------- you have any questions about your order, please contact our customer service team.",
      ["Should", "Would", "Unless", "Whether"], 0,
      "Đảo ngữ câu điều kiện loại 1: 'Should you have...' = 'If you have...'. 'Unless' (trừ khi) sai nghĩa."],
    ["The quarterly sales figures were ------- higher than analysts had predicted.",
      ["much", "very", "so", "too"], 0,
      "Nhấn mạnh so sánh hơn ('higher than') dùng 'much/far/even/a lot'. 'very' không đứng trước so sánh hơn."],
    ["Employees are encouraged to take ------- of the free fitness classes offered on Wednesdays.",
      ["advantage", "benefit", "use", "profit"], 0,
      "Cụm cố định 'take advantage of' = tận dụng."],
    ["The factory has been operating at full ------- since the beginning of the year.",
      ["capacity", "capable", "capability", "capably"], 0,
      "Cụm 'at full capacity' = hết công suất. Sau tính từ 'full' cần danh từ; 'capability' (năng lực) không hợp collocation."],
    ["Ms. Kim asked that the report ------- before the client meeting.",
      ["revise", "be revised", "is revised", "revising"], 1,
      "Thể giả định sau 'ask/request/suggest that': S + (should) + V nguyên mẫu. 'the report' bị sửa → bị động 'be revised'."],
    ["The museum's new exhibit has attracted ------- visitors than expected.",
      ["many", "more", "most", "much"], 1,
      "Có 'than' → so sánh hơn 'more'."],
    ["To receive a discount, customers must present a valid membership card ------- checkout.",
      ["at", "on", "in", "for"], 0,
      "'at checkout' = tại quầy thanh toán (giới từ chỉ địa điểm/thời điểm cụ thể)."],
    ["The new policy will take ------- on January 1.",
      ["effect", "affect", "effective", "effectively"], 0,
      "Cụm 'take effect' = có hiệu lực. 'affect' là động từ."],
    ["Our sales representatives travel ------- throughout the region to meet with clients.",
      ["frequent", "frequently", "frequency", "frequented"], 1,
      "Bổ nghĩa cho động từ 'travel' → trạng từ 'frequently'."],
    ["The company is looking for a candidate with ------- experience in project management.",
      ["extend", "extensive", "extensively", "extension"], 1,
      "Trước danh từ 'experience' cần tính từ → 'extensive' (sâu rộng)."],
    ["Mr. Patel will be out of the office next week; -------, Ms. Brown will handle his clients.",
      ["therefore", "unless", "otherwise", "nevertheless"], 0,
      "Quan hệ nguyên nhân – kết quả (ông Patel vắng → bà Brown phụ trách) → 'therefore' (vì vậy). 'unless' là liên từ, không đứng sau dấu chấm phẩy; 'otherwise' (nếu không thì), 'nevertheless' (tuy nhiên) sai nghĩa."],
    ["The renovation of the cafeteria is expected to be completed ------- three weeks.",
      ["in", "on", "at", "by"], 0,
      "'in + khoảng thời gian' = trong/sau (bao lâu nữa). 'by' đi với mốc thời gian."],
    ["Only employees with proper ------- may enter the research laboratory.",
      ["authorize", "authorized", "authorization", "authorizing"], 2,
      "Sau tính từ 'proper' cần danh từ → 'authorization' (sự cho phép)."],
    ["The seminar was so ------- that many participants asked for additional sessions.",
      ["inform", "informative", "information", "informed"], 1,
      "Sau 'so' cần tính từ mô tả seminar → 'informative' (bổ ích, nhiều thông tin). 'informed' = được thông báo/hiểu biết (chỉ người)."],
    ["Mr. Davis prefers to review the contract ------- before signing it.",
      ["him", "his", "himself", "he"], 2,
      "Đại từ phản thân 'himself' dùng để nhấn mạnh (tự mình xem lại)."],
    ["Each of the participants ------- a certificate upon completing the course.",
      ["receive", "receives", "receiving", "have received"], 1,
      "'Each of + N số nhiều' → động từ chia số ít → 'receives'."],
    ["The restaurant is popular ------- its reasonable prices and friendly service.",
      ["because", "due to", "so that", "in order to"], 1,
      "Sau chỗ trống là cụm danh từ → 'due to' (do, bởi vì). 'because' cần mệnh đề (hoặc 'because of')."],
    ["The job fair will provide an excellent opportunity for students to ------- with potential employers.",
      ["network", "networks", "networked", "networking"], 0,
      "Sau 'to' (to-infinitive) dùng động từ nguyên mẫu → 'network' (giao lưu, kết nối)."],
    ["Visitors are required to sign in at the front desk ------- entering the building.",
      ["before", "prior", "ahead", "previous"], 0,
      "'before + V-ing' = trước khi. 'prior' phải đi với 'to' (prior to entering)."],
    ["The company plans to hire ------- staff to handle the increased workload during the holiday season.",
      ["addition", "additional", "additionally", "add"], 1,
      "Trước danh từ 'staff' cần tính từ → 'additional' (bổ sung, thêm)."],
    ["Ms. Nguyen's proposal was rejected ------- it was too costly to implement.",
      ["because", "despite", "although", "due to"], 0,
      "Sau chỗ trống là mệnh đề 'it was too costly' và quan hệ nguyên nhân → 'because'."],
    ["The annual report ------- by the finance department every December.",
      ["prepares", "is prepared", "is preparing", "prepared"], 1,
      "Báo cáo được chuẩn bị (bị động) + 'every December' (thói quen) → hiện tại đơn bị động 'is prepared'."],
    ["We are pleased to announce that Dr. Wilson has ------- our invitation to speak at the symposium.",
      ["accepted", "excepted", "received", "admitted"], 0,
      "'accept an invitation' = nhận lời mời. 'excepted' = loại trừ; 'received' = nhận được (vật lý) không thể hiện đồng ý."],
    ["The price of the tour includes accommodations, meals, and ------- by bus.",
      ["transportable", "transported", "transportation", "transporting"], 2,
      "Liệt kê danh từ song song (accommodations, meals, and ...) → danh từ 'transportation' (phương tiện đi lại). 'transportable' là tính từ; 'transported/transporting' là dạng động từ."],
    ["Mr. Ruiz is the most ------- candidate we have interviewed for the position.",
      ["qualify", "qualified", "qualifying", "qualification"], 1,
      "Sau 'the most' và trước danh từ cần tính từ → 'qualified' (đủ năng lực)."],
    ["The deadline for registration has been extended ------- more people can attend the workshop.",
      ["so that", "in order to", "as a result", "because of"], 0,
      "'so that + mệnh đề' = để mà. 'in order to' + V nguyên mẫu; 'because of' + danh từ."],
    ["------- of the two proposals was accepted by the committee, so the team must start over.",
      ["Either", "Neither", "Both", "None"], 1,
      "Câu sau 'the team must start over' (phải làm lại) → không đề xuất nào được chấp nhận. Với 'two' dùng 'Neither' (không cái nào trong hai). 'None' dùng cho từ 3 trở lên."],
    ["The shipment was delayed, ------- caused several customers to cancel their orders.",
      ["that", "which", "what", "it"], 1,
      "Mệnh đề quan hệ không xác định (sau dấu phẩy) thay cho cả mệnh đề trước → 'which'. 'that' không dùng sau dấu phẩy."],
    ["Mr. Chen was ------- the only person who knew the password to the server.",
      ["near", "nearly", "nearby", "nearest"], 1,
      "Trạng từ 'nearly' (gần như) bổ nghĩa cho cụm 'the only person'."],
    ["The company's new headquarters is ------- located near the central train station.",
      ["convenience", "convenient", "conveniently", "convene"], 2,
      "Bổ nghĩa cho phân từ 'located' → trạng từ 'conveniently' (cụm quen thuộc 'conveniently located')."],
    ["After reviewing several -------, the committee selected a design firm for the project.",
      ["bid", "bids", "bidder", "bidding"], 1,
      "Sau 'several' cần danh từ đếm được số nhiều → 'bids' (hồ sơ thầu)."],
    ["Ms. Okafor has been ------- as the new director of human resources.",
      ["appointed", "applied", "appealed", "approached"], 0,
      "'be appointed as' = được bổ nhiệm làm."],
    ["The seminar will cover ------- topics, including budgeting, leadership, and time management.",
      ["vary", "various", "variously", "variety"], 1,
      "Trước danh từ 'topics' cần tính từ → 'various' (đa dạng)."]
  ];
  P5.forEach((x, i) => window.BANK.push({
    id: "p5-" + (i + 1), part: 5,
    questions: [{ q: x[0], o: x[1], a: x[2], e: x[3] }]
  }));
})();

/* ============================ PART 6 ============================ */
window.BANK.push(
  {
    id: "p6-1", part: 6,
    passage: `<p><b>To:</b> All Staff<br><b>From:</b> Facilities Department<br><b>Subject:</b> Elevator maintenance</p>
<p>Please be advised that the elevators in the east wing will be out of service from Monday, March 4, to Wednesday, March 6. During this time, technicians will -<b>(1)</b>- the old control systems with new, energy-efficient models.</p>
<p>Employees who work on the upper floors are asked to use the elevators in the west wing. -<b>(2)</b>-. We recommend allowing extra time to reach your workspace, especially during the morning rush.</p>
<p>Staff members with mobility -<b>(3)</b>- should contact the Facilities Department in advance so that we can make special arrangements.</p>
<p>We apologize for any inconvenience and thank you for your -<b>(4)</b>-.</p>`,
    questions: [
      { q: "(1)", o: ["replace", "replacing", "be replaced", "replacement"], a: 0, e: "Sau 'will' dùng động từ nguyên mẫu chủ động (kỹ thuật viên thay thế hệ thống) → 'replace'. Cấu trúc 'replace A with B'." },
      { q: "(2)", o: ["The new systems were installed last year.", "These may be more crowded than usual.", "The east wing will be closed permanently.", "Please use the stairs only in emergencies."], a: 1, e: "Câu trước yêu cầu dùng thang máy khu tây; câu sau khuyên dành thêm thời gian → hợp lý nhất: thang máy khu tây sẽ đông hơn bình thường. Các câu khác mâu thuẫn với thông tin (không đóng vĩnh viễn, hệ thống mới chưa lắp)." },
      { q: "(3)", o: ["limits", "limitations", "limited", "limiting"], a: 1, e: "Cụm danh từ 'mobility limitations' = hạn chế về khả năng đi lại. Sau 'with' cần danh từ; 'limitations' tự nhiên nhất." },
      { q: "(4)", o: ["patience", "patient", "patiently", "patients"], a: 0, e: "Sau tính từ sở hữu 'your' cần danh từ; 'thank you for your patience' = cảm ơn sự kiên nhẫn. 'patients' = bệnh nhân." }
    ]
  },
  {
    id: "p6-2", part: 6,
    passage: `<p>Dear Mr. Alvarez,</p>
<p>Thank you for your recent order from Greenleaf Office Supplies. We are writing to let you know that one of the items you -<b>(1)</b>-, the ergonomic desk chair (model EC-200), is currently on back order.</p>
<p>We expect to receive new stock from the manufacturer within two weeks. -<b>(2)</b>-, the rest of your order has already been shipped and should arrive by Friday.</p>
<p>If you would prefer not to wait, you may cancel the chair and receive a full refund. -<b>(3)</b>-, you may choose a similar model from our catalog at the same price.</p>
<p>-<b>(4)</b>-. Simply reply to this e-mail or call us at 555-0182.</p>
<p>Sincerely,<br>Customer Service Team</p>`,
    questions: [
      { q: "(1)", o: ["order", "ordered", "will order", "are ordering"], a: 1, e: "Đơn hàng đã đặt rồi ('your recent order') → quá khứ đơn 'ordered' (mệnh đề quan hệ rút gọn 'that you ordered')." },
      { q: "(2)", o: ["In the meantime", "As a result", "For example", "Instead"], a: 0, e: "'In the meantime' = trong lúc chờ đợi: trong khi chờ hàng mới, phần còn lại đã được gửi đi." },
      { q: "(3)", o: ["Therefore", "Alternatively", "Similarly", "Consequently"], a: 1, e: "Đưa ra lựa chọn thay thế khác (hủy hoặc chọn mẫu khác) → 'Alternatively' (hoặc là)." },
      { q: "(4)", o: ["Your chair has been delivered.", "Please let us know which option you prefer.", "We no longer sell office furniture.", "The catalog will be updated next year."], a: 1, e: "Câu sau 'Simply reply to this e-mail or call us' → câu trước yêu cầu khách hàng cho biết lựa chọn. Các câu còn lại mâu thuẫn hoặc không liên quan." }
    ]
  },
  {
    id: "p6-3", part: 6,
    passage: `<p><b>Riverside Community Library Expands Hours</b></p>
<p>Beginning next month, Riverside Community Library will stay open until 9:00 P.M. on weekdays. The change comes in -<b>(1)</b>- to a survey in which many residents said they could not visit the library during regular hours.</p>
<p>"Many of our patrons work during the day," explained head librarian Diane Moss. "-<b>(2)</b>-." The extended hours will be funded by a grant from the city council.</p>
<p>In addition, the library will offer evening workshops on topics such as résumé writing and basic computer skills. These sessions are free, but space is limited, so -<b>(3)</b>- is required.</p>
<p>A full schedule of events is -<b>(4)</b>- on the library's Web site.</p>`,
    questions: [
      { q: "(1)", o: ["response", "respond", "responsive", "responded"], a: 0, e: "Cụm cố định 'in response to' = để đáp lại." },
      { q: "(2)", o: ["We hope the new schedule will make it easier for them to visit.", "The library will close for renovations soon.", "Most of our books are available online.", "The survey was conducted by a private company."], a: 0, e: "Câu trước nói nhiều người đi làm ban ngày → câu tiếp theo hợp lý: giờ mở cửa mới giúp họ dễ đến thư viện hơn." },
      { q: "(3)", o: ["register", "registered", "registration", "registers"], a: 2, e: "Chỗ trống là chủ ngữ của 'is required' → danh từ 'registration' (việc đăng ký)." },
      { q: "(4)", o: ["available", "availability", "avail", "availably"], a: 0, e: "Sau 'is' cần tính từ → 'available' (có sẵn)." }
    ]
  },
  {
    id: "p6-4", part: 6,
    passage: `<p><b>Job Opening: Sales Associate</b></p>
<p>Brightway Electronics is seeking an energetic sales associate to join our downtown store. The successful candidate will assist customers, -<b>(1)</b>- product displays, and process transactions.</p>
<p>Applicants should have at least one year of retail experience. Knowledge of consumer electronics is a plus but not -<b>(2)</b>-. Full training will be provided.</p>
<p>-<b>(3)</b>-. Employees also receive a 20 percent discount on all store merchandise.</p>
<p>To apply, please submit your résumé online by May 15. Only candidates selected for an interview will be -<b>(4)</b>-.</p>`,
    questions: [
      { q: "(1)", o: ["maintain", "maintaining", "maintained", "maintenance"], a: 0, e: "Cấu trúc song song sau 'will': assist, maintain, and process → động từ nguyên mẫu 'maintain'." },
      { q: "(2)", o: ["require", "required", "requiring", "requirement"], a: 1, e: "'not required' = không bắt buộc (song song với 'a plus' – bổ ngữ sau 'is')." },
      { q: "(3)", o: ["The store is located near the train station.", "We offer competitive pay and flexible schedules.", "Our company was founded in 1995.", "Customers can return items within 30 days."], a: 1, e: "Câu sau dùng 'also receive a 20 percent discount' → câu trước nói về quyền lợi khác của nhân viên: lương cạnh tranh, giờ linh hoạt." },
      { q: "(4)", o: ["contact", "contacted", "contacting", "contacts"], a: 1, e: "Bị động 'will be + V3' (ứng viên được liên hệ) → 'contacted'." }
    ]
  }
);

/* ============================ PART 7 ============================ */
window.BANK.push(
  {
    id: "p7-1", part: 7,
    passage: `<p><b>NOTICE TO TENANTS</b></p>
<p>The water supply to Maple Court Apartments will be shut off on Thursday, June 12, from 9:00 A.M. to 1:00 P.M. so that plumbers can repair a main pipe beneath the parking area. Residents are advised to store water for drinking and cooking before the shutoff begins.</p>
<p>The parking area will also be closed during the repair. Vehicles left in the lot after 8:00 A.M. may be towed at the owner's expense. Temporary parking will be available on Elm Street.</p>
<p>For questions, contact the building manager, Paul Hendricks, at extension 204.</p>`,
    questions: [
      { q: "What is the purpose of the notice?", o: ["To announce a rent increase", "To inform residents of a temporary service interruption", "To introduce a new building manager", "To advertise a vacant apartment"], a: 1, e: "Thông báo nói nước bị cắt từ 9h–13h để sửa đường ống → thông báo gián đoạn dịch vụ tạm thời." },
      { q: "What are residents asked to do?", o: ["Pay for the repairs", "Stay in their apartments", "Save water in advance", "Call a plumber"], a: 2, e: "'Residents are advised to store water... before the shutoff begins' → tích trữ nước trước." },
      { q: "By what time should cars be removed from the parking area?", o: ["8:00 A.M.", "9:00 A.M.", "1:00 P.M.", "12:00 P.M."], a: 0, e: "'Vehicles left in the lot after 8:00 A.M. may be towed' → phải dời xe trước 8:00." }
    ]
  },
  {
    id: "p7-2", part: 7,
    passage: `<p><b>Text message chain</b></p>
<p><b>Linda Park (10:15 A.M.):</b> Hi Jason, are you still at the printer's? The client wants to add their new logo to the brochures.</p>
<p><b>Jason Webb (10:17 A.M.):</b> I'm here now. They've already started printing the first batch.</p>
<p><b>Linda Park (10:18 A.M.):</b> Oh no. Can they stop?</p>
<p><b>Jason Webb (10:20 A.M.):</b> I'll ask. They said it's only about 100 copies so far.</p>
<p><b>Linda Park (10:21 A.M.):</b> That's fine. We can use those at the trade show. Please have them print the remaining 900 with the new logo. I'll e-mail the file now.</p>
<p><b>Jason Webb (10:23 A.M.):</b> Got it. I'll wait for the file.</p>`,
    questions: [
      { q: "What is the problem?", o: ["The printer is broken.", "A design change was requested after printing began.", "The brochures were delivered late.", "The client canceled the order."], a: 1, e: "Khách muốn thêm logo mới nhưng xưởng in đã bắt đầu in đợt đầu → yêu cầu thay đổi sau khi đã in." },
      { q: "At 10:21 A.M., what does Ms. Park most likely mean when she writes, \"That's fine\"?", o: ["She is satisfied with the new logo.", "She accepts that some brochures have the old design.", "She thinks the price is reasonable.", "She agrees to cancel the trade show."], a: 1, e: "Ngay sau khi Jason nói đã in khoảng 100 bản, Linda nói 'That's fine. We can use those at the trade show' → chấp nhận 100 bản với thiết kế cũ." },
      { q: "What will Ms. Park do next?", o: ["Go to the printer's", "Call the client", "Send an electronic file", "Print 100 copies"], a: 2, e: "'I'll e-mail the file now' → gửi file qua e-mail." }
    ]
  },
  {
    id: "p7-3", part: 7,
    passage: `<p><b>From:</b> Sarah Mitchell &lt;smitchell@corvantech.com&gt;<br><b>To:</b> Kevin Osei &lt;kosei@corvantech.com&gt;<br><b>Date:</b> September 8<br><b>Subject:</b> Training session</p>
<p>Dear Kevin,</p>
<p>I'm writing to confirm the details of the customer service training you will lead for our new hires. The session will take place on September 15 in Conference Room B from 1:00 to 4:00 P.M. Fourteen employees have registered so far.</p>
<p>As you requested, a projector and a whiteboard will be set up in the room. However, Conference Room B does not have a sound system, so if you plan to show videos, you may want to bring portable speakers.</p>
<p>Please send me your presentation slides by September 12 so that I can print copies for the participants. Also, let me know if you would like refreshments to be served during the break.</p>
<p>Best regards,<br>Sarah Mitchell<br>Human Resources</p>`,
    questions: [
      { q: "Why was the e-mail sent?", o: ["To invite Mr. Osei to a job interview", "To confirm arrangements for a training session", "To request a new conference room", "To announce a change in company policy"], a: 1, e: "'I'm writing to confirm the details of the customer service training' → xác nhận sắp xếp cho buổi đào tạo." },
      { q: "What is suggested about Conference Room B?", o: ["It is too small for fourteen people.", "It lacks audio equipment.", "It is unavailable on September 15.", "It has no projector."], a: 1, e: "'Conference Room B does not have a sound system' → thiếu thiết bị âm thanh." },
      { q: "What is Mr. Osei asked to do by September 12?", o: ["Register participants", "Order refreshments", "Submit presentation materials", "Set up the room"], a: 2, e: "'Please send me your presentation slides by September 12' → gửi tài liệu thuyết trình." },
      { q: "The word \"lead\" in paragraph 1, line 1, is closest in meaning to", o: ["guide", "conduct", "follow", "cause"], a: 1, e: "'lead the training' = tổ chức/điều hành buổi đào tạo → 'conduct'. 'guide' gần nghĩa dẫn đường nhưng không đi tự nhiên với 'session'." }
    ]
  },
  {
    id: "p7-4", part: 7,
    passage: `<p><b>Harbor View Restaurant — Now Hiring</b></p>
<p>Harbor View, the city's award-winning seafood restaurant, is opening a second location in Westfield this fall. We are looking for experienced servers, line cooks, and a full-time assistant manager.</p>
<p>— [1] —. All positions offer competitive wages, paid vacation, and free staff meals. Assistant manager candidates must have at least three years of supervisory experience in the food service industry. — [2] —.</p>
<p>Interviews will be held at our original location at 45 Bay Street on August 3 and 4. — [3] —. Applicants should bring a copy of their résumé and two references. Those unable to attend may apply online at www.harborview-dining.com/jobs. — [4] —.</p>`,
    questions: [
      { q: "What is indicated about Harbor View?", o: ["It is closing its Bay Street location.", "It has received recognition.", "It specializes in vegetarian food.", "It is hiring only part-time staff."], a: 1, e: "'the city's award-winning seafood restaurant' → đã nhận giải thưởng (được công nhận)." },
      { q: "Where will interviews take place?", o: ["In Westfield", "Online only", "At 45 Bay Street", "At a job fair"], a: 2, e: "'Interviews will be held at our original location at 45 Bay Street'." },
      { q: "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n\"No appointment is necessary.\"", o: ["[1]", "[2]", "[3]", "[4]"], a: 2, e: "Câu 'Không cần đặt lịch hẹn' phù hợp ngay sau thông tin thời gian/địa điểm phỏng vấn → vị trí [3]." }
    ]
  },
  {
    id: "p7-5", part: 7,
    passage: `<p><b>Online chat discussion</b></p>
<p><b>Maria Lopez [2:02 P.M.]:</b> Team, the Hartwell account review has been moved up to tomorrow morning instead of Friday.</p>
<p><b>Tom Becker [2:03 P.M.]:</b> Tomorrow? I haven't finished the budget summary yet.</p>
<p><b>Aisha Rahman [2:04 P.M.]:</b> I can help with that. I have the figures from last quarter.</p>
<p><b>Tom Becker [2:05 P.M.]:</b> That would be great. Can you send them over?</p>
<p><b>Maria Lopez [2:06 P.M.]:</b> Thanks, Aisha. I'll handle the slides. Tom, can you have the summary to me by 6 P.M.?</p>
<p><b>Tom Becker [2:07 P.M.]:</b> I'll do my best.</p>
<p><b>Maria Lopez [2:08 P.M.]:</b> Also, the meeting will be in the main conference room, not Room 3.</p>`,
    questions: [
      { q: "What is the main topic of the discussion?", o: ["A change to a meeting schedule", "The hiring of a new employee", "A problem with a client's payment", "Preparing for a business trip"], a: 0, e: "Buổi đánh giá được dời lên sáng mai thay vì thứ Sáu → thay đổi lịch họp." },
      { q: "At 2:04 P.M., what does Ms. Rahman offer to do?", o: ["Prepare the slides", "Book a conference room", "Provide some data", "Contact the client"], a: 2, e: "'I have the figures from last quarter' → cung cấp số liệu." },
      { q: "At 2:07 P.M., what does Mr. Becker imply when he writes, \"I'll do my best\"?", o: ["He is confident the work is already done.", "He may not be able to meet the deadline.", "He wants to lead the meeting.", "He disagrees with the new location."], a: 1, e: "'I'll do my best' (tôi sẽ cố hết sức) ngụ ý không chắc chắn kịp hạn 6 giờ tối." },
      { q: "What is mentioned about the meeting?", o: ["It will be held in a different room than planned.", "It has been canceled.", "It will take place online.", "It will be on Friday."], a: 0, e: "'the meeting will be in the main conference room, not Room 3' → khác phòng so với dự kiến." }
    ]
  },
  {
    id: "p7-6", part: 7,
    passage: `<p><b>[Article]</b></p>
<p><b>Local Bakery Goes Green</b></p>
<p>(June 3) — Sunrise Bakery, a family-owned business on Main Street for over 30 years, has announced several changes aimed at reducing its environmental impact. Starting this month, the bakery will no longer provide plastic bags. Instead, customers can purchase reusable cloth bags for $2 or bring their own.</p>
<p>Owner Rachel Kim also said the bakery will begin donating unsold bread to the Eastside Community Food Bank at the end of each day. "We used to throw away a lot of bread," Ms. Kim said. "Now it will go to people who need it."</p>
<p>In addition, the bakery has installed solar panels on its roof, which are expected to cover about 40 percent of its electricity needs.</p>
<p>━━━━━━━━━━━━━━━━━━━</p>
<p><b>[E-mail]</b></p>
<p><b>To:</b> Rachel Kim<br><b>From:</b> Daniel Ortiz, Eastside Community Food Bank<br><b>Date:</b> July 10</p>
<p>Dear Ms. Kim,</p>
<p>On behalf of everyone at the food bank, thank you for your generous donations over the past month. Your bread has helped us serve over 200 additional families. We would like to feature your bakery in our monthly newsletter. Would you be available for a short interview next week? </p>
<p>Sincerely,<br>Daniel Ortiz</p>`,
    questions: [
      { q: "What is the article mainly about?", o: ["The opening of a new bakery", "A business's environmentally friendly efforts", "A bakery's new menu items", "Rising food prices"], a: 1, e: "Tiêu đề 'Local Bakery Goes Green' và nội dung về túi vải, quyên góp bánh, pin mặt trời → nỗ lực thân thiện môi trường." },
      { q: "What is indicated about Sunrise Bakery?", o: ["It has been in business for decades.", "It recently moved to Main Street.", "It sells plastic bags for $2.", "It gets all of its power from solar panels."], a: 0, e: "'on Main Street for over 30 years' → hoạt động hàng chục năm. Pin mặt trời chỉ đáp ứng 40%; túi vải (không phải nhựa) giá $2." },
      { q: "Why did Mr. Ortiz write to Ms. Kim?", o: ["To request a larger donation", "To thank her and request an interview", "To order bread for an event", "To complain about a delivery"], a: 1, e: "Ông cảm ơn sự quyên góp và hỏi 'Would you be available for a short interview next week?'." },
      { q: "What can be inferred about the bakery's donations?", o: ["They began in July.", "They consist of unsold bread.", "They are delivered weekly.", "They are made only on weekends."], a: 1, e: "Kết hợp hai văn bản: bài báo nói tiệm quyên góp bánh không bán hết ('unsold bread') mỗi cuối ngày; e-mail xác nhận food bank nhận được bánh → quyên góp là bánh tồn." },
      { q: "In the e-mail, the word \"feature\" in paragraph 1, line 3, is closest in meaning to", o: ["include as a highlight", "describe in detail", "design", "charge"], a: 0, e: "'feature your bakery in our newsletter' = giới thiệu nổi bật tiệm bánh trong bản tin → 'include as a highlight'." }
    ]
  }
);
