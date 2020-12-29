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

Route::view("/","app");
Route::view("/connexion","app");
Route::view("/inscription","app");
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('csrf/{secret}', function ($secret) {
    if($secret=='webehtpcsrfprovider'){
        //return view('tools.csrfProvider');
        return csrf_token();
    }
    else return 'Url Invalide!!!';
});
//retourne la liste des articles
Route::get('/products', [App\Http\Controllers\products\productsController::class, 'index'])->name('produits');
//retourne 1 si l'utilisateur est connecté et 0 sinon
Route::get('users/is_authenticated', [App\Http\Controllers\user\userController::class,'is_authenticated']);
//retourne l'identité du client sous format json
Route::get('users/identity', [App\Http\Controllers\user\userController::class,'user']);