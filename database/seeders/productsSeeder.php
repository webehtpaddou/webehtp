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

        DB::table('categories')->insert(
                [
                    'categorie'=>'Chemises'
                ]
                );


        for($i=0;$i<8;$i++){
            DB::table('articles')->insert(
                    [
                        'nom'=>'Chemise Hiver',
                        'categorie'=>'1',
                        'marque'=>'Zaara',
                        'description'=>'chemise en coton de très haute qualité',
                        'prix_unitaire'=>'200',
                        'img'=>"https://imgupload.io/images/2020/12/29/product-".($i+1).".jpg"
                    ]
                    );
        }

    }
}
