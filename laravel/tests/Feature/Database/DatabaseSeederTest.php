<?php

namespace Tests\Feature\Database;

use App\Models\User;
use App\Models\Upload;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DatabaseSeederTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the database seeder populates the database correctly.
     */
    public function test_database_seeder_populates_expected_data(): void
    {
        // Ensure storage directory is clean before test
        File::cleanDirectory(storage_path('app/public/uploads'));

        // Run the seeder
        $this->seed();

        // Verify users were created
        $this->assertDatabaseHas('users', ['email' => 'new-user@example.com']);
        $this->assertDatabaseHas('users', ['email' => 'upload-user@example.com']);
        $this->assertDatabaseHas('users', ['email' => 'old-user@example.com']);

        $oldUser = User::where('email', 'old-user@example.com')->first();
        $this->assertNotNull($oldUser);

        // Verify uploads for old user
        $fixturePath = base_path('tests/Fixtures/old-user-upload');
        $fixtureFiles = File::files($fixturePath);
        
        $this->assertGreaterThan(0, count($fixtureFiles), "No fixture files found for testing.");
        
        foreach ($fixtureFiles as $fixtureFile) {
            $hash = hash_file('sha512', $fixtureFile->getPathname());
            $blobPath = 'uploads/'.$hash;
            $absoluteBlobPath = storage_path('app/public/'.$blobPath);

            // Verify record exists in database
            $this->assertDatabaseHas('uploads', [
                'user_id' => $oldUser->id,
                'path' => $blobPath,
                'original_name' => $fixtureFile->getFilename(),
            ]);

            $upload = Upload::where('path', $blobPath)->first();
            $this->assertNotNull($upload);

            // Verify password was set and hashed
            $this->assertTrue(Hash::check('secret', $upload->password));

            // Verify expiration was updated
            $this->assertTrue($upload->expires_at->isAfter(now()->addDays(29)));

            // Verify file exists on disk
            $this->assertTrue(File::exists($absoluteBlobPath), "File was not copied to '{$absoluteBlobPath}'");
            
            // Verify file content matches
            $this->assertEquals(
                hash_file('sha512', $fixtureFile->getPathname()),
                hash_file('sha512', $absoluteBlobPath)
            );
        }

        // Clean up
        File::cleanDirectory(storage_path('app/public/uploads'));
    }
}
