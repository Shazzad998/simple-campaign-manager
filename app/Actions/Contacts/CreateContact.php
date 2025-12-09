<?php

namespace App\Actions\Contacts;

use App\Models\Contact;

class CreateContact
{
    public function handle(array $data): Contact
    {
        return Contact::create($data);
    }
}
