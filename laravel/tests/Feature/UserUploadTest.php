<?php

namespace Tests\Feature;

use App\Models\Upload;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_refresh_uploads_list()
    {
        $user = User::factory()->create();
        
        // Create an old upload
        $oldUpload = Upload::factory()->create([
            'user_id' => $user->id,
            'created_at' => now()->subDays(2),
        ]);

        // Create a new upload
        $newUpload = Upload::factory()->create([
            'user_id' => $user->id,
            'created_at' => now(),
        ]);

        // Create a deleted upload that was recently deleted
        $deletedUpload = Upload::factory()->create([
            'user_id' => $user->id,
            'created_at' => now()->subDays(5),
            'deleted_at' => now(),
        ]);

        $lastKnownDate = now()->subDay()->getTimestamp() * 1000;

        $response = $this->actingAs($user, 'api')
            ->getJson("/api/uploads/refresh?last_known_date={$lastKnownDate}");

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');
        
        $uuids = collect($response->json('data'))->pluck('uuid');
        $this->assertTrue($uuids->contains($newUpload->uuid));
        $this->assertTrue($uuids->contains($deletedUpload->uuid));
        $this->assertFalse($uuids->contains($oldUpload->uuid));
    }

    public function test_refresh_requires_last_known_date()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'api')
            ->getJson("/api/uploads/refresh");

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['last_known_date']);
    }

    public function test_user_can_delete_upload_by_expiring_it()
    {
        $user = User::factory()->create();
        $upload = Upload::factory()->create([
            'user_id' => $user->id,
            'expires_at' => now()->addDays(7),
        ]);

        $response = $this->actingAs($user, 'api')
            ->postJson("/api/uploads/{$upload->uuid}/delete");

        $response->assertStatus(200);
        
        $upload->refresh();
        $this->assertTrue($upload->expires_at->isPast() || $upload->expires_at->isNow());
    }

    public function test_user_cannot_delete_others_upload()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $upload = Upload::factory()->create([
            'user_id' => $otherUser->id,
        ]);

        $response = $this->actingAs($user, 'api')
            ->postJson("/api/uploads/{$upload->uuid}/delete");

        $response->assertStatus(403);
    }
}
