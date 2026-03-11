<?php

use App\Models\Course;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // Sadece örnek kursları (varsa aktif filtresi eklenebilir) 3 tane al
    $activeCourses = Course::take(3)->get();

    return view('welcome', compact('activeCourses'));
});

// Kurs Rotaları
Route::get('/kurslar', function () {
    $courses = Course::all();

    return view('courses.index', compact('courses'));
});

use App\Models\GalleryItem;
use App\Models\Message;
use App\Models\Product;
use Illuminate\Http\Request;

Route::get('/kurslar/{slug}', function ($slug) {
    $course = Course::where('slug', $slug)->firstOrFail();

    return view('courses.show', compact('course'));
});

// Mağaza (Ürünler) Rotaları
Route::get('/urunler', function () {
    $products = Product::all();

    return view('products.index', compact('products'));
});

// Galeri Rotası
Route::get('/galeri', function () {
    $galleryItems = GalleryItem::inRandomOrder()->get();

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
