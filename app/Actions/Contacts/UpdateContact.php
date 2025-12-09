<?php

namespace App\Actions\Contacts;

use App\Models\Contact;

class UpdateContact
{
    public function handle(Contact $contact, array $data): bool
    {
        return $contact->update($data);
    }
}
