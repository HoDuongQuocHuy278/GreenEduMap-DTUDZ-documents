# 🔐 Auth Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8001  
**Database:** PostgreSQL  
**Trạng thái:** ✅ Hoạt động

Auth Service cung cấp xác thực và phân quyền cho hệ thống **GreenEduMap**, sử dụng JWT tokens và hỗ trợ nhiều vai trò người dùng.

---

## 🎯 Chức năng chính

### 🔑 Xác thực người dùng

Người dùng có thể đăng ký tài khoản bằng email hoặc username kết hợp password. Mật khẩu được mã hóa an toàn bằng thuật toán Bcrypt với 12 rounds. Hệ thống hỗ trợ xác thực email tùy chọn và kích hoạt tài khoản.

### 🔄 Quản lý Token

Sử dụng hệ thống JWT với hai loại token:
- **Access Token**: Thời hạn ngắn (15 phút), chứa thông tin user_id, email và role, dùng cho xác thực các request
- **Refresh Token**: Thời hạn dài (7 ngày), lưu trong database, được rotate mỗi lần sử dụng

### 👥 Hệ thống vai trò

Năm vai trò người dùng với quyền hạn khác nhau:
- **Admin** - Toàn quyền quản trị hệ thống
- **Developer** - Quản lý API key và tính năng phát triển
- **Volunteer** - Tham gia hoạt động cứu trợ và cộng đồng
- **Citizen** - Truy cập cơ bản và báo cáo
- **School** - Quản lý trường học và tính năng giáo dục

### 👤 Thông tin người dùng

Mỗi user profile bao gồm email và username (duy nhất), vai trò được gán, trạng thái hoạt động, tình trạng xác thực email, và cờ public/private cho tuân thủ OpenData.

### 🔐 Phân quyền RBAC

Hệ thống Role-Based Access Control với middleware kiểm tra quyền, bảo vệ route theo vai trò, phân quyền cấp tài nguyên và hệ thống role phân cấp.

### 🔑 Quản lý API Key

Developers có thể tạo API key với quyền hạn được giới hạn, mỗi key có rate limit riêng và có thể bị thu hồi khi cần thiết.

---

## 💾 Lưu trữ dữ liệu

### Bảng Users
Lưu trữ thông tin người dùng bao gồm ID (UUID), email, username, mật khẩu đã hash, vai trò, trạng thái hoạt động và xác thực, cùng thời gian tạo và cập nhật.

### Bảng Refresh Tokens
Theo dõi refresh tokens với user_id liên kết, token đã hash, thời hạn và trạng thái thu hồi.

### Bảng API Keys
Quản lý API keys với user_id sở hữu, key đã hash, quyền hạn scope và rate limit.

---

## 🔒 Tính năng bảo mật

- **Password Hashing**: Bcrypt với 12 rounds và salt riêng cho mỗi password
- **JWT Tokens**: Ký với thuật toán HS256
- **Token Expiration**: Access token ngắn hạn để giảm rủi ro
- **Refresh Token Rotation**: Token mới được cấp mỗi lần refresh
- **API Key Hashing**: Key được lưu trữ dạng hash
- **Rate Limiting**: Giới hạn theo user và API key

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
