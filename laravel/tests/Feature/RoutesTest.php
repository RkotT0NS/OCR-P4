<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Upload;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class RoutesTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Web Routes
     */
    public function test_home_page_is_accessible()
    {
        $this->get(route('home'))->assertOk();
    }

    public function test_dashboard_requires_auth()
    {
        $this->get(route('dashboard'))->assertRedirect(route('login'));
    }

    public function test_dashboard_is_accessible_to_authenticated_users()
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get(route('dashboard'))->assertOk();
    }

    public function test_file_show_route_exists()
    {
        $upload = Upload::factory()->create();
        $this->get(route('file.show', ['uuid' => $upload->uuid]))->assertOk();
    }

    /**
     * Settings Routes
     */
    public function test_settings_redirects_to_profile()
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get('/settings')->assertRedirect('/settings/profile');
    }

    public function test_profile_edit_requires_auth()
    {
        $this->get(route('profile.edit'))->assertRedirect(route('login'));
    }

    public function test_password_edit_is_accessible_to_authenticated_users()
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get(route('user-password.edit'))->assertOk();
    }

    public function test_appearance_is_accessible_to_authenticated_users()
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get(route('appearance.edit'))->assertOk();
    }

    /**
     * API Routes
     */
    public function test_api_user_requires_jwt_auth()
    {
        $this->getJson('/api/user')->assertStatus(401);
    }

    public function test_api_uploads_requires_jwt_auth()
    {
        $this->getJson('/api/uploads')->assertStatus(401);
    }

    public function test_api_upload_tus_requires_jwt_auth()
    {
        // TUS server might return 401 if unauthorized
        $this->get('/api/upload')->assertStatus(401);
    }

    public function test_api_auth_login_route_exists()
    {
        // AuthController::login returns 401 if credentials missing/invalid
        $this->postJson('/api/auth/login')->assertStatus(401);
    }

    public function test_api_auth_register_route_exists()
    {
        // AuthController::register returns 400 if validation fails
        $this->postJson('/api/auth/register')->assertStatus(400);
    }
}
