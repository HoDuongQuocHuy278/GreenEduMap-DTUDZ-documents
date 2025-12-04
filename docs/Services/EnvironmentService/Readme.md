# 🌍 Environment Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8007  
**Database:** PostgreSQL + PostGIS  
**External APIs:** OpenAQ, OpenWeather  
**Trạng thái:** ✅ Hoạt động

Environment Service tích hợp dữ liệu môi trường từ OpenAQ (chất lượng không khí) và OpenWeather (thời tiết) cho hệ thống **GreenEduMap**.

---

## 🎯 Chức năng chính

### 🌫️ Air Quality Data (OpenAQ API)

- **Real-time Air Quality**
  - PM2.5, PM10 measurements
  - CO, CO2, NO2 levels
  - AQI calculation
  - Location-based queries

- **Historical Data**
  - Time-series air quality data
  - Trend analysis
  - Data aggregation
  - Export capabilities

- **Spatial Queries (PostGIS)**
  - Find measurements by location + radius
  - Nearest air quality station
  - Coverage area analysis
  - Heatmap data generation

### ☀️ Weather Data (OpenWeather API)

- **Current Weather**
  - Temperature, humidity
  - Wind speed and direction
  - Atmospheric pressure
  - Weather conditions

- **5-Day Forecast**
  - 3-hour intervals
  - Temperature predictions
  - Precipitation probability
  - Weather condition forecasts

- **Location-based Queries**
  - Weather by coordinates
  - City-level weather
  - Multiple locations support

### 🔄 Scheduled Data Fetching

- **Air Quality**: Fetch every hour
- **Weather**: Fetch every 30 minutes
- **Cleanup**: Remove old data daily
- **APScheduler** for task management

### 📡 NGSI-LD Entity Creation

- **AirQualityObserved** entities
- **WeatherObserved** entities
- ETSI GS CIM 009 V1.6.1 compliance
- GeoProperty support

---

## 🔌 API Endpoints

### Air Quality

```bash
GET /api/v1/air-quality                # Latest measurements
GET /api/v1/air-quality/location       # By location + radius
GET /api/v1/air-quality/history        # Historical data
GET /api/v1/air-quality/{id}           # Specific measurement
```

### Weather

```bash
GET /api/v1/weather/current            # Current weather
GET /api/v1/weather/forecast           # 5-day forecast
GET /api/v1/weather/location           # Weather by location
```

### NGSI-LD

```bash
GET  /ngsi-ld/v1/entities?type=AirQuality
POST /ngsi-ld/v1/entities              # Create entity
```

---

## 🚀 Setup

### API Keys

#### OpenAQ API
- Free tier: 10,000 requests/month
- Sign up: https://openaq.org/
- No API key required (public API)

#### OpenWeather API
- Free tier: 60 calls/minute, 1M calls/month
- Sign up: https://openweathermap.org/api
- Get API key: https://home.openweathermap.org/api_keys

### Environment Variables

```env
# Environment Service
ENVIRONMENT_SERVICE_HOST=0.0.0.0
ENVIRONMENT_SERVICE_PORT=8007

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@postgres:5432/greenedumap

# External APIs
OPENWEATHER_API_KEY=your_api_key_here
OPENAQ_API_URL=https://api.openaq.org/v2

# Scheduler
FETCH_AIR_QUALITY_INTERVAL=3600  # 1 hour
FETCH_WEATHER_INTERVAL=1800      # 30 minutes
```

---

## 📡 Usage Examples

### Get Air Quality Near Da Nang

```bash
curl "http://localhost:8007/api/v1/air-quality/location?lat=16.0544&lon=108.2022&radius=50"
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-123",
      "location": "Da Nang",
      "coordinates": {"lat": 16.0544, "lon": 108.2022},
      "aqi": 45,
      "pm25": 12.5,
      "pm10": 25.3,
      "timestamp": "2025-12-04T22:00:00Z"
    }
  ]
}
```

### Get Current Weather

```bash
curl "http://localhost:8007/api/v1/weather/current?lat=16.0544&lon=108.2022"
```

**Response:**
```json
{
  "temperature": 28.5,
  "humidity": 75,
  "wind_speed": 3.5,
  "weather": "Clear",
  "timestamp": "2025-12-04T22:00:00Z"
}
```

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
