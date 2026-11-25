# 🌐 OpenData Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8009  
**Database:** PostgreSQL (read-only)  
**Trạng thái:** ✅ Production Ready

OpenData Service cung cấp truy cập mở đến dữ liệu **GreenEduMap** theo nhiều chuẩn quốc tế.

---

## 🎯 Chức năng chính

### 🔗 NGSI-LD Entities

Cung cấp dữ liệu theo chuẩn Smart Cities (ETSI GS CIM 009 V1.6.1):
- **AirQualityObserved** - Dữ liệu quan trắc chất lượng không khí
- **School** - Thông tin và vị trí trường học
- **GreenZone** - Khu vực xanh và công viên
- **GreenCourse** - Khóa học giáo dục môi trường

### 📚 DCAT-AP Catalog

Data catalog với metadata đầy đủ theo chuẩn DCAT-AP 2.1.1:
- Mô tả dataset chi tiết
- Danh sách định dạng phân phối
- URLs truy cập
- Thông tin giấy phép sử dụng

### 📤 Định dạng Xuất dữ liệu

Service hỗ trợ nhiều định dạng cho các mục đích khác nhau:
- **CSV** - Phân tích dữ liệu trong Excel và các công cụ thống kê
- **GeoJSON** - Import vào các công cụ GIS như QGIS, ArcGIS
- **RDF Turtle** - Linked Data và semantic web
- **RDF N-Triples** - Triple stores
- **JSON-LD** - Semantic Web applications
- **RDF/XML** - Tương thích với hệ thống legacy

---

## 🔗 Chuẩn Tuân thủ

### NGSI-LD
Theo chuẩn ETSI GS CIM 009 V1.6.1, sử dụng context từ ETSI, hỗ trợ các properties type, value, observedAt, unitCode và GeoProperty với GeoJSON geometry.

### DCAT-AP
Phiên bản 2.1.1 với các vocabularies DCAT, DCTERMS, FOAF, VCARD. Định nghĩa các class Catalog, Dataset và Distribution.

### GeoJSON
Theo RFC 7946, sử dụng hệ tọa độ EPSG:4326 (WGS 84) với geometry dạng Point.

### RDF
Hỗ trợ các định dạng Turtle, N-Triples, JSON-LD và RDF/XML với vocabularies từ schema.org, geo và dcterms.

---

## 🎓 Demo & Tiêu chí Open Data

OpenData Service thể hiện các tiêu chí:
- ✅ **Interoperability** - Chuẩn quốc tế NGSI-LD và DCAT-AP
- ✅ **Open Data** - Truy cập công khai với nhiều định dạng
- ✅ **Linked Data** - RDF, vocabularies và semantics
- ✅ **GIS Integration** - GeoJSON cho QGIS và ArcGIS
- ✅ **Data Catalog** - Metadata theo DCAT-AP

### Luồng Demo
1. Hiển thị DCAT-AP catalog và tổng quan datasets
2. Download CSV và phân tích trong Excel
3. Download GeoJSON và import vào QGIS
4. Hiển thị NGSI-LD theo chuẩn Smart Cities
5. Hiển thị RDF Turtle cho Linked Data

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/MNM-DTU-DZ2/GreenEduMap-DTUDZ/blob/main/LICENSE).
