<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Mail\newsletterconfirm;
use Illuminate\Support\Facades\Mail;

class subscribe_news extends Controller
{
    public function subscribe(Request $request ){
        //Enregistrement de l'adresse dans la table
        if(DB::table('emails')->insert([
            ['email' =>$request->input('email') ],
        ])){
            //Envoi du mail de confirmation
            Mail::to($request->input('email'))
            ->send(new newsletterconfirm);
        }

        return "Cet email est bien enregistré: ".$request->input('email');
    }

}
