<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->double('total_ht');
            $table->double('remise');
            $table->double('tva');
            $table->double('total_ttc');
            $table->string('type_paiement');
            $table->unsignedBigInteger('id_client'); //references clients.id
            $table->unsignedBigInteger('id_commande'); //references commandes.id
            $table->foreign('id_client')->references('id')->on('clients');
            $table->foreign('id_commande')->references('id')->on('commandes');
            $table->boolean('etat');
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
        Schema::dropIfExists('factures');
    }
}
