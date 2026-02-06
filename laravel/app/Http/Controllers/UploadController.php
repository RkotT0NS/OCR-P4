<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UploadController extends Controller
{
    /**
     * Show the file details.
     */
    public function show(string $uuid)
    {
        $upload = Upload::withTrashed()->where('uuid', $uuid)->firstOrFail();

        return Inertia::render('file/show', [
            'upload' => [
                'uuid' => $upload->uuid,
                'original_name' => $upload->original_name,
                'mime_type' => $upload->mime_type,
                'size' => $upload->size,
                'expires_at' => $upload->expires_at,
                'deleted_at' => $upload->deleted_at,
                'has_password' => ! empty($upload->password),
                'download_url' => $upload->deleted_at ? null : route('file.download', $upload->uuid),
            ],
        ]);
    }

    /**
     * Download the file associated with the given UUID.
     */
    public function download(Request $request, string $uuid)
    {
        $upload = Upload::where('uuid', $uuid)->firstOrFail();

        if (! empty($upload->password)) {
            if ($request->isMethod('get')) {
                abort(403, 'Password required.');
            }

            if (! Hash::check($request->input('password'), $upload->password)) {
                abort(403, 'Invalid password.');
            }
        }

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
