# LÖSEV Etkinlik ve Gönüllü Takip Platformu (42 Intra Benzeri) Proje İhtiyaç Dokümanı

## 1. Projeye Neden İhtiyaç Var? (Arka Plan ve Mevcut Durum)
LÖSEV'in sahadaki operasyonlarının ve farkındalık faaliyetlerinin merkezinde çok büyük ve değerli bir **"Gönüllü"** ağı yer almaktadır. LÖSEV, bu gönüllü topluluğunu organize etmek, motive etmek ve emeklerini taçlandırmak amacıyla çeşitli konferanslar, seminerler ve saha faaliyetleri düzenlemektedir. 

Gönüllülerin bu etkinliklere katılım süreleri toplanmakta ve toplamda **30 saatlik katılım** gösteren gönüllülere, eğitim ve kariyer hayatlarında referans olabilmesi adına **resmi katılım/gönüllülük sertifikası** verilmektedir.

## 2. Yaşanan Problemler ve Operasyonel Yükler
Mevcut durumda etkinlik koordinatörleri aşağıdaki çok ciddi operasyonel darboğazlarla mücadele etmektedir:

- **Manuel ve Hataya Açık Yoklama Süreci:** Farklı lokasyonlarda gerçekleşen organizasyonlara gelen yüzlerce gönüllünün yoklaması; imza listeleri, elden dolaşan kağıtlar veya anlık Excel/Whatsapp listeleri üzerinden tutulmaktadır. Kimin hangi etkinliğe katılıp katılmadığını teyit etmek kaotik bir süreçtir.
- **Saat Takibinin İmkansızlığı (Kilit Problem):** LÖSEV tarafının belirttiği ana pürüz şudur: *"Bütün katılımcıların kaç saat konferansa katıldıklarını takip etmek çok zor oluyordu."* Bir kullanıcının aylara yayılmış farklı etkinliklerde topladığı bu kredi (saat) verilerinin tek bir merkezde manuel hesaplanması operasyonel bir kabustur.
- **Şeffaflık ve Veri Yönetimi Eksikliği:** 
  - Gönüllü (Öğrenci) kendi profiline girip *"Ben 15 saat daha etkinliğe katılırsam sertifikamı alacağım, geçmişte şunlara katıldım"* diyememektedir. 
  - Yöneticiler *"Bugün itibariyle 30 barajını doldurup sertifika hak eden kimler var?"* sorusunun cevabına manuel veri yığınlarını incelemeden ulaşamamaktadır.

## 3. Çözüm: Merkezi ve Dijital "Intra" Benzeri Etkinlik Platformu
Yöneticilerin etkinlik (konferans vb.) ilanlarını açabildiği, katılımcıların bu etkinliklere tek tıkla **kayıt (RSVP)** olduğu, etkinlik günü basit bir dijital doğrulama ile etkinlik saatlerinin **otomatik olarak** katılımcının bakiyesine yansıdığı merkezi bir platform geliştirmek. 

---

## 4. Temel Ürün Beklentileri ve Roller
1. **Öğretmen / Etkinlik Yöneticisi:** Etkinlikleri (adı, yeri, süresi) oluşturur. Öğrencilerin katılımını dijital olarak onaylar veya yönetir. Herkesin toplam katılım saatini ve konferans sicilini tablolar halinde görüntüleyebilir.
2. **Öğrenci / Gönüllü:** Yaklaşan etkinlikleri görür, başvuru yapar. Kod girerek katılımını sisteme işletir ve 30 saatine ne kadar kaldığını profilinden takip eder.

## 5. Kesin Sınırlar, Arayüz ve Rol Hiyerarşisi (Toplantı Kararları)
Projenin LÖSEV'in sahadaki işleyişine uygun olması için aşağıdaki kurallar **istisnasız** uygulanmalıdır:

1. **Sosyal Etkileşim (Mesajlaşma/Yorum) Yasağı:** Platform bir sosyal medya veya mesajlaşma uygulaması değildir. Öğrencilerin bir gönderinin altına yorum yapması, fotoğraf paylaşması (feed akışı) **istenmemektedir**. Arayüz; 42 Intra'ya benzer şekilde sadece yaklaşan etkinliklerin (slider/liste formatında) görüldüğü duyuru odaklı bir yapıda geliştirilmelidir.
2. **Etkinlik Açma Yetkisi Sınırı:** Etkinlik (konferans, okul ziyareti vb.) oluşturma yetkisi **sadece** Adminler (LÖSEV Genel Merkez) ve sistemde yetkili Öğretmenlerdedir. Öğrenciler (Gönüllüler) sistemde kesinlikle etkinlik oluşturamaz.
3. **Sisteme Kayıt ve Yetki Hiyerarşisi:**
   - **Admin Hesapları:** Sisteme sadece yine en tepedeki başka bir Admin tarafından yetkilendirilerek dahil edilebilir.
   - **Öğretmen Hesapları:** Sisteme dahil olan öğretmenlerin hesap onayları (authorize) **sadece Adminler** tarafından verilebilir.
   - **Öğrenci (Gönüllü) Hesapları:** Kayıt olan bir gönüllünün yetkilendirilmesi ve onayı hem **Adminler** hem de **Öğretmenler** tarafından yapılabilir.

## 🛠 Değerlendirme (Review) Süreci İçin Zorunlu Kurallar (MVP Kısıtlamaları)
Öğrenci projelerinin LÖSEV beklentisini doğru karşılayıp karşılamadığını hızlıca test edebilmek için geliştiricilerin uyması gereken katı sınırlar:

1. **İzole ve Dışa Bağımsız (Standalone):** Bu sistem şimdilik LÖSEV'in ana otomasyonlarına veya CRM'lerine entegre edilmeyecektir. Tamamen kendi veritabanını kullanan kapalı ve bağımsız bir yapı tasarlanmalıdır.
2. **Basit "Yoklama Katılım Kodu" Yöntemi:** Tüm kullanıcıların kameralarından QR kod okutması evaluasyon aşamasında karmaşa yaratabilir. Çözüm: Yönetici etkinlik günü için sistemden "LÖSEV42" gibi spesifik bir kod veya bir onay linki oluşturur, öğrenciler hesaplarındaki ilgili alana etkinliğin kodunu girerek saatlerini bakiyelerine eklerler.
3. **Seed Data (Dolu Sistem):** Sistem ayağa kaldırıldığında test edilebilmesi için; en az 1 Yönetici hesabı, 3 Öğrenci hesabı, geçmişte yapılmış 2 etkinlik (saatleri dağıtılmış) ve yaklaşan 1 etkinlik sistemde **hazır (seed script ile oluşturulmuş)** bulunmalıdır.
4. **Tek Komutla Dağıtım:** Çevresel uyumsuzluklardan kaçınmak için tüm projeler **Docker (`docker-compose up`)** yapılandırmasına sahip olmalı, veritabanı ve sunucu tek komutta test edenin karşısına gelmelidir.
