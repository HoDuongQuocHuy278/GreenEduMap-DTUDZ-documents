# 🎓 Education Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8008  
**Database:** PostgreSQL + PostGIS  
**Trạng thái:** ✅ Hoạt động

Education Service quản lý thông tin trường học và chương trình giáo dục xanh trong hệ thống **GreenEduMap**, hỗ trợ truy vấn không gian địa lý và tính toán điểm xanh.

---

## 🎯 Chức năng chính

### 🏫 Quản lý Trường học

Service hỗ trợ đầy đủ các thao tác tạo, đọc, cập nhật và xóa thông tin trường học. Mỗi trường có metadata mở rộng lưu trữ dạng JSONB, được phân loại theo cấp học (tiểu học, THCS, THPT) với quản lý chi tiết cơ sở vật chất.

### 🗺️ Hỗ trợ Địa lý (PostGIS)

Vị trí trường học được lưu trữ dưới dạng POINT geometry, cho phép:
- Tìm kiếm trường học theo bán kính từ một vị trí
- Tính toán khoảng cách giữa các trường
- Phân tích vùng đệm và độ phủ

### 🌱 Tính toán Điểm xanh (0-100)

Điểm xanh được tính dựa trên bốn yếu tố:
- **Cơ sở vật chất xanh (40%)**: Pin mặt trời (+20), vườn (+15), chương trình tái chế (+10), thu nước mưa (+10), đèn tiết kiệm năng lượng (+5)
- **Khóa học xanh (30%)**: Số lượng và chất lượng các khóa học môi trường
- **Chất lượng môi trường (20%)**: Đánh giá môi trường xung quanh trường
- **Hoạt động cộng đồng (10%)**: Mức độ tham gia hoạt động môi trường

### 🏆 Xếp hạng Trường học

Hệ thống xếp hạng các trường theo điểm xanh, hỗ trợ lọc theo khu vực, so sánh giữa các trường và theo dõi xu hướng theo thời gian.

### 📚 Quản lý Khóa học Xanh

Theo dõi các khóa học giáo dục môi trường được phân loại theo danh mục:
- Biến đổi khí hậu
- Năng lượng tái tạo
- Quản lý rác thải
- Bảo tồn đa dạng sinh học
- Nông nghiệp bền vững

Mỗi khóa học liên kết với trường học cụ thể và có chương trình học chi tiết lưu trữ dạng JSONB.

---

## 💾 Lưu trữ dữ liệu

### Bảng Schools
Lưu trữ thông tin trường học: ID (UUID), tên trường, cấp học, vị trí địa lý (POINT geometry), địa chỉ, điểm xanh và cơ sở vật chất (JSONB).

### Bảng Green Courses
Quản lý khóa học xanh: ID, trường liên kết, tên khóa học, danh mục, mô tả và chương trình học (JSONB).

---

## 📊 Tuân thủ OpenData

Service cung cấp dữ liệu công khai bao gồm:
- Thông tin trường học
- Danh sách khóa học xanh
- Điểm xanh và xếp hạng
- Xuất dữ liệu CSV và GeoJSON

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
