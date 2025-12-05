<?php

namespace App\Http\Resources\Campaign;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CampaignListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'subject'    => $this->subject,
            'created_at' => $this->created_at?->format('d M y H:i a'),
            'recipient_count' => $this->recipients()->count(),
        ];
    }
}
