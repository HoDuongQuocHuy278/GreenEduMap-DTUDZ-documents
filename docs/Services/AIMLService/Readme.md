# 🤖 AI/ML Service

## Giới thiệu

AI/ML Service là một microservice chuyên biệt trong hệ thống **GreenEduMap**, cung cấp các chức năng trí tuệ nhân tạo và học máy để phân tích dữ liệu môi trường, giáo dục và không gian địa lý theo thời gian thực.

## Công nghệ sử dụng

- **Framework**: FastAPI (Python)
- **Machine Learning**: scikit-learn, TensorFlow/PyTorch
- **NLP**: spaCy, Transformers (Hugging Face)
- **Computer Vision**: OpenCV, YOLO
- **Message Queue**: RabbitMQ (Consumer)
- **Database**: PostgreSQL (read), Redis (cache)

## Chức năng chính

### 1. 🌳 Phân tích dữ liệu môi trường

- **Phân tích chất lượng không khí**: Dự đoán AQI từ dữ liệu cảm biến IoT
- **Phát hiện bất thường**: Phát hiện các mẫu bất thường trong dữ liệu môi trường (nhiệt độ, độ ẩm, CO2)
- **Dự báo xu hướng**: Dự đoán xu hướng biến đổi môi trường theo thời gian

### 2. 🎓 Xử lý ngôn ngữ tự nhiên (NLP)

- **Phân tích văn bản giáo dục**: Trích xuất thông tin từ tài liệu, bài viết về giáo dục
- **Phân loại nội dung**: Tự động phân loại và gắn thẻ nội dung giáo dục
- **Sentiment Analysis**: Phân tích cảm xúc từ phản hồi người dùng
- **Chatbot hỗ trợ**: Trả lời câu hỏi về môi trường và giáo dục

### 3. 👁️ Computer Vision

- **Phân tích hình ảnh vệ tinh**: Phát hiện thay đổi độ phủ xanh, sử dụng đất
- **Nhận diện đối tượng**: Phát hiện cơ sở hạ tầng giáo dục, công viên, cây xanh
- **Đánh giá chất lượng môi trường**: Phân tích hình ảnh để đánh giá mức độ xanh của khu vực

### 4. 📊 Machine Learning Models

- **Mô hình dự đoán**: Dự đoán chất lượng môi trường, nhu cầu giáo dục
- **Mô hình phân cụm**: Phân cụm trường học, khu vực theo đặc điểm môi trường
- **Mô hình khuyến nghị**: Gợi ý trường học, lộ trình di chuyển xanh

## Kiến trúc Service

```
┌─────────────────────────────────────────┐
│         AI/ML Service (FastAPI)         │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │   NLP    │  │ Computer │  │  ML    ││
│  │  Engine  │  │  Vision  │  │ Models ││
│  └──────────┘  └──────────┘  └────────┘│
│  ┌──────────────────────────────────┐  │
│  │      Model Management Layer      │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │       RabbitMQ Consumer          │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
         ↓                    ↑
    [RabbitMQ]          [Backend Core]
         ↓                    ↑
    [IoT Data]          [API Requests]
```

## Luồng xử lý dữ liệu

### 1. Event-Driven Processing (Xử lý theo sự kiện)

```
IoT Sensor → MQTT → RabbitMQ → AI Service → Analysis → Update DB
```

- AI Service lắng nghe queue từ RabbitMQ
- Nhận dữ liệu cảm biến môi trường real-time
- Thực hiện phân tích và dự đoán
- Gửi kết quả về Backend Core hoặc FiWARE Orion-LD

### 2. API-Based Processing (Xử lý theo yêu cầu)

```
Client → API Gateway → Backend Core → AI Service → Response
```

- Nhận yêu cầu phân tích từ Backend Core
- Xử lý dữ liệu (NLP, Computer Vision, ML)
- Trả về kết quả qua REST API

## Tích hợp với các Service khác

### 🔗 Backend Core (FastAPI)
- Nhận yêu cầu phân tích qua REST API
- Cung cấp kết quả dự đoán cho các module nghiệp vụ
- Đồng bộ dữ liệu huấn luyện mô hình

### 📨 RabbitMQ
- Consumer: Lắng nghe queue để nhận dữ liệu IoT
- Publisher: Đẩy kết quả phân tích vào queue cho các service khác

### 🗄️ PostgreSQL + PostGIS
- Đọc dữ liệu lịch sử để huấn luyện mô hình
- Lưu trữ kết quả dự đoán và phân tích

### 🌐 FiWARE Orion-LD
- Cập nhật entity với kết quả phân tích AI
- Đồng bộ dữ liệu ngữ nghĩa (Semantic Data)

### ⚡ Redis
- Cache kết quả dự đoán
- Lưu trữ tạm thời model inference results

## API Endpoints

### Phân tích môi trường
```
POST /api/v1/ai/environment/analyze
POST /api/v1/ai/environment/predict-aqi
POST /api/v1/ai/environment/detect-anomaly
```

### NLP
```
POST /api/v1/ai/nlp/classify
POST /api/v1/ai/nlp/extract-entities
POST /api/v1/ai/nlp/sentiment
```

### Computer Vision
```
POST /api/v1/ai/vision/analyze-image
POST /api/v1/ai/vision/detect-greenery
POST /api/v1/ai/vision/classify-landuse
```

### Machine Learning
```
POST /api/v1/ai/ml/predict
POST /api/v1/ai/ml/recommend
GET  /api/v1/ai/models
```

## Cấu hình môi trường

```env
# AI Service Configuration
AI_SERVICE_HOST=0.0.0.0
AI_SERVICE_PORT=8001

# RabbitMQ
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_USER=admin
RABBITMQ_PASS=admin123

# Database
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=greenedumap

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Model Storage
MODEL_PATH=/app/models
MODEL_CACHE_SIZE=1GB
```

## Deployment

Service được deploy trong Docker container và quản lý bởi Docker Compose:

```yaml
ai-service:
  build: ./services/ai-service
  ports:
    - "8001:8001"
  depends_on:
    - rabbitmq
    - postgres
    - redis
  volumes:
    - ./models:/app/models
  environment:
    - RABBITMQ_HOST=rabbitmq
    - POSTGRES_HOST=postgres
```

## Monitoring & Logging

- **Metrics**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Tracing**: Jaeger (distributed tracing)

## License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
