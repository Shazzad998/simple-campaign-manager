<?php

namespace App\Http\Controllers;

use App\Data\CampaignData;
use App\Models\Campaign;
use App\Http\Requests\StoreCampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Http\Resources\Campaign\CampaignListResource;
use App\Http\Resources\Campaign\CampaignResource;
use App\Http\Resources\Contact\ContactOptionResource;
use App\Models\Contact;
use App\Services\CampaignService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CampaignController extends Controller
{

    public function __construct(private CampaignService $service) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Campaign::query()
            ->when($request->search, function ($query, $search) {
                $query->where('subject', 'like', "%{$search}%")
                    ->orWhere('body', 'like', "%{$search}%");
            })
            ->when($request->from, function ($query, $from) {
                $fromDate = Carbon::parse($from);
                $query->where('created_at', '>=', $fromDate->startOfDay());
            })
            ->when($request->to, function ($query, $to) {
                $toDate = Carbon::parse($to);
                $query->where('created_at', '<=', $toDate->endOfDay());
            })
            ->orderBy($request->sort_by ?? 'id', $request->sort_direction ?? 'desc');
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
            $data = new CampaignData(
                $validated['subject'],
                $validated['body'],
                $validated['recipients']
            );

            $campaign = $this->service->createAndDispatch(
                $data,
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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Campaign $campaign)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCampaignRequest $request, Campaign $campaign)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $campaign)
    {
        //
    }
}
