# Eylül Sanat Atölyesi - Web Projesi

Bu proje **Next.js 14** ve **Tailwind CSS** kullanılarak geliştirilmiş, veritabanı gerektirmeyen (JSON tabanlı) özel bir web uygulamasıdır.

## 🚀 Projeyi Çalıştırma

1. Bağımlılıkları yükleyin (İlk sefer için):

    ```bash
    npm install
    ```

2. Geliştirme sunucusunu başlatın:

    ```bash
    npm run dev
    ```

3. Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## 🔐 Yönetim Paneli

Site içeriklerini yönetmek için `/admin` adresine gidin.

* **Panel Adresi:** [http://localhost:3000/admin](http://localhost:3000/admin)
* **Varsayılan Şifre:** `admin123`

### Şifreyi Değiştirme

`.env.local` dosyasındaki `ADMIN_PASSWORD_HASH` değerini değiştirerek şifreyi güncelleyebilirsiniz. Yeni bir BCrypt hash oluşturmak için terminalde şunu çalıştırabilirsiniz:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YENI_SIFREMIZ', 10));"
```

## 📂 Veri Yapısı (JSON CMS)

Bu projede MySQL veya MongoDB gibi bir veritabanı **kullanılmaz**. Tüm veriler `src/data` klasöründeki JSON dosyalarında tutulur.

* `settings.json`: Site başlığı, telefon, adres vb.
* `courses.json`: Kurs listesi.
* `gallery.json`: Galeri resimleri.
* `messages.json`: İletişim formundan gelen mesajlar.

> **Yedekleme İpucu:** `src/data` ve `public/uploads` klasörlerini kopyalamanız sitenizin tam yedeğini almanız demektir.

## 🛠️ Yayına Alma (Deployment)

Projenizi cPanel veya herhangi bir Node.js destekleyen sunucuya yükleyebilirsiniz.

1. Projeyi build alın:

    ```bash
    npm run build
    ```

2. `.next`, `public`, `package.json` ve `node_modules` klasörlerini sunucuya atın.
3. `npm start` komutu ile başlatın.
