<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email'
    ];

    /**
     * A contact can receive many campaigns
     */
    public function campaignRecipients()
    {
        return $this->hasMany(CampaignRecipient::class);
    }

    /**
     * A contact belongs to many campaigns through campaign_recipients
     */
    public function campaigns()
    {
        return $this->belongsToMany(Campaign::class, 'campaign_recipients')
            ->withPivot('status')
            ->withTimestamps();
    }
}
