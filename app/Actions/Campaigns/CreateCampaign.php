<?php

namespace App\Actions\Campaigns;

use App\Data\CampaignData;
use App\Models\Campaign;
use App\Models\CampaignRecipient;
use Illuminate\Support\Facades\DB;

class CreateCampaign
{

    public function handle(CampaignData $data, ?int $userId = null)
    {
        return DB::transaction(function () use ($data, $userId) {
            $campaign = Campaign::create([
                'subject' => $data->subject,
                'body' => $data->body,
                'created_by' => $userId,
            ]);


            foreach ($data->recipientIds as $contactId) {
                CampaignRecipient::create([
                    'campaign_id' => $campaign->id,
                    'contact_id' => $contactId,
                    'status' => 'pending',
                ]);
            }


            return $campaign;
        });
    }
}
