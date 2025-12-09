<?php

namespace App\Data;

class ContactData
{
    public function __construct(
        public string $name,
        public string $email,
    ) {}
}
