<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Set;
use Illuminate\Support\Str;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Genel Bilgiler')
                    ->description('Ürünün temel bilgilerini buradan yönetebilirsiniz.')
                    ->columns(2)
                    ->schema([
                        \Filament\Forms\Components\Toggle::make('is_active')
                            ->label('Yayında')
                            ->default(true)
                            ->columnSpanFull(),
                        TextInput::make('title')
                            ->label('Ürün Adı')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),
                        TextInput::make('slug')
                            ->label('Bağlantı URL')
                            ->required()
                            ->unique('products', 'slug', ignoreRecord: true)
                            ->helperText('Ürün linki otomatik oluşturulur, gerekirse düzenleyebilirsiniz.'),
                        Textarea::make('description')
                            ->label('Ürün Açıklaması')
                            ->placeholder('Ürün hakkında kısa bir bilgi yazın...')
                            ->columnSpanFull(),
                        TextInput::make('price')
                            ->label('Satış Fiyatı')
                            ->numeric()
                            ->prefix('₺')
                            ->required(),
                        TextInput::make('category')
                            ->label('Kategori')
                            ->placeholder('Örn: Yağlı Boya, Heykel...'),
                    ]),

                Section::make('Ürün Özellikleri')
                    ->description('Ürünün teknik detaylarını liste halinde ekleyin (Örn: Boyut, Materyal).')
                    ->schema([
                        TagsInput::make('features')
                            ->label('Özellik Listesi')
                            ->placeholder('Yeni özellik ekle ve Enter\'a bas')
                            ->helperText('Her özellikten sonra Enter tuşuna basarak listeye ekleyebilirsiniz.'),
                    ]),

                Section::make('Görsel Yönetimi')
                    ->description('Ürün fotoğraflarını yükleyin. En iyi görünüm için 4:5 oranında (Örn: 800x1000px) görseller kullanın.')
                    ->schema([
                        FileUpload::make('image')
                            ->label('Ana Kapak Fotoğrafı')
                            ->image()
                            ->disk('public')
                            ->required()
                            ->directory('products')
                            ->helperText('Mağaza listesinde görünecek ilk fotoğraf. Tavsiye edilen: 800x1000px'),
                        
                        FileUpload::make('gallery')
                            ->label('Ürün Galerisi')
                            ->image()
                            ->multiple()
                            ->disk('public')
                            ->maxFiles(3)
                            ->directory('products/gallery')
                            ->helperText('En fazla 3 adet ek detay görseli ekleyebilirsiniz. Tavsiye edilen: 800x1000px'),
                    ]),
            ]);
    }
}
