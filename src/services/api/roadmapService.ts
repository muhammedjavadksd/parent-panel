import axios from 'axios';

interface PastClassRoadmapRequest {
  csb_id: number | number[];
}

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

interface PastClassRoadmapResponse {
  status: string;
  message: string;
  data: PastClassRoadmapItem[];
}

// New interfaces for upcoming classes module structure
interface ModuleStructureItem {
  module_name: string;
  topic: string;
}

interface ModuleStructureResponse {
  status: string;
  message: string;
  data: ModuleStructureItem[];
}

export class RoadmapService {
  async getPastClassRoadmap(csbIds: number[]): Promise<{ status: boolean; msg: string; data?: PastClassRoadmapItem[] }> {
    try {
      const requestBody: PastClassRoadmapRequest = {
        csb_id: csbIds.length === 1 ? csbIds[0] : csbIds
      };

      const response = await axios.post<PastClassRoadmapResponse>(
        `${import.meta.env.VITE_BASE_URL}/api/roadmap/pastClassRoadmap`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.data.status === 'success') {
        return {
          status: true,
          msg: response.data.message,
          data: response.data.data
        };
      } else {
        return {
          status: false,
          msg: response.data.message || 'Failed to retrieve past class roadmap'
        };
      }
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || error.message || 'Failed to retrieve past class roadmap'
      };
    }
  }

  async getModuleStructure(): Promise<{ status: boolean; msg: string; data?: ModuleStructureItem[] }> {
    try {
      const response = await axios.get<ModuleStructureResponse>(
        `${import.meta.env.VITE_BASE_URL}/api/roadmap/getModuleStructure`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.data.status === 'success') {
        return {
          status: true,
          msg: response.data.message,
          data: response.data.data
        };
      } else {
        return {
          status: false,
          msg: response.data.message || 'Failed to retrieve module structure'
        };
      }
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || error.message || 'Failed to retrieve module structure'
      };
    }
  }
}

export const roadmapService = new RoadmapService(); 