<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UploadResource;
use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserUploadController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        $uploads = $request->user()
            ->uploads()
            ->withTrashed()
            ->orderBy('created_at', 'desc')
            ->get();

        return UploadResource::collection($uploads);
    }

    /**
     * Update the specified upload.
     */
    public function update(Request $request, Upload $upload)
    {
        if ($upload->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'password' => 'nullable|string',
            'expires_at' => 'nullable|date',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $upload->update($validated);

        return new UploadResource($upload);
    }
}
