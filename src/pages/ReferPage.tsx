
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";

const ReferPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [referralForm, setReferralForm] = useState({
    friendName: "",
    countryCode: "+91",
    phoneNumber: ""
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleReferralSubmit = () => {
    if (!referralForm.friendName || !referralForm.phoneNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Referral Sent!",
      description: "Your referral has been sent successfully.",
    });
    
    setReferralForm({ friendName: "", countryCode: "+91", phoneNumber: "" });
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
        <h2 className="text-sm font-bold text-warm-orange-800 dark:text-orange-200 mb-3">Refer a Friend</h2>
        
        <Card className="premium-card p-4 rounded-xl mb-4 glass-card bg-gradient-to-br from-warm-orange-50/90 via-white/90 to-amber-glow-50/90 dark:from-slate-800/90 dark:via-slate-700/90 dark:to-slate-800/90 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg glow-orange">
          <h3 className="text-sm font-semibold text-warm-orange-800 dark:text-orange-200 mb-3">Your Referral Link</h3>
          <div className="bg-warm-orange-100/60 dark:bg-orange-900/40 p-3 rounded-lg text-xs break-all text-warm-orange-800 dark:text-orange-200 backdrop-blur-sm border border-warm-orange-200/70 dark:border-orange-500/40 shadow-sm">
            https://bambinos.live/ref/priya2024
          </div>
          <Button className="w-full mt-3 text-xs btn-premium shadow-md">
            Copy Link
          </Button>
          <Button className="w-full mt-2 text-xs bg-green-500/90 hover:bg-green-600/90 dark:bg-green-600/90 dark:hover:bg-green-700/90 text-white backdrop-blur-sm shadow-md">
            📱 Share on WhatsApp
          </Button>
        </Card>

        <Card className="premium-card p-4 rounded-xl glass-card bg-gradient-to-br from-warm-orange-50/90 via-white/90 to-amber-glow-50/90 dark:from-slate-800/90 dark:via-slate-700/90 dark:to-slate-800/90 backdrop-blur-xl border-warm-orange-200/50 dark:border-orange-400/30 shadow-lg glow-orange">
          <h3 className="text-sm font-semibold text-warm-orange-800 dark:text-orange-200 mb-3">Send Direct Referral</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="friendName" className="text-xs text-warm-orange-700 dark:text-orange-300">Friend's Name</Label>
              <Input
                id="friendName"
                value={referralForm.friendName}
                onChange={(e) => setReferralForm({...referralForm, friendName: e.target.value})}
                placeholder="Enter friend's name"
                className="text-xs bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-warm-orange-200 dark:border-orange-400/50 text-warm-orange-800 dark:text-orange-200 placeholder:text-warm-orange-500 dark:placeholder:text-orange-400 premium-focus"
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="w-20">
                <Label htmlFor="countryCode" className="text-xs text-warm-orange-700 dark:text-orange-300">Code</Label>
                <Input
                  id="countryCode"
                  value={referralForm.countryCode}
                  onChange={(e) => setReferralForm({...referralForm, countryCode: e.target.value})}
                  className="text-xs bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-warm-orange-200 dark:border-orange-400/50 text-warm-orange-800 dark:text-orange-200 premium-focus"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="phoneNumber" className="text-xs text-warm-orange-700 dark:text-orange-300">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={referralForm.phoneNumber}
                  onChange={(e) => setReferralForm({...referralForm, phoneNumber: e.target.value})}
                  placeholder="Enter phone number"
                  className="text-xs bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-warm-orange-200 dark:border-orange-400/50 text-warm-orange-800 dark:text-orange-200 placeholder:text-warm-orange-500 dark:placeholder:text-orange-400 premium-focus"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleReferralSubmit}
              className="w-full btn-premium text-xs shadow-md"
            >
              Send Referral
            </Button>
          </div>
        </Card>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ReferPage;
