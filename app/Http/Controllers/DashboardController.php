<?php

namespace App\Http\Controllers;

use App\Http\Resources\Campaign\CampaignListResource;
use App\Services\AnalyticsService;

class DashboardController extends Controller
{
    public function index(AnalyticsService $analyticsService)
    {
        return inertia('dashboard/Index', [
            'stats' => $analyticsService->getSummaryStats(),
            'emailActivity' => $analyticsService->getEmailActivityLast7Days(),
            'emailDeliveryRate' => $analyticsService->emailStats(),
            'recentCampaigns' => CampaignListResource::collection($analyticsService->getRecentCampaignsWithStats(5))
        ]);
    }
}
