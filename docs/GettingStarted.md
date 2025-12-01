# Tổng quan về CityResQ360

![Banner](../static/img/Banner.png)

> _"🏙️ Smart City Platform 🤖"_

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](../LICENSE)

## 📖 Giới thiệu

**CityResQ360** là hệ thống web + mobile mã nguồn mở giúp người dân, chính quyền và hệ thống AI phối hợp trong việc phát hiện, phản ánh và xử lý sự cố đô thị theo thời gian thực.

## 🎯 Mục tiêu

- **Tăng tính minh bạch**: Mọi phản ánh được ghi nhận và theo dõi công khai
- **Tối ưu hóa quy trình**: Sử dụng AI để phân loại, đánh giá mức độ và gợi ý xử lý
- **Dữ liệu mở**: Xây dựng hệ thống dữ liệu đô thị mở theo chuẩn NGSI-LD
- **Khuyến khích tham gia**: Hệ thống CityPoint thưởng điểm cho đóng góp hữu ích

## 💡 Tính năng chính

### 🤖 Phản ánh & nhận diện tự động

- AI Vision phân tích hình ảnh
- NLP xử lý mô tả văn bản
- Phân loại mức độ nguy hiểm
- Cảnh báo khẩn cấp

### 📡 Giám sát & quản lý realtime

- Bản đồ trực quan
- Dashboard thống kê
- Quản lý sự cố
- Chỉ số minh bạch

### 🏦 CityWallet – Hệ thống điểm thưởng

- CityPoint token
- Đổi quà/voucher
- Gamification

## 🏗️ Kiến trúc hệ thống

### Frontend

- React Native - Ứng dụng di động
- Bản đồ realtime
- Camera integration

### Backend

- Laravel Framework - API REST
- Python FastAPI - AI Services
- Microservices architecture

### Database & Storage

- PostgreSQL/PostGIS - Dữ liệu quan hệ và địa lý
- MinIO/S3 - Lưu trữ media
- OpenSearch - Tìm kiếm
- Redis - Cache

### Message Queue

- Kafka - Event streaming
- MQTT - IoT sensors

### AI/ML

- YOLOv8 / Detectron2 - Computer Vision
- PhoBERT / XLM-R - NLP

## 👥 Đối tượng người dùng

### 👥 Người dân

- Gửi phản ánh với hình ảnh và vị trí GPS
- Theo dõi tiến trình xử lý
- Nhận cảnh báo realtime
- Nhận điểm thưởng CityPoint

### 🏛️ Cơ quan chức năng

- Quản lý và xử lý phản ánh
- Dashboard thống kê
- Phân công nhiệm vụ
- Theo dõi hiệu quả

### 🤝 NGO/Tình nguyện viên

- Truy cập dữ liệu mở
- Kết nối IoT sensors
- Phân tích xu hướng

### 🧑‍💼 Quản trị viên

- Quản lý người dùng và phân quyền
- Giám sát hệ thống
- Cấu hình và tích hợp

### 🧠 Nhà nghiên cứu

- Dữ liệu mở cho nghiên cứu
- API để phân tích
- Mô hình Digital Twin

## ⚙️ Yêu cầu hệ thống

| Software       | Minimum Version |
| -------------- | --------------- |
| **Laravel**    | 12x             |
| **Python**     | 3.10+           |
| **Node.js**    | >=18.0.0        |
| **PostgreSQL** | 14+             |
| **Redis**      | 7.0+            |
| **Kafka**      | 3.0+            |

## 🔐 Bảo mật

- Xác thực đa yếu tố
- Mã hóa dữ liệu
- API rate limiting
- Access control

## 👥 Team Members

| Role      | Name                     | Email                                                                 |
| --------- | ------------------------ | --------------------------------------------------------------------- |
| Developer | **Lê Thanh Trường**      | [thanhtruong23111999@gmail.com](mailto:thanhtruong23111999@gmail.com) |
| Developer | **Nguyễn Văn Nhân**      | [vannhan130504@gmail.com](mailto:vannhan130504@gmail.com)             |
| Developer | **Nguyễn Ngọc Duy Thái** | [kkdn011@gmail.com](mailto:kkdn011@gmail.com)                         |

## 🤝 Đóng góp

```bash
# 1. Fork repository
git clone https://github.com/MNM-DTU-DZ/CityResQ360-DTUDZ.git
cd CityResQ360-DTUDZ

# 2. Create feature branch
git checkout -b feat/my-feature

# 3. Commit changes
git commit -m "feat: add new feature"

# 4. Create Pull Request
git push origin feat/my-feature
```

## 📝 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/MNM-DTU-DZ/CityResQ360-DTUDZ/blob/master/LICENSE). Xem file `LICENSE` để biết thêm chi tiết.

© 2025 CityResQ360 – Được phát triển với ❤️ bởi Nhóm DTU-DZ
