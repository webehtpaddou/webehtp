<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class panierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=1;$i<10;$i++){
            DB::table('panier')->insert(
                [
                    'article'=>$i,
                    'couleur'=>'M',
                    'taille'=>'M',
                    'pu'=>'200',
                    'quantite'=>1,
                    'user'=>1
                ]

            );
        }
    }
}
