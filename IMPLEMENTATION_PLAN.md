# LÖSEV İnci Gönüllülük Takip Sistemi - Uygulama Planı (Frontend)

Bu doküman, LÖSEV İnci Gönüllülük Takip Sistemi'nin Vue.js tabanlı frontend geliştirme sürecini kapsamaktadır.

## 1. Proje Özeti
Sistem; ortaokul ve lise öğrencilerinin (İnci öğrencilerinin) gönüllülük faaliyetlerini kayıt altına almalarını, öğretmenlerin bu faaliyetleri onaylamasını ve Genel Merkez'in Türkiye genelindeki etkiyi raporlamasını sağlar.

## 2. Teknik Mimari
- **Framework:** Vue 3 (Composition API)
- **State Management:** Vue `reactive` / `ref` (başlangıç için), gerekirse Pinia.
- **Styling:** CSS3 / Vanilla CSS (Modern flexbox/grid) - sadelik ön planda.
- **Routing:** Vue Router.
- **Build Tool:** Vite.
- **Yaklaşım:** Mobile-First, PWA (Progressive Web App).

## 3. Kullanıcı Rolleri ve Özellikler

### A. Öğrenci (İnci Öğrencisi)
- **Profil:** Okul, sınıf ve koordinatör öğretmen bilgileri.
- **Faaliyet Girişi:** Tarih, tür, saat, açıklama ve fotoğraf/belge yükleme.
- **Takip:** Toplam, aylık ve yıllık gönüllülük saati gösterimi.
- **Başarılar:** Kazanılan rozetlerin (Bronz, Gümüş, Altın, Platin) profil sayfasında sergilenmesi.

### B. Koordinatör Öğretmen
- **Onay Paneli:** Öğrencilerin girdiği faaliyetleri onaylama veya düzenleme talebiyle reddetme.
- **Raporlama:** Okul bazlı toplam saat ve öğrenci performansı.

### C. Genel Merkez (Admin)
- **Dashboard:** Türkiye geneli etki haritası ve istatistikler.
- **Sıralamalar:** En aktif 10 okul ve 10 öğrenci listesi.

## 4. API ve Veri Modeli Taslağı
Backend geliştirici ile koordinasyon için belirlenen temel uç noktalar:
- `/auth/login`, `/auth/register`
- `/student/profile`, `/student/activities` (GET/POST)
- `/teacher/pending-activities`, `/teacher/activities/{id}` (PATCH)
- `/admin/stats`, `/admin/rankings`

## 5. UI/UX Prensipleri (Türkçe Arayüz)
- **Renk Paleti:** LÖSEV Kırmızı (#E30613), LÖSEV Sarı (#FDC010).
- **Dil:** Uygulama arayüzü tamamen Türkçe olacaktır.
- **Erişilebilirlik:** Sade navigasyon, yüksek okunabilirlik.

## 6. Geliştirme Yol Haritası (Fazlar)

### Faz 1: Altyapı ve Auth (Hafta 1)
- Proje kurulumu (Vite + Vue 3).
- Giriş ve Kayıt sayfalarının Türkçe olarak tasarlanması.
- Temel Layout ve Navigasyon bileşenlerinin oluşturulması.

### Faz 2: Öğrenci Alanı (Hafta 2)
- Faaliyet ekleme formu.
- Profil ve Saat takip ekranları.
- Rozet mantığının frontend taraflı görselleştirilmesi.

### Faz 3: Öğretmen ve Admin Panelleri (Hafta 3)
- Faaliyet onay akışı.
- Basit grafiklerle (Chart.js vb. - opsiyonel) raporlama ekranları.
- Türkiye geneli istatistik tabloları.

### Faz 4: PWA ve Final (Hafta 4)
- Offline destek ve manifest yapılandırması.
- Mobil uyumluluk testleri.
- Son kullanıcı testleri ve dokümantasyon.

---
*Not: Bu plan, projenin frontend tarafına odaklanmaktadır. Arka yüz (Backend) geliştirmeleri eş zamanlı olarak ayrı bir ekip tarafından yürütülecektir.*
