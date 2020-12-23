<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class type_utilisateurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('types_users')->insert(
            [
                'type' => 'admin'
            ]
            );
        DB::table('types_users')->insert(
            [
                'type' => 'developpeur'
            ]
            );
    }
}
