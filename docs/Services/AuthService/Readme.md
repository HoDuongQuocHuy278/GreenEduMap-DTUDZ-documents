# 🔐 Auth Service

## 📋 Tổng quan

**Ngôn ngữ lập trình:** Python 3.11 + FastAPI  
**Port:** 8001  
**Database:** PostgreSQL  
**Trạng thái:** ✅ Hoạt động

Auth Service cung cấp xác thực và phân quyền cho hệ thống **GreenEduMap**, sử dụng JWT tokens và hỗ trợ nhiều vai trò người dùng.

---

## 🎯 Chức năng chính

### 🔑 Authentication

- **User Registration & Login**
  - Email/username + password registration
  - Secure password hashing (bcrypt, 12 rounds)
  - Email verification (optional)
  - Account activation

- **JWT Token Management**
  - Access tokens (short-lived, 15 minutes)
  - Refresh tokens (long-lived, 7 days)
  - Token rotation on refresh
  - Automatic token expiration

- **Password Security**
  - Bcrypt hashing algorithm
  - Salt generation per password
  - Password strength validation
  - Password reset flow

### 👥 User Management

- **User Roles**
  - `admin` - Full system access
  - `developer` - API key management, development features
  - `volunteer` - Rescue operations, community features
  - `citizen` - Basic access, reporting
  - `school` - Education features, school management

- **User Profile**
  - Email, username (unique)
  - Role assignment
  - Active/inactive status
  - Email verification status
  - Public/private profile flag (OpenData compliance)

### 🔐 Authorization

- **Role-Based Access Control (RBAC)**
  - Permission checking middleware
  - Route protection by role
  - Resource-level permissions
  - Hierarchical role system

- **API Key Management**
  - Generate API keys for developers
  - Scoped permissions per key
  - Rate limiting per key
  - Key revocation

### 🔄 Token Operations

- **Access Token**
  - Contains: user_id, email, role
  - Expiration: 15 minutes
  - Used for API authentication
  - Stateless validation

- **Refresh Token**
  - Stored in database
  - Expiration: 7 days
  - Rotation on use
  - Revocation support

---

## 🔌 API Endpoints

### Authentication

```bash
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

### User Management

```bash
GET    /api/v1/users          # List users (Admin only)
GET    /api/v1/users/{id}     # Get user by ID
PUT    /api/v1/users/{id}     # Update user
DELETE /api/v1/users/{id}     # Delete user (Admin only)
```

### API Keys

```bash
POST   /api/v1/api-keys       # Create API key (Developers)
GET    /api/v1/api-keys       # List my API keys
DELETE /api/v1/api-keys/{id}  # Revoke API key
```

---

## 💾 Database Schema

### users

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'citizen',
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### refresh_tokens

```sql
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_revoked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### api_keys

```sql
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    key_hash VARCHAR(255) NOT NULL,
    scopes TEXT,
    rate_limit INTEGER DEFAULT 1000,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 Setup

### Environment Variables

```env
# Auth Service
AUTH_SERVICE_HOST=0.0.0.0
AUTH_SERVICE_PORT=8001

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@postgres:5432/greenedumap

# JWT Configuration
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# Password Hashing
BCRYPT_ROUNDS=12
```

### Docker Deployment

```yaml
auth-service:
  build: ./modules/auth-service
  ports:
    - "8001:8001"
  depends_on:
    - postgres
  environment:
    - DATABASE_URL=postgresql+asyncpg://user:pass@postgres:5432/greenedumap
    - JWT_SECRET_KEY=${JWT_SECRET_KEY}
```

---

## 📡 Usage Examples

### Register User

```bash
curl -X POST http://localhost:8001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "johndoe",
    "password": "SecurePass123!",
    "role": "citizen"
  }'
```

### Login

```bash
curl -X POST http://localhost:8001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "expires_in": 900
}
```

### Get Current User

```bash
curl http://localhost:8001/api/v1/auth/me \
  -H "Authorization: Bearer <access_token>"
```

---

## 🔒 Security Features

- **Password Hashing**: Bcrypt with 12 rounds
- **JWT Tokens**: Signed with HS256 algorithm
- **Token Expiration**: Short-lived access tokens
- **Refresh Token Rotation**: New token on each refresh
- **API Key Hashing**: Stored as hashed values
- **Rate Limiting**: Per-user and per-API-key limits

---

## 📄 License

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ/blob/main/LICENSE).
