
# Simple Campaign Manager

  

A minimal email-campaign manager built with **Laravel 12**, **React**,

**InertiaJS**, **TypeScript**, and **shadcn/ui**.

  
  

## Features

### Contacts

- Seeded contacts list (name + email)

- Displayed in a table with multi-selection and bulk-action


### Campaigns

- Create campaigns (subject + body)

- Select recipients from contacts

- Queue-based email dispatching

- Campaign detail page using shadcn/ui

  

### Email Delivery Tracking

- Statuses: pending, sent, failed

- Per-campaign stats

 
##  Tech Stack

-  **Laravel 12**

-  **React + InertiaJS**

-  **TypeScript + Tailwind + shadcn/ui**

-  **Queue Worker (sync/database)**

  ##  Folder Structure

  

```

simple-campaign-manager/
├── app/
│   ├── Actions/
│   │   └── Campaigns/
│   │       └── CreateCampaign.php
│   │       └── GetCampaigns.php
│   │   └── Contacts/
│   │       └── CreateContact.php
│   │       └── DeleteContact.php
│   │       └── GetContacts.php
│   │       └── UpdateContact.php
│   ├── Data/
│   │   └── CampaignData.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── CampaignController.php
│   │   │   ├── ContactController.php
│   │   │   └── DashboardController.php
│   │   ├── Requests/
│   │   │   ├── StoreCampaignRequest.php
│   │   │   ├── UpdateCampaignRequest.php
│   │   │   ├── StoreContactRequest.php
│   │   │   └── UpdateContactRequest.php
│   │   └── Resources/
│   │       ├── Campaign/
│   │       │   ├── CampaignResource.php
│   │       │   ├── CampaignListResource.php
│   │       │   └── CampaignRecipientResource.php
│   │       └── Contact/
│   │           ├── ContactResource.php
│   │           └── ContactOptionResource.php
│   ├── Jobs/
│   │   ├── SendCampaignJob.php
│   │   └── SendEmailJob.php
│   ├── Models/
│   │   ├── Campaign.php
│   │   ├── CampaignRecipient.php
│   │   └── Contact.php
│   └── Services/
│       ├── CampaignService.php
│       └── AnalyticsService.php
│
├── database/
│   ├── migrations/
│   │   ├── create_contacts_table.php
│   │   ├── create_campaigns_table.php
│   │   └── create_campaign_recipients_table.php
│   └── seeders/
│       └── DatabaseSeeder.php
│
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   ├── components/
│   │   │   ├── data-table/
│   │   │   ├── form/
│   │   │   ├── ui/ (shadcn components)
│   │   │   └── common/
│   │   ├── pages/
│   │   │   ├── campaigns/
│   │   │   │   ├── Index.tsx
│   │   │   │   ├── Create.tsx
│   │   │   │   └── Show.tsx
│   │   │   └── contacts/
│   │   │       ├── Index.tsx
│   │   │       └── Form.tsx
│   │   ├── layouts/
│   │   │   └── app-layout.tsx
│   │   └── lib/
│   │       └── utils.ts
│   └── views/
│       └── app.blade.php
│
├── routes/
│   └── web.php
│
├── public/
│   └── index.php
│
├── composer.json
├── package.json
└── README.md


```

## Installation

### ⚠️ PHP Version Requirement

This project requires **PHP 8.4 or higher**.

  

### Clone

  

``` bash

git  clone  https://github.com/Shazzad998/simple-campaign-manager.git

cd  simple-campaign-manager

```

  

### Install Backend Dependencies

  

``` bash

composer  install

```

  

## Frontend Setup

  

``` bash

npm  install

```

  
  

### Environment Setup

  

``` bash

cp  .env.example  .env

php  artisan  key:generate

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
Or if you want to use **SQLite**, configure your `.env` like this:
``` env

DB_CONNECTION=sqlite

# DB_HOST=127.0.0.1

# DB_PORT=3306

# DB_DATABASE=your-database-name

# DB_USERNAME=root

# DB_PASSWORD=

```
Then create a `database.sqlite` in the `database` folder:

1.  Go to the `database` directory
    
2.  Create a file named **`database.sqlite`**

  

## Migrate & Seed

  

This will create 10 contacts and an admin account.

  

``` bash

php  artisan  migrate  --seed

```

  

## Start Development

  

``` bash

composer  run  dev

```

  

## Accessing the Application

  

Once the development server starts, open:

  

http://localhost:8000

  

This is the main application URL.

  

## Admin Login

  
|Email|Password  |
|--|--|
| admin@gmail.com | 123456 |

  

## Production Build

  

``` bash

npm  run  build

```


## License

  

MIT License.