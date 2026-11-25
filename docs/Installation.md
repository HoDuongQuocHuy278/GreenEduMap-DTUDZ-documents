# 📦 Hướng dẫn cài đặt GreenEduMap

## 📋 Yêu cầu hệ thống

### Phần mềm cần thiết

| Công cụ | Phiên bản tối thiểu | Mục đích |
|---------|---------------------|----------|
| **Docker** | 20.10+ | Container runtime |
| **Docker Compose** | 2.0+ | Orchestration |
| **Git** | 2.30+ | Version control |

### Phần cứng khuyến nghị

- **CPU**: 4 cores trở lên
- **RAM**: 8GB tối thiểu, 16GB khuyến nghị
- **Disk**: 50GB trống
- **Network**: Kết nối internet ổn định

---

## 🚀 Cài đặt và Khởi chạy

### 1. Clone repository

```bash
# Clone dự án
git clone https://github.com/MNM-DTU-DZ2/GreenEduMap-DTUDZ.git
cd GreenEduMap-DTUDZ
```

### 2. Cấu hình môi trường

```bash
# Copy file môi trường mẫu
cp infrastructure/docker/.env.example infrastructure/docker/.env

# Chỉnh sửa file .env với thông tin của bạn
nano infrastructure/docker/.env
```

**Các biến môi trường quan trọng:**

```env
# Database
POSTGRES_DB=greenedumap
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# Ports
API_GATEWAY_PORT=4500
WEB_APP_PORT=4501

# API Keys
OPENAQ_API_KEY=your_openaq_key
OPENWEATHER_API_KEY=your_openweather_key

# Authentication
JWT_SECRET_KEY=your_jwt_secret
```

### 3. Khởi động với Docker Compose

```bash
# Di chuyển vào thư mục docker và khởi động tất cả services
cd infrastructure/docker
docker compose up -d

# Kiểm tra trạng thái
docker compose ps

# Xem logs
docker compose logs -f
```

Hệ thống sẽ tự động khởi động các thành phần:
- **Frontend**: Next.js (Web) & React Native (Mobile support)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL + PostGIS
- **Message Broker**: RabbitMQ
- **AI Services**: Python Services
- **Semantic**: FiWARE Orion-LD & MongoDB

---

## ✅ Kiểm tra cài đặt

### Health Check Script

```bash
#!/bin/bash
# health-check.sh

echo "Checking services..."

# Frontend
curl -f http://localhost:3000 && echo "✅ Frontend OK" || echo "❌ Frontend Failed"

# Backend
curl -f http://localhost:8000/health && echo "✅ Backend OK" || echo "❌ Backend Failed"

# AI Services
curl -f http://localhost:8001/health && echo "✅ AI Services OK" || echo "❌ AI Services Failed"

# Database
pg_isready -h localhost -p 5432 && echo "✅ Database OK" || echo "❌ Database Failed"

# Redis
redis-cli ping && echo "✅ Redis OK" || echo "❌ Redis Failed"

# RabbitMQ
curl -f http://localhost:15672 && echo "✅ RabbitMQ OK" || echo "❌ RabbitMQ Failed"
```

---

## 🐛 Xử lý sự cố

### Lỗi thường gặp

**1. Port đã được sử dụng**
```bash
# Kiểm tra port đang sử dụng
netstat -ano | findstr :3000

# Dừng process
taskkill /PID <process_id> /F
```

**2. Docker container không khởi động**
```bash
# Xem logs chi tiết
docker logs <container_name>

# Restart container
docker restart <container_name>

# Xóa và tạo lại
docker-compose down
docker-compose up -d --force-recreate
```

**3. Database connection failed**
```bash
# Kiểm tra PostgreSQL đang chạy
docker ps | grep postgres

# Test connection
psql -h localhost -U postgres -d greenedumap
```

---

## 🔐 Cấu hình bảo mật

### SSL/TLS Certificate

```bash
# Tạo self-signed certificate cho development
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ./certs/key.pem \
  -out ./certs/cert.pem
```

### Firewall Rules

```bash
# Mở ports cần thiết
sudo ufw allow 3000/tcp  # Frontend
sudo ufw allow 8000/tcp  # Backend
sudo ufw allow 5432/tcp  # PostgreSQL
sudo ufw allow 6379/tcp  # Redis
```

---

## 📊 Monitoring & Logging

### Prometheus + Grafana

```bash
# Khởi động monitoring stack
docker-compose -f docker-compose.monitoring.yml up -d
```

**Grafana Dashboard:** http://localhost:3001

### Log Aggregation

```bash
# Xem logs tất cả services
docker-compose logs -f

# Xem logs một service cụ thể
docker-compose logs -f backend
```

---

## 📚 Tài liệu tham khảo

- [Architecture](./Architecture.md) - Kiến trúc hệ thống
- [Services Documentation](./Services/README.md) - Tài liệu các Services
- [Getting Started](./GettingStarted.md) - Tổng quan dự án

---

## 🆘 Cần trợ giúp?

Nếu gặp vấn đề, vui lòng:

1. Kiểm tra mục **Xử lý sự cố** ở trên
2. Tìm kiếm trong [GitHub Issues](https://github.com/MNM-DTU-DZ2/GreenEduMap-DTUDZ/issues)
3. Tạo issue mới với đầy đủ thông tin lỗi
4. Liên hệ team qua email

---

© 2026 GreenEduMap – Developed with ❤️ by DTU-DZ_2 Team
