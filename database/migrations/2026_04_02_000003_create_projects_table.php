<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('positioning')->nullable();
            $table->string('metric_badge')->nullable();
            $table->text('description');
            $table->text('solution')->nullable();
            $table->text('impact')->nullable();
            $table->string('case_study_slug')->nullable();
            $table->boolean('is_mobile')->default(false);
            $table->text('problem')->nullable();
            $table->text('challenge')->nullable();
            $table->json('architecture_actions')->nullable();
            $table->json('business_impact')->nullable();
            $table->json('tools')->default('[]');
            $table->string('image_url')->nullable();
            $table->string('video_url')->nullable();
            $table->string('external_url')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
