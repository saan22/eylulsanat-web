<?php

namespace App\Filament\Resources\Courses\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CourseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\Toggle::make('is_active')->label('Yayında')->default(true)
                    ->columnSpanFull(),
                TextInput::make('title')->label('Başlık')
                    ->required(),
                TextInput::make('slug')->label('Bağlantı URL (Slug)')
                    ->required()
                    ->unique('courses', 'slug', ignoreRecord: true),
                Textarea::make('description')->label('Kısa Açıklama')
                    ->columnSpanFull(),
                Textarea::make('long_description')->label('Detaylı Açıklama')
                    ->columnSpanFull(),
                Textarea::make('short_description')->label('Özet Açıklama')
                    ->columnSpanFull(),
                FileUpload::make('image')->label('Kapak Fotoğrafı')
                    ->image()
                    ->disk('public'),
                TextInput::make('instructor')->label('Eğitmen'),
                TextInput::make('duration')->label('Süre (Örn: 3 Hafta)'),
                TextInput::make('schedule')->label('Program (Örn: Salı, Perşembe)'),
                TextInput::make('price')->label('Fiyat / Aylık'),
                TextInput::make('level')->label('Eğitim Seviyesi'),
                TextInput::make('category')->label('Kategori'),
                Textarea::make('features')->label('Özellikler (JSON formatı)')
                    ->columnSpanFull(),
            ]);
    }
}
