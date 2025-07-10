import { AuthService } from './authService';
import ChildrenService from './childrenService';
import { SupportService } from './supportService';

// Create service instances
export const authService = new AuthService();
export const supportService = new SupportService();
export const childrenService = new ChildrenService();

// Export service classes for type definitions
export { AuthService, SupportService };