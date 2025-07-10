
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <Sidebar />
      
      <div className="ml-64 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">Settings</h1>
            <p className="text-orange-700">Customize your learning experience</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-orange-50 border-0 shadow-xl">
                <h2 className="text-2xl font-bold text-orange-800 mb-6">Profile Settings</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                      Child Name
                    </label>
                    <Input defaultValue="Priya" className="rounded-xl border-orange-200 bg-white text-orange-800 focus:border-orange-400 focus:ring-orange-200" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                      Age
                    </label>
                    <Select defaultValue="8">
                      <SelectTrigger className="rounded-xl border-orange-200 bg-white text-orange-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-orange-200">
                        {[5, 6, 7, 8, 9, 10, 11, 12].map(age => (
                          <SelectItem key={age} value={age.toString()}>{age} years</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                      Grade
                    </label>
                    <Select defaultValue="3">
                      <SelectTrigger className="rounded-xl border-orange-200 bg-white text-orange-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-orange-200">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(grade => (
                          <SelectItem key={grade} value={grade.toString()}>Grade {grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                      Preferred Language
                    </label>
                    <Select defaultValue="english">
                      <SelectTrigger className="rounded-xl border-orange-200 bg-white text-orange-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-orange-200">
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="bengali">Bengali</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-lg py-3">
                    Save Profile
                  </Button>
                </div>
              </Card>
              
              <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-orange-50 border-0 shadow-xl">
                <h2 className="text-2xl font-bold text-orange-800 mb-6">Notification Settings</h2>
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div>
                      <p className="font-semibold text-orange-800">Class Reminders</p>
                      <p className="text-sm text-orange-600">Get notified before classes start</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div>
                      <p className="font-semibold text-orange-800">Homework Due</p>
                      <p className="text-sm text-orange-600">Reminders for pending homework</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div>
                      <p className="font-semibold text-orange-800">Achievement Alerts</p>
                      <p className="text-sm text-orange-600">Celebrate milestones and badges</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div>
                      <p className="font-semibold text-orange-800">Weekly Progress</p>
                      <p className="text-sm text-orange-600">Summary of learning activities</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-orange-50 border-0 shadow-xl">
                <h2 className="text-2xl font-bold text-orange-800 mb-6">Learning Preferences</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                      Difficulty Level
                    </label>
                    <Select defaultValue="intermediate">
                      <SelectTrigger className="rounded-xl border-orange-200 bg-white text-orange-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-orange-200">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                      Learning Style
                    </label>
                    <Select defaultValue="visual">
                      <SelectTrigger className="rounded-xl border-orange-200 bg-white text-orange-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-orange-200">
                        <SelectItem value="visual">Visual Learner</SelectItem>
                        <SelectItem value="auditory">Auditory Learner</SelectItem>
                        <SelectItem value="kinesthetic">Hands-on Learner</SelectItem>
                        <SelectItem value="reading">Reading/Writing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div>
                      <p className="font-semibold text-orange-800">Auto-play Next Lesson</p>
                      <p className="text-sm text-orange-600">Continue to next lesson automatically</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div>
                      <p className="font-semibold text-orange-800">Show Hints</p>
                      <p className="text-sm text-orange-600">Display helpful tips during activities</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-orange-50 border-0 shadow-xl">
                <h2 className="text-2xl font-bold text-orange-800 mb-6">Parental Controls</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-orange-700 mb-2">
                      Daily Screen Time Limit
                    </label>
                    <Select defaultValue="60">
                      <SelectTrigger className="rounded-xl border-orange-200 bg-white text-orange-800">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-orange-200">
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div>
                      <p className="font-semibold text-orange-800">Safe Chat Mode</p>
                      <p className="text-sm text-orange-600">Filter inappropriate messages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div>
                      <p className="font-semibold text-orange-800">Weekly Progress Reports</p>
                      <p className="text-sm text-orange-600">Send reports to parents</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 rounded-xl text-lg py-3">
                    Manage Parental Dashboard
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
