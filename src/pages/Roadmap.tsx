import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar'; // Added for consistent layout
import Header from '@/components/Header';   // Added for consistent layout
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookOpen, CheckCircle, Target, Search, Play, User, FileText, Eye, Edit, Clock, Bot, GraduationCap, ChevronDown, ChevronRight, Lock, Shield, ShieldCheck, AlertCircle, Sparkles, Star, TrendingUp, Award, Zap, Heart, Rocket, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WebsiteTour from '@/components/WebsiteTour';
// import InlineGardenProgress from '@/components/InlineGardenProgress'; // Import the progress component
import CreativeGrowthPath from '@/components/InlineGardenProgress'; // Import the aquarium progress component
import { useChildren } from '@/hooks/useChildren';
import { Child } from '@/lib/types/children';
import RoadmapToggleViewSelector from '@/components/roadmap_toogle';
import { motion } from 'framer-motion';
import { useBookings } from '@/hooks/useBookings';
import { useRoadmap } from '@/hooks/useRoadmap';

// Interfaces (ClassItem, Module) and mock data (roadmapModules) remain the same
// ... (Your existing interfaces and roadmapModules data should be here) ...
interface ClassItem {
  id: string;
  serialNo: number;
  name: string;
  focusArea: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'completed' | 'enrolled' | 'available' | 'locked';
  description: string;
  classDate: string;
  pptFile?: string;
  reasonForChange?: string;
  prerequisites?: string[];
  instructor?: string;
  rating?: number;
  studentsEnrolled?: number;
  estimatedHours?: number;
  difficultyScore?: number;
}

interface Module {
  id: string;
  name: string;
  description: string;
  designer: 'teacher' | 'auto' | 'parent';
  designer_name?: string;
  classes: ClassItem[];
  total_classes: number;
  completed_classes: number;
  enrolled_classes: number;
  status: 'active' | 'completed' | 'locked';
  created_date: string;
  approval_status: 'approved' | 'pending' | 'rejected';
  milestone: 1 | 2 | 3;
}

const Roadmap = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [reasonText, setReasonText] = useState('');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPPTDialog, setShowPPTDialog] = useState(false);
  const [showChildSelectionPopup, setShowChildSelectionPopup] = useState(false);
  const { children, selectedChild, selectChild } = useChildren();
  const [selectedPPT, setSelectedPPT] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('English');  // Default subject is English
  
  // Past classes hooks
  const { bookings, isLoading: areBookingsLoading, loadPastClasses, clearBookingData } = useBookings();
  const { groupedModules, upcomingModuleStructure, isLoading: isRoadmapLoading, error: roadmapError, loadPastClassRoadmap, loadUpcomingModuleStructure, clearRoadmapData } = useRoadmap();

  // Function to get category_id based on selected subject
  const getCategoryId = (subject: string): number => {
    switch (subject) {
      case 'English':
        return 24;
      case 'Gita':
        return 26;
      case 'Maths':
        return 34;
      default:
        return 24; // Default to English
    }
  };

  useEffect(() => {
    if (!selectedChild) {
      setShowChildSelectionPopup(true);
    }
  }, [selectedChild]);

  // Clear data when child changes to prevent stale data issues
  useEffect(() => {
    console.log('👶 Child changed, clearing booking and roadmap data');
    clearBookingData();
    clearRoadmapData();
  }, [selectedChild?.id, clearBookingData, clearRoadmapData]);

  // Load past classes data whenever a child is selected (regardless of current view)
  useEffect(() => {
    if (selectedChild) {
      console.log('📋 Loading past classes for child:', selectedChild.id);
      loadPastClasses(undefined, selectedChild.id);
    }
  }, [selectedChild, loadPastClasses]);

  // Load upcoming module structure when a child is selected (regardless of current view)
  useEffect(() => {
    if (selectedChild) {
      console.log('📋 Loading upcoming module structure for child:', selectedChild.id);
      loadUpcomingModuleStructure();
    }
  }, [selectedChild, loadUpcomingModuleStructure]);

  // Also load upcoming module structure when past classes are loaded (in case it wasn't loaded before)
  useEffect(() => {
    if (selectedChild && !areBookingsLoading && upcomingModuleStructure.length === 0) {
      console.log('📋 No upcoming module structure found, loading it now for child:', selectedChild.id);
      loadUpcomingModuleStructure();
    }
  }, [selectedChild, areBookingsLoading, upcomingModuleStructure.length, loadUpcomingModuleStructure]);

  // Load roadmap data when past classes are loaded and not loading
  useEffect(() => {
    console.log('🔄 Roadmap useEffect triggered:', {
      showUpcoming,
      areBookingsLoading,
      bookingsLength: bookings.length,
      selectedChildId: selectedChild?.id,
      selectedSubject,
      categoryId: getCategoryId(selectedSubject),
      bookings: bookings.map(b => b.schedulebooking_id)
    });
    
    if (!areBookingsLoading && selectedChild) {
      if (bookings.length > 0) {
        const csbIds = bookings.map(booking => booking.schedulebooking_id);
        const categoryId = getCategoryId(selectedSubject);
        console.log('✅ Conditions met, calling loadPastClassRoadmap with csbIds:', csbIds, 'categoryId:', categoryId);
        loadPastClassRoadmap(csbIds, categoryId);
      } else {
        console.log('⚠️ No past bookings found, clearing past roadmap data but keeping upcoming data');
        // Only clear past class data, not upcoming module structure
        // We'll handle this by calling loadPastClassRoadmap with empty array
        const categoryId = getCategoryId(selectedSubject);
        loadPastClassRoadmap([], categoryId);
      }
    } else {
      console.log('❌ Conditions not met for loadPastClassRoadmap');
    }
  }, [bookings, areBookingsLoading, selectedChild, selectedSubject, loadPastClassRoadmap]);

  const handleSelectChild = (child: Child) => {
    selectChild(child);
    setShowChildSelectionPopup(false);
  };

  // Get current date for filtering
  const currentDate = new Date();
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(currentDate);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  // Helper function to filter upcoming classes based on past attended classes
  const filterUpcomingClasses = (upcomingModules: any[], pastModules: any[]) => {
    // If no past modules, return all upcoming modules (no filtering needed)
    if (!pastModules || pastModules.length === 0) {
      console.log('📋 No past modules found, returning all upcoming modules:', upcomingModules);
      return upcomingModules;
    }
    
    // Create a set of all attended topics for quick lookup
    const attendedTopics = new Set<string>();
    const attendedModules = new Set<string>();
    
    // Collect all attended topics and modules from past classes
    pastModules.forEach(pastModule => {
      attendedModules.add(pastModule.moduleName);
      pastModule.topics.forEach((topic: any) => {
        attendedTopics.add(topic.curriculum_topic);
      });
    });

    console.log('📋 Filtering upcoming modules. Attended topics:', Array.from(attendedTopics));

    // Filter upcoming modules and their topics
    const filteredModules = upcomingModules
      .map(upcomingModule => {
        // Filter out topics that have already been attended
        const filteredTopics = upcomingModule.topics.filter((topic: string) => 
          !attendedTopics.has(topic)
        );

        console.log(`📋 Module ${upcomingModule.moduleName}: ${upcomingModule.topics.length} total topics, ${filteredTopics.length} remaining after filtering`);

        // Only include the module if it has remaining topics
        if (filteredTopics.length > 0) {
          return {
            ...upcomingModule,
            topics: filteredTopics
          };
        }
        return null; // Module will be filtered out
      })
      .filter(module => module !== null); // Remove modules with no remaining topics

    console.log('📋 Final filtered upcoming modules:', filteredModules);
    return filteredModules;
  };

  const filteredModules = useMemo(() => {
    console.log('🔄 filteredModules useMemo triggered:', {
      showUpcoming,
      groupedModulesLength: groupedModules.length,
      upcomingModuleStructureLength: upcomingModuleStructure.length,
      searchQuery
    });

    if (!showUpcoming) {
      // For past classes, use the grouped modules from API
      const pastModules = groupedModules.map((groupedModule, index) => ({
        id: `past-${index}`,
        name: groupedModule.moduleName,
        description: `Past classes for ${groupedModule.moduleName}`,
        designer: 'teacher' as const,
        designer_name: 'Past Classes',
        total_classes: groupedModule.topics.length,
        completed_classes: groupedModule.topics.length,
        enrolled_classes: 0,
        status: 'completed' as const,
        created_date: new Date().toISOString().split('T')[0],
        approval_status: 'approved' as const,
        milestone: 1 as const,
        classes: groupedModule.topics.map((topic, topicIndex) => ({
          id: `topic-${topic.id}`,
          serialNo: topicIndex + 1,
          name: topic.curriculum_topic,
          focusArea: groupedModule.moduleName,
          level: 'Beginner' as const,
          status: 'completed' as const,
          description: `Completed topic: ${topic.curriculum_topic}`,
          classDate: new Date().toISOString().split('T')[0], // We don't have actual class date from roadmap API
          instructor: 'Past Class',
        }))
      })).filter(module => {
        const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          module.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
      });

      console.log('📚 Past modules processed:', pastModules.length);
      return pastModules;
    }

    // For upcoming classes, filter based on past attended classes and use the API data
    const filteredUpcomingModules = filterUpcomingClasses(upcomingModuleStructure, groupedModules);
    
    const upcomingModules = filteredUpcomingModules.map((module, index) => ({
      id: `upcoming-${index}`,
      name: module.moduleName,
      description: `Upcoming classes for ${module.moduleName}`,
      designer: 'teacher' as const,
      designer_name: 'Upcoming Classes',
      total_classes: module.topics.length,
      completed_classes: 0,
      enrolled_classes: 0,
      status: 'active' as const,
      created_date: new Date().toISOString().split('T')[0],
      approval_status: 'approved' as const,
      milestone: 1 as const,
      classes: module.topics.map((topic, topicIndex) => ({
        id: `upcoming-topic-${index}-${topicIndex}`,
        serialNo: topicIndex + 1,
        name: topic,
        focusArea: module.moduleName,
        level: 'Beginner' as const,
        status: 'available' as const,
        description: `Upcoming topic: ${topic}`,
        classDate: new Date(Date.now() + (topicIndex + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Generate future dates
        instructor: 'Upcoming Class',
      }))
    })).filter(module => {
      const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });

    console.log('✨ Upcoming modules processed:', upcomingModules.length);
    return upcomingModules;
  }, [searchQuery, selectedStatus, showUpcoming, groupedModules, upcomingModuleStructure]);

  // ... (All your other functions like totalClasses, getDesignerIcon, handleChangeRequest, etc., remain the same) ...
  const totalClasses = 140;
  const completedClasses = groupedModules.reduce((sum, module) => sum + module.topics.length, 0);
  
  // Calculate upcoming classes based on filtered data (excluding already attended topics)
  const filteredUpcomingModules = filterUpcomingClasses(upcomingModuleStructure, groupedModules);
  const upcomingClasses = filteredUpcomingModules.reduce((sum, module) => sum + module.topics.length, 0);
  
  console.log('📊 Stats calculation:', {
    totalClasses,
    completedClasses,
    upcomingClasses,
    filteredUpcomingModulesLength: filteredUpcomingModules.length,
    upcomingModuleStructureLength: upcomingModuleStructure.length,
    groupedModulesLength: groupedModules.length
  });
  
  const enrolledClasses = showUpcoming ? upcomingClasses : 0; // No static roadmapModules data anymore

  const getDesignerIcon = (designer: string) => {
    switch (designer) {
      case 'teacher': return <User className="w-4 h-4" />;
      case 'auto': return <Bot className="w-4 h-4" />;
      case 'parent': return <GraduationCap className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getApprovalBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-50 text-green-700 border-green-200">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Approved
        </Badge>;
      case 'pending':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">
          <Clock className="w-3 h-3 mr-1" />
          Pending Review
        </Badge>;
      case 'rejected':
        return <Badge className="bg-red-50 text-red-700 border-red-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>;
      default:
        return null;
    }
  };

  const handleModuleSelect = (moduleId: string) => {
    if (!showUpcoming) {
      toast({
        title: "Cannot modify past classes",
        description: "You can only request changes for upcoming classes",
        variant: "destructive"
      });
      return;
    }

    setSelectedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleChangeRequest = () => {
    if (selectedModules.length === 0) {
      toast({
        title: "No modules selected",
        description: "Please select modules to request changes",
        variant: "destructive"
      });
      return;
    }

    if (!showUpcoming) {
      toast({
        title: "Cannot modify past classes",
        description: "You can only request changes for upcoming classes",
        variant: "destructive"
      });
      return;
    }

    setShowReasonDialog(true);
  };

  const handleSubmitReason = () => {
    const moduleCount = selectedModules.length;

    setTimeout(() => {
      toast({
        title: `Request Submitted! 📝`,
        description: `Module change request sent for ${moduleCount} module(s)${reasonText ? ' with your reason' : ''}. You'll receive confirmation within 24 hours.`,
      });
    }, 500);

    setSelectedModules([]);
    setShowReasonDialog(false);
    setReasonText('');
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handlePPTView = (pptFile: string) => {
    setSelectedPPT(pptFile);
    setShowPPTDialog(true);
  };

  // Enhanced Learning Journey Map Component
  const LearningJourneyMap = () => {
    const overallProgress = Math.round((completedClasses / totalClasses) * 100);

    return (
      <div className="relative p-3 bg-gradient-to-br from-blue-50/80 via-white/60 to-blue-50/80 rounded-2xl border border-blue-200/50 shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-blue-100/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-200/20 to-blue-100/10 rounded-full blur-lg"></div>

        <div className="relative z-10">
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Learning Journey
                </h3>
                <p className="text-blue-600/80 font-medium text-sm">Your Path to Excellence</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
            {/* Rocket Progress Animation */}

            

            <CreativeGrowthPath progress={showUpcoming ? Math.round((upcomingClasses / totalClasses) * 100) || 0 : Math.round((completedClasses / totalClasses) * 100) || 0} />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-white/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-green-100 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-semibold text-green-700 text-sm">Completed </span>
                </div>
                <div className="text-2xl font-bold text-green-600">{completedClasses}</div>
                <div className="text-xs text-green-600/70">Classes finished</div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-white/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Play className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-blue-700 text-sm">{showUpcoming ? 'Upcoming' : 'Active'}</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{enrolledClasses}</div>
                <div className="text-xs text-blue-600/70">
                  {showUpcoming ? 'Available classes' : 'Currently enrolled'}
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-white/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-purple-100 rounded-lg">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="font-semibold text-purple-700 text-sm">Available</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {showUpcoming ? (totalClasses - upcomingClasses) : (totalClasses - completedClasses - enrolledClasses)}
                </div>
                <div className="text-xs text-purple-600/70">
                  {showUpcoming ? 'Future modules' : 'Ready to start'}
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-white/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-blue-700 text-sm">Total</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{totalClasses}</div>
                <div className="text-xs text-blue-600/70">Learning goals</div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    );
  };

  const SelectChildPopup = () => (
    <Dialog open={showChildSelectionPopup} onOpenChange={setShowChildSelectionPopup}>
      <DialogContent className="sm:max-w-md rounded-2xl border-2 border-blue-200/50 shadow-xl bg-gradient-to-br from-white via-blue-50/30 to-blue-50/20 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Please Select a Child
          </DialogTitle>
          <DialogDescription className="text-blue-600 font-medium mt-2">
            To view the roadmap, please select a child from the list below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {children.map((child) => (
            <div
              key={child.id}
              className="flex items-center p-4 rounded-xl border-2 border-blue-200/60 bg-white/80 backdrop-blur-sm cursor-pointer hover:bg-blue-100/50"
              onClick={() => handleSelectChild(child)}
            >
              <div className="text-2xl mr-4">{child.name.charAt(0)}</div>
              <div>
                <p className="font-bold text-blue-800">{child.name}</p>
                <p className="text-sm text-blue-600">Grade: {child.grade}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={() => window.dispatchEvent(new Event('startTour'))} />
        <main className="flex-1 p-2 sm:p-3 lg:p-4 md:p-4 bg-gradient-to-br from-blue-50/30 via-white/20 to-blue-50/30">
          <SelectChildPopup />
          <div className="max-w-7xl mx-auto w-full space-y-4">
            <div className="relative flex items-center justify-center min-h-[44px] px-4 sm:px-6">

              <div className="text-center">
                <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 bg-clip-text text-transparent mb-1">
                  Course Roadmap
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-blue-500" />
                  <p className="text-blue-600/80 font-medium text-sm">Premium Learning Experience</p>
                  <Zap className="w-4 h-4 text-blue-500" />
                </div>
              </div>

              <div className="absolute right-4 sm:right-6">
                <RoadmapToggleViewSelector selectedSubject={selectedSubject} onSubjectChange={setSelectedSubject} />
              </div>

            </div>

            {/* Learning Journey Map */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <LearningJourneyMap />
            </Card>


            {/* Toggle Switch */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-white/80 via-blue-50/60 to-white/40 border-2 border-blue-200/50 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-center">
                {/* The container for the toggle buttons. It needs to be 'relative' for the animation to work. */}
                <div className="relative flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full p-2 border-2 border-blue-200/50 shadow-md">

                  {/* --- Upcoming Classes Button --- */}
                  <button
                    onClick={() => setShowUpcoming(true)}
                    className="relative px-4 py-2 text-sm font-bold transition-colors duration-300 focus:outline-none"
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${showUpcoming ? 'text-white' : 'text-blue-700 hover:text-blue-800'}`}>
                      ✨ Upcoming Classes
                    </span>
                    {showUpcoming && (
                      <motion.div
                        layoutId="active-toggle-highlight"
                        className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </button>

                  {/* --- Past Classes Button --- */}
                  <button
                    onClick={() => setShowUpcoming(false)}
                    className="relative px-4 py-2 text-sm font-bold transition-colors duration-300 focus:outline-none"
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${!showUpcoming ? 'text-white' : 'text-blue-700 hover:text-blue-800'}`}>
                      📚 Past Classes
                    </span>
                    {!showUpcoming && (
                      <motion.div
                        layoutId="active-toggle-highlight"
                        className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </button>

                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <Card className="p-3 rounded-2xl bg-gradient-to-r from-white/80 via-blue-50/40 to-white/30 border-2 border-blue-200/50 shadow-lg backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative sm:col-span-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                  <Input
                    placeholder="Search your learning modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-10 rounded-xl border-2 border-blue-200/60 bg-white/80 backdrop-blur-sm focus:ring-4 focus:ring-blue-200/50 focus:border-blue-400 transition-all duration-300 font-medium shadow-md"
                  />
                </div>

                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 h-10 border-2 border-blue-200/60 rounded-xl bg-white/80 backdrop-blur-sm text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200/50 focus:border-blue-400 transition-all duration-300 font-semibold shadow-md"
                >
                  <option value="all">🎯 All Levels</option>
                  <option value="Beginner">🌱 Beginner</option>
                  <option value="Intermediate">🚀 Intermediate</option>
                  <option value="Advanced">⭐ Advanced</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 h-10 border-2 border-blue-200/60 rounded-xl bg-white/80 backdrop-blur-sm text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200/50 focus:border-blue-400 transition-all duration-300 font-semibold shadow-md"
                >
                  <option value="all">📊 All Status</option>
                  <option value="completed">✅ Completed</option>
                  <option value="enrolled">🎓 Enrolled</option>
                  <option value="available">✨ Available</option>
                  <option value="locked">🔒 Locked</option>
                </select>
              </div>
            </Card>

            {/* ... (Rest of your component JSX, including the table and dialogs) ... */}
            {selectedModules.length > 0 && showUpcoming && (
              <Card className="p-3 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/40 border-2 border-blue-200/50 shadow-lg backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                      <Edit className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-blue-800 font-bold">
                        🎯 {selectedModules.length} module(s) selected
                      </p>
                      <p className="text-blue-600/80 text-xs">Ready for modification request</p>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                      onClick={handleChangeRequest}
                      size="lg"
                      className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-4 py-2 font-bold hover:scale-105"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Request Changes ✨
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Classes Table */}
            <Card className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-blue-200/50 shadow-lg">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      {showUpcoming ? '🌟 Upcoming' : '📖 Past'} Classes
                    </h2>
                    <p className="text-blue-600/80 font-medium text-sm">
                      {showUpcoming
                        ? 'Discover your learning path ahead. Select modules to request changes.'
                        : 'Review your learning journey and achievements.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {(showUpcoming ? isRoadmapLoading : (areBookingsLoading || isRoadmapLoading)) && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                  <span className="text-blue-600 font-medium">
                    {showUpcoming 
                      ? 'Loading upcoming module structure...' 
                      : (areBookingsLoading ? 'Loading past classes...' : 'Loading past classes roadmap...')
                    }
                  </span>
                </div>
              )}

              {/* Error State */}
              {roadmapError && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <p className="text-red-600 font-medium mb-2">
                    Error loading {showUpcoming ? 'upcoming' : 'past'} classes roadmap
                  </p>
                  <p className="text-red-500 text-sm">{roadmapError}</p>
                </div>
              )}

              {/* No Data State */}
              {!isRoadmapLoading && !roadmapError && filteredModules.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    {showUpcoming 
                      ? 'No upcoming classes available yet' 
                      : 'No past classes found'
                    }
                  </p>
                  <p className="text-gray-500 text-sm">
                    {showUpcoming 
                      ? 'Module structure will appear here once available. Contact your teacher for more information.' 
                      : 'Complete some classes to see your learning roadmap'
                    }
                  </p>
                  {showUpcoming && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-blue-700 text-sm">
                        💡 <strong>Tip:</strong> If you're expecting to see upcoming classes, please check with your teacher or administrator.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Table - Only show when there's data and not in loading/error states */}
              {!isRoadmapLoading && !roadmapError && filteredModules.length > 0 && (
                <div className="overflow-x-auto rounded-xl border-2 border-blue-100/50">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-blue-200/50 bg-gradient-to-r from-blue-50/80 to-blue-50/40 hover:from-blue-100/60 hover:to-blue-100/40">
                        <TableHead className="w-16 font-bold text-blue-700 py-3">
                          {showUpcoming ? '✅' : ''}
                        </TableHead>
                        <TableHead className="w-20 font-bold text-blue-700">📋 S.No</TableHead>
                        <TableHead className="min-w-[180px] font-bold text-blue-700">📚 Module</TableHead>
                        <TableHead className="min-w-[220px] font-bold text-blue-700">🎯 Title</TableHead>
                        <TableHead className="min-w-[200px] font-bold text-blue-700">🔍 Focus Area</TableHead>
                        {!showUpcoming && <TableHead className="w-32 font-bold text-blue-700">✅ Approval</TableHead>}
                        {!showUpcoming && <TableHead className="w-32 font-bold text-blue-700">📄 Document</TableHead>}
                        <TableHead className="w-36 font-bold text-blue-700">📅 Class Date</TableHead>
                        {!showUpcoming && <TableHead className="min-w-[220px] font-bold text-blue-700">💭 Reason for Change</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredModules.map((module) => (
                        <React.Fragment key={module.id}>
                          {/* Module Header Row */}
                          <TableRow className="bg-gradient-to-r from-blue-50/60 via-blue-50/40 to-blue-50/30 border-b-2 border-blue-200/30 hover:from-blue-100/50 hover:via-blue-100/40 hover:to-blue-100/30 transition-all duration-300">
                            <TableCell>
                              {showUpcoming && (
                                <input
                                  type="checkbox"
                                  checked={selectedModules.includes(module.id)}
                                  onChange={() => handleModuleSelect(module.id)}
                                  className="w-4 h-4 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-200 focus:ring-4 transition-all scale-110"
                                />
                              )}
                            </TableCell>
                            <TableCell colSpan={showUpcoming ? 6 : 8}>
                              <Collapsible>
                                <CollapsibleTrigger
                                  onClick={() => toggleModuleExpansion(module.id)}
                                  className="flex items-center gap-3 w-full text-left hover:bg-blue-100/60 p-2 rounded-xl transition-all duration-300 group"
                                >
                                  <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-md">
                                    {expandedModules.includes(module.id) ?
                                      <ChevronDown className="w-4 h-4 text-white" /> :
                                      <ChevronRight className="w-4 h-4 text-white" />
                                    }
                                  </div>
                                  <div className="flex items-center gap-4 flex-wrap">
                                    <Badge className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border-2 border-blue-200 rounded-xl px-3 py-1 font-bold shadow-md">
                                      ✨ {module.name}
                                    </Badge>
                                    <div className="flex items-center gap-2">
                                      <div className="p-1.5 bg-white/80 rounded-lg shadow-sm">
                                        {getDesignerIcon(module.designer)}
                                      </div>
                                      <span className="text-blue-700 font-semibold text-sm">
                                        Designed by {module.designer_name || module.designer}
                                      </span>
                                    </div>
                                    {showUpcoming && getApprovalBadge(module.approval_status)}
                                  </div>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                  {expandedModules.includes(module.id) && module.classes.map((classItem) => (
                                    <TableRow key={classItem.id} className="border-b border-blue-100/50 hover:bg-blue-50/40 transition-all duration-300">
                                      <TableCell></TableCell>
                                      <TableCell className="font-bold text-blue-700">{classItem.serialNo}</TableCell>
                                      <TableCell>
                                        <Badge className="bg-blue-100/80 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold shadow-sm">
                                          {module.name}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="font-bold text-blue-800">{classItem.name}</TableCell>
                                      <TableCell className="text-blue-600 font-semibold">{classItem.focusArea}</TableCell>
                                      {!showUpcoming && (
                                        <TableCell>
                                          {classItem.reasonForChange ? getApprovalBadge(module.approval_status) : '—'}
                                        </TableCell>
                                      )}
                                      {!showUpcoming && (
                                        <TableCell>
                                          <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-blue-100 rounded-lg shadow-sm">
                                              <FileText className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="p-2 h-auto hover:bg-blue-100 rounded-lg transition-all duration-300 font-semibold text-xs"
                                              onClick={() => handlePPTView(classItem.pptFile || '')}
                                            >
                                              <Eye className="w-3 h-3 mr-1" />
                                              View PPT
                                            </Button>
                                          </div>
                                        </TableCell>
                                      )}
                                      <TableCell className="font-semibold text-blue-700">
                                        {new Date(classItem.classDate).toLocaleDateString()}
                                      </TableCell>
                                      {!showUpcoming && (
                                        <TableCell className="text-blue-600 italic font-medium">
                                          {classItem.reasonForChange || '—'}
                                        </TableCell>
                                      )}
                                    </TableRow>
                                  ))}
                                </CollapsibleContent>
                              </Collapsible>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>

            <Dialog open={showReasonDialog} onOpenChange={setShowReasonDialog}>
              {/* Dialog Content remains the same */}
              <DialogContent className="sm:max-w-md rounded-2xl border-2 border-blue-200/50 shadow-xl bg-gradient-to-br from-white via-blue-50/30 to-blue-50/20 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    ✨ Request Module Change
                  </DialogTitle>
                  <DialogDescription className="text-blue-600 font-medium mt-2">
                    Share your thoughts! Help our team understand your needs better by providing a reason for your module change request.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Textarea
                    placeholder="Tell us why you'd like to modify these modules... 💭"
                    value={reasonText}
                    onChange={(e) => setReasonText(e.target.value)}
                    className="min-h-[120px] rounded-xl border-2 border-blue-200/60 bg-white/80 backdrop-blur-sm focus:ring-4 focus:ring-blue-200/50 focus:border-blue-400 transition-all duration-300 resize-none font-medium"
                  />
                </div>
                <DialogFooter className="gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowReasonDialog(false)}
                    className="rounded-xl border-2 border-blue-200 hover:bg-blue-50 transition-all duration-300 font-semibold px-4 py-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitReason}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-bold px-6 py-2 hover:scale-105"
                  >
                    ✨ Submit Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showPPTDialog} onOpenChange={setShowPPTDialog}>
              {/* Dialog Content remains the same */}
              <DialogContent className="sm:max-w-4xl rounded-2xl border-2 border-blue-200/50 shadow-xl bg-gradient-to-br from-white via-blue-50/20 to-blue-50/10 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    📖 Class Presentation
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="w-full aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200/50 flex items-center justify-center shadow-md">
                    <div className="text-center text-blue-600">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl inline-block mb-4 shadow-md">
                        <FileText className="w-12 h-12 text-white" />
                      </div>
                      <p className="font-bold text-lg mb-2">📚 PPT Preview</p>
                      <p className="font-medium bg-white/60 px-3 py-1.5 rounded-lg border border-blue-200/50">
                        File: {selectedPPT}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>

      {/* Website Tour */}
      <WebsiteTour />
    </div>
  );
};

export default Roadmap;