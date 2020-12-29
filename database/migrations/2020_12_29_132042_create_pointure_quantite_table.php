<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePointureQuantiteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pointure_quantite', function (Blueprint $table) {
            $table->id();
            $table->string('pointure');
            $table->unsignedInteger('quantite')->default(0);
            $table->unsignedBigInteger('article');
            $table->foreign('article')->references('id')->on('article');
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
        Schema::dropIfExists('pointure_quantite');
    }
}
