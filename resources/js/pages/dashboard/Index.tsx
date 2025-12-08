import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { CampaignListItem } from '@/types/app';
import { Head, usePage } from '@inertiajs/react';
import {
    MailCheck,
    Mails,
    MailX,
    Send,
    TrendingUp,
    Users2,
} from 'lucide-react';
import EmailActiviryChart, {
    emailActivityChartDataProps,
} from './EmailActiviryChart';
import RecentCampaignsTable from './RecentCampaignsTable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const stats = usePage().props.stats as any;
    const recentCampaigns = usePage().props
        .recentCampaigns as CampaignListItem[];
    const emailDeliveryRate = usePage().props.emailDeliveryRate as {
        sent: number;
        failed: number;
        delivery_rate: number;
    };

    const emailActivityChartData = usePage().props
        .emailActivity as emailActivityChartDataProps[];

    const emailActivityChartConfig = {
        sent: {
            label: 'Sent',
            color: 'var(--chart-2)',
        },
        failed: {
            label: 'Failed',
            color: 'var(--chart-4)',
        },
    } satisfies ChartConfig;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
                    <Card>
                        <CardHeader>
                            <CardDescription>
                                Email Delivery Rate
                            </CardDescription>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Send /> {emailDeliveryRate.delivery_rate} %
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline" className="text-green">
                                    <MailCheck />
                                    {emailDeliveryRate.sent}
                                </Badge>
                            </CardAction>
                            <CardDescription className="col-span-2">
                                <Badge
                                    variant={'outline'}
                                    className="text-destructive"
                                >
                                    {' '}
                                    <MailX /> {emailDeliveryRate.failed}{' '}
                                </Badge>{' '}
                                failed to send
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>Total Contacts</CardDescription>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Users2 /> {stats.contacts.total}
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline">
                                    <TrendingUp />
                                    {stats.contacts.growth}%
                                </Badge>
                            </CardAction>
                            <CardDescription className="col-span-2">
                                + {stats.contacts.last_week} from last week
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>Total Campaigns</CardDescription>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Mails /> {stats.campaigns.total}
                            </CardTitle>
                            <CardAction>
                                <Badge variant="outline">
                                    <TrendingUp />
                                    {stats.campaigns.growth}%
                                </Badge>
                            </CardAction>
                            <CardDescription className="col-span-2">
                                + {stats.campaigns.last_week} from last week
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-5">
                    <RecentCampaignsTable
                        className="xl:col-span-3"
                        campaignsData={recentCampaigns}
                    />

                    <EmailActiviryChart
                        className="xl:col-span-2"
                        emailActivityChartData={emailActivityChartData}
                        emailActivityChartConfig={emailActivityChartConfig}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
