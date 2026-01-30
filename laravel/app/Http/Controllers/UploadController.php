<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    /**
     * Download the file associated with the given UUID.
     */
    public function download(string $uuid)
    {
        $upload = Upload::where('uuid', $uuid)->firstOrFail();

        // Ensure the file exists
        if (! Storage::disk('public')->exists($upload->path)) {
            abort(404);
        }

        return Storage::disk('public')->download(
            $upload->path,
            $upload->original_name,
            ['Content-Type' => $upload->mime_type]
        );
    }
}
