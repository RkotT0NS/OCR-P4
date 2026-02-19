<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Pennant\Feature;
use Tests\TestCase;

class FeatureFlagTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the luminosity-theme feature is defined.
     */
    public function test_luminosity_theme_feature_is_available(): void
    {
        // By default, it's defined as false in AppServiceProvider
        $this->assertFalse(Feature::active('luminosity-theme'));
    }

    /**
     * Test that the luminosity-theme feature can be activated.
     */
    public function test_luminosity_theme_feature_can_be_activated(): void
    {
        Feature::activate('luminosity-theme');

        $this->assertTrue(Feature::active('luminosity-theme'));
    }

    /**
     * Test that features are shared with Inertia.
     */
    public function test_features_are_shared_with_inertia(): void
    {
        Feature::activate('luminosity-theme');
        // Feature::activate('two-factor-authentication');

        $this->get('/')
            ->assertInertia(fn ($page) => $page
                ->has('features', fn ($features) => $features
                    ->has('luminosity-theme')
                    ->has('two-factor-authentication')
                    ->where('luminosity-theme', true)
                    ->where('two-factor-authentication', false)
                )
            );
    }
}
