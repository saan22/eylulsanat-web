<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\Toggle::make('is_active')->label('Yayında')->default(true)
                    ->columnSpanFull(),
                TextInput::make('title')->label('Ürün Adı')
                    ->required(),
                TextInput::make('slug')->label('Bağlantı URL (Slug)')
                    ->required()
                    ->unique('products', 'slug', ignoreRecord: true),
                Textarea::make('description')->label('Ürün Açıklaması')
                    ->columnSpanFull(),
                TextInput::make('price')->label('Fiyat')
                    ->numeric()
                    ->prefix('₺'),
                FileUpload::make('image')->label('Ana Ürün Görseli')
                    ->image()
                    ->disk('public')
                    ->required()
                    ->helperText('Mağaza listesinde görünecek ana fotoğraf.'),
                FileUpload::make('gallery')->label('Diğer Ürün Görselleri')
                    ->image()
                    ->multiple()
                    ->disk('public')
                    ->maxFiles(3)
                    ->helperText('En fazla 3 adet ek görsel ekleyebilirsiniz.'),
                TextInput::make('category')->label('Kategori'),
                Textarea::make('features')->label('Özellikler (JSON formatı)')
                    ->columnSpanFull(),
            ]);
    }
}
