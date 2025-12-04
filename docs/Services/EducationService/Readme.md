# 🎓 Education Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8008  
**Database:** PostgreSQL + PostGIS  
**Trạng thái:** ✅ Hoạt động

Education Service quản lý thông tin trường học và chương trình giáo dục xanh trong hệ thống **GreenEduMap**, hỗ trợ truy vấn không gian địa lý và tính toán điểm xanh.

---

## 🎯 Chức năng chính

### 🏫 Schools Management

- **CRUD Operations**
  - Tạo, đọc, cập nhật, xóa thông tin trường học
  - Quản lý metadata trường học (JSONB)
  - Phân loại theo cấp học
  - Quản lý cơ sở vật chất

- **Geospatial Support (PostGIS)**
  - Lưu trữ vị trí địa lý (POINT geometry)
  - Tìm trường học gần nhất
  - Tính khoảng cách giữa các trường
  - Buffer zone analysis

- **Green Score Calculation**
  - Điểm xanh từ 0-100
  - Dựa trên cơ sở vật chất xanh
  - Số lượng và chất lượng khóa học xanh
  - Tương quan với chất lượng môi trường
  - Hoạt động cộng đồng

- **School Rankings**
  - Xếp hạng theo điểm xanh
  - Lọc theo khu vực
  - So sánh giữa các trường
  - Xu hướng theo thời gian

### 📚 Green Courses Management

- **Course Tracking**
  - Quản lý khóa học giáo dục môi trường
  - Phân loại theo danh mục
  - Liên kết với trường học
  - Metadata chương trình học (JSONB)

- **Course Categories**
  - Biến đổi khí hậu
  - Năng lượng tái tạo
  - Quản lý rác thải
  - Bảo tồn đa dạng sinh học
  - Nông nghiệp bền vững

### 🗺️ Spatial Queries

- **Nearby Schools**
  - Tìm trường trong bán kính
  - Sắp xếp theo khoảng cách
  - Lọc theo cấp học
  - Lọc theo điểm xanh tối thiểu

- **Coverage Analysis**
  - Phân tích độ phủ trường học
  - Xác định khu vực thiếu trường
  - Phân bố theo quận/huyện
  - Mật độ học sinh/km²

### 📊 OpenData Compliance

- **Public API Endpoints**
  - Dữ liệu trường học công khai
  - Thông tin khóa học xanh
  - Điểm xanh và xếp hạng
  - Export CSV, GeoJSON

---

## 🔌 API Endpoints

### Schools

```bash
POST   /api/v1/schools                    # Create school
GET    /api/v1/schools                    # List schools (with filters)
GET    /api/v1/schools/{id}               # Get school details
PUT    /api/v1/schools/{id}               # Update school
DELETE /api/v1/schools/{id}               # Delete school
GET    /api/v1/schools/nearby             # Find nearby schools
GET    /api/v1/schools/rankings           # Get schools by green score
```

### Green Courses

```bash
POST   /api/v1/green-courses              # Create course
GET    /api/v1/green-courses              # List courses
GET    /api/v1/green-courses/{id}         # Get course details
GET    /api/v1/green-courses/by-school/{school_id}  # Courses by school
PUT    /api/v1/green-courses/{id}         # Update course
DELETE /api/v1/green-courses/{id}         # Delete course
```

---

## 💾 Database Schema

### schools

```sql
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    school_type VARCHAR(50),  -- primary, secondary, high_school
    location GEOMETRY(POINT, 4326) NOT NULL,
    address TEXT,
    green_score FLOAT DEFAULT 0,
    facilities JSONB,  -- solar panels, gardens, recycling, etc.
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_schools_location ON schools USING GIST(location);
CREATE INDEX idx_schools_green_score ON schools(green_score DESC);
```

### green_courses

```sql
CREATE TABLE green_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    syllabus JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_green_courses_school ON green_courses(school_id);
```

---

## 🚀 Setup

### Environment Variables

```env
# Education Service
EDUCATION_SERVICE_HOST=0.0.0.0
EDUCATION_SERVICE_PORT=8008

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@postgres:5432/greenedumap

# Green Score Weights
GREEN_SCORE_FACILITIES_WEIGHT=0.4
GREEN_SCORE_COURSES_WEIGHT=0.3
GREEN_SCORE_ENVIRONMENT_WEIGHT=0.2
GREEN_SCORE_COMMUNITY_WEIGHT=0.1
```

### Docker Deployment

```yaml
education-service:
  build: ./modules/education-service
  ports:
    - "8008:8008"
  depends_on:
    - postgres
  environment:
    - DATABASE_URL=postgresql+asyncpg://user:pass@postgres:5432/greenedumap
```

---

## 📡 Usage Examples

### Create School

```bash
curl -X POST http://localhost:8008/api/v1/schools \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Trường THPT Chuyên Lê Quý Đôn",
    "school_type": "high_school",
    "location": {"lat": 16.0544, "lon": 108.2022},
    "address": "Đà Nẵng",
    "facilities": {
      "solar_panels": true,
      "garden": true,
      "recycling_program": true
    }
  }'
```

### Find Nearby Schools

```bash
curl "http://localhost:8008/api/v1/schools/nearby?lat=16.0544&lon=108.2022&radius=5&min_green_score=70"
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-123",
      "name": "Trường THPT Chuyên Lê Quý Đôn",
      "green_score": 92,
      "distance_km": 2.5,
      "location": {"lat": 16.0544, "lon": 108.2022}
    }
  ],
  "count": 1
}
```

### Get School Rankings

```bash
curl "http://localhost:8008/api/v1/schools/rankings?limit=10"
```

---

## 🧮 Green Score Algorithm

Điểm xanh (0-100) được tính dựa trên:

```python
green_score = (
    facilities_score * 0.4 +      # Cơ sở vật chất xanh
    courses_score * 0.3 +          # Số lượng và chất lượng khóa học
    environment_score * 0.2 +      # Chất lượng môi trường xung quanh
    community_score * 0.1          # Hoạt động cộng đồng
)
```

**Facilities Score:**
- Solar panels: +20 points
- Garden/green space: +15 points
- Recycling program: +10 points
- Rainwater harvesting: +10 points
- Energy-efficient lighting: +5 points

**Courses Score:**
- Number of green courses: +5 points each
- Course quality rating: multiplier 1.0-1.5

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
