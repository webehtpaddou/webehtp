<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandeArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commande_articles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_commande'); //references commandes.id
            $table->unsignedBigInteger('id_article'); //references articles.id
            $table->foreign('id_commande')->references('id')->on('commandes');
            $table->foreign('id_article')->references('id')->on('articles');
            $table->double('quantite');
            $table->double('prix_unitaire');
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
        Schema::dropIfExists('commande_articles');
    }
}
