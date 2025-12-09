<?php

namespace App\Services;

use App\Enums\CampaignRecipientStatus;
use App\Models\Campaign;
use App\Models\CampaignRecipient;
use App\Models\Contact;
use Carbon\Carbon;

class AnalyticsService
{

    public function getSummaryStats()
    {
        return [
            'contacts' => $this->contactStats(),
            'campaigns' => $this->campaignStats(),
            'emails' => $this->emailStats(),
        ];
    }

    public function contactStats()
    {
        return [
            'total' => Contact::count(),
            'last_week' => $this->lastWeekCount(Contact::class),
            'growth' => $this->growth(Contact::class),
        ];
    }

    public function campaignStats()
    {
        return [
            'total' => Campaign::count(),
            'last_week' => $this->lastWeekCount(Campaign::class),
            'growth' => $this->growth(Campaign::class),
        ];
    }

    public function emailStats()
    {
        $total = CampaignRecipient::count();
        $sent = CampaignRecipient::where('status', CampaignRecipientStatus::SENT)->count();
        $failed = CampaignRecipient::where('status', CampaignRecipientStatus::FAILED)->count();

        return [
            'sent' => $sent,
            'failed' => $failed,
            'delivery_rate' => $total ? round(($sent / $total) * 100, 2) : 0,
        ];
    }

    public function getEmailActivityLast7Days()
    {
        $startDate = Carbon::today()->subDays(6);

        $raw = CampaignRecipient::selectRaw(
            "
        DATE(
            CASE 
                WHEN status = ? THEN sent_at
                ELSE created_at
            END
        ) AS date,
        SUM(CASE WHEN status = ? THEN 1 ELSE 0 END) AS sent,
        SUM(CASE WHEN status = ? THEN 1 ELSE 0 END) AS failed
    ",
            [
                CampaignRecipientStatus::SENT->value,
                CampaignRecipientStatus::SENT->value,
                CampaignRecipientStatus::FAILED->value,
            ]
        )
            ->where(function ($q) use ($startDate) {
                $q->whereDate('sent_at', '>=', $startDate)
                    ->orWhereDate('created_at', '>=', $startDate);
            })
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Prearing data for front end chart.

        $days = collect();
        for ($i = 0; $i < 7; $i++) {
            $dateObj = Carbon::today()->subDays(6 - $i);
            $d = $dateObj->toDateString();
            $formatted = $dateObj->format('jS M');

            $dayData = $raw->firstWhere('date', $d);

            $days->push([
                'day' => $formatted,
                'sent' => $dayData->sent ?? 0,
                'failed' => $dayData->failed ?? 0,
            ]);
        }

        return $days;
    }

    private function lastWeekCount($model)
    {
        return $model::whereBetween('created_at', [
            Carbon::now()->subWeek(),
            Carbon::now()
        ])->count();
    }


    private function growth($model)
    {
        $lastWeek = $this->lastWeekCount($model);
        $previous = $model::whereBetween('created_at', [
            Carbon::now()->subWeeks(2),
            Carbon::now()->subWeek()
        ])->count();

        if ($previous == 0 && $lastWeek == 0) return 0;
        if ($previous == 0) return 100;

        return round((($lastWeek - $previous) / $previous) * 100, 2);
    }


    public function getRecentCampaignsWithStats($limit = 5)
    {
        return Campaign::latest()
            ->take($limit)
            ->withCount([
                'recipients as recipient_count',
                'recipients as success_count' => fn($q) => $q->where('status', CampaignRecipientStatus::SENT),
                'recipients as failed_count'  => fn($q) => $q->where('status', CampaignRecipientStatus::FAILED),
            ])
            ->get();
    }
}
