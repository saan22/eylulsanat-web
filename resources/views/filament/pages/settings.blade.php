<x-filament-panels::page>
    <form wire:submit="save">
        @if(method_exists($this, 'getSchema'))
            {{ $this->getSchema('form') }}
        @else
            {{ $this->form }}
        @endif

        <div class="mt-4">
            <x-filament::button type="submit">
                Kaydet
            </x-filament::button>
        </div>
    </form>
</x-filament-panels::page>