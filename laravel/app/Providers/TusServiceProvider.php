<?php

namespace App\Providers;

use App\Models\Upload;
use Illuminate\Support\ServiceProvider;
use TusPhp\Events\UploadComplete;
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

            // Listen for upload complete event
            $server->event()->addListener('tus-server.upload.complete', function (UploadComplete $event) {
                $file = $event->getFile();
                $user = auth('api')->user();

                \Illuminate\Support\Facades\Log::info('Upload complete', [
                    'uuid' => $file->getKey(),
                    'path' => $file->getFilePath(),
                    'name' => $file->getName(),
                    'user' => $user ? $user->id : 'guest',
                ]);

                if ($user) {
                    $metadata = $file->details()['metadata'] ?? [];
                    $originalName = $metadata['filename'] ?? $file->getName();
                    $mimeType = $metadata['filetype'] ?? null;

                    Upload::create([

                        'uuid' => $file->getKey(),

                        'user_id' => $user->id,

                        'path' => 'uploads/'.basename($file->getFilePath()),

                        'original_name' => $originalName,

                        'mime_type' => $mimeType,
                        'size' => $file->getFileSize(),
                        'expires_at' => now()->addDays((int) env('UPLOAD_EXPIRATION_DAYS', 7)),
                    ]);
                }
            });

            return $server;
        });
    }
}
