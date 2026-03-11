<?php

namespace App\Filament\Resources\GalleryItems\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class GalleryItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\FileUpload::make('url')
                    ->label('Galeri Görseli')
                    ->image()
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('title')->label('Başlık'),
                TextInput::make('category')->label('Kategori (Opsiyonel)'),
            ]);
    }
}
