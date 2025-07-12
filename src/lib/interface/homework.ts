export interface HomeworkAssignment {
  classschedulebooking_id: number;
  child_id: number;
  classschedule_id: number;
  class_date: string;
  start_time: string;
  end_time: string;
  admin_class_name: string;
  category_name: string;
  submitted_hw_count: number;
  pending_hw_count: string;
  classschedule: {
    id: number;
    facultyclassschedulecurriculum: {
      id: number;
      classschedule_id: number;
      curriculumtopic_id: number;
      curriculumtopic: {
        id: number;
        curriculum_id: number;
        homework: string;
        topic: string;
      };
    };
  };
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface HomeworkPagination {
  current_page: number;
  data: HomeworkAssignment[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface HomeworkResponse {
  success: boolean;
  message: string;
  homework: HomeworkPagination;
  pending_hw_count: number;
  submitted_hw_count: number;
}

export interface HomeworkFilters {
  child_id: number;
  page?: number;
  limit?: number;
} 