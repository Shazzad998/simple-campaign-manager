<?php

namespace App\Jobs;

use App\Models\Campaign;
use App\Models\CampaignRecipient;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendEmailJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Campaign $campaign,
        public CampaignRecipient $recipient
    ) {}

    public function handle()
    {
        try {

            // Fake email sendin delay
            sleep(1);

            $success = random_int(0, 100) > 15;

            $this->recipient->update([
                'status' => $success ? 'sent' : 'failed',
                'response' => $success ? 'OK (simulated)' : 'Simulated failure',
                'sent_at' => $success ? now() : null,
            ]);
        } catch (\Throwable $th) {
            $this->recipient->update([
                'status' => 'failed',
                'response' => $th->getMessage(),
            ]);
        }
    }
}
