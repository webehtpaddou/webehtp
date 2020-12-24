<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientCartesbancairesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_cartesbancaires', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_client'); //refrences clients.id
            $table->foreign('id_client')->references('id')->on('clients');
            $table->unsignedBigInteger('id_carte_bancaire'); //references cartesbancaires.id
            $table->foreign('id_carte_bancaire')->references('id')->on('cartesbancaires');
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
        Schema::dropIfExists('client_cartesbancaires');
    }
}
