<?php

namespace App\Actions\Contacts;

use App\Models\Contact;

class DeleteContact
{
    public function handle(array $ids): int
    {
        return Contact::whereIn('id', $ids)->delete();
    }
}
