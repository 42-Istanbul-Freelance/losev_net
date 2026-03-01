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

## Entegrasyon Rehberi

Frontend ve Backend entegrasyonu hakkında detaylı bilgi için `INTEGRATION_GUIDE.md` dosyasına bakınız.
