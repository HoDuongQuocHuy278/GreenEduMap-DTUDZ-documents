# 📦 Hướng dẫn cài đặt GreenEduMap

## 📋 Yêu cầu hệ thống

### Phần mềm cần thiết

| Công cụ | Phiên bản tối thiểu | Mục đích |
|---------|---------------------|----------|
| **Docker** | 20.10+ | Container runtime |
| **Docker Compose** | 2.0+ | Orchestration |
| **Node.js** | 18.x+ | Frontend development |
| **Python** | 3.10+ | Backend & AI services |
| **PostgreSQL** | 14+ | Database |
| **Redis** | 7.0+ | Cache & real-time |
| **Git** | 2.30+ | Version control |

### Phần cứng khuyến nghị

- **CPU**: 4 cores trở lên
- **RAM**: 8GB tối thiểu, 16GB khuyến nghị
- **Disk**: 50GB trống
- **Network**: Kết nối internet ổn định

---

## 🚀 Cài đặt nhanh

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

---

## 🔧 Cài đặt từng thành phần

### Frontend (Next.js Web)

```bash
cd frontend/web
npm install

# Development
npm run dev

# Production build
npm run build
npm start
```

**Truy cập:** http://localhost:3000

### Mobile App (React Native)

```bash
cd frontend/mobile
npm install

# iOS
npx expo start --ios

# Android
npx expo start --android
```

### Backend (Python)

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

**API Endpoint:** http://localhost:8000

### AI Services (FastAPI)

```bash
cd ai-services
python -m venv venv
source venv/bin/activate

pip install -r requirements.txt

# Start FastAPI
uvicorn main:app --reload --port 8001
```

**API Docs:** http://localhost:8001/docs

### Database Setup

```bash
# Khởi động PostgreSQL với PostGIS
docker run -d \
  --name greenedumap-db \
  -e POSTGRES_DB=greenedumap \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  postgis/postgis:14-3.3

# Import dữ liệu mẫu
psql -h localhost -U postgres -d greenedumap < data/sample_data.sql
```

### Redis Cache

```bash
# Khởi động Redis
docker run -d \
  --name greenedumap-redis \
  -p 6379:6379 \
  redis:7-alpine

# Test connection
redis-cli ping
```

### Message Broker (Kafka)

```bash
# Khởi động Kafka với Zookeeper
docker-compose -f docker-compose.kafka.yml up -d

# Tạo topics
docker exec -it kafka kafka-topics --create \
  --topic environment-data \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1
```

### API Gateway (Traefik)

```bash
# Khởi động Traefik
docker run -d \
  --name traefik \
  -p 80:80 \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd)/traefik.yml:/etc/traefik/traefik.yml \
  traefik:v2.10
```

**Dashboard:** http://localhost:8080

### Authentication (Keycloak)

```bash
# Khởi động Keycloak
docker run -d \
  --name keycloak \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  -p 8180:8080 \
  quay.io/keycloak/keycloak:latest start-dev
```

**Admin Console:** http://localhost:8180

---

## 🗄️ Semantic Layer (FiWARE Orion-LD)

```bash
# Khởi động MongoDB cho Orion-LD
docker run -d --name mongodb -p 27017:27017 mongo:4.4

# Khởi động Orion-LD
docker run -d --name orion-ld \
  -p 1026:1026 \
  --link mongodb:mongodb \
  fiware/orion-ld -dbhost mongodb
```

**NGSI-LD API:** http://localhost:1026

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

# Kafka
docker exec kafka kafka-broker-api-versions --bootstrap-server localhost:9092 && echo "✅ Kafka OK" || echo "❌ Kafka Failed"
```

### Chạy test suite

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend/web
npm test

# AI Services tests
cd ai-services
pytest tests/
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

**4. Module not found (Python)**
```bash
# Cài lại dependencies
pip install -r requirements.txt --force-reinstall

# Clear cache
pip cache purge
```

**5. Node modules error**
```bash
# Xóa và cài lại
rm -rf node_modules package-lock.json
npm install
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

## 🚀 Production Deployment

### Build Production Images

```bash
# Build tất cả images
docker-compose -f docker-compose.prod.yml build

# Push to registry
docker-compose -f docker-compose.prod.yml push
```

### Kubernetes Deployment

```bash
# Apply configurations
kubectl apply -f k8s/

# Check status
kubectl get pods -n greenedumap

# Scale services
kubectl scale deployment backend --replicas=3
```

---

## 📚 Tài liệu tham khảo

- [Architecture](./Architecture.md) - Kiến trúc hệ thống
- [API Documentation](./api/README.md) - Tài liệu API
- [Contributing](../CONTRIBUTING.md) - Hướng dẫn đóng góp
- [Troubleshooting](../TROUBLESHOOTING.md) - Xử lý sự cố

---

## 💡 Tips

- Sử dụng Docker Compose cho development để dễ quản lý
- Luôn backup database trước khi update
- Kiểm tra logs thường xuyên để phát hiện lỗi sớm
- Sử dụng environment variables cho cấu hình
- Enable auto-restart cho production services

---

## 🆘 Cần trợ giúp?

Nếu gặp vấn đề, vui lòng:

1. Kiểm tra [TROUBLESHOOTING.md](../TROUBLESHOOTING.md)
2. Tìm kiếm trong [GitHub Issues](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/issues)
3. Tạo issue mới với đầy đủ thông tin lỗi
4. Liên hệ team qua email

---

© 2025 GreenEduMap – Developed with ❤️ by DTU-DZ_2 Team
