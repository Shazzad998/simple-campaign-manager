<?php

namespace App\Actions\Contacts;

use App\Models\Contact;
use Carbon\Carbon;

class GetContacts
{
    public function handle($request)
    {
        return Contact::query()
            ->when($request->search, fn($q, $search) =>
                $q->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
            )
            ->when($request->from, fn($q, $from) =>
                $q->where('created_at', '>=', Carbon::parse($from)->startOfDay())
            )
            ->when($request->to, fn($q, $to) =>
                $q->where('created_at', '<=', Carbon::parse($to)->endOfDay())
            )
            ->orderBy($request->sort_by ?? 'id', $request->sort_direction ?? 'desc');
    }
}
