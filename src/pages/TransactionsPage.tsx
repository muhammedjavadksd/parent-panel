
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";

const transactions = [
  { type: "Payment", amount: "₹2,500", date: "Jun 20", status: "Completed", id: "TXN001" },
  { type: "Refund", amount: "₹500", date: "Jun 18", status: "Processed", id: "TXN002" },
  { type: "Payment", amount: "₹1,800", date: "Jun 15", status: "Completed", id: "TXN003" },
];

const TransactionsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen app-gradient from-warm-orange-50/90 via-amber-glow-50/90 to-warm-orange-100/90 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20">
      <MobileHeader />
      
      <main className="pt-16 px-4">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          className="mb-3 text-xs premium-focus bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl border-white/20 dark:border-slate-600/50 text-warm-orange-800 dark:text-orange-200 hover:bg-warm-orange-50/20 dark:hover:bg-slate-700/50"
        >
          <ArrowLeft className="w-3 h-3 mr-1" />
          Back
        </Button>
        <h2 className="text-sm font-bold text-warm-orange-800 dark:text-orange-200 mb-3">Transactions</h2>
        
        <Card className="premium-card p-4 rounded-xl mb-4 glass-card bg-gradient-to-br from-warm-orange-50/90 via-white/90 to-amber-glow-50/90 dark:from-slate-800/90 dark:via-slate-700/90 dark:to-slate-800/90 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg glow-orange">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-warm-orange-800 dark:text-orange-200">Account Balance</h3>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">₹1,250</p>
          </div>
          <div className="flex space-x-2">
            <Button className="flex-1 btn-premium text-xs shadow-md">
              <Plus className="w-3 h-3 mr-1" />
              Add Balance
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 text-xs bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-warm-orange-200 dark:border-orange-400/50 text-warm-orange-700 dark:text-orange-300 hover:bg-warm-orange-50/70 dark:hover:bg-slate-600/50 premium-focus shadow-sm"
            >
              📄 Download Statement
            </Button>
          </div>
        </Card>

        <div>
          <h3 className="text-xs font-semibold text-warm-orange-700 dark:text-orange-300 mb-2">Transaction History</h3>
          <div className="space-y-2">
            {transactions.map((transaction, index) => (
              <Card key={index} className="premium-card p-3 rounded-xl glass-card bg-gradient-to-br from-warm-orange-50/90 via-white/90 to-amber-glow-50/90 dark:from-slate-800/90 dark:via-slate-700/90 dark:to-slate-800/90 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg glow-orange">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-warm-orange-800 dark:text-orange-200">{transaction.type}</p>
                    <p className="text-xs text-warm-orange-600 dark:text-orange-300">{transaction.date} • {transaction.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-warm-orange-800 dark:text-orange-200">{transaction.amount}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">{transaction.status}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default TransactionsPage;
