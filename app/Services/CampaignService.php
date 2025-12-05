<?php

namespace App\Services;

use App\Actions\Campaigns\CreateCampaign;
use App\Data\CampaignData;
use App\Jobs\SendCampaignJob;

class CampaignService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private CreateCampaign $createAction) {}


    public function createAndDispatch(CampaignData $data, ?int $userId = null)
    {
        $campaign = $this->createAction->handle($data, $userId);


        SendCampaignJob::dispatch($campaign);


        return $campaign;
    }
}
