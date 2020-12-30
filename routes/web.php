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


Route::get('/', [App\Http\Controllers\AccueilController::class, 'index'])->name('accueil');

Route::view("/","app");
Route::view("/authentification","app");
Route::view("/produits","app");
Route::view("/details","app");
Route::view("/panier","app");
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/products', [App\Http\Controllers\products\productsController::class, 'index'])->name('produits');
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

//Route::get('/login', [App\Http\Controllers\user\userController::class,'user']);


//APIs Panier

    //ajoute un article dans le panier
Route::get('/panier/add_item/{id_item}/{taille}/{color}/{pu}/{quantite}', ['\App\Http\Controllers\products\panierController','add_item']);

    //retire un élément du panier( id représente l'identifiant de l'élément du panier)
Route::get('/panier/remove_item/{id}', ['\App\Http\Controllers\products\panierController','remove_item']);
    ///Liste tous les éléments du panier
Route::get('/panier/list_items/', ['\App\Http\Controllers\products\panierController','list_items']);
    //modifie les choix de taille, couleur,et quantité d'un élément du panier
Route::get('/panier/change_item/{id_item}/{taille}/{color}/{quantite}', ['\App\Http\Controllers\products\panierController','change_item']);

//Commande
Route::post('commande',['App\Http\Controllers\products\panierController','client_data']);

//Routes Newsletter
//Poster l'email entré à cette adresse;
Route::post('/news_letter', 'subscribe_news@subscribe');
