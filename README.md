# Simple Campaign Manager

A minimal email-campaign manager built with **Laravel 12**, **React**,
**InertiaJS**, **TypeScript**, and **shadcn/ui**.


## Features

### Contacts

-   Seeded contacts list (name + email)
-   Displayed in a table with multi-selection

### Campaigns

-   Create campaigns (subject + body)
-   Select recipients from contacts
-   Queue-based email dispatching
-   Campaign detail page using shadcn/ui

### Email Delivery Tracking

-   Statuses: pending, sent, failed
-   Per-campaign stats

## Tech Stack

  Backend                 Frontend             Other
  ----------------------- -------------------- --------------
  Laravel 12              React + TypeScript   Vite
  InertiaJS               shadcn/ui            Queue Worker
  Fortify Auth            TailwindCSS          SQLite/MySQL

## Installation

###  Clone

``` bash
git clone https://github.com/Shazzad998/simple-campaign-manager.git
cd simple-campaign-manager
```

###  Install Backend Dependencies

``` bash
composer install
```

##  Frontend Setup

``` bash
npm install
```


###  Environment Setup

``` bash
cp .env.example .env
php artisan key:generate
```

## MySQL Configuration Example (`.env`)

To use **MySQL**, configure your `.env` like this:

``` env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=simple_campaign_manager
DB_USERNAME=root
DB_PASSWORD=
```

## Migrate & Seed

This will create 10 contacts and an admin account.

``` bash
php artisan migrate --seed
```

##  Start Development

``` bash
composer run dev
```

## Accessing the Application

Once the development server starts, open:

http://localhost:8000

This is the main application URL.

### Admin Login

  Email             Password
  ----------------- ----------
  admin@gmail.com   123456


##  Production Build

``` bash
npm run build
```

##  License

MIT License.
