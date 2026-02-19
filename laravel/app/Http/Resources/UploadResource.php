<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UploadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'original_name' => $this->original_name,
            'mime_type' => $this->mime_type,
            'updated_at' => $this->updated_at,
            'size' => $this->size,
            'expires_at' => $this->expires_at,
            'deleted_at' => $this->deleted_at,
            'created_at' => $this->created_at,
            'locked' => ! empty($this->password),
            // Provide download URL only if not deleted
            'url' => $this->deleted_at ? null : route('file.show', $this->uuid),
        ];
    }
}
