import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationProps = {
    page: number;
    setPage: (page: number) => void;
    last_page: number;
    from: number;
    to: number;
    total:number
};

const DataPagination = ({ page, setPage, last_page, from, to, total }: PaginationProps) => {
    const renderPageButton = (pageNum: number) => (
        <PaginationItem key={pageNum}>
            <PaginationLink href="#" onClick={() => setPage(pageNum)} isActive={page === pageNum}>
                {pageNum}
            </PaginationLink>
        </PaginationItem>
    );

    const renderPagination = () => {
        if (last_page <= 8) {
            return Array.from({ length: last_page }, (_, i) => renderPageButton(i + 1));
        }

        const items = [];

        // Always show first page
        items.push(renderPageButton(1));
        items.push(renderPageButton(2));

        // Calculate middle range
        let startPage = Math.max(3, page - 1);
        let endPage = Math.min(last_page - 2, page + 1);

        // Add first ellipsis if there's a gap after 1
        if (startPage > 3) {
            items.push(
                <PaginationItem key="ellipsis1">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            items.push(renderPageButton(i));
        }

        // Add last ellipsis if there's a gap before last page
        if (endPage < last_page - 2) {
            items.push(
                <PaginationItem key="ellipsis2">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Always show last page
        items.push(renderPageButton(last_page - 1));
        items.push(renderPageButton(last_page));

        return items;
    };

    return (
        <div className=' flex justify-center lg:justify-between gap-4 flex-wrap items-center'>
            <p className='text-sm text-gray-500'>Showing {from} to {to} of {total} entries</p>
            <Pagination className='mx-0 w-auto block '>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious 
                            href="#" 
                            onClick={() => setPage(page - 1)}
                            className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>

                    {renderPagination()}

                    <PaginationItem>
                        <PaginationNext 
                            href="#" 
                            onClick={() => setPage(page + 1)}
                            className={page >= last_page ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default DataPagination;
