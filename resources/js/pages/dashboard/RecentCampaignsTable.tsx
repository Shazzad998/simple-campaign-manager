import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import campaigns from '@/routes/campaigns';
import { CampaignListItem } from '@/types/app';
import { Link } from '@inertiajs/react';

type Props = {
    campaignsData: CampaignListItem[];
    className?: string;
};

const RecentCampaignsTable = ({ campaignsData, className }: Props) => {
    return (
        <div className={cn('flex flex-col gap-4', className)}>
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
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Recipients</TableHead>
                                            <TableHead>Success</TableHead>
                                            <TableHead>Failed</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {campaignsData.length > 0 ? (
                                            <>
                                                {campaignsData.map(
                                                    (campaign, index) => (
                                                        <TableRow>
                                                            <TableCell className="pl-4">
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Link
                                                                    href={campaigns.show(
                                                                        campaign.id,
                                                                    )}
                                                                    className="truncate font-medium"
                                                                >
                                                                    <div>
                                                                        {
                                                                            campaign.subject
                                                                        }
                                                                    </div>
                                                                    <small className="text-muted-foreground">
                                                                        {
                                                                            campaign.created_at
                                                                        }
                                                                    </small>
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant={
                                                                        'secondary'
                                                                    }
                                                                >
                                                                    {
                                                                        campaign.recipient_count
                                                                    }
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant={
                                                                        'outline'
                                                                    }
                                                                >
                                                                    {
                                                                        campaign.success_count
                                                                    }
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant={
                                                                        'outline'
                                                                    }
                                                                >
                                                                    {
                                                                        campaign.failed_count
                                                                    }
                                                                </Badge>
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </>
                                        ) : (
                                            <>
                                            <TableRow>
                                                    <TableCell
                                                        colSpan={5}
                                                        className="py-6 text-center text-muted-foreground"
                                                    >
                                                        No Data Found
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentCampaignsTable;
