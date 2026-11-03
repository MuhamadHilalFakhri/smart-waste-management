<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $t) {
            $t->string('role')->default('user');
            $t->boolean('is_active')->default(true);
        });
        Schema::create('reports', function (Blueprint $t) {
            $t->id();
            $t->uuid('number')->unique();
            $t->foreignId('user_id')->constrained();
            $t->text('description');
            $t->string('photo_path');
            $t->uuid('photo_version');
            $t->decimal('latitude', 10, 7);
            $t->decimal('longitude', 10, 7);
            $t->string('category')->nullable()->index();
            $t->string('status')->default('pending')->index();
            $t->timestamps();
            $t->softDeletes();
        });
        Schema::create('report_predictions', function (Blueprint $t) {
            $t->id();
            $t->foreignId('report_id')->unique()->constrained();
            $t->string('status')->default('pending');
            $t->string('label')->nullable();
            $t->float('confidence')->nullable();
            $t->json('probabilities')->nullable();
            $t->string('model_version')->nullable();
            $t->timestamps();
        });
        Schema::create('report_status_histories', function (Blueprint $t) {
            $t->id();
            $t->foreignId('report_id')->constrained();
            $t->foreignId('user_id')->constrained();
            $t->string('from_status')->nullable();
            $t->string('to_status');
            $t->text('note')->nullable();
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('report_status_histories');
        Schema::dropIfExists('report_predictions');
        Schema::dropIfExists('reports');
        Schema::table('users', fn (Blueprint $t) => $t->dropColumn(['role', 'is_active']));
    }
};
