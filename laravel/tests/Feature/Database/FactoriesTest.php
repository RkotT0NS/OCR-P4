<?php

namespace Tests\Feature\Database;

use App\Models\User;
use App\Models\Upload;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class FactoriesTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test UserFactory creation.
     */
    public function test_user_factory_creates_user(): void
    {
        $user = User::factory()->create();

        $this->assertInstanceOf(User::class, $user);
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => $user->email,
        ]);
        $this->assertNotNull($user->email_verified_at);
        $this->assertTrue(Hash::check('password', $user->password));
    }

    /**
     * Test UserFactory unverified state.
     */
    public function test_user_factory_unverified_state(): void
    {
        $user = User::factory()->unverified()->create();

        $this->assertNull($user->email_verified_at);
    }

    /**
     * Test UserFactory withTwoFactor state.
     */
    public function test_user_factory_with_two_factor_state(): void
    {
        $user = User::factory()->withTwoFactor()->create();

        $this->assertNotNull($user->two_factor_secret);
        $this->assertNotNull($user->two_factor_recovery_codes);
        $this->assertNotNull($user->two_factor_confirmed_at);
    }

    /**
     * Test UploadFactory creation.
     */
    public function test_upload_factory_creates_upload(): void
    {
        $upload = Upload::factory()->create();

        $this->assertInstanceOf(Upload::class, $upload);
        $this->assertDatabaseHas('uploads', [
            'id' => $upload->id,
            'uuid' => $upload->uuid,
        ]);
        $this->assertNotNull($upload->user_id);
        $this->assertInstanceOf(User::class, $upload->user);
    }

    /**
     * Test UploadFactory creation with specific user.
     */
    public function test_upload_factory_can_be_associated_with_existing_user(): void
    {
        $user = User::factory()->create();
        $upload = Upload::factory()->create([
            'user_id' => $user->id,
        ]);

        $this->assertEquals($user->id, $upload->user_id);
        $this->assertTrue($upload->user->is($user));
    }
}
