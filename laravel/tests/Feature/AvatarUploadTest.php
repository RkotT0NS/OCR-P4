<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AvatarUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upload_avatar()
    {
        $user = User::factory()->create();

        // Create a fake PNG image 80x80
        $file = UploadedFile::fake()->image('avatar.png', 80, 80);
        $hash = hash_file('sha512', $file->getRealPath());
        $filename = $hash . '.png';

        $response = $this->actingAs($user)
            ->patch(route('profile.update'), [
                'name' => 'New Name',
                'email' => $user->email,
                'avatar' => $file,
            ]);

        $response->assertRedirect(route('profile.edit'));
        
        $user->refresh();
        $this->assertNotNull($user->avatar_url);
        
        $this->assertStringContainsString($filename, $user->avatar_url);
        $this->assertFileExists(public_path('profile/' . $filename));
        
        // Clean up
        @unlink(public_path('profile/' . $filename));
    }

    public function test_avatar_must_be_80x80()
    {
        $user = User::factory()->create();

        // Create a fake PNG image 100x100
        $file = UploadedFile::fake()->image('avatar.png', 100, 100);

        $response = $this->actingAs($user)
            ->patch(route('profile.update'), [
                'name' => 'New Name',
                'email' => $user->email,
                'avatar' => $file,
            ]);

        $response->assertSessionHasErrors('avatar');
    }

    public function test_avatar_must_be_png()
    {
        $user = User::factory()->create();

        // Create a fake JPG image 80x80
        $file = UploadedFile::fake()->image('avatar.jpg', 80, 80);

        $response = $this->actingAs($user)
            ->patch(route('profile.update'), [
                'name' => 'New Name',
                'email' => $user->email,
                'avatar' => $file,
            ]);

        $response->assertSessionHasErrors('avatar');
    }
}
