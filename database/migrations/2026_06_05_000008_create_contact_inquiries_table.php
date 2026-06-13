<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contact_inquiries', function (Blueprint $table): void {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 254)->index();
            $table->string('budget', 100)->nullable();
            $table->string('project_type', 120);
            $table->string('timeline', 120)->nullable();
            $table->text('message');
            $table->string('status', 24)->default('new')->index();
            $table->unsignedTinyInteger('lead_score')->default(0)->index();
            $table->string('source_page', 255)->nullable();
            $table->text('referrer_url')->nullable();
            $table->string('utm_source', 120)->nullable();
            $table->string('utm_medium', 120)->nullable();
            $table->string('utm_campaign', 120)->nullable();
            $table->string('utm_term', 120)->nullable();
            $table->string('utm_content', 120)->nullable();
            $table->string('gclid', 120)->nullable();
            $table->string('fbclid', 120)->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->json('spam_flags')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_inquiries');
    }
};
