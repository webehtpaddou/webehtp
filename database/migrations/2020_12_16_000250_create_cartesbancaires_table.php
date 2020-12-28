<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartesbancairesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cartesbancaires', function (Blueprint $table) {
            $table->id();
            $table->double('numero_carte');
            $table->double('cvv',3,0);
            $table->date("date_expiration");
            $table->string('titulaire');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cartesbancaires');
    }
}
