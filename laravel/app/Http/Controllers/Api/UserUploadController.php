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
            ->paginate(10);

        return UploadResource::collection($uploads);
    }

    /**
     * Refresh the uploads list based on a last known date.
     */
    public function refresh(Request $request)
    {
        $request->validate([
            'last_known_date' => 'required|integer',
        ]);

        $lastKnownDate = now()->setTimestamp($request->input('last_known_date') / 1000);

        $uploads = $request->user()
            ->uploads()
            ->withTrashed()
            ->where(function ($query) use ($lastKnownDate) {
                $query->where('created_at', '>', $lastKnownDate)
                    ->orWhere('deleted_at', '>', $lastKnownDate);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

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

    /**
     * Delete (expire) the specified upload.
     */
    public function delete(Request $request, Upload $upload)
    {
        if ($upload->user_id !== $request->user()->id) {
            abort(403);
        }

        $upload->update(['expires_at' => now()]);

        return new UploadResource($upload);
    }
}
