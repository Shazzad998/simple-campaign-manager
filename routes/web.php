<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return redirect('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class , 'index'])->name('dashboard');

    Route::resource('contacts', ContactController::class);
    Route::post('contacts/bulk-delete', [ContactController::class, 'bulkDelete'])->name('contacts.bulk-delete');
    Route::resource('campaigns', CampaignController::class);
});

require __DIR__ . '/settings.php';
