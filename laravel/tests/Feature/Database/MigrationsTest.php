<?php

namespace Tests\Feature\Database;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class MigrationsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that all expected tables are created.
     */
    public function test_tables_exist(): void
    {
        $tables = [
            'users',
            'password_reset_tokens',
            'sessions',
            'cache',
            'cache_locks',
            'jobs',
            'job_batches',
            'failed_jobs',
            'personal_access_tokens',
            'uploads',
            'features',
        ];

        foreach ($tables as $table) {
            $this->assertTrue(Schema::hasTable($table), "Table '{$table}' does not exist.");
        }
    }

    /**
     * Test that the users table has all expected columns from multiple migrations.
     */
    public function test_users_table_has_expected_columns(): void
    {
        $columns = [
            'id',
            'name',
            'email',
            'email_verified_at',
            'password',
            'remember_token',
            'created_at',
            'updated_at',
            'two_factor_secret',
            'two_factor_recovery_codes',
            'two_factor_confirmed_at',
            'avatar_url',
        ];

        foreach ($columns as $column) {
            $this->assertTrue(Schema::hasColumn('users', $column), "Column '{$column}' does not exist in 'users' table.");
        }
    }

    /**
     * Test that the uploads table has all expected columns from multiple migrations.
     */
    public function test_uploads_table_has_expected_columns(): void
    {
        $columns = [
            'id',
            'uuid',
            'user_id',
            'path',
            'original_name',
            'mime_type',
            'size',
            'created_at',
            'updated_at',
            'expires_at',
            'deleted_at',
            'password',
        ];

        foreach ($columns as $column) {
            $this->assertTrue(Schema::hasColumn('uploads', $column), "Column '{$column}' does not exist in 'uploads' table.");
        }
    }

    /**
     * Test that the cache table has all expected columns.
     */
    public function test_cache_table_has_expected_columns(): void
    {
        $columns = ['key', 'value', 'expiration'];

        foreach ($columns as $column) {
            $this->assertTrue(Schema::hasColumn('cache', $column), "Column '{$column}' does not exist in 'cache' table.");
        }
    }

    /**
     * Test that the personal_access_tokens table has all expected columns.
     */
    public function test_personal_access_tokens_table_has_expected_columns(): void
    {
        $columns = [
            'id',
            'tokenable_type',
            'tokenable_id',
            'name',
            'token',
            'abilities',
            'last_used_at',
            'expires_at',
            'created_at',
            'updated_at',
        ];

        foreach ($columns as $column) {
            $this->assertTrue(Schema::hasColumn('personal_access_tokens', $column), "Column '{$column}' does not exist in 'personal_access_tokens' table.");
        }
    }

    /**
     * Test that the features table has all expected columns.
     */
    public function test_features_table_has_expected_columns(): void
    {
        $columns = [
            'id',
            'name',
            'scope',
            'value',
            'created_at',
            'updated_at',
        ];

        foreach ($columns as $column) {
            $this->assertTrue(Schema::hasColumn('features', $column), "Column '{$column}' does not exist in 'features' table.");
        }
    }

    /**
     * Test that migrations can be rolled back.
     */
    public function test_migrations_rollback(): void
    {
        $this->artisan('migrate:rollback');

        // After one rollback, the last migrations should be gone.
        // Given the filenames, the last one is avatar_url addition.
        $this->assertFalse(Schema::hasColumn('users', 'avatar_url'));

        // Let's rollback everything
        $this->artisan('migrate:reset');

        $this->assertFalse(Schema::hasTable('users'));
        $this->assertFalse(Schema::hasTable('uploads'));
    }
}
