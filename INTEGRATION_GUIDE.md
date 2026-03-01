# LÖSEV İnci Gönüllülük Takip Sistemi - API Entegrasyon Rehberi

Bu rehber, frontend geliştiricilerinin NestJS backend'i ile nasıl entegre olacağını açıklar.

## Genel Bilgiler

- **Temel URL:** `http://localhost:8080/api`
- **Swagger Dokümantasyonu:** `http://localhost:8080/api/docs` (Tüm endpoint'ler, istek ve cevap modelleri burada detaylandırılmıştır.)
- **İçerik Türü:** Tüm API istekleri `application/json` kabul eder (Dosya yükleme hariç).

## Kimlik Doğrulama (Authentication)

Sistem JWT (JSON Web Token) kullanır. `auth/login` endpoint'inden alınan token, sonraki tüm isteklere `Authorization` header'ı ile eklenmelidir.

**Header Formatı:**
`Authorization: Bearer <JWT_TOKEN>`

## Ana Endpoint Grupları

### 1. Kimlik ve Kayıt (Auth)
- `POST /auth/register`: Yeni kullanıcı kaydı. `role` alanı `STUDENT`, `TEACHER` veya `ADMIN` olabilir.
- `POST /auth/login`: Giriş yapar ve `access_token` döner.

### 2. Kullanıcı İşlemleri (Users)
- `GET /users/profile`: Giriş yapan kullanıcının tüm bilgilerini döner.
- `GET /users/pending` (Sadece ADMIN): Onay bekleyen öğrencileri/öğretmenleri listeler.
- `PATCH /users/:id/status` (Sadece ADMIN): Kullanıcıyı onaylar (`APPROVED`) veya reddeder (`REJECTED`).

### 3. Faaliyet İşlemleri (Activities)
- `POST /activities`: Yeni faaliyet ekler. `multipart/form-data` kullanmalıdır.
    - Alanlar: `date`, `type`, `hours`, `description`
    - Dosyalar: `files` (maksimum 2 adet: Resim ve Belge)
- `GET /activities/my`: Öğrencinin kendi faaliyetlerini listeler.
- `GET /activities/my/stats`: Öğrencinin toplam onaylanmış saatini döner.
- `GET /activities/pending` (Sadece TEACHER/ADMIN): Onay bekleyen tüm faaliyetleri listeler.
- `PATCH /activities/:id/status` (Sadece TEACHER/ADMIN): Faaliyeti onaylar, reddeder veya revizyon ister.

### 4. İstatistik ve Sıralama
- `GET /activities/stats/global`: Türkiye geneli toplam saat ve şehir bazlı dağılım.
- `GET /activities/stats/rankings`: En aktif 10 öğrenci ve 10 okul listesi.

## Faaliyet Türleri (Enum Values)
- `SEMINAR`, `STAND`, `DONATION`, `BAZAAR`, `PUBLIC_AWARENESS`, `SOCIAL_MEDIA`, `AWARENESS_EVENT`

## Durumlar (Status Enums)
- `PENDING`, `APPROVED`, `REJECTED`, `REVISION_REQUESTED`

## Önemli Notlar
- Resim/Dosya Yükleme: `/activities` POST isteğinde `files` anahtarı altında gönderilen dosyalar backend'de saklanır.
- Dosyalara Erişim: Yüklenen dosyalara `http://localhost:8080/api/uploads/<dosya_adi>` üzerinden erişilebilir.
