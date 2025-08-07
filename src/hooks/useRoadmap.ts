import { useState, useCallback } from 'react';
import { roadmapService } from '@/services/api/roadmapService';

interface PastClassRoadmapItem {
  id: number;
  csb_id: number;
  child_id: number;
  category_id: number;
  cs_id: number;
  curriculum_id: number;
  curriculum_module_name: string;
  curriculum_topic: string;
}

interface GroupedModule {
  moduleName: string;
  topics: PastClassRoadmapItem[];
}

// New interfaces for upcoming classes module structure
interface ModuleStructureItem {
  module_name: string;
  topic: string;
}

interface UpcomingModuleStructure {
  moduleName: string;
  topics: string[];
}

export const useRoadmap = () => {
  const [pastClassRoadmap, setPastClassRoadmap] = useState<PastClassRoadmapItem[]>([]);
  const [groupedModules, setGroupedModules] = useState<GroupedModule[]>([]);
  const [upcomingModuleStructure, setUpcomingModuleStructure] = useState<UpcomingModuleStructure[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPastClassRoadmap = useCallback(async (csbIds: number[]) => {
    console.log('🚀 loadPastClassRoadmap called with csbIds:', csbIds);
    
    if (!csbIds || csbIds.length === 0) {
      console.log('⚠️ No csbIds provided, clearing roadmap data');
      setPastClassRoadmap([]);
      setGroupedModules([]);
      return;
    }

    // Additional validation to ensure all csbIds are valid numbers
    const validCsbIds = csbIds.filter(id => typeof id === 'number' && !isNaN(id) && id > 0);
    if (validCsbIds.length === 0) {
      console.log('⚠️ No valid csbIds found, clearing roadmap data');
      setPastClassRoadmap([]);
      setGroupedModules([]);
      return;
    }

    if (validCsbIds.length !== csbIds.length) {
      console.log('⚠️ Some csbIds were invalid, using only valid ones:', validCsbIds);
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('📡 Making API call to pastClassRoadmap with csbIds:', validCsbIds);
      const response = await roadmapService.getPastClassRoadmap(validCsbIds);

      if (response.status && response.data) {
        setPastClassRoadmap(response.data);
        
        // Group topics by module name
        const grouped = response.data.reduce((acc: GroupedModule[], item) => {
          const existingModule = acc.find(module => module.moduleName === item.curriculum_module_name);
          
          if (existingModule) {
            existingModule.topics.push(item);
          } else {
            acc.push({
              moduleName: item.curriculum_module_name,
              topics: [item]
            });
          }
          
          return acc;
        }, []);

        setGroupedModules(grouped);
      } else {
        setError(response.msg);
        setPastClassRoadmap([]);
        setGroupedModules([]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load past class roadmap');
      setPastClassRoadmap([]);
      setGroupedModules([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadUpcomingModuleStructure = useCallback(async () => {
    console.log('🚀 loadUpcomingModuleStructure called');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('📡 Making API call to getModuleStructure');
      const response = await roadmapService.getModuleStructure();

      if (response.status && response.data) {
        // Group topics by module name
        const grouped = response.data.reduce((acc: UpcomingModuleStructure[], item) => {
          const existingModule = acc.find(module => module.moduleName === item.module_name);
          
          if (existingModule) {
            existingModule.topics.push(item.topic);
          } else {
            acc.push({
              moduleName: item.module_name,
              topics: [item.topic]
            });
          }
          
          return acc;
        }, []);

        setUpcomingModuleStructure(grouped);
        console.log('✅ Upcoming module structure loaded:', grouped);
      } else {
        setError(response.msg);
        setUpcomingModuleStructure([]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load upcoming module structure');
      setUpcomingModuleStructure([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearRoadmapData = useCallback(() => {
    console.log('🧹 Clearing roadmap data');
    setPastClassRoadmap([]);
    setGroupedModules([]);
    setUpcomingModuleStructure([]);
    setError(null);
  }, []);

  return {
    pastClassRoadmap,
    groupedModules,
    upcomingModuleStructure,
    isLoading,
    error,
    loadPastClassRoadmap,
    loadUpcomingModuleStructure,
    clearRoadmapData,
  };
}; 