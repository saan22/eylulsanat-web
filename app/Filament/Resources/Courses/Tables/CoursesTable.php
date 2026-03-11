<?php

namespace App\Filament\Resources\Courses\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CoursesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\ToggleColumn::make('is_active')->label('Yayında'),
                TextColumn::make('title')->label('Başlık')
                    ->searchable(),
                TextColumn::make('slug')->label('Bağlantı URL (Slug)')
                    ->searchable(),
                ImageColumn::make('image')->label('Kapak Fotoğrafı'),
                TextColumn::make('instructor')->label('Eğitmen')
                    ->searchable(),
                TextColumn::make('duration')->label('Süre')
                    ->searchable(),
                TextColumn::make('schedule')->label('Program')
                    ->searchable(),
                TextColumn::make('price')->label('Fiyat')
                    ->searchable(),
                TextColumn::make('level')->label('Eğitim Seviyesi')
                    ->searchable(),
                TextColumn::make('category')->label('Kategori')
                    ->searchable(),
                TextColumn::make('created_at')->label('Oluşturulma Tarihi')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')->label('Güncellenme Tarihi')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
