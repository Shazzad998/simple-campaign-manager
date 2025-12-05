<?php

namespace App\Data;

class CampaignData
{
    public function __construct(
        public string $subject,
        public string $body,
        public array $recipientIds
    ) {}
}
