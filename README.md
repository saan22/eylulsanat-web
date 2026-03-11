# Eylül Sanat Atölyesi - Web Yönetim Sistemi (v1.0)

Bu proje, Eylül Sanat Atölyesi için özel olarak geliştirilmiş; mağaza ürünlerini, kursları, galeri öğelerini ve genel site içeriklerini yönetmeyi sağlayan modern bir web uygulamasıdır.

## 🚀 Özellikler

- **Mağaza Yönetimi:** Çoklu resim yükleme, otomatik link (slug) oluşturma, kategori bazlı listeleme ve WhatsApp entegrasyonu.
- **Kurs Yönetimi:** Aktif/Pasif durumu, detaylı açıklama ve görsel yönetimi.
- **Galeri:** Atölye çalışmalarını sergilemek için optimize edilmiş lightbox galerisi.
- **Dinamik Site Ayarları:** Üst logo (Header), alt logo (Footer), iletişim bilgileri ve ana sayfa içeriklerinin panel üzerinden yönetimi.
- **Modern Arayüz:** Tailwind CSS ve Filament ile güçlendirilmiş, responsive (mobil uyumlu) tasarım.

## 🛠️ Kurulum

Sistemi sunucunuza kurmak için aşağıdaki adımları izleyin:

1.  **Dosyaları Yükleyin:** Sunucunuza projenin tüm dosyalarını yükleyin.
2.  **Veritabanı Yapılandırması:** `.env` dosyasını oluşturun ve veritabanı bilgilerinizi girin.
3.  **Bağımlılıkları Kurun:**
    ```bash
    composer install
    npm install && npm run build
    ```
4.  **Veritabanı Tablolarını Oluşturun:**
    ```bash
    php artisan migrate
    ```
5.  **Admin Kullanıcısı Oluşturun:**
    ```bash
    php artisan make:filament-user
    ```
6.  **Storage Linkini Oluşturun:**
    ```bash
    php artisan storage:link
    ```

## 📂 Dosya Yapısı

- `app/Filament`: Yönetim paneli yapılandırmaları.
- `resources/views`: Web sitesinin ön yüz (frontend) dosyaları.
- `routes/web.php`: Uygulama yönlendirmeleri.
- `database/migrations`: Veritabanı şemaları.

## 📄 Lisans

Bu proje Eylül Sanat Atölyesi'ne özel olarak geliştirilmiştir.

---
**Version:** 1.0 (Final)
**Yayın Tarihi:** 11 Mart 2026
