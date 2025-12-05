<?php

namespace App\Http\Resources\Campaign;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CampaignResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'subject'     => $this->subject,
            'body'        => $this->body,
            'created_at'  => $this->created_at?->format('d M y H:i a'),
            'status'      => $this->status,

            'recipients' => CampaignRecipientResource::collection(
                $this->whenLoaded('recipients')
            ),
        ];
    }
}
