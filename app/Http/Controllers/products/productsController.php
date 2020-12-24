<?php

namespace App\Http\Controllers\products;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class productsController extends Controller
{

    public function index(){
        $produits= DB::table('articles')->get();

        //return  json_encode((array)$produits);
        return $produits;
    }


}
