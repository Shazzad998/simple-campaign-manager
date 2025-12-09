<?php

namespace App\Actions\Campaigns;

use App\Enums\CampaignRecipientStatus;
use App\Models\Campaign;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GetCampaigns
{
    public function handle(Request $request)
    {
        $query = Campaign::query()
            ->withCount([
                'recipients as recipient_count',
                'recipients as success_count' => fn($q) => $q->where('status', CampaignRecipientStatus::SENT),
                'recipients as failed_count'  => fn($q) => $q->where('status', CampaignRecipientStatus::FAILED),
            ])
            ->when($request->search, fn($query, $search) =>
                $query->where('subject', 'like', "%$search%")
                      ->orWhere('body', 'like', "%$search%")
            )
            ->when($request->from, fn($query, $from) =>
                $query->where('created_at', '>=', Carbon::parse($from)->startOfDay())
            )
            ->when($request->to, fn($query, $to) =>
                $query->where('created_at', '<=', Carbon::parse($to)->endOfDay())
            )
            ->orderBy($request->sort_by ?? 'id', $request->sort_direction ?? 'desc');

        return $query;
    }
}
