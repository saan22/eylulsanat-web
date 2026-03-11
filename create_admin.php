<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// If user exists, delete it first to ensure a totally fresh clean start
User::where('email', 'info@eylulsanatatolyesi.com.tr')->delete();

$user = new User;
$user->name = 'Admin';
$user->email = 'info@eylulsanatatolyesi.com.tr';
$user->password = Hash::make('admin');
$user->save();

echo "ADMIN HESABI BASARIYLA OLUSTURULDU: info@eylulsanatatolyesi.com.tr / admin \n";
