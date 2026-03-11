<?php

use App\Models\Course;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // Sadece örnek kursları (varsa aktif filtresi eklenebilir) 3 tane al
    $activeCourses = Course::where('is_active', true)->take(3)->get();

    return view('welcome', compact('activeCourses'));
});

// Kurs Rotaları
Route::get('/kurslar', function () {
    $courses = Course::where('is_active', true)->get();

    return view('courses.index', compact('courses'));
});

use App\Models\GalleryItem;
use App\Models\Message;
use App\Models\Product;
use Illuminate\Http\Request;

Route::get('/kurslar/{slug}', function ($slug) {
    $course = Course::where('slug', $slug)->where('is_active', true)->firstOrFail();

    return view('courses.show', compact('course'));
});

// Mağaza (Ürünler) Rotaları
Route::get('/urunler', function () {
    $products = Product::where('is_active', true)->get();

    return view('products.index', compact('products'));
});

// Galeri Rotası
Route::get('/galeri', function () {
    $galleryItems = GalleryItem::where('is_active', true)->inRandomOrder()->get();

    return view('gallery.index', compact('galleryItems'));
});

// İletişim Rotaları
Route::get('/iletisim', function () {
    return view('contact.index');
});

Route::post('/iletisim', function (Request $request) {
    // Mesajı Veritabanına (ve Admin Paneline) kaydet
    Message::create([
        'name' => $request->input('name', 'İsimsiz'),
        'email' => $request->input('email', 'Belirtilmedi'),
        'subject' => 'Web Sitesinden Yeni İletişim Formu Mesajı',
        'message' => 'Telefon: '.$request->input('phone', '-')."\n\nMesaj:\n".$request->input('message'),
        'read' => false,
    ]);

    // Başarı mesajıyla sayfaya geri döndür
    return back()->with('success', 'Mesajınız başarıyla alındı, en kısa sürede size dönüş yapacağız.');
});

// Veritabanı Migrasyonlarını (Tablo Güncellemelerini) Host Üzerinden Çalıştırmak İçin Gizli URL
Route::get('/sys/migrate', function () {
    \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
    return "Veritabanı Tabloları Başarıyla Güncellendi! / Migration successfully completed.";
});

// Depolama Linki Oluşturma (Görsellere Erişim İçin) Gizli URL
Route::get('/sys/storage-link', function () {
    try {
        // Standart Laravel yöntemi
        \Illuminate\Support\Facades\Artisan::call('storage:link');
        return "Depolama Linki Başarıyla Oluşturuldu! / Storage link successfully created.";
    } catch (\Exception $e) {
        // Manuel Symlink Denemesi (Hosting SSH izin vermiyorsa)
        $publicStorage = public_path('storage');
        $appStorage = storage_path('app/public');
        
        if (file_exists($publicStorage)) {
            return "DİKKAT: 'public/storage' zaten mevcut. Eğer görseller gözükmüyorsa bu klasörü silip rotayı tekrar çalıştırın.";
        }
        
        if (symlink($appStorage, $publicStorage)) {
            return "Manuel Depolama Linki Başarıyla Oluşturuldu!";
        }
        
        return "Hata: Link oluşturulamadı. Lütfen teknik destekle görüşün veya 'public_html/storage' klasörünü manuel oluşturun.";
    }
});

// Depolama Sorunlarını Giderme (Gelişmiş)
Route::get('/sys/fix-storage', function () {
    $results = [];
    
    // 1. Mevcut durum kontrolü
    $appStorage = storage_path('app/public');
    $webRootStorage = base_path('public_html/storage'); // Genelde ana dizin içindedir
    
    $results[] = "Uygulama Dizini: " . base_path();
    $results[] = "Asıl Fotoğraf Klasörü: " . $appStorage . (is_writable($appStorage) ? " [YAZILABİLİR ✅]" : " [YAZILAMAZ ❌ - İzinleri 755 yapın]");
    
    // Eğer public_html içinde değilse ve yoksa oluşturmayı deneyelim
    if (!file_exists($webRootStorage)) {
        if (mkdir($webRootStorage, 0755, true)) {
            $results[] = "BAŞARI: public_html/storage klasörü oluşturuldu! ✅";
        } else {
            $results[] = "HATA: public_html/storage bulunamadı ve oluşturulamadı. ❌";
        }
    } else {
        $results[] = "BİLGİ: public_html/storage klasörü mevcut." . (is_writable($webRootStorage) ? " [YAZILABİLİR ✅]" : " [YAZILAMAZ ❌ - İzinleri 755 yapın]");
    }
    
    // Livewire Geçici Dosya Klasörü Kontrolü
    $livewireTmp = storage_path('app/livewire-tmp');
    if (!file_exists($livewireTmp)) {
        mkdir($livewireTmp, 0755, true);
    }
    $results[] = "Livewire Geçici Klasör: " . $livewireTmp . (is_writable($livewireTmp) ? " [YAZILABİLİR ✅]" : " [YAZILAMAZ ❌ - İzinleri 755 yapın]");
    
    return "<pre>" . implode("\n", $results) . "</pre>";
});
