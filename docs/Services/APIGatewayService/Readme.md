# 🌐 API Gateway Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8000  
**Trạng thái:** ✅ Hoạt động

API Gateway là cổng trung tâm cho kiến trúc microservices của **GreenEduMap**, cung cấp điểm truy cập duy nhất cho tất cả các dịch vụ backend.

---

## 🎯 Chức năng chính

### 🔀 Định tuyến và Điều phối

Gateway tiếp nhận tất cả request từ client và chuyển tiếp đến microservice phù hợp. Hỗ trợ load balancing giữa các instance, circuit breaker để xử lý lỗi service, và retry logic với exponential backoff cho các request thất bại.

### 🔍 Service Discovery

Tự động phát hiện các services đang hoạt động, thực hiện health check định kỳ, cấu hình routing động và xử lý failover khi service gặp sự cố.

### 🌍 Public OpenData API

Cung cấp dữ liệu công khai **không yêu cầu xác thực**, tuân thủ chuẩn Open Data:
- Dữ liệu chất lượng không khí theo vị trí
- Thời tiết hiện tại và dự báo
- Thông tin trường học và điểm xanh
- Danh sách khóa học giáo dục môi trường
- Xuất dữ liệu CSV và GeoJSON

### 🔗 Hỗ trợ NGSI-LD

Gateway hỗ trợ chuẩn **NGSI-LD** (ETSI GS CIM 009) cho Smart Cities, cho phép quản lý entities theo chuẩn quốc tế với các thao tác tạo, đọc, cập nhật và xóa.

### 🛡️ Bảo mật và Rate Limiting

- **Rate Limiting**: Giới hạn request theo IP và API key, sử dụng Redis để lưu trữ counters
- **CORS**: Cấu hình linh hoạt cho phép các origin được chỉ định
- **Authentication**: Xác thực JWT token và API key cho các endpoint được bảo vệ

### 📊 Giám sát và Logging

Gateway thu thập metrics về thời gian xử lý request, tỷ lệ lỗi, throughput và trạng thái các downstream services. Hỗ trợ distributed tracing với correlation IDs để theo dõi request end-to-end.

---

## 🏗️ Các thành phần

- **Rate Limiter** - Kiểm soát số lượng request
- **CORS Handler** - Xử lý Cross-Origin requests
- **Router** - Định tuyến đến services phù hợp
- **Auth Checker** - Xác thực JWT và API Key
- **Logger** - Ghi log structured JSON
- **Metrics** - Thu thập Prometheus metrics

---

## 🔌 Kết nối Services

Gateway kết nối và điều phối 6 microservices:
- **Auth Service** (8001) - Xác thực và phân quyền
- **Environment Service** (8007) - Dữ liệu môi trường
- **Education Service** (8008) - Trường học và khóa học
- **Resource Service** (8004) - Khu vực xanh và tài nguyên
- **AI Service** (8006) - Machine learning
- **OpenData Service** (8009) - Dữ liệu mở

---

## 🔍 Health Check

Gateway cung cấp endpoint kiểm tra sức khỏe tổng hợp, hiển thị trạng thái của bản thân gateway, tất cả downstream services và các dependencies như Redis, RabbitMQ.

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
