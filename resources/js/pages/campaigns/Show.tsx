
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { getInitials } from '@/lib/utils';
import { dashboard } from '@/routes';
import campaigns from '@/routes/campaigns';
import { BreadcrumbItem } from '@/types';
import { Campaign } from '@/types/app';
import { Head, Link } from '@inertiajs/react';
import { List } from 'lucide-react';
import RecipientStatusBadge from './partials/RecipientStatusBadge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Campaigns',
        href: campaigns.index().url,
    },
    {
        title: 'Campaigns Details',
        href: '',
    },
];

interface Props {
    campaign: Campaign;
}
const Show = ({ campaign }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Campaign Details" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Campaign Details</h1>
                        <Link href={campaigns.index().url}>
                            <Button variant="outline">
                                <List className="mr-2 h-4 w-4" />
                                List Campaigns
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardDescription>Subject</CardDescription>
                            <CardTitle>{campaign.subject}</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <CardDescription>Message Body</CardDescription>

                            <Card className="mt-4 text-sm">
                                <CardContent
                                    dangerouslySetInnerHTML={{
                                        __html: campaign.body,
                                    }}
                                ></CardContent>
                            </Card>
                        </CardContent>
                    </Card>

                    {/* Recipients Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recipients</CardTitle>
                            <CardDescription>
                                Total: {campaign.recipients.length}
                            </CardDescription>
                        </CardHeader>

                        {/* <Separator className="" /> */}

                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <div className="rounded-md border">
                                    <div className="relative w-full">
                                        <div className="overflow-x-auto">
                                            <div className="inline-block min-w-full align-middle">
                                                <div className="overflow-hidden">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead className="pl-4">
                                                                    SL
                                                                </TableHead>
                                                                <TableHead>
                                                                    Contact
                                                                </TableHead>
                                                                <TableHead>
                                                                    Status
                                                                </TableHead>
                                                                <TableHead>
                                                                    Sent At
                                                                </TableHead>
                                                                <TableHead>
                                                                    Response
                                                                </TableHead>
                                                            </TableRow>
                                                        </TableHeader>

                                                        <TableBody>
                                                            {campaign.recipients.map(
                                                                (recipient) => (
                                                                    <TableRow>
                                                                        <TableCell className="pl-4">
                                                                            {
                                                                                recipient.id
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <div className="flex gap-1">
                                                                                {recipient.contact && (
                                                                                    <Avatar className="h-8 w-8 overflow-hidden rounded-md">
                                                                                        <AvatarImage
                                                                                            src={
                                                                                                recipient
                                                                                                    .contact
                                                                                                    ?.name
                                                                                            }
                                                                                            alt={
                                                                                                recipient
                                                                                                    .contact
                                                                                                    ?.name
                                                                                            }
                                                                                        />
                                                                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                                                            {getInitials(
                                                                                                recipient
                                                                                                    .contact
                                                                                                    ?.name,
                                                                                            )}
                                                                                        </AvatarFallback>
                                                                                    </Avatar>
                                                                                )}
                                                                                <div className="grid flex-1 text-left text-sm leading-tight">
                                                                                    <span className="font-medium">
                                                                                        {
                                                                                            recipient
                                                                                                .contact
                                                                                                ?.name
                                                                                        }
                                                                                    </span>
                                                                                    <span className="truncate text-xs text-muted-foreground">
                                                                                        {
                                                                                            recipient
                                                                                                .contact
                                                                                                ?.email
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <RecipientStatusBadge status={recipient.status}/>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {recipient.sent_at && (
                                                                                <Badge
                                                                                    variant={
                                                                                        'outline'
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        recipient.sent_at
                                                                                    }
                                                                                </Badge>
                                                                            )}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {recipient.response && (
                                                                                <Badge
                                                                                    variant={
                                                                                        'secondary'
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        recipient.response
                                                                                    }
                                                                                </Badge>
                                                                            )}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ),
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
