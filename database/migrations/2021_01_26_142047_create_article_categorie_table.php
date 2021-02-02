<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticleCategorieTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_categorie', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("article");
            $table->unsignedBigInteger("categorie");
            $table->foreign("article")->references("id")->on("articles");
            $table->foreign("categorie")->references("id")->on("categories");
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
        Schema::dropIfExists('article_categorie');
    }
}
