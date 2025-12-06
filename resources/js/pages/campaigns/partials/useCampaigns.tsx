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
import { useState } from 'react';

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
