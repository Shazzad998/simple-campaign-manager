import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}


export interface ResourceData {
    data: any[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: any[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}
export interface DataTableColumn {
    title: string;
    field: string;
    sortable?: boolean;
    render?: (item: any) => React.ReactNode;
    actions?: (item: any) => DataTableAction[];
}

export interface DataTableAction {
    label: string;
    icon?: React.ReactNode;
    onClick: (item: any) => void;
    className?: string;
}
export interface DataTableBulkAction {
    label: string;
    icon?: React.ReactNode;
    onClick: (selectedIds: number[]) => void;
    className?: string;
}

export interface DataTableProps {
    resource: ResourceData;
    selected?: number[];
    setSelected?: (selected: number[]) => void;
    selectedAll?: boolean;
    setSelectedAll?: (selected: boolean) => void;
    columns: DataTableColumn[];
    list_route: string;
    bulkActions?: DataTableBulkAction[];
    actions?: DataTableAction[];
}
export type SelectOption = {
    label: string;
    value: string;
    description?: string;
    image?: string;
};

export interface Filters {
    search: string;
    sort_by: string;
    sort_direction: string;
    per_page: number;
    page: number;
    from: string;
    to: string;
}

export interface confirmDeleteItem {
    id: number;
    [key: string]: any;
}

export interface Flash {
    success: string;
    info: string;
    warning: string;
    error: string;
}

