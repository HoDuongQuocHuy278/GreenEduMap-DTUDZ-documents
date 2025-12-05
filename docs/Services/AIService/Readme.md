# 🤖 AI Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8006  
**Database:** PostgreSQL (read-only)  
**Message Queue:** RabbitMQ  
**Trạng thái:** ✅ Hoạt động

AI Service cung cấp các chức năng machine learning cho hệ thống **GreenEduMap**, bao gồm phân vùng, dự báo và phân tích tương quan.

---

## 🎯 Chức năng chính

### 🌳 Phân tích Dữ liệu Môi trường

**Phân tích chất lượng không khí**: Dự đoán chỉ số AQI từ dữ liệu cảm biến IoT bao gồm PM2.5, PM10, nhiệt độ và độ ẩm.

**Phát hiện bất thường**: Tự động detect các giá trị bất thường trong dữ liệu môi trường như đột biến nhiệt độ, độ ẩm hoặc nồng độ CO2.

**Dự báo xu hướng**: Predict biến đổi môi trường trong 7 ngày tới dựa trên dữ liệu lịch sử.

### 🎓 Xử lý Ngôn ngữ Tự nhiên (NLP)

**Phân tích văn bản giáo dục**: Trích xuất thông tin quan trọng từ tài liệu, bài viết về giáo dục môi trường.

**Phân loại nội dung**: Tự động gắn thẻ và phân loại nội dung giáo dục theo chủ đề.

**Sentiment Analysis**: Phân tích cảm xúc từ phản hồi người dùng để đánh giá chất lượng dịch vụ.

**Chatbot hỗ trợ**: Trả lời tự động các câu hỏi về môi trường và giáo dục xanh.

### 👁️ Computer Vision

**Phân tích hình ảnh vệ tinh**: Phát hiện thay đổi độ phủ xanh và sử dụng đất theo thời gian.

**Nhận diện đối tượng**: Detect tự động các cơ sở giáo dục, công viên và cây xanh trong hình ảnh.

**Đánh giá môi trường**: Phân tích mức độ xanh của khu vực từ hình ảnh.

### 📊 Machine Learning Models

**Mô hình dự đoán**: Predict chất lượng môi trường tương lai và nhu cầu giáo dục theo khu vực.

**Mô hình phân cụm**: Cluster trường học và khu vực theo đặc điểm môi trường, tạo ra các vùng xanh/vàng/đỏ.

**Mô hình khuyến nghị**: Gợi ý trường học phù hợp và lộ trình di chuyển xanh cho người dùng.

---

## 🏗️ Kiến trúc Service

### Các thành phần chính:
- **NLP Engine** - Xử lý ngôn ngữ tự nhiên
- **Computer Vision** - Phân tích hình ảnh
- **ML Models** - Machine learning predictions
- **Model Management** - Quản lý và load models
- **RabbitMQ Consumer** - Nhận message từ queue

---

## 🔄 Luồng Xử lý Dữ liệu

### Xử lý theo Sự kiện
Dữ liệu từ IoT Sensor được gửi qua MQTT đến RabbitMQ. AI Service consume message, thực hiện phân tích và dự đoán, sau đó cập nhật kết quả vào database.

### Xử lý theo Yêu cầu
Client gửi request qua API Gateway, được route đến AI Service. Service xử lý bằng NLP, Computer Vision hoặc ML models tùy theo yêu cầu, rồi trả về kết quả.

---

## 🔗 Tích hợp Services

- **Backend Core**: Nhận request phân tích, trả kết quả dự đoán, đồng bộ dữ liệu training
- **RabbitMQ**: Consumer nhận IoT data, Publisher gửi kết quả cho services khác
- **PostgreSQL + PostGIS**: Đọc dữ liệu lịch sử để train, lưu kết quả phân tích
- **Redis**: Cache kết quả dự đoán để tăng performance

---

## 📊 Giám sát

- **Prometheus + Grafana** - Metrics monitoring
- **ELK Stack** - Logging với Elasticsearch, Logstash, Kibana
- **Jaeger** - Distributed tracing

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
