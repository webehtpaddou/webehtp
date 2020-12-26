<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Doctrine\DBAL\Schema\Index;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class userController extends Controller
{
    public function is_authenticated(Request $request){
        return Auth::check();
    }
    public function user(Request $request){
        return $request->user();
    }
}
