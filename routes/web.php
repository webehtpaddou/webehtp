<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/','app');

Auth::routes();

Route::get('csrf/{secret}', function ($secret) {
    if($secret=='webehtpcsrfprovider'){
        //return view('tools.csrfProvider');
        return csrf_token();
    }
    else return 'Url Invalide!!!';
});


Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
