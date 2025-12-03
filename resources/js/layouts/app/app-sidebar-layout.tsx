import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { Flash, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type PropsWithChildren } from 'react';
import { toast } from 'sonner';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {

    
    const flash = usePage().props.flash as Flash;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.info) {
            toast.info(flash.info);
        }
        if (flash.warning) {
            toast.warning(flash.warning);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
