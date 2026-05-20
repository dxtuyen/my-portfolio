---
title: "Từ Monolithic đến Serverless: Cuộc tiến hóa của kiến trúc hệ thống"
description: "Chúng ta thường nghe nhiều về Cloud, Microservices hay Serverless. Nhưng tại sao thế giới công nghệ lại dịch chuyển theo hướng này? Hãy cùng nhìn lại bức tranh tổng thể."
date: 2026-05-18
readTime: "8 phút đọc"
tags: ["kiến trúc", "cloud", "serverless"]
---

Khi mới bước chân vào con đường lập trình, hầu hết chúng ta đều bắt đầu với kiến trúc **Monolithic** (Nguyên khối). Bạn viết code giao diện, xử lý logic, kết nối cơ sở dữ liệu... và đóng gói tất cả vào chung một dự án duy nhất. Nhấn "Run" và mọi thứ hoạt động. Giai đoạn đầu, Monolithic là một sự lựa chọn tuyệt vời: dễ phát triển, dễ test và dễ deploy.

Nhưng hãy tưởng tượng một hệ thống thương mại điện tử vào ngày Black Friday. Lượng người dùng đổ xô vào xem hàng khiến tính năng "Tìm kiếm" bị quá tải. Với Monolithic, để hệ thống không sập, bạn phải mở rộng (scale) toàn bộ ứng dụng. Điều này giống như việc bạn chỉ cần thêm một cái bếp lò, nhưng lại phải xây thêm cả một nhà hàng mới vậy. Vô cùng lãng phí tài nguyên.

Đó là lúc ngành công nghiệp phần mềm chuyển mình sang **Microservices**.

## Microservices — chia để trị

Thay vì một khối khổng lồ, Microservices chia ứng dụng thành các dịch vụ nhỏ, độc lập. Dịch vụ thanh toán riêng, dịch vụ giỏ hàng riêng, dịch vụ xác thực người dùng riêng. Lúc này, tính năng nào bị quá tải thì ta chỉ cần cấp thêm tài nguyên cho tính năng đó. Hơn nữa, nếu dịch vụ "Gửi email" bị sập, người dùng vẫn có thể tiếp tục mua hàng bình thường.

Tuy nhiên, "Bữa trưa không có gì là miễn phí". Đánh đổi lớn nhất của Microservices chính là sự phức tạp về hạ tầng mạng (Network). Các dịch vụ giờ đây không thể gọi hàm trực tiếp trong code nữa, mà phải giao tiếp với nhau qua API. Độ trễ mạng (latency), lỗi kết nối, rớt gói tin bắt đầu xuất hiện. Việc theo dõi (monitor) một luồng request đi qua hàng chục service khác nhau trở thành một bài toán đau đầu, đòi hỏi phải có những công cụ điều phối khổng lồ như Kubernetes hay Docker Swarm.

## Serverless — viết code, quên server

Đứng trước bài toán hạ tầng ngày càng cồng kềnh đó, Điện toán đám mây (Cloud Computing) đã tung ra một đòn bẩy mới: **Serverless**.

Đừng để cái tên đánh lừa, Serverless không có nghĩa là "không có máy chủ". Nó có nghĩa là bạn (nhà phát triển) không cần phải quan tâm đến máy chủ nữa. Bạn chỉ cần viết một đoạn code logic (Function), đẩy lên các nền tảng như AWS Lambda hay Google Cloud Functions. Khi có người dùng truy cập, nhà cung cấp Cloud sẽ tự động cấp phát tài nguyên để chạy đoạn code đó. Khi không có ai dùng, hệ thống tắt đi và bạn không tốn một xu nào. Trọng tâm của lập trình viên được trả về đúng nguyên thủy của nó: Viết code tạo ra giá trị, thay vì ngồi cấu hình server.

## Nguyên lý biện chứng

Nhìn lại toàn bộ quá trình tiến hóa này, ta thấy một nguyên lý biện chứng rất rõ ràng: Mọi giải pháp kiến trúc đều giải quyết một nỗi đau cũ, nhưng đồng thời lại sinh ra một bài toán mới. Không có giải pháp nào là "viên đạn bạc" (silver bullet) hoàn hảo cho mọi trường hợp. Một startup mới mở không nên đâm đầu vào Kubernetes, và một gã khổng lồ công nghệ không thể ôm khư khư cục Monolithic. Lựa chọn kiến trúc tốt nhất, suy cho cùng, là sự thấu hiểu sâu sắc bài toán hiện tại của chính mình.
