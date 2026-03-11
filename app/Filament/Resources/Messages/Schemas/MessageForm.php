<?php

namespace App\Filament\Resources\Messages\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class MessageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')->label('Gönderen Adı')
                    ->required(),
                TextInput::make('email')->label('E-posta Adresi')
                    ->email()
                    ->required(),
                TextInput::make('subject')->label('Konu'),
                Textarea::make('message')->label('Mesaj İçeriği')
                    ->required()
                    ->columnSpanFull(),
                Toggle::make('read')->label('Okundu Olarak İşaretle')
                    ->required(),
            ]);
    }
}
