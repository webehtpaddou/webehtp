<?php

namespace App\Http\Controllers\products;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use stdClass;

class productsController extends Controller
{

    //fonction appartient_Objet
    public function app_object($obj1,$obj2){
        $tableau=array();
        $l=0;
        for($i=0;$i<count($obj1);$i++){
            for($j=0;$i<count($obj2);$j++){
                if($obj1[$i]->article==$obj2[$j]->article){
                    //Ajouter élément à la liste
                    $tableau[$l]=$obj1[$i]->article;
                }
            }
        }
        return $tableau;
    }

    public function index(Request $request,$categories,$prix,$taille){
        $table_categories=explode('-',$categories);
        $corres=[
            'homme'=>1,
            'femme'=>2,
            'adulte'=>3,
            'enfant'=>4,
            'chemise'=>5,
            'pantalon'=>6,
            'veste'=>7,
            'menteau'=>8,
            'soulier'=>9,
            'mocassin'=>10,
            'sandale'=>11
        ];
        for($i=0;$i<count($table_categories);$i++){
            $table_categories[$i]=$corres[$table_categories[$i]];
        }

        $table_prix=explode('-',$prix);
        $table_taille=explode('-',$taille);


        //filtrage par catégories
        $bloc= [];
        foreach($table_categories as $categorie){
            $liste=DB::table('articles')
                    ->join('article_categorie','articles.id','=','article_categorie.article')
                    ->join('categories','categories.id','=','article_categorie.categorie')
                    ->where('categories.id','=',$categorie)
                    ->distinct()
                    ->get('articles.id');
            $indicesliste=[];
            foreach($liste as $indice){
                array_push($indicesliste,$indice->id);
            }
            array_push($bloc,$indicesliste);
            $indicesliste=[];
        }
        //return $bloc; //Tableau des indices
        $temoin=$bloc[0];
        for($i=1;$i<count($bloc);$i++){
            $temoin=array_intersect($temoin,$bloc[$i]);
        }
        //return $temoin;

        $produits=DB::table('articles')
                    ->whereIn('id',$temoin)
                    ->whereBetween('prix_unitaire',$table_prix)
                    ->inRandomOrder()
                    ->get();


        //filtrage par taille
        if($taille!=null){
            //
        }

        foreach($produits as $item){
            $sa_taille= DB::table('tailles')
                        ->where('id','=',$item->tailles)
                        ->first();
            //echo json_encode(json_decode($sa_taille->data,true));
            $item->tailles=json_encode(json_decode($sa_taille->data,true));
        }

        //return  json_encode((array)$produits);
        return $produits;
    }

    //Liste tous les articles
    public function all(){
        $products=DB::table('articles')
            ->inRandomOrder()
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

    //Recherche
    public function search($key){
        $products=DB::table('articles')
            ->where('nom','like','%'.$key.'%')
            ->orWhere('marque','like','%'.$key.'%')
            ->orWhere('description','like','%'.$key.'%')
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

}
