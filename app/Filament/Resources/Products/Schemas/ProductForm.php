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
                TextInput::make('title')->label('Ürün Adı')
                    ->required(),
                TextInput::make('slug')->label('Bağlantı URL (Slug)')
                    ->required(),
                Textarea::make('description')->label('Ürün Açıklaması')
                    ->columnSpanFull(),
                TextInput::make('price')->label('Fiyat')
                    ->numeric()
                    ->prefix('₺'),
                FileUpload::make('image')->label('Ürün Görseli')
                    ->image(),
                TextInput::make('category')->label('Kategori'),
                Textarea::make('features')->label('Özellikler (JSON formatı)')
                    ->columnSpanFull(),
            ]);
    }
}
