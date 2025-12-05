# 🌳 Resource Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8004  
**Database:** PostgreSQL + PostGIS  
**Trạng thái:** ✅ Hoạt động

Resource Service quản lý tài nguyên xanh, khu vực xanh và trung tâm cứu trợ trong hệ thống **GreenEduMap**.

---

## 🎯 Chức năng chính

### 🌲 Quản lý Khu vực Xanh

Service hỗ trợ đầy đủ các thao tác CRUD cho khu vực xanh, với metadata mở rộng lưu trữ dạng JSONB. Các khu vực được phân loại và quản lý diện tích, ranh giới.

**Các loại khu vực:**
- **Park** - Công viên đô thị
- **Garden** - Vườn và khu vườn cộng đồng
- **Forest** - Rừng và khu bảo tồn
- **Green Belt** - Đai xanh thành phố
- **Urban Farm** - Nông trại đô thị

### 🗺️ Hỗ trợ Địa lý (PostGIS)

Vị trí được lưu trữ dưới dạng POINT hoặc POLYGON geometry, cho phép:
- Tìm kiếm khu vực xanh theo bán kính từ một vị trí
- Tính toán diện tích khu vực
- Phân tích vùng đệm
- Truy vấn giao cắt không gian

### 🌿 Quản lý Tài nguyên Xanh

Theo dõi các tài nguyên xanh được liên kết với khu vực:
- **Trees** - Cây xanh với thông tin loài và tuổi
- **Water Sources** - Nguồn nước (ao, hồ, suối)
- **Renewable Energy** - Cơ sở năng lượng tái tạo
- **Recycling Facilities** - Cơ sở tái chế

Mỗi tài nguyên có metadata chi tiết và theo dõi trạng thái.

### 🏥 Quản lý Trung tâm Cứu trợ

Service quản lý các trung tâm cứu trợ với:
- Vị trí địa lý chính xác (PostGIS)
- Sức chứa và tài nguyên sẵn có
- Thông tin liên hệ chi tiết
- Tìm kiếm trung tâm gần nhất khi cần

---

## 💾 Lưu trữ dữ liệu

### Bảng Green Zones
Lưu trữ khu vực xanh: ID (UUID), tên khu vực, loại khu vực, vị trí trung tâm (POINT geometry), diện tích (m²) và metadata mở rộng.

### Bảng Green Resources
Quản lý tài nguyên: ID, khu vực liên kết, tên tài nguyên, loại và metadata chi tiết.

### Bảng Rescue Centers
Thông tin trung tâm cứu trợ: ID, tên, vị trí địa lý, sức chứa và thông tin liên hệ (JSONB).

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
