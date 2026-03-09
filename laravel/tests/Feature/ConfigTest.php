<?php

namespace Tests\Feature;

use Tests\TestCase;

class ConfigTest extends TestCase
{
    /**
     * Test application configuration.
     */
    public function test_app_config(): void
    {
        $this->assertEquals('testing', config('app.env'));
        $this->assertEquals('UTC', config('app.timezone'));
        $this->assertEquals('fr', config('app.locale'));
        $this->assertEquals('AES-256-CBC', config('app.cipher'));
    }

    /**
     * Test authentication configuration.
     */
    public function test_auth_config(): void
    {
        $this->assertEquals('web', config('auth.defaults.guard'));
        $this->assertEquals('jwt', config('auth.guards.api.driver'));
        $this->assertEquals('eloquent', config('auth.providers.users.driver'));
    }

    /**
     * Test database configuration.
     */
    public function test_database_config(): void
    {
        $this->assertEquals('sqlite', config('database.default'));
        // Based on .env.testing
        $this->assertStringContainsString('testing.sqlite', config('database.connections.sqlite.database'));
    }

    /**
     * Test JWT configuration.
     */
    public function test_jwt_config(): void
    {
        $this->assertEquals(60, config('jwt.ttl'));
        $this->assertEquals('HS256', config('jwt.algo'));
        $this->assertTrue(config('jwt.blacklist_enabled'));
    }

    /**
     * Test Fortify configuration.
     */
    public function test_fortify_config(): void
    {
        $this->assertTrue(config('fortify.views'));
        $this->assertContains('registration', config('fortify.features'));
        $this->assertContains('email-verification', config('fortify.features'));
    }

    /**
     * Test Pennant configuration.
     */
    public function test_pennant_config(): void
    {
        $this->assertEquals('database', config('pennant.default'));
        $this->assertEquals('features', config('pennant.stores.database.table'));
    }

    /**
     * Test Filesystems configuration.
     */
    public function test_filesystems_config(): void
    {
        $this->assertEquals('local', config('filesystems.default'));
        $this->assertArrayHasKey('public', config('filesystems.disks'));
    }
}
