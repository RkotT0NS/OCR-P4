<?php

namespace Database\Seeders;

use App\Models\Upload;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Pennant\Feature;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (App::environment('testing')) {
            User::factory()->create([
                'name' => 'New User',
                'email' => 'new-user@example.com',
                'password' => Hash::make('Abcdefgh,123'),
            ]);
            User::factory()->create([
                'name' => 'Upload User',
                'email' => 'upload-user@example.com',
                'password' => Hash::make('Abcdefgh,123'),
            ]);

            $themeUser = User::factory()->create([
                'name' => 'Luminosity Theme User',
                'email' => 'luminosity-theme-user@example.com',
                'password' => Hash::make('Abcdefgh,123'),
            ]);
            Feature::for($themeUser)->activate('luminosity-theme');

            $twoFactorUser = User::factory()->create([
                'name' => 'Two Factor Authenticated User',
                'email' => 'two-factor-authenticated-user@example.com',
                'password' => Hash::make('Abcdefgh,123'),
            ]);

            $oldUser = User::factory()->create([
                'name' => 'Old User',
                'email' => 'old-user@example.com',
                'password' => Hash::make('Abcdefgh,123'),
            ]);

            // Seed uploads for old user from fixtures
            $fixturePath = base_path('tests/Fixtures/old-user-upload');
            if (File::exists($fixturePath)) {
                $files = File::files($fixturePath);
                foreach ($files as $file) {
                    $originalName = $file->getFilename();
                    $mimeType = File::mimeType($file->getPathname());
                    $hash = hash_file('sha512', $file->getPathname());
                    $blobPath = 'uploads/'.$hash;
                    $absoluteBlobPath = storage_path('app/public/'.$blobPath);

                    if (! File::exists(dirname($absoluteBlobPath))) {
                        File::makeDirectory(dirname($absoluteBlobPath), 0755, true);
                    }

                    if (! File::exists($absoluteBlobPath)) {
                        File::copy($file->getPathname(), $absoluteBlobPath);
                    }

                    $upload = Upload::create([
                        'uuid' => (string) Str::uuid(),
                        'user_id' => $oldUser->id,
                        'path' => $blobPath,
                        'original_name' => $originalName,
                        'mime_type' => $mimeType,
                        'size' => $file->getSize(),
                        'expires_at' => now()->addDays((int) env('UPLOAD_EXPIRATION_DAYS', 7)),
                    ]);

                    // Simulate update from UserUploadController if needed
                    // (e.g. setting a password or specific expiration if requested)
                    $upload->update([
                        'password' => Hash::make('secret'),
                        'expires_at' => now()->addDays(30),
                    ]);
                }
            }
        }
    }
}
