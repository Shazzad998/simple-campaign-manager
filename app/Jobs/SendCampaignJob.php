<?php

namespace App\Jobs;

use App\Models\Campaign;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendCampaignJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Campaign $campaign) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->campaign->load('recipients.contact');

        foreach ($this->campaign->recipients as $recipient) {
            SendEmailJob::dispatch($this->campaign, $recipient);
        }
    }
}
