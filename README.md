# LÖSEV İnci Gönüllülük Takip Sistemi

Bu proje, LÖSEV İnci öğrencilerinin gönüllülük faaliyetlerini takip etmek amacıyla geliştirilmiştir. Frontend (Vue.js) ve Backend (NestJS) tek bir konteyner üzerinden sunulmaktadır.

## Proje Yapısı

- `frontend/`: Vue.js uygulaması
- `backend/`: NestJS API uygulaması
- `Dockerfile`: Her iki uygulamayı da derleyip sunan birleşik Docker dosyası

## Başlangıç

### Ön Gereksinimler

- Docker (veya Node.js 20+)

### Docker ile Çalıştırma (Tavsiye Edilen)

Uygulamayı tek bir port üzerinden (8080) çalıştırmak için:

1.  Resmi derleyin:
    ```bash
    docker build -t losev-inci .
    ```

2.  Konteyneri çalıştırın (Veri kalıcılığı için yerel bir dizini bağlamayı unutmayın):
    ```bash
    docker run -p 8080:8080 \
      -v $(pwd)/data:/app/backend/data \
      -v $(pwd)/uploads:/app/backend/uploads \
      --name losev-inci-container \
      losev-inci
    ```

**Önemli:** Verilerin silinmemesi için `-v` parametresi ile `data` ve `uploads` klasörlerini bilgisayarınızdaki bir klasöre bağlamanız gerekir.

### Yerel Geliştirme (Docker Olmadan)

#### Backend'i Çalıştırma:
```bash
cd backend
npm install
npm run start:dev
```
Backend `http://localhost:8080/api` üzerinden çalışacaktır.

#### Frontend'i Çalıştırma:
```bash
cd frontend
npm install
npm run dev
```
Frontend `http://localhost:5173` üzerinden çalışacaktır.

## API Dokümantasyonu

Uygulama çalıştıktan sonra `http://localhost:8080/api/docs` adresinden tüm API uç noktalarına ve modellerine ulaşabilirsiniz.

## Kullanıcı Rolleri ve Paneller

Sistemde üç temel rol bulunmaktadır:

### 1. Öğrenci Paneli
Öğrenciler kayıt olduktan sonra (Admin onayı gerekir) sisteme giriş yapabilirler.
- **Faaliyet Ekleme:** Yapılan gönüllülük çalışmalarını fotoğraf/belge ekleyerek kaydedebilirler.
- **Saat Takibi:** Onaylanmış toplam ve aylık gönüllülük saatlerini görebilirler.
- **Rozet Sistemi:** Gönüllülük saatlerine göre (25, 50, 100, 200 saat) otomatik rozet kazanırlar.

### 2. Öğretmen Paneli
Koordinatör öğretmenler, kendi okullarındaki öğrencilerin faaliyetlerini inceler.
- **Faaliyet Onaylama:** Bekleyen faaliyetleri inceleyip onaylayabilir veya revizyon isteyebilirler.
- **İstatistikler:** Okul bazlı aktiflik durumunu takip edebilirler.

### 3. Genel Merkez (Admin) Paneli
Tüm sistemin yönetiminden sorumludur.
- **Kullanıcı Onayları:** Yeni kayıt olan öğrenci ve öğretmenlerin hesaplarını aktif hale getirirler.
- **Geniş Çaplı Raporlama:** Türkiye geneli toplam saat ve şehir bazlı dağılımı analiz ederler.
- **Sıralamalar:** En aktif 10 okul ve öğrenci listesine erişebilirler.

**Admin Erişimi:**
Admin hesapları güvenlik nedeniyle manuel olarak oluşturulur. Mevcut demo sistemde `admin@losev.org.tr` / `adminpassword` bilgileri ile giriş yapabilirsiniz.

## Entegrasyon Rehberi

Frontend ve Backend entegrasyonu hakkında detaylı bilgi için `INTEGRATION_GUIDE.md` dosyasına bakınız.
