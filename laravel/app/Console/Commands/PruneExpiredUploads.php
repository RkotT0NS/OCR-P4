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
            // Delete file from storage
            if (Storage::disk('public')->exists($upload->path)) {
                Storage::disk('public')->delete($upload->path);
            } else {
                $this->warn("File not found for upload ID {$upload->id}: {$upload->path}");
            }

            // Delete record
            $upload->delete();
            $count++;
        }

        $this->info("Pruned {$count} expired uploads.");
    }
}
