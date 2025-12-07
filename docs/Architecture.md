# 🏗️ Kiến trúc hệ thống GreenEduMap

![Kiến trúc hệ thống](../static/img/Kien_truc_he_thong_GreenEduMap.png)

## Tổng quan

GreenEduMap được thiết kế theo kiến trúc **Microservices** hướng sự kiện (Event-Driven), tích hợp IoT và AI để xử lý dữ liệu môi trường và giáo dục theo thời gian thực.

## Thành phần và công nghệ

| Thành phần | Công nghệ sử dụng | Vai trò |
| :--- | :--- | :--- |
| **Web App** | Next.js 14 | Giao diện web, bản đồ 3D |
| **Mobile App** | React Native (iOS & Android) | Ứng dụng di động đa nền tảng |
| **Backend Core** | FastAPI (Python), Redis (Cache), JWT | Xử lý logic chính, API Management |
| **AI/ML Service** | Python 3.11, scikit-learn, pandas, aio-pika | NLP, Machine Learning, xử lý dữ liệu |
| **Message Broker** | RabbitMQ, MQTT (EMQX) | Xử lý thông điệp, IoT ingestion |
| **IoT Ingestion** | MQTT Broker, IoT Adapter | Thu thập dữ liệu từ cảm biến |
| **Database** | PostgreSQL + PostGIS, MongoDB | Lưu trữ dữ liệu quan hệ và NoSQL |
| **Semantic Layer** | FiWARE Orion-LD (NGSI-LD) | Quản lý ngữ cảnh, Linked Data |
| **Real-time** | WebSocket | Thông báo thời gian thực |

## Luồng dữ liệu chi tiết

### 1. Ingestion Layer (Thu thập dữ liệu)
- **Sensor & IoT**: Các thiết bị cảm biến gửi dữ liệu qua **MQTT Broker**.
- **RabbitMQ**: Đóng vai trò backbone cho việc truyền tải dữ liệu sự kiện (event streaming) từ IoT và các services khác.
- **Adapters**:
    - **IoT Adapter**: Chuẩn hóa dữ liệu cảm biến từ MQTT đẩy vào RabbitMQ.

### 2. Core Layer (Xử lý trung tâm)
- **Backend Core (FastAPI)**:
    - Điều hướng request và xác thực với JWT.
    - Xử lý nghiệp vụ chính (User, School, Education).
    - Tương tác với Database và Cache.
    - Gửi job xử lý nền vào Queue.
- **Context Broker (FiWARE Orion-LD)**: Quản lý dữ liệu ngữ cảnh (Context Data) theo chuẩn NGSI-LD, lưu trữ entity vào MongoDB.

### 3. Processing & AI Layer
- **AI Services (FastAPI)**:
    - Nhận dữ liệu từ RabbitMQ hoặc API call từ Backend Core.
    - Thực hiện phân tích NLP.
- **Workers**: Các worker (Celery Worker) xử lý tác vụ từ RabbitMQ/Redis.

### 4. Storage Layer (Lưu trữ)
- **PostgreSQL + PostGIS**: Lưu trữ dữ liệu quan hệ và không gian (GIS).
- **MongoDB**: Lưu trữ dữ liệu ngữ nghĩa (Semantic Data) cho Orion-LD.

### 5. Notification & Realtime Layer
- **WebSocket**: Đẩy thông báo realtime xuống Client (Web/App).
- **Notify Service**: Module để gửi Email/SMS/Push Notification.

## Kiến trúc Microservices

Hệ thống bao gồm các thành phần chính:

- **FastAPI Core**: Service chính quản lý logic nghiệp vụ.
- **AI Service (Python)**: Service chuyên biệt cho AI/ML.
- **FiWARE Orion-LD**: Service quản lý Context & IoT.
- **Auth Service (JWT)**: Xác thực người dùng.

## Quy trình hoạt động chính

1.  **Client (App/Web)** gọi API đến **FastAPI Core**.
2.  **FastAPI Core** xử lý logic, lưu DB, và bắn sự kiện sang **RabbitMQ** (nếu cần).
3.  **IoT Device** gửi data -> **MQTT** -> **RabbitMQ** -> **FastAPI/FiWARE** tiêu thụ.
4.  **FiWARE Orion-LD** cập nhật trạng thái thực thể (Entity) vào **MongoDB**.
5.  **AI Service** lắng nghe **RabbitMQ**, phân tích và cập nhật lại kết quả.
6.  **WebSocket** nhận sự kiện từ **FastAPI/RabbitMQ** và đẩy xuống Client.

Xem chi tiết hướng dẫn cài đặt tại [Installation.md](./Installation.md).
