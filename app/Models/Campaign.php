<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'body',
        'created_by',
    ];

    /**
     * A campaign is created by a user
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * A campaign has many recipients
     */
    public function recipients()
    {
        return $this->hasMany(CampaignRecipient::class);
    }

    /**
     * A campaign belongs to many contacts through campaign_recipients
     */
    public function contacts()
    {
        return $this->belongsToMany(Contact::class, 'campaign_recipients')
                    ->withPivot('status')
                    ->withTimestamps();
    }
}
