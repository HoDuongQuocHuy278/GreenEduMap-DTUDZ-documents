# 📚 GreenEduMap Services Documentation

Tài liệu chi tiết về các microservices trong hệ thống **GreenEduMap**.

---

## 🏗️ Kiến trúc Microservices

Hệ thống GreenEduMap được thiết kế theo kiến trúc microservices hiện đại, với các thành phần được tách biệt rõ ràng:

### Tầng Client
Web App, Mobile App và External Services kết nối thông qua API Gateway.

### Tầng Gateway  
**API Gateway (Port 8000)** là điểm truy cập duy nhất, xử lý routing, authentication và rate limiting.

### Tầng Core Services
- **Auth Service** - Xác thực và phân quyền người dùng
- **Environment Service** - Dữ liệu môi trường (không khí, thời tiết)
- **Education Service** - Quản lý trường học và khóa học xanh
- **Resource Service** - Tài nguyên xanh và trung tâm cứu trợ

### Tầng Support Services
- **OpenData Service** - Cung cấp dữ liệu mở theo chuẩn quốc tế
- **AI Service** - Machine Learning và phân tích dữ liệu

### Tầng Infrastructure
PostgreSQL + PostGIS, RabbitMQ, Redis

---

## 📋 Danh sách Services

### 🌐 [API Gateway Service](./APIGatewayService/Readme.md)
**Port:** 8000 | **Tech:** Python + FastAPI

Cổng trung tâm cho tất cả các microservices, đảm nhận việc định tuyến request, quản lý rate limit và CORS, cung cấp public OpenData API không cần xác thực.

---

### 🔐 [Auth Service](./AuthService/Readme.md)
**Port:** 8001 | **Tech:** Python + FastAPI | **DB:** PostgreSQL

Quản lý toàn bộ xác thực và phân quyền: đăng ký/đăng nhập, JWT tokens, RBAC với 5 vai trò (admin, developer, volunteer, citizen, school), API key cho developers.

---

### 🎓 [Education Service](./EducationService/Readme.md)
**Port:** 8008 | **Tech:** Python + FastAPI | **DB:** PostgreSQL + PostGIS

Quản lý trường học với hỗ trợ địa lý PostGIS, tính toán điểm xanh (0-100) dựa trên cơ sở vật chất và khóa học, theo dõi chương trình giáo dục môi trường.

---

### 🌍 [Environment Service](./EnvironmentService/Readme.md)
**Port:** 8007 | **Tech:** Python + FastAPI | **DB:** PostgreSQL + PostGIS

Tích hợp dữ liệu từ OpenAQ (chất lượng không khí) và OpenWeather (thời tiết), tự động cập nhật theo lịch, hỗ trợ NGSI-LD cho Smart Cities.

---

### 🌐 [OpenData Service](./OpenDataService/Readme.md)
**Port:** 8009 | **Tech:** Python + FastAPI | **DB:** PostgreSQL (read-only)

Cung cấp dữ liệu mở theo chuẩn NGSI-LD, DCAT-AP với nhiều định dạng xuất: CSV, GeoJSON, RDF phục vụ chia sẻ dữ liệu mở Smart City.

---

### 🌳 [Resource Service](./ResourceService/Readme.md)
**Port:** 8004 | **Tech:** Python + FastAPI | **DB:** PostgreSQL + PostGIS

Quản lý khu vực xanh (công viên, vườn, rừng), tài nguyên xanh và trung tâm cứu trợ với hỗ trợ truy vấn không gian PostGIS.

---

### 🤖 [AI Service](./AIService/Readme.md)
**Port:** 8006 | **Tech:** Python + FastAPI | **Queue:** RabbitMQ

Machine Learning cho GreenEduMap: phân vùng K-Means, dự báo AQI 7 ngày, phân tích tương quan môi trường-giáo dục, xử lý NLP.

---

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Web framework Python hiện đại
- **SQLAlchemy** - Async ORM
- **Pydantic v2** - Data validation

### Databases
- **PostgreSQL 15** - Database chính
- **PostGIS** - Extension địa lý
- **Redis** - Caching và rate limiting

### Message Queue
- **RabbitMQ** - Xử lý task bất đồng bộ

### External APIs
- **OpenAQ** - Dữ liệu chất lượng không khí
- **OpenWeather** - Dữ liệu thời tiết

### Chuẩn tuân thủ
- **NGSI-LD** - Smart Cities (ETSI GS CIM 009)
- **DCAT-AP** - Data catalog (v2.1.1)
- **GeoJSON** - Dữ liệu địa lý (RFC 7946)

---

## 🔒 Bảo mật

- JWT Authentication với access và refresh tokens
- Password hashing bằng Bcrypt (12 rounds)
- API Keys cho developer access
- Rate limiting theo IP và key
- Role-based access control (RBAC)

---

## 📈 Giám sát

- Health checks tại `/health` trên tất cả services
- Metrics Prometheus tại `/metrics`
- Structured JSON logging
- Distributed tracing với correlation IDs

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
