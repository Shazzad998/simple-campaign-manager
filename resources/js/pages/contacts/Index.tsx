
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import contacts from '@/routes/contacts';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { UserPlus2 } from 'lucide-react';
import Form from './Form';
import useContacts from './hooks/useContacts';
import DeleteConfirm from '@/components/common/DeleteConfirm';
import DataTable from '@/components/data-table/DataTable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Customers',
        href: '',
    },
];

const Index = () => {
    const {
        contacts_resource,
        formOpen,
        setFormOpen,
        contact,
        selectedItems,
        setSelectedItems,
        selectedAllItems,
        setSelectedAllItems,
        bulkActions,
        deleteItem,
        deleteDialogOpen,
        setDeleteDialogOpen,
        columns,
        handleCreate,
    } = useContacts();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />

            <DeleteConfirm
                open={deleteDialogOpen}
                opOpenChange={setDeleteDialogOpen}
                onConfirm={deleteItem}
            />

            <Form open={formOpen} onOpenChange={setFormOpen} contact={contact}/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Contacts</h1>
                        <Button onClick={handleCreate}>
                            <UserPlus2 /> Add Contact
                        </Button>
                    </div>
                </div>
                <DataTable
                    resource={contacts_resource}
                    selected={selectedItems}
                    setSelected={setSelectedItems}
                    selectedAll={selectedAllItems}
                    setSelectedAll={setSelectedAllItems}
                    columns={columns}
                    list_route={contacts.index().url}
                    bulkActions={bulkActions}
                />
            </div>
        </AppLayout>
    );
};

export default Index;
