
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, Users } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const [childData, setChildData] = useState({
    name: "Priya",
    age: "8",
    grade: "3",
    school: "Sunshine Elementary",
    avatar: "👧"
  });

  const [parentData, setParentData] = useState({
    parentName: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    mobile: "+91 98765 43210",
    relationship: "Father"
  });
  
  const { toast } = useToast();

  const avatarOptions = ["👧", "👦", "🧒", "👶", "🦸‍♀️", "🦸‍♂️", "🎭", "🌟"];
  const relationshipOptions = ["Father", "Mother", "Guardian", "Uncle", "Aunt", "Grandparent"];

  const handleSave = () => {
    // Validation for child data
    if (!childData.name || !childData.age || !childData.grade || !childData.school) {
      toast({
        title: "Error",
        description: "Please fill in all required child information fields",
        variant: "destructive",
      });
      return;
    }

    // Validation for parent data
    if (!parentData.parentName || !parentData.email || !parentData.mobile) {
      toast({
        title: "Error", 
        description: "Please fill in all required parent information fields",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(parentData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Mobile validation (basic check for Indian mobile numbers)
    const mobileRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!mobileRegex.test(parentData.mobile.replace(/\s/g, ''))) {
      toast({
        title: "Error",
        description: "Please enter a valid mobile number",
        variant: "destructive",
      });
      return;
    }

    // Save logic would go here
    toast({
      title: "Success",
      description: "Profile updated successfully!",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="child" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="child" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Child Info</span>
            </TabsTrigger>
            <TabsTrigger value="parent" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Parent Info</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="child" className="space-y-4">
            <div>
              <Label htmlFor="name">Child Name *</Label>
              <Input
                id="name"
                value={childData.name}
                onChange={(e) => setChildData({...childData, name: e.target.value})}
                placeholder="Enter child's name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={childData.age}
                  onChange={(e) => setChildData({...childData, age: e.target.value})}
                  placeholder="Age"
                  min="3"
                  max="18"
                />
              </div>
              
              <div>
                <Label htmlFor="grade">Grade *</Label>
                <Input
                  id="grade"
                  value={childData.grade}
                  onChange={(e) => setChildData({...childData, grade: e.target.value})}
                  placeholder="Grade"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="school">School *</Label>
              <Input
                id="school"
                value={childData.school}
                onChange={(e) => setChildData({...childData, school: e.target.value})}
                placeholder="School name"
              />
            </div>
            
            <div>
              <Label htmlFor="avatar">Avatar</Label>
              <Select value={childData.avatar} onValueChange={(value) => setChildData({...childData, avatar: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {avatarOptions.map((avatar) => (
                    <SelectItem key={avatar} value={avatar}>
                      <span className="text-lg mr-2">{avatar}</span>
                      Avatar {avatarOptions.indexOf(avatar) + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="parent" className="space-y-4">
            <div>
              <Label htmlFor="parentName">Parent/Guardian Name *</Label>
              <Input
                id="parentName"
                value={parentData.parentName}
                onChange={(e) => setParentData({...parentData, parentName: e.target.value})}
                placeholder="Enter parent/guardian name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={parentData.email}
                onChange={(e) => setParentData({...parentData, email: e.target.value})}
                placeholder="parent@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                type="tel"
                value={parentData.mobile}
                onChange={(e) => setParentData({...parentData, mobile: e.target.value})}
                placeholder="+91 98765 43210"
              />
            </div>
            
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Select value={parentData.relationship} onValueChange={(value) => setParentData({...parentData, relationship: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {relationshipOptions.map((relationship) => (
                    <SelectItem key={relationship} value={relationship}>
                      {relationship}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex space-x-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
