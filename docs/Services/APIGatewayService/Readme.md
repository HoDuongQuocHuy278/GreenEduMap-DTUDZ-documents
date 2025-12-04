# 🌐 API Gateway Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8000  
**Trạng thái:** ✅ Hoạt động

API Gateway là cổng trung tâm cho kiến trúc microservices của **GreenEduMap**, cung cấp điểm truy cập duy nhất cho tất cả các dịch vụ backend, xử lý định tuyến, xác thực và quản lý API công khai.

---

## 🎯 Chức năng chính

### 🔀 Service Routing & Orchestration

- **Định tuyến thông minh**
  - Chuyển tiếp request đến microservice phù hợp
  - Load balancing giữa các service instances
  - Circuit breaker pattern
  - Retry logic với exponential backoff

- **Service Discovery**
  - Tự động phát hiện services
  - Health check aggregation
  - Dynamic routing configuration
  - Failover handling

- **Request/Response Transformation**
  - Header manipulation
  - Request validation
  - Response formatting
  - Error standardization

### 🌍 Public OpenData API

> [!NOTE]
> **Không yêu cầu xác thực** - API công khai tuân thủ chuẩn Open Data

#### Environment Data Endpoints

```bash
# Air Quality Data
GET /api/open-data/air-quality
GET /api/open-data/air-quality/location?lat={lat}&lon={lon}&radius={km}

# Weather Data
GET /api/open-data/weather/current?lat={lat}&lon={lon}
GET /api/open-data/weather/forecast?lat={lat}&lon={lon}
```

#### Education Data Endpoints

```bash
# Schools Information
GET /api/open-data/schools
GET /api/open-data/schools/location?lat={lat}&lon={lon}&radius={km}
GET /api/open-data/schools/green-score

# Green Courses
GET /api/open-data/green-courses
GET /api/open-data/green-courses/by-school/{school_id}
```

#### Export Endpoints

```bash
# Export to various formats
GET /api/open-data/export/air-quality?format=csv
GET /api/open-data/export/schools?format=geojson
GET /api/open-data/export/green-courses?format=json
```

### 🔗 NGSI-LD Endpoints

Hỗ trợ chuẩn **NGSI-LD** (ETSI GS CIM 009) cho Smart Cities:

```bash
# Entity Management
GET    /ngsi-ld/v1/entities
GET    /ngsi-ld/v1/entities?type=AirQuality
GET    /ngsi-ld/v1/entities?type=School
GET    /ngsi-ld/v1/entities/{id}
POST   /ngsi-ld/v1/entities
PATCH  /ngsi-ld/v1/entities/{id}
DELETE /ngsi-ld/v1/entities/{id}

# Subscriptions
POST   /ngsi-ld/v1/subscriptions
GET    /ngsi-ld/v1/subscriptions
DELETE /ngsi-ld/v1/subscriptions/{id}
```

### 🛡️ Security & Rate Limiting

- **Rate Limiting**
  - Per-IP rate limits
  - Per-API-key quotas
  - Sliding window algorithm
  - Redis-backed counters

- **CORS Handling**
  - Configurable origins
  - Preflight request handling
  - Credential support
  - Custom headers

- **Authentication (for protected endpoints)**
  - JWT token validation
  - API key authentication
  - Role-based access control (RBAC)
  - OAuth2 integration ready

### 📊 Monitoring & Logging

- **Health Check Aggregation**
  - Individual service health status
  - Overall system health
  - Dependency checks
  - Readiness probes

- **Metrics Collection**
  - Request/response times
  - Error rates
  - Throughput metrics
  - Service availability

- **Distributed Tracing**
  - Request correlation IDs
  - End-to-end tracing
  - Performance bottleneck detection
  - Jaeger integration

---

## 🏗️ Kiến trúc

```
┌─────────────────────────────────────────────────────┐
│                   Client Layer                      │
│  (Web App, Mobile App, External Services)          │
└──────────────────────┬──────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│              API Gateway (Port 8000)                │
├─────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ Rate Limiter │  │ CORS Handler │  │  Router   │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ Auth Checker │  │   Logger     │  │  Metrics  │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ↓             ↓             ↓
┌────────────┐  ┌────────────┐  ┌────────────┐
│   Auth     │  │Environment │  │ Education  │
│  Service   │  │  Service   │  │  Service   │
│ (Port 8001)│  │(Port 8007) │  │(Port 8008) │
└────────────┘  └────────────┘  └────────────┘
         │             │             │
         ↓             ↓             ↓
┌────────────┐  ┌────────────┐  ┌────────────┐
│ Resource   │  │  OpenData  │  │    AI      │
│  Service   │  │  Service   │  │  Service   │
│(Port 8004) │  │(Port 8009) │  │(Port 8006) │
└────────────┘  └────────────┘  └────────────┘
```

---

## 🔌 Service Routing Configuration

### Microservices Endpoints

| Service | Port | Base Path | Description |
|---------|------|-----------|-------------|
| **Auth Service** | 8001 | `/api/v1/auth` | Authentication & Authorization |
| **Environment Service** | 8007 | `/api/v1/environment` | Air quality & Weather data |
| **Education Service** | 8008 | `/api/v1/education` | Schools & Green courses |
| **Resource Service** | 8004 | `/api/v1/resources` | Green zones & Resources |
| **AI Service** | 8006 | `/api/v1/ai` | ML predictions & Analytics |
| **OpenData Service** | 8009 | `/api/v1/opendata` | NGSI-LD & Export formats |

---

## 🚀 Setup & Configuration

### Environment Variables

```env
# API Gateway Configuration
GATEWAY_HOST=0.0.0.0
GATEWAY_PORT=8000
VERSION=1.0.0

# Service URLs
AUTH_SERVICE_URL=http://auth-service:8001
ENVIRONMENT_SERVICE_URL=http://environment-service:8007
EDUCATION_SERVICE_URL=http://education-service:8008
RESOURCE_SERVICE_URL=http://resource-service:8004
AI_SERVICE_URL=http://ai-service:8006
OPENDATA_SERVICE_URL=http://opendata-service:8009

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=1000

# CORS
CORS_ORIGINS=http://localhost:3000,https://greenedumap.edu.vn
CORS_ALLOW_CREDENTIALS=true

# Redis (for rate limiting & caching)
REDIS_HOST=redis
REDIS_PORT=6379

# RabbitMQ (for async tasks)
RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672/greenedumap
```

### Docker Deployment

```yaml
api-gateway:
  build: ./modules/api-gateway
  ports:
    - "8000:8000"
  depends_on:
    - redis
    - rabbitmq
    - auth-service
    - environment-service
    - education-service
  environment:
    - GATEWAY_PORT=8000
    - REDIS_HOST=redis
    - RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672/greenedumap
  networks:
    - greenedumap-network
```

### Local Development

```bash
# Install dependencies
cd modules/api-gateway
pip install -r requirements.txt

# Run gateway
uvicorn app.main:app --reload --port 8000

# Access documentation
open http://localhost:8000/docs
```

---

## 📡 API Examples

### Get Air Quality Data

```bash
curl "http://localhost:8000/api/open-data/air-quality/location?lat=16.0544&lon=108.2022&radius=50"
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-123",
      "location": "Da Nang",
      "aqi": 45,
      "pm25": 12.5,
      "pm10": 25.3,
      "timestamp": "2025-12-04T22:00:00Z"
    }
  ],
  "count": 1
}
```

### Get Schools by Green Score

```bash
curl "http://localhost:8000/api/open-data/schools/green-score?min_score=80"
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-456",
      "name": "Trường THPT Chuyên Lê Quý Đôn",
      "green_score": 92,
      "location": {
        "lat": 16.0544,
        "lon": 108.2022
      }
    }
  ],
  "count": 1
}
```

### Export Schools to GeoJSON

```bash
curl "http://localhost:8000/api/open-data/export/schools?format=geojson" -o schools.geojson
```

---

## 🔍 Health Check

### Gateway Health

```bash
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "api-gateway",
  "version": "1.0.0",
  "services": {
    "auth-service": "healthy",
    "environment-service": "healthy",
    "education-service": "healthy",
    "resource-service": "healthy",
    "ai-service": "healthy",
    "opendata-service": "healthy"
  },
  "dependencies": {
    "redis": "connected",
    "rabbitmq": "connected"
  }
}
```

---

## 📊 Monitoring & Metrics

### Prometheus Metrics

```bash
GET /metrics
```

**Available Metrics:**
- `http_requests_total` - Total HTTP requests
- `http_request_duration_seconds` - Request duration histogram
- `http_requests_in_progress` - Current requests in progress
- `service_health_status` - Health status of downstream services
- `rate_limit_exceeded_total` - Rate limit violations

### Grafana Dashboard

Pre-configured dashboard available at: `infrastructure/monitoring/grafana/dashboards/api-gateway.json`

---

## 🛠️ Development

### Adding New Route

```python
from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/new-feature", tags=["New Feature"])

@router.get("/")
async def get_new_feature():
    return {"message": "New feature endpoint"}
```

### Adding Service Integration

```python
from app.core.config import settings
import httpx

async def call_new_service(endpoint: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.NEW_SERVICE_URL}{endpoint}"
        )
        return response.json()
```

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
