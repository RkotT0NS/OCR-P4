<?php

namespace App\Providers;

use App\Services\UploadStorageService;
use Illuminate\Support\ServiceProvider;

class UploadStorageServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(UploadStorageService::class, function ($app) {
            $config = $app['config']['upload'] ?? [];

            return new UploadStorageService(
                $config['disk'] ?? 'public',
                $config['path'] ?? 'uploads',
                $config['hashing_algorithm'] ?? 'sha512'
            );
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->publishes([
            __DIR__.'/../../config/upload.php' => config_path('upload.php'),
        ], 'upload-config');
    }
}
