import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import contacts from '@/routes/contacts';
import {
    confirmDeleteItem,
    DataTableAction,
    DataTableBulkAction,
    DataTableColumn,
    ResourceData,
    User,
} from '@/types';
import { Contact } from '@/types/app';
import { router, usePage } from '@inertiajs/react';
import { Pencil, TrashIcon } from 'lucide-react';
import { useState } from 'react';

export default function useContacts() {
     const [formOpen, setFormOpen] = useState<boolean>(false);
    const [contact, setContact] = useState<Contact | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedAllItems, setSelectedAllItems] = useState<boolean>(false);
    const [deleteIds, setDeleteIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const contacts_resource = usePage().props.data as ResourceData;

    const confirmBulkDelete = (ids: number[]) => {
        setDeleteIds(ids);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = (item: confirmDeleteItem) => {
        setDeleteIds([item.id]);
        setDeleteDialogOpen(true);
    };

    const deleteItem = () => {
        if (deleteIds.length > 0) {
            router.post(
                contacts.bulkDelete(),
                { ids: deleteIds },
                {
                    onSuccess: () => {
                        setDeleteDialogOpen(false);
                        setDeleteIds([]);
                        setSelectedItems([]);
                        setSelectedAllItems(false);
                    },
                },
            );
        }
    };

    const handleCreate = () => {setContact(null); setFormOpen(true)};
    const handleShow = (item: any) => router.get(contacts.show(item.id));
    const handleEdit = (item: any) => { setContact(item); setFormOpen(true)};

    const bulkActions: DataTableBulkAction[] = [
        {
            label: 'Delete',
            icon: <TrashIcon />,
            onClick: confirmBulkDelete,
        },
    ];

    const actions: DataTableAction[] = [
        {
            label: 'Edit',
            icon: <Pencil />,
            onClick: handleEdit,
        },
        {
            label: 'Delete',
            icon: <TrashIcon />,
            onClick: confirmDelete,
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
            title: 'Name',
            field: 'name',
            render: (item: User) => {
                return (
                    <div className="flex gap-1">
                        <Avatar className="h-8 w-8 overflow-hidden rounded-md">
                            <AvatarImage src={item.avatar} alt={item.name} />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(item.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {item.name}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                                {item.email}
                            </span>
                        </div>
                    </div>
                );
            },
        },
    ];

    return {
        contacts_resource,
        formOpen,
        setFormOpen,
        contact,
        setContact,
        selectedItems,
        setSelectedItems,
        selectedAllItems,
        setSelectedAllItems,
        deleteDialogOpen,
        setDeleteDialogOpen,
        deleteItem,
        bulkActions,
        actions,
        columns,
        handleCreate,
        handleEdit,
        handleShow,
    };
}
