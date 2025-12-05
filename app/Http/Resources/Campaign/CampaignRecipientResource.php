<?php

namespace App\Http\Resources\Campaign;

use App\Http\Resources\Contact\ContactResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CampaignRecipientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'contact'   => new ContactResource($this->whenLoaded('contact')),
            'status'    => $this->status,
            'response'  => $this->response,
            'sent_at'   => $this->sent_at?->format('d M y H:i a'),
        ];
    }
}
