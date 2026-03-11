<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Components\Tabs;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Schemas\Schema;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class Settings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected string $view = 'filament.pages.settings';

    protected static ?string $navigationLabel = 'Site Ayarları';

    public static function getNavigationGroup(): ?string
    {
        return 'Sistem Yönetimi';
    }

    protected static ?string $title = 'Genel Site Ayarları';

    public ?array $data = [];

    public function mount(): void
    {
        $setting = Setting::first();
        if ($setting && $setting->data) {
            $data = $setting->data;

            // FileUpload component'leri string yerine array formatına ihtiyaç duyar
            if (isset($data['hero']['image']) && is_string($data['hero']['image'])) {
                $data['hero']['image'] = [$data['hero']['image'] => $data['hero']['image']];
            }
            if (isset($data['about']['image']) && is_string($data['about']['image'])) {
                $data['about']['image'] = [$data['about']['image'] => $data['about']['image']];
            }
            if (isset($data['footer_logo']) && is_string($data['footer_logo'])) {
                $data['footer_logo'] = [$data['footer_logo'] => $data['footer_logo']];
            }

            if (method_exists($this, 'getSchema')) {
                $this->getSchema('form')->fill($data);
            } else {
                $this->form->fill($data);
            }
        } else {
            if (method_exists($this, 'getSchema')) {
                $this->getSchema('form')->fill();
            } else {
                $this->form->fill();
            }
        }
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Tabs::make('Ayarlar')
                    ->tabs([
                        // Genel Bilgiler
                        Tabs\Tab::make('Genel Bilgiler')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                TextInput::make('siteTitle')
                                    ->label('Site Başlığı (Marka Adı)')
                                    ->required(),
                                TextInput::make('contact.phone')
                                    ->label('İletişim Telefon Numarası')
                                    ->tel(),
                            ]),

                        // Hero Bölümü
                        Tabs\Tab::make('Karşılama Ekranı (Hero)')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                FileUpload::make('hero.image')
                                    ->label('Arka Plan Görseli')
                                    ->image()
                                    ->disk('public')
                                    ->directory('settings')
                                    ->imageEditor(),
                                TextInput::make('hero.title')
                                    ->label('Ana Başlık'),
                                TextInput::make('hero.subtitle')
                                    ->label('Alt Başlık'),
                            ]),

                        // Hakkımızda Bölümü
                        Tabs\Tab::make('Hakkımızda Bölümü (Biz Kimiz?)')
                            ->icon('heroicon-o-users')
                            ->schema([
                                FileUpload::make('about.image')
                                    ->label('Hakkımızda Görseli')
                                    ->image()
                                    ->disk('public')
                                    ->directory('settings')
                                    ->imageEditor(),
                                TextInput::make('about.title')
                                    ->label('Üst Başlık (Örn: Biz Kimiz?)')
                                    ->default('Biz Kimiz?'),
                                Textarea::make('about.description')
                                    ->label('Açıklama Metni')
                                    ->rows(6),
                            ]),

                        // Neden Biz Bölümü
                        Tabs\Tab::make('Neden Bizi Seçmelisiniz?')
                            ->icon('heroicon-o-star')
                            ->schema([
                                TextInput::make('whyUs.title')
                                    ->label('Bölüm Başlığı')
                                    ->default('Neden Bizi Seçmelisiniz?'),
                                Repeater::make('whyUs.items')
                                    ->label('Özellik Maddeleri')
                                    ->simple(
                                        TextInput::make('item')->required()
                                    )
                                    ->addActionLabel('Yeni Madde Ekle'),
                            ]),

                        // Footer (Alt Alan) ve İletişim
                        Tabs\Tab::make('Alt Alan (Footer) & İletişim')
                            ->icon('heroicon-o-variable')
                            ->schema([
                                FileUpload::make('footer_logo')
                                    ->label('Footer Logo')
                                    ->image()
                                    ->disk('public')
                                    ->directory('settings'),
                                Textarea::make('siteDescription')
                                    ->label('Footer Kısa Açıklama')
                                    ->placeholder('Atölyemiz hakkında footerda görünecek kısa metin...')
                                    ->rows(3),
                                TextInput::make('contact.address')
                                    ->label('Adres Bilgisi'),
                                TextInput::make('contact.phone')
                                    ->label('Telefon Numarası')
                                    ->tel(),
                                TextInput::make('contact.email')
                                    ->label('E-posta Adresi')
                                    ->email(),
                            ]),
                    ])
                    ->columnSpan('full'),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        try {
            $data = method_exists($this, 'getSchema') ? $this->getSchema('form')->getState() : $this->form->getState();

            // Array'den string'e geri döndür
            if (isset($data['hero']['image']) && is_array($data['hero']['image'])) {
                $data['hero']['image'] = array_values($data['hero']['image'])[0] ?? null;
            }
            if (isset($data['about']['image']) && is_array($data['about']['image'])) {
                $data['about']['image'] = array_values($data['about']['image'])[0] ?? null;
            }
            if (isset($data['footer_logo']) && is_array($data['footer_logo'])) {
                $data['footer_logo'] = array_values($data['footer_logo'])[0] ?? null;
            }

            $setting = Setting::first();
            if (!$setting) {
                $setting = new Setting;
            }

            $setting->data = $data;
            $setting->save();

            Notification::make()
                ->success()
                ->title('Başarılı')
                ->body('Site ayarları başarıyla kaydedildi.')
                ->send();
        } catch (\Exception $exception) {
            return;
        }
    }
}
