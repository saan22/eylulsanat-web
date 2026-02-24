# Eylül Sanat Atölyesi - 503 Hatası Çözüm Rehberi

Eğer sitenizde "503 Service Unavailable" hatası alıyorsanız, bu sunucudaki uygulamanın başlayamadığı anlamına gelir. İşte adım adım çözüm:

## 1. Node.js Sürümünü Kontrol Edin

Next.js 15+ için sunucuda en az **Node.js 18.17** veya **20.x** seçili olmalıdır.

1. cPanel -> **Setup Node.js App** menüsüne gidin.
2. Uygulamanızın **Node.js Version** kısmını kontrol edin.
   - Eğer 14, 16 gibi eski bir sürümse -> **Edit** diyerek **20** veya **18** yapın ve **Save** deyin. Sonra **Restart** edin.

## 2. Eksik Dosya veya Modül Kontrolü

1. cPanel -> **File Manager**'a gidin.
2. `eylulsanat` klasörünün içine girin.
3. Şu dosyaların olduğundan emin olun:
   - `server.js`
   - `.next` (klasör)
   - `public` (klasör)
   - `src` (klasör)
   - `package.json`
   - `node_modules` (Eğer yoksa "Run NPM Install" yapılmamıştır)

## 3. "server-debug.log" Dosyasını Okuyun

Yeni `server.js` dosyamız hataları bu dosyaya yazar.

1. File Manager'da `server-debug.log` adında bir dosya oluşmuş mu bakın.
2. Varsa, sağ tıklayıp **View** diyerek içeriğini okuyun.
3. Hata mesajını (Örn: "Module not found", "EADDRINUSE" vb.) kopyalayıp bize iletin.

## 4. NPM Install'ı Tekrar Çalıştırın

1. **Setup Node.js App** sayfasına gidin.
2. **Run NPM Install** butonuna tıklayın.
   - Eğer hata verirse, disk alanınız dolmuş olabilir veya internet bağlantısında kesinti olmuş olabilir.
3. Hata almadıysanız **Restart** butonuna basın.

## 5. Doğru Dosyaları Gönderme (Tekrar Yükleme Gerekirse)

Eğer yukarıdakiler işe yaramazsa temiz kurulum yapmanız gerekir:

1. Bilgisayarınızda `npm run build` komutunu çalıştırın.
2. Sadece şu dosyaları zipleyin (`node_modules` OLMADAN):
   - `.next`
   - `public`
   - `src`
   - `package.json`
   - `next.config.ts`
   - `server.js`
   - `.env.local`
3. Sunucudaki `eylulsanat` klasörünün içini (varsa `server-debug.log` hariç) **tamamen silin**.
4. Zip dosyasını yükleyin ve açın.
5. **Setup Node.js App** üzerinden tekrar **Run NPM Install** yapın.
6. **Restart** edin.
