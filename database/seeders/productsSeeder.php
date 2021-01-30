<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class productsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //$faker = Faker\Factory::create('fr_FR');



                $tailles=json_encode(
                    [
                        41=>[
                            'rouge'=>5,
                            'bleu'=>4,
                            'noir'=>1
                        ],
                        42=>[
                            'rouge'=>5,
                            'bleu'=>4,
                            'noir'=>1
                        ],
                        46=>[
                            'rouge'=>5,
                            'bleu'=>4,
                            'noir'=>1
                        ]
                    ]
                );

                DB::table('tailles')->insert(
                    [
                        'data'=>$tailles
                    ]
                );
        for($i=0;$i<30;$i++){
            $id=DB::table('articles')->insertGetId(
                    [
                        'nom'=>'Chemise Hiver',
                        'marque'=>'Zaara',
                        'description'=>'chemise en coton de très haute qualité',
                        'prix_unitaire'=>rand(200,1000),
                        'tailles'=>1,
                        'img'=>"https://imgupload.io/images/2020/12/29/product-".random_int(1,9).".jpg"
                    ]
                    );
            //Ajouter des categories à l'élement
            for($j=0;$j<4;$j++){
                DB::table('article_categorie')->insert(
                    [
                        'article'=>$id,
                        'categorie'=>random_int(1,11),
                    ]
                );
            }

        }

    }
}
