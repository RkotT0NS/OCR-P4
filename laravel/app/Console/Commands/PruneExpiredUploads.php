<?php

namespace App\Console\Commands;

use App\Models\Upload;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class PruneExpiredUploads extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'uploads:prune';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete uploaded files that have expired';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to prune expired uploads...');

        $expiredUploads = Upload::where('expires_at', '<=', now())->get();
        $count = 0;

        foreach ($expiredUploads as $upload) {
            $path = $upload->path;

            // Delete record (Soft Delete)
            $upload->delete();

            // Check if any active uploads still use this file
            $usageCount = Upload::where('path', $path)->whereNull('deleted_at')->count();

            if ($usageCount === 0) {
                // Delete file from storage
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                } else {
                    $this->warn("File not found for upload ID {$upload->id}: {$path}");
                }
            }

            $count++;
        }

        $this->info("Pruned {$count} expired uploads.");
    }
}
