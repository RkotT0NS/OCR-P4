<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class UploadStorageService
{
    /**
     * The configured storage disk name.
     */
    protected string $disk;

    /**
     * The base path within the storage disk.
     */
    protected string $path;

    /**
     * The hashing algorithm to use for filenames.
     */
    protected string $hashingAlgorithm;

    /**
     * Create a new UploadStorageService instance.
     */
    public function __construct(string $disk = 'public', string $path = 'uploads', string $hashingAlgorithm = 'sha512')
    {
        $this->disk = $disk;
        $this->path = $path;
        $this->hashingAlgorithm = $hashingAlgorithm;
    }

    /**
     * Store the uploaded file, abstracting the filesystem operations.
     *
     * @param  string  $sourceFilePath  The absolute path of the original uploaded file
     * @return string The relative path of the stored blob
     */
    public function store(string $sourceFilePath): string
    {
        $hash = hash_file($this->hashingAlgorithm, $sourceFilePath);
        $blobPath = trim($this->path, '/').'/'.$hash;

        $disk = Storage::disk($this->disk);

        if (! $disk->exists($blobPath)) {
            // Using streams prevents large files from being loaded into memory
            $stream = fopen($sourceFilePath, 'r+');
            $disk->put($blobPath, $stream);
            fclose($stream);
        }

        // Clean up the original file left by the upload process
        if (file_exists($sourceFilePath)) {
            unlink($sourceFilePath);
        }

        return $blobPath;
    }
}
