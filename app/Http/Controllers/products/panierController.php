<?php

namespace App\Http\Controllers\products;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Mail\commandeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use stdClass;

class panierController extends Controller
{
    /*
     *ajoute un article au panier
     *$id_item =>id due l'article
     *$$taille =>taille choisie
     *$color =>couleur*
     *$quantite=>quantite (1par defaut)
    */
    public function add_item(Request $request,$id_item,$taille,$color,$pu,$quantite){
        if(Auth::check()){
            if(DB::table('panier')->insert(
                [
                    'article'=>$id_item,
                    'couleur'=>$color,
                    'taille'=>$taille,
                    'pu'=>$pu,
                    'quantite'=>$quantite,
                    'user'=>$request->user()->id
                ]

            )){
                return true;
            }
        }
        else return "non_authenticated";
    }
    /*
     *supprimer un item du panier
     *$id => identifiant de l'item du panier, et non l'article
     *$id est recherché dans la table panier
    */
    public function remove_item($id){
        if(Auth::check()){
            return DB::table('panier')->where('id','=',$id)->delete();
        }
        else return "non_authenticated";
    }
    /*
     *Liste tous les éléments du panier
    */
    public function list_items(Request $request){
        if(Auth::check()){
           $panier_items=DB::table('panier')->where('user','=',$request->user()->id)->get();
            foreach($panier_items as $item){
                $item->article=DB::table('articles')->where('id','=',$item->article)->get();
            }
            return $panier_items;
        }
        else return "non_authenticated";
    }

    /*
     *modifie les infos d'un element du répertoire
     *taille, couleur, quantité
     *controler les options en fonction de celles disponibles dans la db
    */
    public function change_item($id_item,$taille,$color,$quantite){
        if(Auth::check()){
            DB::table('panier')->where('id','=',$id_item)
            ->update(
                [
                    'couleur'=>$color,
                    'taille'=>$taille,
                    'quantite'=>$quantite
                ]
                );
        }
        else return "non_authenticated";
    }
    public function mailto(Request $request){
        Mail::to($request->user()->email)->send(new commandeMail);
    }
    public function client_data(Request $request){
        if(Auth::check()){

            $client_id=DB::table('clients')->insertGetId(
                [
                    'nom'=>$request->input('nom'),
                    'prenom'=>$request->input('prenom'),
                    'pays'=>$request->input('pays'),
                    'ville'=>$request->input('ville'),
                    'telephone'=>$request->input('tel'),
                    'email'=>$request->input('email'),
                    'id_user'=>$request->user()->id,
                    'adresse'=>$request->input('adresse'),
                    'created_at'=>date('l j F Y, H:i'),
                    'updated_at'=>date('l j F Y, H:i'),
                ]
                );
            if($client_id!=0){
                $panier_items=$this->list_items($request);
                $prix_total=0;
                $delivery_tax=10;
                foreach($panier_items as $item){
                    $prix_total+=$item->pu;
                }
                $id_commande=0;
                $id_commande=DB::table('commandes')->insertGetId(
                    [
                        'data'=>$panier_items,
                        'client_id'=>$client_id,
                        'prix_total'=>$prix_total+$delivery_tax,
                        'prix_total_ht'=>$prix_total+$delivery_tax,
                        'adresse'=>$request->input('adresse'),
                        'created_at'=>date('l j F Y, H:i'),
                        'updated_at'=>date('l j F Y, H:i'),
                    ]
                    );
                if($id_commande!=0){
                        $client=DB::table('clients')->where('id','=',$client_id)->get();
                        $this->mailto($request); //Sends a mail to the client

                        //vider panier
                        DB::table('panier')->where('user','=',Auth::user()->id)->delete();
                        return "commande enregistrée avec succès!!!";
                    }

            }
            else{return "db_error";}
        }
        else return "non_authenticated";
    }
}


/*
*Toutes les fonctions retournent "non_authenticated si l'utilisateur n'est pas authentifié
*true si l'opération a ete effectuée avec succès, et false sinon*/
