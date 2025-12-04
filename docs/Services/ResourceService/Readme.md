# 🌳 Resource Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8004  
**Database:** PostgreSQL + PostGIS  
**Trạng thái:** ✅ Hoạt động

Resource Service quản lý tài nguyên xanh, khu vực xanh và trung tâm cứu trợ trong hệ thống **GreenEduMap**.

---

## 🎯 Chức năng chính

### 🌲 Green Zones Management

- **CRUD Operations**
  - Tạo, đọc, cập nhật, xóa khu vực xanh
  - Quản lý metadata (JSONB)
  - Phân loại theo loại khu vực
  - Quản lý diện tích và ranh giới

- **Geospatial Support (PostGIS)**
  - Lưu trữ vị trí địa lý (POINT/POLYGON geometry)
  - Tìm khu vực xanh gần nhất
  - Tính diện tích khu vực
  - Buffer zone analysis
  - Spatial intersection queries

- **Zone Types**
  - Parks (công viên)
  - Gardens (vườn)
  - Forests (rừng)
  - Green belts (đai xanh)
  - Urban farms (nông trại đô thị)

### 🌿 Green Resources Management

- **Resource Tracking**
  - Quản lý tài nguyên xanh
  - Liên kết với khu vực xanh
  - Metadata và thuộc tính
  - Trạng thái và tình trạng

- **Resource Types**
  - Trees (cây xanh)
  - Water sources (nguồn nước)
  - Renewable energy (năng lượng tái tạo)
  - Recycling facilities (cơ sở tái chế)

### 🏥 Rescue Centers Management

- **Center Operations**
  - Quản lý trung tâm cứu trợ
  - Vị trí địa lý (PostGIS)
  - Capacity và resources
  - Contact information

- **Spatial Queries**
  - Tìm trung tâm gần nhất
  - Coverage area analysis
  - Accessibility assessment

---

## 🔌 API Endpoints

### Green Zones

```bash
POST   /api/v1/green-zones              # Create zone
GET    /api/v1/green-zones              # List zones
GET    /api/v1/green-zones/{id}         # Get zone details
PUT    /api/v1/green-zones/{id}         # Update zone
DELETE /api/v1/green-zones/{id}         # Delete zone
GET    /api/v1/green-zones/nearby       # Find nearby zones
```

### Green Resources

```bash
POST   /api/v1/green-resources          # Create resource
GET    /api/v1/green-resources          # List resources
GET    /api/v1/green-resources/{id}     # Get resource details
GET    /api/v1/green-resources/zone/{zone_id}  # Resources by zone
PUT    /api/v1/green-resources/{id}     # Update resource
DELETE /api/v1/green-resources/{id}     # Delete resource
```

### Rescue Centers

```bash
POST   /api/v1/centers                  # Create center
GET    /api/v1/centers                  # List centers
GET    /api/v1/centers/{id}             # Get center details
PUT    /api/v1/centers/{id}             # Update center
DELETE /api/v1/centers/{id}             # Delete center
GET    /api/v1/centers/nearby           # Find nearby centers
```

---

## 💾 Database Schema

### green_zones

```sql
CREATE TABLE green_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    zone_type VARCHAR(50),
    location GEOMETRY(POINT, 4326),
    area_sqm FLOAT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_green_zones_location ON green_zones USING GIST(location);
```

### green_resources

```sql
CREATE TABLE green_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_id UUID REFERENCES green_zones(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    resource_type VARCHAR(100),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### rescue_centers

```sql
CREATE TABLE rescue_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    location GEOMETRY(POINT, 4326) NOT NULL,
    capacity INTEGER,
    contact_info JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rescue_centers_location ON rescue_centers USING GIST(location);
```

---

## 🚀 Setup

### Environment Variables

```env
# Resource Service
RESOURCE_SERVICE_HOST=0.0.0.0
RESOURCE_SERVICE_PORT=8004

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@postgres:5432/greenedumap
```

### Docker Deployment

```yaml
resource-service:
  build: ./modules/resource-service
  ports:
    - "8004:8004"
  depends_on:
    - postgres
  environment:
    - DATABASE_URL=postgresql+asyncpg://user:pass@postgres:5432/greenedumap
```

---

## 📡 Usage Examples

### Create Green Zone

```bash
curl -X POST http://localhost:8004/api/v1/green-zones \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Công viên 29/3",
    "zone_type": "park",
    "location": {"lat": 16.0544, "lon": 108.2022},
    "area_sqm": 50000
  }'
```

### Find Nearby Green Zones

```bash
curl "http://localhost:8004/api/v1/green-zones/nearby?lat=16.0544&lon=108.2022&radius=5"
```

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
