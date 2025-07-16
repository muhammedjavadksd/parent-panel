import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface TransactionPaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const TransactionPagination: React.FC<TransactionPaginationProps> = ({
  currentPage,
  totalPages,
  total,
  perPage,
  onPageChange,
  isLoading,
}) => {
  // Fallback if values are not numbers
  const safeCurrentPage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;
  const safePerPage = isNaN(perPage) || perPage < 1 ? 10 : perPage;
  const safeTotal = isNaN(total) || total < 0 ? 0 : total;

  const startItem = (safeCurrentPage - 1) * safePerPage + 1;
  const endItem = Math.min(safeCurrentPage * safePerPage, safeTotal);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (safeCurrentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (safeCurrentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = safeCurrentPage - 1; i <= safeCurrentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
      <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
        Showing {safeTotal === 0 ? 0 : startItem} to {safeTotal === 0 ? 0 : endItem} of {safeTotal} results
      </div>

      <div className="flex items-center justify-center space-x-1 sm:space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={safeCurrentPage === 1 || isLoading}
          className="h-8 w-8 sm:h-9 sm:w-9 p-0"
        >
          <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1 || isLoading}
          className="h-8 w-8 sm:h-9 sm:w-9 p-0"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-1 sm:px-2 text-gray-500 text-xs sm:text-sm">...</span>
            ) : (
              <Button
                variant={safeCurrentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page as number)}
                disabled={isLoading}
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm"
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage === totalPages || isLoading}
          className="h-8 w-8 sm:h-9 sm:w-9 p-0"
        >
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={safeCurrentPage === totalPages || isLoading}
          className="h-8 w-8 sm:h-9 sm:w-9 p-0"
        >
          <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TransactionPagination;
