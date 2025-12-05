<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignRecipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_id',
        'contact_id',
        'status',
        'response',
        'sent_at'
    ];

    protected function casts(): array
    {
        return [
            'sent_at' => 'datetime',
        ];
    }

    /**
     * Each entry belongs to a campaign
     */
    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    /**
     * Each entry belongs to a contact
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
