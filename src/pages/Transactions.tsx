import React, { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Download, FileText } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTransactions } from '@/hooks/useTransactions';
import TransactionStats from '@/components/transactions/TransactionStats';
import TransactionFilters from '@/components/transactions/TransactionFilters';
import TransactionList from '@/components/transactions/TransactionList';
import TransactionPagination from '@/components/transactions/TransactionPagination';
import { TRANSACTION_CONSTANTS } from '@/shared/constants/transactions';
import { toast } from 'sonner';

const Transactions: React.FC = () => {
  const {
    transactions,
    stats,
    pagination,
    filters,
    isLoading,
    error,
    loadTransactions,
    loadTransactionsWithPagination,
    updateFilters,
    resetFilters,
    changePage,
    clearError,
    filterTransactions,
  } = useTransactions();

  const isNoDataError = (msg: string | null) => {
    if (!msg) return false;
    return (
      msg.toLowerCase().includes('no transactions found') ||
      msg.toLowerCase().includes('no data found')
    );
  };

  useEffect(() => {
    if (error && !isNoDataError(error)) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleFiltersChange = (newFilters: any) => {
    const cleanFilters: any = {};
    if (newFilters.type && newFilters.type !== '') {
      cleanFilters.type = newFilters.type;
    }
    if (newFilters.start_date && newFilters.start_date !== '') {
      cleanFilters.start_date = newFilters.start_date;
    }
    if (newFilters.end_date && newFilters.end_date !== '') {
      cleanFilters.end_date = newFilters.end_date;
    }
    updateFilters(cleanFilters);
    filterTransactions(cleanFilters);
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  const handlePageChange = async (page: number) => {
    changePage(page);
    await loadTransactionsWithPagination(
      page,
      pagination.perPage,
      filters
    );
  };

  const handleDownloadStatement = (format: 'pdf' | 'csv') => {
    toast.info(`Downloading statement in ${format.toUpperCase()} format...`);
    // TODO: Actual download implementation
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = TRANSACTION_CONSTANTS.CURRENCY_SYMBOLS[currency as keyof typeof TRANSACTION_CONSTANTS.CURRENCY_SYMBOLS] || currency;
    return `${symbol}${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={()=> {}}/>

        <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Transactions</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your payments and wallet</p>
          </div>

          {/* Account Balance Card */}
          <Card className="p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                  <h2 className="text-base sm:text-lg font-semibold">Available Tokens</h2>
                </div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  {stats?.available_balance??0}
                  {/* {formatCurrency(stats?.available_balance ?? 0, stats?.parent_currency ?? '')} */}
                </p>
                <p className="text-blue-100 text-xs sm:text-sm">Tokens left</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs sm:text-sm px-3 sm:px-4 py-2">
                  Add Money
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs sm:text-sm px-3 sm:px-4 py-2">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Download Statement
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 sm:w-48 p-2">
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-xs sm:text-sm"
                        onClick={() => handleDownloadStatement('pdf')}
                      >
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Download PDF
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-xs sm:text-sm"
                        onClick={() => handleDownloadStatement('csv')}
                      >
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Download CSV
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </Card>

          {/* Transaction Statistics */}
          <div className="mb-4 sm:mb-6">
            {stats && <TransactionStats stats={stats} />}
          </div>

          {/* Filters */}
          <div className="mb-4 sm:mb-6">
            <TransactionFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Transaction List */}
          <div className="mb-4 sm:mb-6">
            <TransactionList
              transactions={transactions}
              isLoading={isLoading}
            />
          </div>

          {/* Pagination */}
          {transactions.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <TransactionPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                total={pagination.total}
                perPage={pagination.perPage}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Transactions;
