<?php

namespace App\Http\Controllers;

use App\Actions\Campaigns\GetCampaigns;
use App\Models\Campaign;
use App\Http\Requests\StoreCampaignRequest;
use App\Http\Resources\Campaign\CampaignListResource;
use App\Http\Resources\Campaign\CampaignResource;
use App\Http\Resources\Contact\ContactOptionResource;
use App\Models\Contact;
use App\Services\CampaignService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CampaignController extends Controller
{

    public function __construct(private CampaignService $service) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, GetCampaigns $getCampaigns)
    {

        $query = $getCampaigns->handle($request);
        $ids = $query->pluck('id');
        $campaigns = $query->paginate($request->per_page ?? 10)
            ->withQueryString();

        return inertia('campaigns/Index', [
            'data' => CampaignListResource::collection($campaigns),
            'ids' => $ids,
            'filters' => $request->only(['search', 'sort_by', 'sort_direction', 'per_page', 'from', 'to'])

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $contactOptions = ContactOptionResource::collection(Contact::orderBy('name')->get(['id', 'name', 'email']));

        return inertia('campaigns/Create', [
            'contactOptions' => $contactOptions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCampaignRequest $request)
    {
        $validated = $request->validated();

        try {
            $campaign = $this->service->createAndDispatch(
                $validated,
                $request->user()->id ?? null
            );
            return redirect()->route('campaigns.show', $campaign->id)->with('success', 'Campaign Created Successfully');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return redirect()->back()->with('error', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $campaign)
    {
        $campaign->load(['recipients.contact']);

        return inertia('campaigns/Show', [
            'campaign' => new CampaignResource($campaign),
        ]);
    }
}
