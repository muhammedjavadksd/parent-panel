
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ReferFriends = () => {
  const { toast } = useToast();
  const [referralForm, setReferralForm] = useState({
    friendName: "",
    countryCode: "+91",
    phoneNumber: ""
  });

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

  const handleWhatsAppShare = () => {
    const message = `🎓 Join me on Bambinos.live for amazing online classes! Use my referral link: https://bambinos.live/ref/priya2024`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://bambinos.live/ref/priya2024");
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      <div className="ml-64 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Refer Friends</h1>
            <p className="text-blue-600">Invite your friends and earn rewards together!</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 rounded-2xl bg-white border-2 border-yellow-300 shadow-xl">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Your Referral Link</h3>
              <div className="bg-yellow-50 p-4 rounded-lg text-sm break-all text-blue-800 mb-4 border border-yellow-200">
                https://bambinos.live/ref/priya2024
              </div>
              <div className="space-y-3">
                <Button onClick={copyReferralLink} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg">
                  📋 Copy Link
                </Button>
                <Button onClick={handleWhatsAppShare} className="w-full bg-green-500 hover:bg-green-600 text-white shadow-lg">
                  📱 Share on WhatsApp
                </Button>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl bg-white border-2 border-blue-300 shadow-xl">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Send Direct Referral</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="friendName" className="text-blue-700 font-medium">Friend's Name</Label>
                  <Input
                    id="friendName"
                    value={referralForm.friendName}
                    onChange={(e) => setReferralForm({...referralForm, friendName: e.target.value})}
                    placeholder="Enter friend's name"
                    className="bg-white border-blue-200 text-blue-800 focus:ring-blue-300"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <div className="w-24">
                    <Label htmlFor="countryCode" className="text-blue-700 font-medium">Code</Label>
                    <Input
                      id="countryCode"
                      value={referralForm.countryCode}
                      onChange={(e) => setReferralForm({...referralForm, countryCode: e.target.value})}
                      className="bg-white border-blue-200 text-blue-800 focus:ring-blue-300"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="phoneNumber" className="text-blue-700 font-medium">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={referralForm.phoneNumber}
                      onChange={(e) => setReferralForm({...referralForm, phoneNumber: e.target.value})}
                      placeholder="Enter phone number"
                      className="bg-white border-blue-200 text-blue-800 focus:ring-blue-300"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleReferralSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                  Send Referral
                </Button>
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6 rounded-2xl bg-white border-2 border-yellow-300 shadow-xl">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Referral Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-xl shadow-lg border border-yellow-200">
                <div className="text-3xl mb-2">🎁</div>
                <h4 className="font-semibold text-blue-800">₹500 Bonus</h4>
                <p className="text-sm text-blue-600">For each successful referral</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl shadow-lg border border-blue-200">
                <div className="text-3xl mb-2">👥</div>
                <h4 className="font-semibold text-blue-800">Friends Get 20% Off</h4>
                <p className="text-sm text-blue-600">On their first subscription</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl shadow-lg border border-yellow-200">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-semibold text-blue-800">Unlimited Rewards</h4>
                <p className="text-sm text-blue-600">No limit on referrals</p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ReferFriends;
