# Uygulama Adımları ve Değişiklik Özeti (LÖSEV MVP)

Bu dosya, projeyi LÖSEV gönüllülük takip sistemi MVP gereksinimlerine uygun hale getirmek için yapılan tüm teknik değişiklikleri özetlemektedir.

## 1. Rol ve Yetki Yönetimi (Backend)
- **Etkinlik Oluşturma:** `ActivitiesController` ve `ActivitiesService` güncellendi. Artık sadece `ADMIN` ve `TEACHER` rolleri etkinlik (`Activity`) oluşturabilir. Öğrencilerin bu yetkisi kaldırıldı.
- **Katılım Mekanizması:** Öğrenciler için `joinActivity` fonksiyonu eklendi. `ActivityParticipant` tablosu ile öğrencilerin etkinliklere katılım bildirmesi sağlandı.
- **Onay Zinciri:**
    - Öğrenciler: `TEACHER` veya `ADMIN` tarafından onaylanabilir.
    - Öğretmenler: Yalnızca `ADMIN` tarafından onaylanabilir.
- **Yoklama Sistemi:** Öğrenci katılım bildirdiğinde durumu `PENDING` (Bekliyor) olur. Öğretmen veya Admin onayladığında `APPROVED` (Onaylandı) olur ve gönüllülük saatine eklenir.

## 2. Sosyal Özelliklerin Kaldırılması
- **Fotoğraf/Belge:** `Activity` varlığından `imageUrl` ve `documentUrl` alanları kaldırıldı. Frontend formlarından dosya yükleme bileşenleri temizlendi.
- **Etkileşim:** Forum, yorum ve feed özellikleri sistemden tamamen arındırıldı.

## 3. Tek Yönlü Duyuru Panosu
- `Announcements` (Duyurular) modülü eklendi.
- Sadece `ADMIN` ve `TEACHER` duyuru oluşturabilir veya silebilir.
- Öğrenciler dashboard üzerinden bu duyuruları sadece okuyabilir.

## 4. Teknik Yapılandırma ve Docker
- **Docker:** `docker-compose.yml` dosyası eklendi.
- **Dockerfile:** Frontend ve Backend'i tek bir konteynerde derleyip sunan yapı doğrulandı.
- **Veritabanı:** `AppModule` içinde SQLite veritabanı yolu çevre değişkeni (`DB_PATH`) ile dinamik hale getirildi. Verilerin kalıcılığı için `/app/data` dizini volume olarak tanımlandı.

## 5. Frontend Güncellemeleri
- **Öğrenci Paneli:** "Etkinlik Ekle" yerine "Etkinlik Listesi" ve "Katılım Bildir" akışı getirildi. Duyuru panosu eklendi.
- **Öğretmen Paneli:** Etkinlik oluşturma ve duyuru paylaşma butonları eklendi. "Bekleyen Onaylar" ekranı hem yeni öğrencileri hem de etkinlik katılımlarını içerecek şekilde geliştirildi.
- **Admin Paneli:** Genel istatistikler ve okul bazlı sıralamalar yeni veri modeline (katılımcı bazlı saat hesaplama) uygun hale getirildi.

## 6. Veritabanı Modeli Değişiklikleri
- `Activity`: `creatorId` eklendi, `studentId` kaldırıldı.
- `ActivityParticipant`: Yeni tablo (activityId, studentId, status).
- `Announcement`: Yeni tablo (title, content, creatorId).
- `User`: `activities` ilişkisi kaldırıldı (yerine katılım tablosu geldi).
