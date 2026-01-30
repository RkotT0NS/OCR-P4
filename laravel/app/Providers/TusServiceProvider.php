<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use TusPhp\Tus\Server as TusServer;

class TusServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton('tus-server', function ($app) {
            // Initialize with 'redis' cache adapter
            $server = new TusServer('redis');

            // Set the API path (must match your route)
            $server->setApiPath('/api/upload');

            // Set the absolute path for uploads (mapped in docker-compose)
            $server->setUploadDir(storage_path('app/public/uploads'));

            // Set Redis configuration explicitly from .env
            $server->setCache([
                'host' => env('REDIS_HOST', 'redis'),
                'port' => env('REDIS_PORT', 6379),
                'database' => env('REDIS_DB', 0),
            ]);

            return $server;
        });
    }
}
