import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export type emailActivityChartDataProps = {
    day: string;
    sent: number;
    failed: number;
};
type Props = {
    emailActivityChartData: emailActivityChartDataProps[];
    emailActivityChartConfig: ChartConfig;
    className?:string
};

const EmailActiviryChart = ({
    emailActivityChartData,
    emailActivityChartConfig,
    className
}: Props) => {
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle>Email Activiry</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent className=" flex-1 ">
                <ChartContainer
                    config={emailActivityChartConfig}
                    className="min-h-[200px] w-full h-full"
                >
                    <BarChart accessibilityLayer data={emailActivityChartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                            value.slice(0, 3)
                                        }
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="sent"
                            fill="var(--color-sent)"
                            radius={4}
                        />
                        <Bar
                            dataKey="failed"
                            fill="var(--color-failed)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default EmailActiviryChart;
