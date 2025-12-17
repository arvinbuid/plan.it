<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'johndoe@example.io'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('johndoe123'),
                'email_verified_at' => now(),
            ]
        );

        Event::factory()->count(50)->create(); // Create 50 events entries
    }
}
