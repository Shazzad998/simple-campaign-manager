import { dashboard } from '@/routes';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Mails, Plus, UserPlus2 } from 'lucide-react';
import DataTable from '@/components/custom/DataTable';
import DeleteConfirm from '@/components/custom/DeleteConfirm';
import useCustomers from './partials/useCampaigns';
import useCampaigns from './partials/useCampaigns';
import campaigns from '@/routes/campaigns';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Campaigns',
        href: '',
    },
];

const Index = () => {


    const { campaigns_resource, columns,  handleCreate} = useCampaigns()

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Campaigns" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Campaigns</h1>
                        <Button onClick={handleCreate}>
                            <Mails /> Add Campaign
                        </Button>
                    </div>
                </div>
                <DataTable
                    resource={campaigns_resource}
                    columns={columns}
                    list_route={campaigns.index().url}
                />
            </div>
        </AppLayout>
  )
}

export default Index