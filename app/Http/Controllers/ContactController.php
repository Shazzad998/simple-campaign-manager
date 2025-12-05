<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Resources\Contact\ContactResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Contact::query()
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
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
        $contacts = $query->paginate($request->per_page ?? 10)
            ->withQueryString();

        return inertia('contacts/Index', [
            'data' => ContactResource::collection($contacts),
            'ids' => $ids,
            'filters' => $request->only(['search', 'sort_by', 'sort_direction', 'per_page', 'from', 'to'])

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactRequest $request)
    {
        try {
            Contact::create($request->validated());
            return redirect()->back()->with('success', 'Contact added successfully');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return redirect()->back()->with('error', "Something went wrong. Please Try again later.");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        try {
            $contact->update($request->validated());
            return redirect()->back()->with('success', 'Contact updated successfully');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return redirect()->back()->with('error', "Something went wrong. Please Try again later.");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }


    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|exists:contacts,id',
        ]);
        Contact::whereIn('id', $request->ids)->delete();
        return redirect()->back()->with('success', 'Contact deleted successfully');
    }
}
