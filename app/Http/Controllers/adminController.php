<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class adminController extends Controller
{
    //Fonction assurant la sauvegare du fichier
    public function save_files(Request $request){
        $nom_dossier="images/";

        foreach($_FILES as $cle => $monfichier){
            if(isset ($monfichier) AND $monfichier['error']==0){
                if ($monfichier['size'] <= 1000000){
                    // Testons si l'extension est autorisée
                    $infosfichier = pathinfo($monfichier['name']);
                    $extension_upload = $infosfichier['extension'];
                    $extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png','pdf');
                    if (in_array($extension_upload, $extensions_autorisees))
                    {
                            // On peut valider le fichier et le stocker définitivement
                           if(move_uploaded_file($monfichier['tmp_name'], $nom_dossier . $cle)==false){
                            return "erreur de sauvegarde";
                           }
                           else{
                               return $nom_dossier . $cle;

                                /*
                               DB::table('urls_inscris')->insert(
                                [
                                    'nom'=>$cle,
                                    'url'=>$nom_dossier . $cle,
                                    'inscris'=>$_SESSION["id_inscris"]
                                ]
                               );
                               */
                           }
                    }
                    else{
                        return "erreur de format de fichier";
                    }
                }
            }

        }

    }
    //Verification que l'utilisateur est un admin
    public function check_authorisation(){
        return Auth::check(); //A réediter pour filtrer les accès
    }

    //Ajout d'article dans le catalogue
    public function ajouter_article(Request $request){
        if($this->check_authorisation()){
            //Sauvegarde de l'image
            $img_url=$this->save_files($request);

            if(!is_file($img_url)) return "error";

            $id=DB::table('articles')->insertGetId(
                [
                    'nom'=>$request->post("nom"),
                    'marque'=>$request->post("marque"),
                    'description'=>$request->post("description"),
                    'prix_unitaire'=>$request->post("prix_unitaire"),
                    'tailles'=>DB::table('tailles')->insertGetId(['data'=>$request->post("tailles")]),
                    'img'=>$img_url
                ]
                );

            //Ajouter des categories à l'élement
            for($j=0;$j<count($request->post("categories"));$j++){
                DB::table('article_categorie')->insert(
                    [
                        'article'=>$id,
                        'categorie'=>($request->post("categories"))[$j],
                    ]
                );
            }
        }
        else return "non_authorized";

    }

    //Retirer un article du catalogue
    public function retirer_article($id_article){
        if($this->check_authorisation()){
            return DB::table('aritcles')->where("id","=",$id_article)->delete();
            return false;
        }
        else return "non_authorized";

    }
    //Liste les articles
    public function lister_articles(){
        if($this->check_authorisation()){
            $products=DB::table('articles')
            ->orderByDesc("id")
            ->get();

        foreach($products as $item){
            $sa_taille= DB::table('tailles')
                        ->where('id','=',$item->tailles)
                        ->first();
            //echo json_encode(json_decode($sa_taille->data,true));
            $item->tailles=json_encode(json_decode($sa_taille->data,true));
        }
        return $products;
        }
        else return "non_authorized";

    }
    //Retourne les infos d'un client
    public function get_client_data($id_client){
        if($this->check_authorisation()){
            return DB::table('clients')
                    ->where("id","=",$id_client)
                    ->get();
        }
        else return "non_authorized";

    }
    //Liste les commandes
    public function lister_commandes(){
        if($this->check_authorisation()){
            $commandes= DB::table('commandes')
            ->orderByDesc("id")
            ->get();
            foreach($commandes as $item){
                $item->client_id=$this->get_client_data($item->client_id);
            }
            return $commandes;
        }
        else return "non_authorized";

    }
    //Liste les commandes par état
    public function tri_par_etat($etat){
        if($this->check_authorisation()){
            $commandes=DB::table('commandes')
            ->where("etat","=",$etat)
            ->orderByDesc("id")
            ->get();
            foreach($commandes as $item){
                $item->id_client=$this->get_client_data($item->id_client);
            }
            return $commandes;
        }
        else return "non_authorized";

    }

    //Changement de l'état d'une commande
    public function changer_etat($id_commande,$etat){
        if($this->check_authorisation()){
            return DB::table('commandes')->where("id","=",$id_commande)
            ->update(
                [
                    "etat"=>$etat
                ]
                );
            return false;
        }
        else return "non_authorized";

    }
}
