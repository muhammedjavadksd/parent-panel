import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChildren } from "@/hooks/useChildren";
import { useToast } from "@/hooks/use-toast";
import { useBookingUrls } from "@/hooks/useBookingUrls";
import { Child } from "@/lib/types/children";
import { Calendar, Clock, Users, Plus, Sparkles, Trophy, BookOpen, X } from "lucide-react";

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  bookingType: 'demo' | 'masterclass';
  onBookingComplete?: (childId: number, bookingType: string) => void;
}

interface NewChildData {
  name: string;
  grade: string;
  dd: string;
  mm: string;
  yy: string;
}

const BookingPopup: React.FC<BookingPopupProps> = ({
  isOpen,
  onClose,
  bookingType,
  onBookingComplete
}) => {
  const { children, selectedChild } = useChildren();
  const { toast } = useToast();
  const { bookingUrls, isLoading: isBookingUrlsLoading, error: bookingUrlsError, fetchBookingUrls, clearError } = useBookingUrls();
  const [activeTab, setActiveTab] = useState<'select' | 'add'>('select');
  const [popupSelectedChild, setPopupSelectedChild] = useState<Child | null>(null);
  const [newChildData, setNewChildData] = useState<NewChildData>({
    name: '',
    grade: '',
    dd: '',
    mm: '',
    yy: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab('select');
      // Initialize popupSelectedChild with global selectedChild when modal opens
      setPopupSelectedChild(selectedChild);
      setNewChildData({
        name: '',
        grade: '',
        dd: '',
        mm: '',
        yy: ''
      });
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Auto-select first child if available and no popupSelectedChild is set
  React.useEffect(() => {
    if (isOpen && children.length > 0 && !popupSelectedChild) {
      setPopupSelectedChild(children[0]);
    }
  }, [isOpen, children, popupSelectedChild]);

  // Fetch booking URLs when popupSelectedChild changes
  React.useEffect(() => {
    if (popupSelectedChild?.id) {
      console.log('🔍 BookingPopup: Fetching booking URLs for child:', popupSelectedChild.id);
      fetchBookingUrls(popupSelectedChild.id);
    }
  }, [popupSelectedChild?.id, fetchBookingUrls]);

  const getBookingTypeInfo = () => {
    if (bookingType === 'demo') {
      return {
        title: 'Book Demo Class',
        description: 'Experience our premium learning programs with a free trial class',
        icon: <BookOpen className="w-6 h-6 text-blue-600" />,
        color: 'blue',
        benefits: [
          '100% Free Trial Class',
          'Expert Teachers (IIT & IIM)',
          'Personalized Learning Experience',
          'No Commitment Required'
        ]
      };
    } else {
      return {
        title: 'Book Master Class',
        description: 'Advanced learning with 1:1 attention and certification',
        icon: <Trophy className="w-6 h-6 text-yellow-600" />,
        color: 'yellow',
        benefits: [
          'Advanced Content & Curriculum',
          '1:1 Personal Attention',
          'Certification on Completion',
          'Flexible Scheduling'
        ]
      };
    }
  };

  const bookingInfo = getBookingTypeInfo();

  const handleChildSelect = (child: Child) => {
    setPopupSelectedChild(child);
  };

  const handleAddNewChild = () => {
    setActiveTab('add');
  };

  const handleBackToSelect = () => {
    setActiveTab('select');
    setNewChildData({
      name: '',
      grade: '',
      dd: '',
      mm: '',
      yy: ''
    });
  };

  const validateNewChildData = (): boolean => {
    if (!newChildData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your child's name",
        variant: "destructive",
      });
      return false;
    }
    if (!newChildData.grade) {
      toast({
        title: "Error",
        description: "Please select your child's grade",
        variant: "destructive",
      });
      return false;
    }
    if (!newChildData.dd || !newChildData.mm || !newChildData.yy) {
      toast({
        title: "Error",
        description: "Please enter your child's complete date of birth",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleAddChild = () => {
    if (!validateNewChildData()) return;

    setIsSubmitting(true);

    // Mock API call - simulate adding child
    setTimeout(() => {
      const newChild: Child = {
        id: Date.now(), // Mock ID
        name: newChildData.name,
        grade: newChildData.grade,
        dd: newChildData.dd,
        mm: newChildData.mm,
        yy: newChildData.yy,
        age: new Date().getFullYear() - parseInt(newChildData.yy)
      };

      // In a real app, this would be an API call
      // For now, we'll just show a success message and proceed
      toast({
        title: "Child Added Successfully!",
        description: `${newChild.name} has been added to your family`,
      });

      // Select the newly added child
      setPopupSelectedChild(newChild);
      setActiveTab('select');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleProceedToBooking = () => {
    if (!popupSelectedChild) {
      toast({
        title: "Error",
        description: "Please select a child to proceed with booking",
        variant: "destructive",
      });
      return;
    }

    // Check if booking URLs are available
    if (isBookingUrlsLoading) {
      toast({
        title: "Loading",
        description: "Please wait while we prepare your booking...",
      });
      return;
    }

    if (bookingUrlsError) {
      toast({
        title: "Error",
        description: "Failed to load booking information. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Get the appropriate booking URL
    const bookingUrl = bookingType === 'demo' 
      ? bookingUrls?.demo_booking_url 
      : bookingUrls?.masterclass_booking_url;

    if (!bookingUrl) {
      toast({
        title: "Error",
        description: `No ${bookingType === 'demo' ? 'demo' : 'masterclass'} booking URL available for ${popupSelectedChild.name}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Open booking URL in new tab
    setTimeout(() => {
      console.log('🔍 BookingPopup: Opening booking URL:', bookingUrl);
      window.open(bookingUrl, '_blank');
      
      toast({
        title: "Booking Initiated!",
        description: `Opening ${bookingType === 'demo' ? 'demo' : 'masterclass'} booking for ${popupSelectedChild.name}`,
      });

      // Call the callback if provided - use popupSelectedChild.id
      if (onBookingComplete) {
        onBookingComplete(popupSelectedChild.id, bookingType);
      }

      // Close the modal
      onClose();
      setIsSubmitting(false);
    }, 500);
  };

  const getChildAvatar = (child: Child) => {
    if (child.age <= 3) return "👶";
    if (child.age <= 6) return "🧒";
    if (child.age <= 12) return child.name.toLowerCase().includes('boy') ? "👦" : "👧";
    return "👨‍🎓";
  };

  const gradeOptions = [
    { value: "1", label: "Grade 1" },
    { value: "2", label: "Grade 2" },
    { value: "3", label: "Grade 3" },
    { value: "4", label: "Grade 4" },
    { value: "5", label: "Grade 5" },
    { value: "6", label: "Grade 6" },
    { value: "7", label: "Grade 7" },
    { value: "8", label: "Grade 8" },
    { value: "9", label: "Grade 9" },
    { value: "10", label: "Grade 10" },
    { value: "11", label: "Grade 11" },
    { value: "12", label: "Grade 12" },
  ];

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({ value: (i + 1).toString().padStart(2, '0'), label: (i + 1).toString() }));
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString().padStart(2, '0'), label: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'long' }) }));
  const yearOptions = Array.from({ length: 20 }, (_, i) => ({ value: (2024 - i).toString(), label: (2024 - i).toString() }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-0 sm:p-6">
        <DialogHeader className="p-4 sm:p-0 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {bookingInfo.icon}
              <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-800">
                {bookingInfo.title}
              </DialogTitle>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {bookingInfo.description}
          </p>
        </DialogHeader>

        <div className="p-4 sm:p-0">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'select' | 'add')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="select" className="text-sm font-semibold">
                <Users className="w-4 h-4 mr-2" />
                Select Child
              </TabsTrigger>
              <TabsTrigger value="add" className="text-sm font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Add New Child
              </TabsTrigger>
            </TabsList>

            <TabsContent value="select" className="space-y-6">
              {/* Booking Benefits Card */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-blue-800">What's Included</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bookingInfo.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Child Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">Select a Child</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddNewChild}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Child
                  </Button>
                </div>

                {children.length === 0 ? (
                  <Card className="p-6 text-center border-2 border-dashed border-gray-300">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">No Children Added</h4>
                    <p className="text-gray-500 mb-4">Add your first child to get started with booking classes</p>
                    <Button onClick={handleAddNewChild} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Child
                    </Button>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {children.map((child) => (
                      <Card
                        key={child.id}
                        className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
                          popupSelectedChild?.id === child.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                        onClick={() => handleChildSelect(child)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{getChildAvatar(child)}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-slate-800">{child.name}</h4>
                              {selectedChild?.id === child.id && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600">Grade {child.grade} • Age {child.age}</p>
                          </div>
                          {popupSelectedChild?.id === child.id && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Error Display */}
              {bookingUrlsError && (
                <div className="pt-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <span className="text-red-700 text-sm font-medium">Failed to load booking options</span>
                    </div>
                    <p className="text-red-600 text-xs mt-1">{bookingUrlsError}</p>
                    <Button
                      onClick={() => {
                        clearError();
                        if (popupSelectedChild?.id) {
                          fetchBookingUrls(popupSelectedChild.id);
                        }
                      }}
                      variant="outline"
                      size="sm"
                      className="mt-2 text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              )}

              {/* Proceed Button */}
              {children.length > 0 && (
                <div className="pt-4">
                                    <Button
                    onClick={handleProceedToBooking}
                    disabled={!popupSelectedChild || isSubmitting || isBookingUrlsLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : isBookingUrlsLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading booking options...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span>Proceed to {bookingType === 'demo' ? 'Demo' : 'Masterclass'} Booking for {popupSelectedChild?.name}</span>
                      </div>
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="add" className="space-y-6">
              {/* Back Button */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handleBackToSelect}
                  className="text-blue-600 hover:text-blue-700"
                >
                  ← Back to Child Selection
                </Button>
              </div>

              {/* Add New Child Form */}
              <Card className="border-2 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Plus className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Add New Child</h3>
                      <p className="text-sm text-slate-600">Enter your child's details to get started</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Child Name */}
                    <div>
                      <Label htmlFor="childName" className="text-sm font-semibold text-slate-700">
                        Child's Name *
                      </Label>
                      <Input
                        id="childName"
                        value={newChildData.name}
                        onChange={(e) => setNewChildData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your child's full name"
                        className="mt-1"
                      />
                    </div>

                    {/* Grade */}
                    <div>
                      <Label htmlFor="grade" className="text-sm font-semibold text-slate-700">
                        Grade *
                      </Label>
                      <Select
                        value={newChildData.grade}
                        onValueChange={(value) => setNewChildData(prev => ({ ...prev, grade: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {gradeOptions.map((grade) => (
                            <SelectItem key={grade.value} value={grade.value}>
                              {grade.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <Label className="text-sm font-semibold text-slate-700">
                        Date of Birth *
                      </Label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <Select
                          value={newChildData.dd}
                          onValueChange={(value) => setNewChildData(prev => ({ ...prev, dd: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {dayOptions.map((day) => (
                              <SelectItem key={day.value} value={day.value}>
                                {day.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={newChildData.mm}
                          onValueChange={(value) => setNewChildData(prev => ({ ...prev, mm: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {monthOptions.map((month) => (
                              <SelectItem key={month.value} value={month.value}>
                                {month.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={newChildData.yy}
                          onValueChange={(value) => setNewChildData(prev => ({ ...prev, yy: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearOptions.map((year) => (
                              <SelectItem key={year.value} value={year.value}>
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Add Child Button */}
                  <div className="pt-6">
                    <Button
                      onClick={handleAddChild}
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Adding Child...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Plus className="w-5 h-5" />
                          <span>Add Child</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingPopup; 