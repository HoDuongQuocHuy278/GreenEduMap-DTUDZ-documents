# 🏗️ Kiến trúc hệ thống GreenEduMap

![Kiến trúc hệ thống](../static/img/Kien_truc_he_thong_GreenEduMap.png)

## Tổng quan

GreenEduMap được thiết kế theo kiến trúc **Microservices** hướng sự kiện (Event-Driven), tích hợp IoT và AI để xử lý dữ liệu môi trường và giáo dục theo thời gian thực.

## Thành phần và công nghệ

| Thành phần | Công nghệ sử dụng | Vai trò |
# 🏗️ Kiến trúc hệ thống GreenEduMap

![Kiến trúc hệ thống](../static/img/Kien_truc_he_thong_GreenEduMap.png)

## Tổng quan

GreenEduMap được thiết kế theo kiến trúc **Microservices** hướng sự kiện (Event-Driven), tích hợp IoT và AI để xử lý dữ liệu môi trường và giáo dục theo thời gian thực.

## Thành phần và công nghệ

| Thành phần | Công nghệ sử dụng | Vai trò |
| :--- | :--- | :--- |
| **Frontend** | React Native (App), Next.js (Web) | Giao diện người dùng, bản đồ 3D |
| **API Gateway** | Traefik, Keycloak (Auth) | Routing, bảo mật, xác thực |
| **Backend Core** | FastAPI (Python), Redis (Cache) | Xử lý logic chính, API Management |
| **Database** | PostgreSQL + PostGIS | Lưu trữ dữ liệu không gian, quan hệ |
| **Message Broker** | RabbitMQ, MQTT (EMQX/Mosquitto) | Xử lý thông điệp, IoT ingestion |
| **IoT Ingestion** | MQTT Broker, IoT Adapter | Thu thập dữ liệu từ cảm biến |
| **AI Services** | FastAPI (Python) | NLP, Computer Vision, scikit-learn |
| **Semantic Web** | Context Broker, RML Mapper | Quản lý ngữ nghĩa, chuẩn hóa dữ liệu (LOD) |
| **Realtime** | Reverb (WebSocket) | Thông báo thời gian thực |
| **Database** | PostgreSQL + PostGIS (GeoData), OpenSearch | Lưu trữ dữ liệu |
| **Semantic** | FiWARE Orion-LD, MongoDB | Quản lý ngữ cảnh, Linked Data |

## Luồng dữ liệu chi tiết

### 1. Ingestion Layer (Thu thập dữ liệu)
- **Sensor & IoT**: Các thiết bị cảm biến gửi dữ liệu qua **MQTT Broker**.
- **RabbitMQ**: Đóng vai trò backbone cho việc truyền tải dữ liệu sự kiện (event streaming) từ IoT và các services khác.
- **Adapters**:
    - **IoT Adapter**: Chuẩn hóa dữ liệu cảm biến từ MQTT đẩy vào RabbitMQ.
    - **NLP**: Xử lý dữ liệu văn bản.

### 2. Core Layer (Xử lý trung tâm)
- **API Gateway (Traefik)**: Điều hướng request và tích hợp với **Keycloak** để xác thực (JWT).
- **Backend Core (FastAPI)**:
    - Xử lý nghiệp vụ chính (User, School, Education).
    - Tương tác với Database và Cache.
    - Gửi job xử lý nền vào Queue.
- **Context Broker (FiWARE Orion-LD)**: Quản lý dữ liệu ngữ cảnh (Context Data) theo chuẩn NGSI-LD, lưu trữ entity vào MongoDB.

### 3. Processing & AI Layer
- **AI Services (FastAPI)**:
    - Nhận dữ liệu từ RabbitMQ hoặc API call từ Backend Core.
    - Thực hiện phân tích NLP, Computer Vision.
- **Workers**: Các worker (Celery Worker) xử lý tác vụ từ RabbitMQ/Redis.

### 4. Storage Layer (Lưu trữ)
- **PostgreSQL + PostGIS**: Lưu trữ dữ liệu quan hệ và không gian (GIS).
- **MongoDB**: Lưu trữ dữ liệu ngữ nghĩa (Semantic Data) cho Orion-LD.
- **OpenSearch**: Hỗ trợ tìm kiếm full-text và log aggregation.

### 5. Notification & Realtime Layer
- **Reverb**: Server WebSocket để đẩy thông báo realtime xuống Client (Web/App).
- **Notify Service**: Module để gửi Email/SMS/Push Notification.

## Kiến trúc Microservices

Hệ thống bao gồm các thành phần chính:

- **FastAPI Core**: Service chính quản lý logic nghiệp vụ.
- **AI Service (Python)**: Service chuyên biệt cho AI/ML.
- **FiWARE Orion-LD**: Service quản lý Context & IoT.
- **Auth Service (Keycloak)**: Quản lý định danh tập trung.

## Quy trình hoạt động chính

1.  **Client (App/Web)** gọi API qua **Traefik** -> **FastAPI Core**.
2.  **FastAPI Core** xử lý logic, lưu DB, và bắn sự kiện sang **RabbitMQ** (nếu cần).
3.  **IoT Device** gửi data -> **MQTT** -> **RabbitMQ** -> **FastAPI/FiWARE** tiêu thụ.
4.  **FiWARE Orion-LD** cập nhật trạng thái thực thể (Entity) vào **MongoDB**.
5.  **AI Service** lắng nghe **RabbitMQ**, phân tích và cập nhật lại kết quả.
6.  **Reverb** nhận sự kiện từ **FastAPI/RabbitMQ** và đẩy xuống Client.

Xem chi tiết hướng dẫn cài đặt tại [Installation.md](./Installation.md).
