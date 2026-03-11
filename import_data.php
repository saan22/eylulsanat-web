<?php

use App\Models\Course;
use App\Models\GalleryItem;
use App\Models\Product;
use App\Models\Setting;

$baseDir = 'C:/Users/savas/Downloads/agenttest/EylulSanatWeb/database/';

// 1. Settings
$settingsData = json_decode(file_get_contents($baseDir.'settings.json'), true);
if ($settingsData) {
    Setting::truncate();
    Setting::create(['data' => $settingsData]);
}

// 2. Courses
$coursesData = json_decode(file_get_contents($baseDir.'courses.json'), true);
if ($coursesData) {
    Course::truncate();
    foreach ($coursesData as $c) {
        Course::create([
            'title' => $c['title'],
            'slug' => $c['slug'],
            'description' => $c['description'] ?? '',
            'long_description' => $c['longDescription'] ?? '',
            'short_description' => $c['shortDescription'] ?? '',
            'image' => $c['image'] ?? '',
            'instructor' => $c['instructor'] ?? '',
            'duration' => $c['duration'] ?? '',
            'schedule' => $c['schedule'] ?? '',
            'price' => $c['price'] ?? '',
            'level' => $c['level'] ?? '',
            'category' => $c['category'] ?? '',
            'features' => $c['features'] ?? [],
        ]);
    }
}

// 3. Products
$productsData = json_decode(file_get_contents($baseDir.'products.json'), true);
if ($productsData) {
    Product::truncate();
    foreach ($productsData as $p) {
        Product::create([
            'title' => $p['title'],
            'slug' => $p['slug'],
            'description' => $p['description'] ?? '',
            'price' => isset($p['price']) ? (float) $p['price'] : 0,
            'image' => $p['image'] ?? '',
            'category' => $p['category'] ?? '',
            'features' => $p['features'] ?? [],
        ]);
    }
}

// 4. Gallery
$galleryData = json_decode(file_get_contents($baseDir.'gallery.json'), true);
if ($galleryData) {
    GalleryItem::truncate();
    foreach ($galleryData as $g) {
        GalleryItem::create([
            'url' => $g['src'] ?? $g['url'],
            'title' => $g['title'] ?? '',
            'category' => $g['category'] ?? '',
        ]);
    }
}

echo "TUM VERILER (KURS, URUN, AYAR) JSON'DAN MYSQL'E AKTARILDI!\n";
