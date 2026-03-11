<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('id');
        });

        Schema::table('gallery_items', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });

        Schema::table('gallery_items', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};
