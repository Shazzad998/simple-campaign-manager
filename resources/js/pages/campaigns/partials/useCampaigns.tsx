import { Badge } from '@/components/ui/badge';
import campaigns from '@/routes/campaigns';
import {
    confirmDeleteItem,
    DataTableAction,
    DataTableBulkAction,
    DataTableColumn,
    ResourceData,
    User,
} from '@/types';
import { CampaignListItem } from '@/types/app';
import { Link, router, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';

export default function useCampaigns() {

    const campaigns_resource = usePage().props.data as ResourceData;

    const handleCreate = () => router.get(campaigns.create());

    const handleShow = (item: any) =>
        router.get(campaigns.show(item.id));

    const bulkActions: DataTableBulkAction[] = [
        // {
        //   label: 'Delete',
        //   icon: <TrashIcon />,
        //   onClick: confirmBulkDelete,
        // },
    ];

    const actions: DataTableAction[] = [
        {
            label: 'Show',
            icon: <Eye />,
            onClick: handleShow,
        },

    ];

    const columns: DataTableColumn[] = [
        {
            title: 'Action',
            field: 'action',
            actions: (item: any) => {
                return actions.filter((action) => {
                    return true;
                });
            },
        },

        {
            title: 'Subject',
            field: 'subject',
            render: (item: CampaignListItem) => {
                return (
                    <Link href={campaigns.show(item.id)} className="truncate font-medium" >{item.subject}</Link>
                );
            },
        },
       
        {
            title: 'Recipients',
            field: 'recipient_count',
            render:(item:CampaignListItem) => (<Badge variant={'outline'}>{item.recipient_count}</Badge>)
        },
        {
            title: 'Success',
            field: 'success_count',
            render:(item:CampaignListItem) => (<Badge variant={'outline'}>{item.success_count}</Badge>)
        },
        {
            title: 'Failed',
            field: 'failed_count',
            render:(item:CampaignListItem) => (<Badge variant={'outline'}>{item.failed_count}</Badge>)
        },
        {
            title: 'Created At',
            field: 'created_at',
        },
        
    ];

    return {
        campaigns_resource,
        bulkActions,
        actions,
        handleCreate,
        handleShow,
        columns,
    };
}
