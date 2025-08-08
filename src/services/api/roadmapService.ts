import axios from 'axios';

interface CurriculumIdAPIResponse {
  status: string;
  message: string;
  data: {
    curriculum_id: number | null;
  };
}

interface CurriculumIdResult {
  status: boolean;
  msg: string;
  curriculumId?: number;
}

interface PastClassRoadmapRequest {
  csb_id: number | number[];
  category_id: number;
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
  async getCurriculumId(childId: number, categoryId: number): Promise<CurriculumIdResult> {
    try {
      const response = await axios.get<CurriculumIdAPIResponse>(
        `${import.meta.env.VITE_BASE_URL}/api/roadmap/get-curriculum-id`,
        {
          params: {
            child_id: childId,
            category_id: categoryId,
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.data.status === 'success') {
        const cid = response.data.data?.curriculum_id ?? null;
        return {
          status: true,
          msg: response.data.message,
          curriculumId: cid === null ? undefined : cid,
        };
      }

      return {
        status: false,
        msg: response.data.message || 'Failed to retrieve curriculum id',
      };
    } catch (error: any) {
      return {
        status: false,
        msg: error.response?.data?.message || error.message || 'Failed to retrieve curriculum id',
      };
    }
  }

  async getPastClassRoadmap(csbIds: number[], categoryId: number): Promise<{ status: boolean; msg: string; data?: PastClassRoadmapItem[] }> {
    try {
      const requestBody: PastClassRoadmapRequest = {
        csb_id: csbIds.length === 1 ? csbIds[0] : csbIds,
        category_id: categoryId
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

  async getModuleStructure(curriculumId?: number): Promise<{ status: boolean; msg: string; data?: ModuleStructureItem[] }> {
    try {
      const response = await axios.get<ModuleStructureResponse>(
        `${import.meta.env.VITE_BASE_URL}/api/roadmap/getModuleStructure`,
        {
          params: curriculumId ? { curriculum_id: curriculumId } : {},
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