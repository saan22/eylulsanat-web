# Eylül Sanat Atölyesi - Güncel cPanel Yayına Alma Rehberi (Şubat 2026)

Disk alanı genişletilmiş sunucular için **en sağlıklı ve en performanslı** kurulum rehberidir.

## 1. Hazırlık (Kendi Bilgisayarınızda)

1. **Build Alın:** Terminalde şu komutu çalıştırarak projeyi derleyin. (Bu işlem `metadataBase` dahil tüm ayarları optimize eder):

   ```bash
   npm run build
   ```

2. **Dosyaları Seçin:** Klasörünüzden şu dosya ve klasörleri seçin:
   - `.next` (Klasör)
   - `public` (Klasör)
   - `src` (Klasör - Veritabanı ve ayarlar buradadır)
   - `package.json`
   - `next.config.js`
   - `server.js`
   - `.env.local`

3. **Zipleyin:** Seçtiğiniz bu dosyaları `eylul_site.zip` adıyla sıkıştırın.
   > **NOT:** `node_modules` klasörünü yüklemeyin! Sunucuda temiz kurulum yapılacak.

## 2. Sunucu Kurulumu (cPanel)

1. **Eskileri Silin:**
   - cPanel **File Manager**'a girin.
   - Daha önceki başarısız denemelerden kalan tüm dosya ve klasörleri **kalıcı olarak silin** (Çöp kutusunu atla/Skip trash seçerek).
   - Sunucudaki `.npm` klasörünü de mutlaka silin.

2. **Node.js Uygulamasını Oluşturun:**
   - cPanel **"Setup Node.js App"** menüsüne gidin.
   - Eğer eski uygulama duruyorsa **Delete** ile silin.
   - **Create Application** deyin:
     - **Node.js Version:** 18 veya 20 seçin.
     - **Application Mode:** Production
     - **Application Root:** Siteniz için klasör adı (örn: `eylulsanat`)
     - **Application URL:** Domain adresiniz.
     - **Application Startup File:** `server.js`
   - **Create** butonuna basın.

## 3. Dosyaları Yükleme ve Başlatma

1. **Zip'i Yükleyin:** Oluşturduğunuz `eylul_site.zip` dosyasını `eylulsanat` klasörüne yükleyin ve **Extract** (Çıkar) deyin.
2. **Kütüphaneleri Kurun:**
   - **Setup Node.js App** sayfasına geri dönün.
   - Uygulamanızın yanındaki kalem ikonuna basın.
   - **"Run NPM Install"** butonuna tıklayın. (Disk alanınız olduğu için tüm modüller sunucu ortamına uygun şekilde kurulacaktır).
3. **Gizli Ayarları Ekleyin:** Aynı sayfada "Configuration variables" kısmına şunları ekleyin:
   - `SESSION_SECRET` = `eylulsanat_gizli_anahtar_2026`
   - `NEXT_PUBLIC_SITE_URL` = `https://eylulsanatatolyesi.com.tr`
4. **Başlatın:** **Restart** butonuna basın.

## Giriş Bilgileri

- **Admin Panel:** `https://eylulsanatatolyesi.com.tr/admin`
- **Varsayılan Şifre:** `123456` (Giriş yaptıktan sonra değiştirebilirsiniz)

## Kritik Notlar

- Siteniz açılmazsa (503 hatası verirse) mutlaka cPanel'deki **Restart** butonuna tekrar basın.
- Görsel yükleme sorunu olursa `public/uploads` klasörünün iznini 755 veya 777 yapın.
