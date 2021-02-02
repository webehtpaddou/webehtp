<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class categoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert(
            [
                ['categorie'=>'homme'],//1
                ['categorie'=>'femme'],
                ['categorie'=>'adulte'],
                ['categorie'=>'enfant'],
                ['categorie'=>'chemise'],
                ['categorie'=>'pantalon'],
                ['categorie'=>'veste'],
                ['categorie'=>'menteau'],
                ['categorie'=>'soulier'],
                ['categorie'=>'mocassin'],
                ['categorie'=>'sandale'] //11
            ]
            );


    }
}
