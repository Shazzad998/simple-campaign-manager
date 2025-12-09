<?php

namespace App\Services;

use App\Actions\Campaigns\CreateCampaign;
use App\Data\CampaignData;
use App\Jobs\SendCampaignJob;
use Stevebauman\Purify\Facades\Purify;

class CampaignService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private CreateCampaign $createAction) {}


    public function createAndDispatch(array $data, ?int $userId = null)
    {
         $campaignData = new CampaignData(
                $data['subject'],
                Purify::clean($data['body']),
                $data['recipients']
            );
            
        //create campaign
        $campaign = $this->createAction->handle($campaignData, $userId);

        //dispatch email sending
        SendCampaignJob::dispatch($campaign);
        
        return $campaign;
    }
}