# 📊 Analytics Service - Phân tích dữ liệu & báo cáo

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI + ClickHouse + Pandas  
**Cơ sở dữ liệu:** ClickHouse (`analytics_db`), PostgreSQL (read-only)  
**Trạng thái:** 🟢 Hoạt động

Analytics Service cung cấp khả năng phân tích dữ liệu mạnh mẽ, tạo báo cáo chi tiết và dashboard thời gian thực cho hệ thống **GreenEduMap**, tập trung vào dữ liệu môi trường, giáo dục và không gian địa lý.

---

## 🎯 Chức năng chính

### 📊 Dashboard thời gian thực

#### Chỉ số môi trường
- **Chất lượng không khí (AQI)**
  - AQI trung bình theo khu vực
  - Xu hướng AQI theo thời gian
  - So sánh với ngưỡng WHO
  - Dự báo AQI 24h tới
  - Cảnh báo vùng ô nhiễm cao

- **Độ phủ xanh (Green Coverage)**
  - Tỷ lệ cây xanh/diện tích
  - Thay đổi độ phủ xanh theo thời gian
  - So sánh giữa các quận/huyện
  - Phân tích NDVI từ ảnh vệ tinh
  - Hotspot thiếu cây xanh

- **Nhiệt độ & Khí hậu**
  - Nhiệt độ trung bình/cao nhất/thấp nhất
  - Hiệu ứng đảo nhiệt đô thị (UHI)
  - Độ ẩm, lượng mưa
  - Chỉ số UV
  - Dự báo thời tiết 7 ngày

#### Chỉ số giáo dục
- **Thống kê trường học**
  - Số lượng trường theo cấp học
  - Mật độ học sinh/km²
  - Tỷ lệ trường có chương trình xanh
  - Điểm Green Skills trung bình
  - Phân bố theo khu vực

- **Hoạt động giáo dục xanh**
  - Số lượng hoạt động xanh
  - Tỷ lệ tham gia của học sinh
  - Thành tựu Green Skills
  - Dự án môi trường đang triển khai
  - Impact measurement

#### Chỉ số người dùng
- **Engagement metrics**
  - Người dùng hoạt động (DAU/MAU)
  - Số lượng check-in xanh
  - Đóng góp dữ liệu từ cộng đồng
  - Tương tác với bản đồ
  - Retention rate

- **Green Actions**
  - Số lượng hành động xanh
  - GreenPoints earned/redeemed
  - Top contributors
  - Impact tracking
  - Gamification metrics

### 📈 Tạo báo cáo tự động

#### Báo cáo môi trường
- **Báo cáo chất lượng không khí**
  - Daily/Weekly/Monthly AQI report
  - Phân tích xu hướng ô nhiễm
  - So sánh với tiêu chuẩn quốc tế
  - Nguồn gây ô nhiễm chính
  - Khuyến nghị cải thiện

- **Báo cáo độ phủ xanh**
  - Thay đổi diện tích cây xanh
  - Phân tích bê tông hóa
  - Đánh giá hiệu quả trồng cây
  - Khu vực cần ưu tiên
  - Dự báo xu hướng

- **Báo cáo khí hậu đô thị**
  - Nhiệt độ và UHI analysis
  - Tác động biến đổi khí hậu
  - Extreme weather events
  - Climate resilience metrics
  - Adaptation recommendations

#### Báo cáo giáo dục
- **Báo cáo Green Skills**
  - Tiến độ triển khai chương trình
  - Thành tích học sinh
  - Hiệu quả hoạt động xanh
  - Đánh giá năng lực giáo viên
  - Impact on behavior change

- **Báo cáo trường học**
  - Phân bố trường theo khu vực
  - Chất lượng môi trường xung quanh trường
  - Cơ sở vật chất xanh
  - Accessibility analysis
  - Equity assessment

#### Báo cáo tổng hợp
- **Báo cáo ngày/tuần/tháng**
  - Daily summary dashboard
  - Weekly digest email
  - Monthly comprehensive report
  - Quarterly review
  - Annual sustainability report

- **Xuất báo cáo**
  - PDF reports với charts & maps
  - Excel spreadsheets với raw data
  - CSV exports cho phân tích
  - JSON data dumps
  - Interactive HTML reports

- **Lập lịch tự động**
  - Scheduled report generation
  - Email delivery to stakeholders
  - Auto-upload to cloud storage
  - Webhook notifications
  - Cron-based triggers

### 🔍 Phân tích dữ liệu nâng cao

#### Phân tích không gian (Spatial Analysis)
- **Phân tích GIS**
  - Spatial clustering (hotspot analysis)
  - Buffer zone analysis
  - Proximity analysis (trường - công viên)
  - Overlay analysis
  - Network analysis (routing)

- **Heatmap generation**
  - AQI heatmap
  - Green coverage heatmap
  - School density heatmap
  - User activity heatmap
  - Multi-layer visualization

#### Phân tích chuỗi thời gian
- **Time-series analysis**
  - Trend detection
  - Seasonality analysis
  - Moving averages
  - Cumulative metrics
  - Rate of change

- **Forecasting**
  - AQI prediction (ARIMA, Prophet)
  - Green coverage projection
  - User growth forecast
  - Demand prediction
  - Scenario modeling

#### Phân tích tương quan
- **Cross-domain correlation**
  - Môi trường ↔ Giáo dục
  - AQI ↔ Học sinh vắng mặt
  - Độ phủ xanh ↔ Nhiệt độ
  - Cây xanh ↔ Chất lượng sống
  - Green actions ↔ Behavior change

- **Multi-dimensional analysis**
  - OLAP cubes
  - Drill-down capabilities
  - Slice and dice
  - Pivot tables
  - Custom aggregations

### 🎯 Business Intelligence

#### Predictive Analytics
- **Machine Learning integration**
  - Pollution prediction models
  - Green coverage forecasting
  - User behavior prediction
  - Resource optimization
  - Risk assessment

#### Anomaly Detection
- **Real-time monitoring**
  - AQI spike detection
  - Unusual sensor readings
  - Data quality issues
  - System anomalies
  - Alert triggers

#### Pattern Recognition
- **Behavioral patterns**
  - User engagement patterns
  - Seasonal trends
  - Geographic patterns
  - Temporal patterns
  - Association rules

---

## 📊 Loại báo cáo chuyên biệt

### 🌳 Báo cáo môi trường đô thị
- Tổng quan chất lượng môi trường
- Phân tích độ phủ xanh theo quận/huyện
- Đánh giá hiệu ứng đảo nhiệt
- Chất lượng không khí và xu hướng
- Khuyến nghị cải thiện môi trường

### 🎓 Báo cáo giáo dục xanh
- Tiến độ triển khai Green Skills
- Thống kê hoạt động giáo dục môi trường
- Đánh giá hiệu quả chương trình
- Phân bố trường học và accessibility
- Impact on student awareness

### 🗺️ Báo cáo không gian địa lý
- Phân tích phân bố trường học
- Bản đồ nhiệt AQI và độ phủ xanh
- Hotspot analysis (ô nhiễm, thiếu xanh)
- Coverage analysis (dịch vụ giáo dục)
- Regional comparison

### 👥 Báo cáo người dùng & cộng đồng
- Người dùng hoạt động và engagement
- Green actions và GreenPoints
- Community contributions
- User satisfaction metrics
- Behavioral change tracking

### 📡 Báo cáo IoT & Sensor
- Trạng thái cảm biến
- Chất lượng dữ liệu sensor
- Coverage map của sensor network
- Sensor performance metrics
- Maintenance recommendations

---

## 🔗 Tích hợp với các Service khác

### 🗄️ PostgreSQL + PostGIS
- Đọc dữ liệu lịch sử (read-only replica)
- Truy vấn dữ liệu không gian (GIS)
- Join với master data
- Spatial queries
- Historical data analysis

### 📊 ClickHouse
- Lưu trữ events và metrics
- Fast aggregation queries
- Time-series data
- OLAP analytics
- Materialized views

### 📨 RabbitMQ
- Consumer: Nhận events từ các services
- Process analytics events
- Aggregate metrics
- Trigger report generation
- Publish insights

### 🤖 AI/ML Service
- Nhận kết quả dự đoán
- Integrate ML models
- Anomaly detection results
- Pattern recognition insights
- Forecasting data

### 🌐 FiWARE Orion-LD
- Query context entities
- Subscribe to entity changes
- Semantic data analysis
- NGSI-LD queries
- Linked data integration

### ⚡ Redis
- Cache query results
- Session storage
- Real-time counters
- Leaderboards
- Rate limiting

### 🔔 Notification Service
- Gửi báo cáo định kỳ
- Alert notifications
- Scheduled emails
- Report delivery
- Webhook triggers

---

## 📊 Cấu trúc dữ liệu ClickHouse

### Bảng Environmental Events
```sql
CREATE TABLE environmental_events (
    event_id UUID,
    event_type String,
    timestamp DateTime,
    location_id UInt64,
    latitude Float64,
    longitude Float64,
    aqi Float32,
    temperature Float32,
    humidity Float32,
    pm25 Float32,
    pm10 Float32,
    co2 Float32,
    metadata String,
    created_at DateTime DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, location_id);
```

### Bảng Education Events
```sql
CREATE TABLE education_events (
    event_id UUID,
    event_type String,
    timestamp DateTime,
    school_id UInt64,
    activity_type String,
    participants UInt32,
    green_points UInt32,
    location_id UInt64,
    metadata String,
    created_at DateTime DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, school_id);
```

### Materialized View - Daily AQI Summary
```sql
CREATE MATERIALIZED VIEW aqi_daily_summary AS
SELECT
    toDate(timestamp) as date,
    location_id,
    avg(aqi) as avg_aqi,
    max(aqi) as max_aqi,
    min(aqi) as min_aqi,
    count() as measurement_count
FROM environmental_events
WHERE event_type = 'aqi_measurement'
GROUP BY date, location_id;
```

### Materialized View - School Activity Summary
```sql
CREATE MATERIALIZED VIEW school_activity_summary AS
SELECT
    toDate(timestamp) as date,
    school_id,
    activity_type,
    count() as activity_count,
    sum(participants) as total_participants,
    sum(green_points) as total_green_points
FROM education_events
GROUP BY date, school_id, activity_type;
```

---

## 🔌 API Endpoints

### Dashboard APIs
```
GET  /api/v1/analytics/dashboard/overview
GET  /api/v1/analytics/dashboard/environment
GET  /api/v1/analytics/dashboard/education
GET  /api/v1/analytics/dashboard/users
```

### Report APIs
```
POST /api/v1/analytics/reports/generate
GET  /api/v1/analytics/reports/{report_id}
GET  /api/v1/analytics/reports/scheduled
POST /api/v1/analytics/reports/schedule
```

### Metrics APIs
```
GET  /api/v1/analytics/metrics/aqi
GET  /api/v1/analytics/metrics/green-coverage
GET  /api/v1/analytics/metrics/schools
GET  /api/v1/analytics/metrics/users
```

### Analysis APIs
```
POST /api/v1/analytics/analysis/spatial
POST /api/v1/analytics/analysis/timeseries
POST /api/v1/analytics/analysis/correlation
POST /api/v1/analytics/analysis/forecast
```

---

## ⚙️ Cấu hình môi trường

```env
# Analytics Service
ANALYTICS_SERVICE_HOST=0.0.0.0
ANALYTICS_SERVICE_PORT=8003

# ClickHouse
CLICKHOUSE_HOST=clickhouse
CLICKHOUSE_PORT=9000
CLICKHOUSE_DB=analytics_db
CLICKHOUSE_USER=analytics
CLICKHOUSE_PASSWORD=analytics123

# PostgreSQL (Read-Only)
POSTGRES_HOST=postgres-replica
POSTGRES_PORT=5432
POSTGRES_DB=greenedumap
POSTGRES_USER=analytics_reader
POSTGRES_PASSWORD=readonly123

# RabbitMQ
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_ANALYTICS_QUEUE=analytics.events

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_CACHE_TTL=3600

# Report Configuration
REPORT_STORAGE_PATH=/app/reports
REPORT_RETENTION_DAYS=90
SCHEDULED_REPORTS_ENABLED=true
```

---

## 🐳 Deployment

```yaml
analytics-service:
  build: ./services/analytics-service
  ports:
    - "8003:8003"
  depends_on:
    - clickhouse
    - postgres
    - rabbitmq
    - redis
  volumes:
    - ./reports:/app/reports
    - ./config:/app/config
  environment:
    - CLICKHOUSE_HOST=clickhouse
    - POSTGRES_HOST=postgres
    - RABBITMQ_HOST=rabbitmq
```

---

## 📈 Monitoring & Performance

- **Metrics**: Prometheus metrics endpoint
- **Logging**: Structured JSON logs
- **Tracing**: Jaeger distributed tracing
- **Dashboards**: Grafana dashboards
- **Alerts**: Alert rules for anomalies

---

## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
