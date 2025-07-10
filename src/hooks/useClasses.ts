import { useState, useEffect, useCallback } from 'react';
import { getClassesInfo, ClassInfo } from '@/services/api/classesService';

interface UseClassesReturn {
    classInfo: ClassInfo | null;
    isLoading: boolean;
    error: string | null;
    loadClassesInfo: (childId: string) => Promise<void>;
    clearError: () => void;
}

export const useClasses = (): UseClassesReturn => {
    const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadClassesInfo = useCallback(async (childId: string) => {
        if (!childId) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await getClassesInfo(childId);
            if (response.success) {
                setClassInfo(response.data);
            } else {
                setError(response.message || 'Failed to load classes info');
            }
        } catch (err: any) {
            console.error('Error in useClasses:', err);
            setError(err?.response?.data?.message || err?.message || 'Failed to load classes info');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        classInfo,
        isLoading,
        error,
        loadClassesInfo,
        clearError,
    };
}; 