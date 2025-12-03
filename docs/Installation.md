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
git clone https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ.git
cd GreenEduMap-DTUDZ
```

### 2. Cấu hình môi trường

```bash
# Copy file môi trường mẫu
cp .env.example .env

# Chỉnh sửa file .env với thông tin của bạn
nano .env
```

**Các biến môi trường quan trọng:**

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=greenedumap
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# API Keys
OPENAQ_API_KEY=your_openaq_key
OPENWEATHER_API_KEY=your_openweather_key
SENTINEL_API_KEY=your_sentinel_key

# Authentication
KEYCLOAK_URL=http://localhost:8080
JWT_SECRET=your_jwt_secret

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Khởi động với Docker Compose

```bash
# Build và khởi động tất cả services
docker-compose up -d

# Kiểm tra trạng thái
docker-compose ps

# Xem logs
docker-compose logs -f
```

Hệ thống sẽ tự động khởi động các thành phần:
- **Frontend**: Next.js (Web) & React Native (Mobile support)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL + PostGIS
- **Message Broker**: RabbitMQ
- **AI Services**: Python Services
- **Gateway**: Traefik
- **Auth**: Keycloak
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

##  Tài liệu tham khảo

- [Architecture](./Architecture.md) - Kiến trúc hệ thống
- [API Documentation](./api/README.md) - Tài liệu API
- [Contributing](../CONTRIBUTING.md) - Hướng dẫn đóng góp
- [Troubleshooting](../TROUBLESHOOTING.md) - Xử lý sự cố

---

## 🆘 Cần trợ giúp?

Nếu gặp vấn đề, vui lòng:

1. Kiểm tra [TROUBLESHOOTING.md](../TROUBLESHOOTING.md)
2. Tìm kiếm trong [GitHub Issues](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/issues)
3. Tạo issue mới với đầy đủ thông tin lỗi
4. Liên hệ team qua email

---

© 2025 GreenEduMap – Developed with ❤️ by DTU-DZ_2 Team
