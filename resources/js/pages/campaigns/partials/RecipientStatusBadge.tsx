import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MailCheck, MailQuestion, MailX } from 'lucide-react';

const statusIcons = {
    pending: MailQuestion,
    sent: MailCheck,
    failed: MailX,
};

const statusColors = {
    pending: 'text-yellow',
    sent: 'text-green',
    failed: 'text-destructive',
};
type Props = {
    status: 'pending' | 'sent' | 'failed';
};

const RecipientStatusBadge = ({ status }: Props) => {
    const Icon = statusIcons[status];
    return (
        <Badge
            variant={'outline'}
            className={cn('capitalize', statusColors[status])}
        >
            <Icon />
            {status}
        </Badge>
    );
};

export default RecipientStatusBadge;
