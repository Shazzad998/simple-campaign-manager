import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DataTableProps, Filters } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { EllipsisVertical } from 'lucide-react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import DataPagination from './DataPagination';
import { DatePickerWithRange } from './DatePickerWithRange';
import TableColumnHeader from './TableColumnHeader';

const DataTable = ({
    resource,
    selected,
    setSelected,
    selectedAll,
    setSelectedAll,
    columns,
    list_route,
    bulkActions = [],
    actions = [],
}: DataTableProps) => {
    const filters = usePage().props.filters as Filters;
    const ids = usePage().props.ids as number[];
    const [search, setSearch] = useState(filters.search || '');
    const [sort_by, setSortBy] = useState(filters.sort_by);
    const [sort_direction, setSortDirection] = useState(filters.sort_direction);
    const [per_page, setPerPage] = useState(filters.per_page);
    const [page, setPage] = useState(filters.page);
    const [date, setDate] = useState<DateRange | undefined>(
        filters.from && filters.to
            ? { from: new Date(filters.from), to: new Date(filters.to) }
            : undefined,
    );
    const [from, setFrom] = useState(filters.from || '');
    const [to, setTo] = useState(filters.to || '');
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const query: Record<string, any> = {
            sort_by,
            sort_direction,
            per_page,
            page,
        };

        if (search) query.search = search;
        if (from) query.from = from;
        if (to) query.to = to;

        router.get(list_route, query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['data', 'ids'],
        });
    }, [search, sort_by, sort_direction, per_page, page, from, to]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelected(resource.data.map((item) => item.id));
        } else {
            setSelectedAll(false);
            setSelected([]);
        }
    };

    const handleSelect = (id: number) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const handleSelectAllItems = () => {
        setSelectedAll(!selectedAll);
        if (!selectedAll) {
            setSelected(ids);
        } else {
            setSelected([]);
        }
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-grow items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <DatePickerWithRange
                            date={date}
                            setDate={setDate}
                            onApply={() => {
                                setFrom(date?.from?.toISOString() || '');
                                setTo(date?.to?.toISOString() || '');
                            }}
                        />
                    </div>

                    {selected.length > 0 && (
                        <div className="flex items-center gap-3 text-gray-500">
                            {bulkActions.length > 0 && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            With Selected
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {bulkActions.map((action, index) => (
                                            <DropdownMenuItem
                                                key={index}
                                                className={action.className}
                                                onSelect={() => {
                                                    requestAnimationFrame(
                                                        () => {
                                                            action.onClick(
                                                                selected,
                                                            );
                                                        },
                                                    );
                                                }}
                                            >
                                                {action.icon}
                                                <span>{action.label}</span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{`${selected.length} Selected`}</span>
                                <a
                                    className="cursor-pointer text-sm font-medium text-foreground underline"
                                    onClick={handleSelectAllItems}
                                >
                                    {selectedAll
                                        ? 'Select none'
                                        : `Select all ${ids.length} items`}
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-nowrap">Per Page</span>
                    <Select
                        value={per_page?.toString()}
                        onValueChange={(value) => setPerPage(Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={per_page} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="rounded-md border">
                    <div className="relative w-full">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                {bulkActions.length > 0 && (
                                                    <TableHead className="w-8 text-center">
                                                        <Checkbox
                                                            checked={
                                                                selected.length >=
                                                                    resource
                                                                        .data
                                                                        .length &&
                                                                resource.data
                                                                    .length != 0
                                                            }
                                                            onCheckedChange={
                                                                handleSelectAll
                                                            }
                                                        />
                                                    </TableHead>
                                                )}

                                                {columns.map(
                                                    (column, index) => (
                                                        <Fragment key={index}>
                                                            {column.field ==
                                                            'action' ? (
                                                                <TableHead
                                                                    className="w-20 text-center"
                                                                    key={index}
                                                                >
                                                                    {
                                                                        column.title
                                                                    }
                                                                </TableHead>
                                                            ) : (
                                                                <TableHead
                                                                    key={index}
                                                                    className="whitespace-nowrap pl-4"
                                                                >
                                                                    {column.sortable !==
                                                                    false ? (
                                                                        <TableColumnHeader
                                                                            title={
                                                                                column.title
                                                                            }
                                                                            field={
                                                                                column.field
                                                                            }
                                                                            sort_by={
                                                                                sort_by
                                                                            }
                                                                            sort_direction={
                                                                                sort_direction
                                                                            }
                                                                            setSortBy={
                                                                                setSortBy
                                                                            }
                                                                            setSortDirection={
                                                                                setSortDirection
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        column.title
                                                                    )}
                                                                </TableHead>
                                                            )}
                                                        </Fragment>
                                                    ),
                                                )}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {resource.data.length > 0 ? (
                                                resource.data.map((item) => (
                                                    <TableRow key={item.id}>
                                                        {bulkActions.length >
                                                            0 && (
                                                            <TableCell className="w-8 text-center">
                                                                <Checkbox
                                                                    checked={selected.includes(
                                                                        item.id,
                                                                    )}
                                                                    onCheckedChange={() =>
                                                                        handleSelect(
                                                                            item.id,
                                                                        )
                                                                    }
                                                                />
                                                            </TableCell>
                                                        )}

                                                        {columns.map(
                                                            (column, index) => {
                                                                const rowActions =
                                                                    typeof column.actions ===
                                                                    'function'
                                                                        ? column.actions(
                                                                              item,
                                                                          )
                                                                        : [];
                                                                return (
                                                                    <Fragment key={index}>
                                                                        {column.field ==
                                                                        'action' ? (
                                                                            <>
                                                                                {rowActions.length >
                                                                                    0 && (
                                                                                    <TableCell className="w-20 text-center pl-2" key={index}>
                                                                                        <DropdownMenu>
                                                                                            <DropdownMenuTrigger
                                                                                                asChild
                                                                                            >
                                                                                                <Button
                                                                                                    variant="outline"
                                                                                                    size="icon"
                                                                                                    className="size-8"
                                                                                                >
                                                                                                    <EllipsisVertical className="size-4" />
                                                                                                </Button>
                                                                                            </DropdownMenuTrigger>
                                                                                            <DropdownMenuContent
                                                                                                side="bottom"
                                                                                                align="start"
                                                                                            >
                                                                                                {rowActions.map(
                                                                                                    (
                                                                                                        action,
                                                                                                        index,
                                                                                                    ) => (
                                                                                                        <DropdownMenuItem
                                                                                                            key={
                                                                                                                index
                                                                                                            }
                                                                                                            className={
                                                                                                                action.className
                                                                                                            }
                                                                                                            onSelect={() =>
                                                                                                                requestAnimationFrame(
                                                                                                                    () =>
                                                                                                                        action.onClick(
                                                                                                                            item,
                                                                                                                        ),
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            {
                                                                                                                action.icon
                                                                                                            }
                                                                                                            <span>
                                                                                                                {
                                                                                                                    action.label
                                                                                                                }
                                                                                                            </span>
                                                                                                        </DropdownMenuItem>
                                                                                                    ),
                                                                                                )}
                                                                                            </DropdownMenuContent>
                                                                                        </DropdownMenu>
                                                                                    </TableCell>
                                                                                )}
                                                                            </>
                                                                        ) : (
                                                                            <Fragment key={index}>
                                                                                <TableCell
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="whitespace-nowrap pl-4"
                                                                                >
                                                                                    {column.render
                                                                                        ? column.render(
                                                                                              item,
                                                                                          )
                                                                                        : item[
                                                                                              column
                                                                                                  .field
                                                                                          ]}
                                                                                </TableCell>
                                                                            </Fragment>
                                                                        )}
                                                                    </Fragment>
                                                                );
                                                            },
                                                        )}
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={
                                                            columns.length +
                                                            (actions.length
                                                                ? 2
                                                                : 1)
                                                        }
                                                        className="py-6 text-center text-muted-foreground"
                                                    >
                                                        No Data Found
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DataPagination
                    page={page ?? 1}
                    setPage={setPage}
                    last_page={resource.meta.last_page}
                    from={resource.meta.from}
                    to={resource.meta.to}
                    total={resource.meta.total}
                />
            </div>
        </>
    );
};

export default DataTable;
