<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UploadResource;
use Illuminate\Http\Request;

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
}
