<?php

namespace App\Http\Controllers;

use App\Actions\Contacts\CreateContact;
use App\Actions\Contacts\DeleteContact;
use App\Actions\Contacts\GetContacts;
use App\Actions\Contacts\UpdateContact;
use App\Models\Contact;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Resources\Contact\ContactResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, GetContacts $getContacts)
    {
        $query = $getContacts->handle($request);
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
    public function store(StoreContactRequest $request, CreateContact $createContact)
    {
        try {
            $createContact->handle($request->validated());
            return redirect()->back()->with('success', 'Contact added successfully');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return redirect()->back()->with('error', "Something went wrong. Please Try again later.");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact, UpdateContact $updateContact)
    {
        try {
            $$updateContact->handle($contact, $request->validated());
            return redirect()->back()->with('success', 'Contact updated successfully');
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return redirect()->back()->with('error', "Something went wrong. Please Try again later.");
        }
    }


    public function bulkDelete(Request $request, DeleteContact $deleteContact)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|exists:contacts,id',
        ]);
        $deleteContact->handle($request->ids);
        return redirect()->back()->with('success', 'Contact deleted successfully');
    }
}
