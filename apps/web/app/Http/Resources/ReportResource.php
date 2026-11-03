<?php

namespace App\Http\Resources;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Report */
class ReportResource extends JsonResource
{
    public static $wrap = null;

    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'user_id' => $this->user_id,
            'description' => $this->description,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'category' => $this->category,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'prediction' => $this->whenLoaded('prediction'),
            'histories' => $this->whenLoaded('histories'),
        ];
    }
}
