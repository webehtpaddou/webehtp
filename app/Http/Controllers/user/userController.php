<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Doctrine\DBAL\Schema\Index;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class userController extends Controller
{
    public function is_authenticated(Request $request){
        return Auth::check();
    }
    public function user(Request $request){
        return $request->user();
    }

    //Liste les commandes du clients
    public function lister_commandes(Request $request){
        if(Auth::check()){
            return DB::table('commandes')
            ->join('clients','clients.id','=','commandes.client_id')
            ->where('clients.id_user','=',$request->user()->id)
            ->get();
        }else return 'non_authenticated';


    }
    //Infos du client

    public function client_infos(Request $request){
        if(Auth::check()){
            return DB::table('clients')
            ->join('users','users.id','=','clients.id_user')
            ->where('users.id','=',$request->user()->id)
            ->orderByDesc('clients.id')
            ->get();
        }else return 'non_authenticated';

    }

    //Ajouter ou changer les infos client
    public function add_infos_client(Request $request){
        if(Auth::check()){
            if(DB::table('clients')->where('id_user','=',$request->user()->id)->get()){
                //MAKE AN UPDATE
                return DB::table('clients')
                        ->where('id_user','=',$request->user()->id)
                        ->update(
                            [
                            'nom'=>$request->post('nom'),
                            'prenom'=>$request->post('prenom'),
                            'pays'=>$request->post('pays'),
                            'ville'=>$request->post('ville'),
                            'telephone'=>$request->post('tel'),
                            'email'=>$request->post('email'),
                            'id_user'=>$request->user()->id,
                            'adresse'=>$request->post('adresse'),
                            'created_at'=>date('l j F Y, H:i'),
                            'updated_at'=>date('l j F Y, H:i')
                            ]
                        );
            }
            else{
                //Create a new entry

                return DB::table('clients')
                    ->where('id_user','=',$request->user()->id)
                    ->insert(
                    [

                        'nom'=>$request->post('nom'),
                        'prenom'=>$request->post('prenom'),
                        'pays'=>$request->post('pays'),
                        'ville'=>$request->post('ville'),
                        'telephone'=>$request->post('tel'),
                        'email'=>$request->post('email'),
                        'id_user'=>$request->user()->id,
                        'adresse'=>$request->post('adresse'),
                        'created_at'=>date('l j F Y, H:i'),
                        'updated_at'=>date('l j F Y, H:i'),
                    ]
                );
            }
        }else return 'non_authenticated';



    }

}
