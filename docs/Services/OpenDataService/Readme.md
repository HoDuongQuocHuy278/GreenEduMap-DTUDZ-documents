# 🌐 OpenData Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8009  
**Database:** PostgreSQL (read-only)  
**Trạng thái:** ✅ Production Ready

OpenData Service cung cấp truy cập mở đến dữ liệu **GreenEduMap** theo nhiều chuẩn quốc tế: NGSI-LD, DCAT-AP, CSV, GeoJSON, và RDF.

---

## 🎯 Chức năng chính

### 🔗 NGSI-LD Entities

Chuẩn Smart Cities (ETSI GS CIM 009 V1.6.1):
- **AirQualityObserved** - Dữ liệu chất lượng không khí
- **School** - Thông tin trường học
- **GreenZone** - Khu vực xanh
- **GreenCourse** - Khóa học xanh

### 📚 DCAT-AP Catalog

Data catalog với metadata đầy đủ (DCAT-AP 2.1.1):
- Dataset descriptions
- Distribution formats
- Access URLs
- License information

### 📤 Multiple Export Formats

- **CSV** - Excel, data analysis
- **GeoJSON** - GIS tools (QGIS, ArcGIS)
- **RDF Turtle** - Linked Data
- **RDF N-Triples** - Triple stores
- **JSON-LD** - Semantic Web
- **RDF/XML** - Legacy systems

---

## 🔌 API Endpoints

### NGSI-LD Entities

```bash
GET /api/v1/entities
GET /api/v1/entities?type=School
GET /api/v1/entities?type=AirQualityObserved
GET /api/v1/entities/{id}
```

### DCAT-AP Catalog

```bash
GET /api/v1/catalog
GET /api/v1/catalog/datasets
GET /api/v1/catalog/datasets/{id}
```

### JSON-LD Context

```bash
GET /api/v1/context
```

### Export - CSV

```bash
GET /api/v1/export/csv/schools
GET /api/v1/export/csv/air-quality
GET /api/v1/export/csv/green-zones
GET /api/v1/export/csv/green-courses
```

### Export - GeoJSON

```bash
GET /api/v1/export/geojson/schools
GET /api/v1/export/geojson/air-quality
GET /api/v1/export/geojson/green-zones
```

### Export - RDF

```bash
GET /api/v1/export/rdf/schools?format=turtle
GET /api/v1/export/rdf/air-quality?format=ntriples
GET /api/v1/export/rdf/green-zones?format=jsonld
```

---

## 🔗 Standards Compliance

### NGSI-LD
- **Spec**: ETSI GS CIM 009 V1.6.1
- **Context**: https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld
- **Properties**: type, value, observedAt, unitCode
- **GeoProperty**: GeoJSON geometry

### DCAT-AP
- **Version**: 2.1.1
- **Vocabularies**: DCAT, DCTERMS, FOAF, VCARD
- **Classes**: Catalog, Dataset, Distribution

### JSON-LD
- **Version**: 1.1
- **Vocabularies**: schema.org, GeoSPARQL, dcterms

### GeoJSON
- **Spec**: RFC 7946
- **CRS**: EPSG:4326 (WGS 84)
- **Geometry**: Point

### RDF
- **Formats**: Turtle, N-Triples, JSON-LD, RDF/XML
- **Vocabularies**: schema.org, geo, dcterms, custom GreenEduMap ontology

---

## 📡 Usage Examples

### Get NGSI-LD Schools

```bash
curl http://localhost:8009/api/v1/entities?type=School
```

### Download Schools CSV

```bash
curl -O http://localhost:8009/api/v1/export/csv/schools
```

### Download Schools GeoJSON

```bash
curl -O http://localhost:8009/api/v1/export/geojson/schools
```

### Download Schools RDF (Turtle)

```bash
curl "http://localhost:8009/api/v1/export/rdf/schools?format=turtle" -o schools.ttl
```

### Get DCAT-AP Catalog

```bash
curl http://localhost:8009/api/v1/catalog
```

---

## 🚀 Setup

### Environment Variables

```env
# OpenData Service
OPENDATA_SERVICE_HOST=0.0.0.0
OPENDATA_SERVICE_PORT=8009

# Database (Read-Only)
DATABASE_URL=postgresql+asyncpg://readonly:pass@postgres:5432/greenedumap

# NGSI-LD Context
NGSI_LD_CONTEXT_URL=https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld
```

### Docker Deployment

```yaml
opendata-service:
  build: ./modules/opendata-service
  ports:
    - "8009:8009"
  depends_on:
    - postgres
  environment:
    - DATABASE_URL=postgresql+asyncpg://readonly:pass@postgres:5432/greenedumap
```

---

## 🎓 OLP 2025 Demo

OpenData Service thể hiện:
- ✅ **Interoperability**: Chuẩn quốc tế (NGSI-LD, DCAT-AP)
- ✅ **Open Data**: Public access, multiple formats
- ✅ **Linked Data**: RDF, vocabularies, semantics
- ✅ **GIS Integration**: GeoJSON cho QGIS, ArcGIS
- ✅ **Data Catalog**: DCAT-AP metadata

**Demo Flow**:
1. Show DCAT-AP catalog → Datasets overview
2. Download CSV → Excel analysis
3. Download GeoJSON → Import vào QGIS
4. Show NGSI-LD → Smart Cities standard
5. Show RDF Turtle → Linked Data

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
