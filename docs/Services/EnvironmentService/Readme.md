# 🌍 Environment Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8007  
**Database:** PostgreSQL + PostGIS  
**External APIs:** OpenAQ, OpenWeather  
**Trạng thái:** ✅ Hoạt động

Environment Service tích hợp dữ liệu môi trường từ các nguồn bên ngoài để phục vụ hệ thống **GreenEduMap**.

---

## 🎯 Chức năng chính

### 🌫️ Dữ liệu Chất lượng Không khí

Tích hợp từ **OpenAQ API** để cung cấp:
- **Dữ liệu thời gian thực**: PM2.5, PM10, CO, CO2, NO2 và chỉ số AQI
- **Dữ liệu lịch sử**: Time-series cho phân tích xu hướng
- **Truy vấn theo vị trí**: Tìm dữ liệu trong bán kính xác định
- **Dữ liệu bản đồ nhiệt**: Hỗ trợ visualization

### ☀️ Dữ liệu Thời tiết

Tích hợp từ **OpenWeather API** để cung cấp:
- **Thời tiết hiện tại**: Nhiệt độ, độ ẩm, gió, áp suất và mô tả điều kiện
- **Dự báo 5 ngày**: Cập nhật mỗi 3 giờ với nhiệt độ dự đoán, xác suất mưa
- **Truy vấn theo vị trí**: Thời tiết theo tọa độ hoặc thành phố

### 🔄 Cập nhật Dữ liệu Tự động

Sử dụng APScheduler để lên lịch:
- **Chất lượng không khí**: Cập nhật mỗi 1 giờ
- **Thời tiết**: Cập nhật mỗi 30 phút
- **Dọn dẹp dữ liệu cũ**: Chạy hàng ngày

### 📡 Tạo Entity NGSI-LD

Service tự động tạo các entity theo chuẩn Smart Cities:
- **AirQualityObserved**: Dữ liệu quan trắc chất lượng không khí
- **WeatherObserved**: Dữ liệu quan trắc thời tiết

Tuân thủ ETSI GS CIM 009 V1.6.1 với hỗ trợ GeoProperty.

---

## 🔗 APIs Bên ngoài

### OpenAQ
- **Free tier**: 10,000 requests/tháng
- **API Key**: Không cần (public API)
- **Dữ liệu**: Chất lượng không khí toàn cầu

### OpenWeather
- **Free tier**: 60 calls/phút, 1 triệu calls/tháng
- **API Key**: Cần đăng ký
- **Dữ liệu**: Thời tiết và dự báo

---

## 💾 Dữ liệu lưu trữ

### Chất lượng Không khí
Mỗi measurement bao gồm: ID định danh, tên vị trí, tọa độ địa lý, chỉ số AQI, các giá trị PM2.5 và PM10 (µg/m³), cùng thời điểm đo.

### Thời tiết
Mỗi observation bao gồm: nhiệt độ (°C), độ ẩm (%), tốc độ gió (m/s), mô tả điều kiện thời tiết và thời điểm đo.

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
