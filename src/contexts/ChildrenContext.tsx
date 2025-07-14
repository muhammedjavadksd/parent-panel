import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Child, ChildrenState } from '@/lib/types/children';
import { useAuth } from '@/hooks/useAuth';
import { childrenService } from '@/services';

interface ChildrenContextType extends ChildrenState {
    fetchChildren: () => Promise<void>;
    selectChild: (child: Child | null) => void;
    clearError: () => void;
}

const ChildrenContext = createContext<ChildrenContextType | undefined>(undefined);

export const useChildren = () => {
    const context = useContext(ChildrenContext);
    if (context === undefined) {
        throw new Error('useChildren must be used within a ChildrenProvider');
    }
    return context;
};

interface ChildrenProviderProps {
    children: ReactNode;
}

export const ChildrenProvider = ({ children }: ChildrenProviderProps) => {
    const [childrenList, setChildrenList] = useState<Child[]>([]);
    const [selectedChild, setSelectedChild] = useState<Child | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    const fetchChildren = useCallback(async () => {
        console.log('🔍 ChildrenContext: fetchChildren called');

        // Check if user is authenticated
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.log('🔍 ChildrenContext: No access token found, skipping fetch');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log('🔍 ChildrenContext: Making API call to get children');
            const response = await childrenService.getChildren();
            console.log('🔍 ChildrenContext: API response:', response);

            if (response.success) {
                setChildrenList(response.children);
                console.log('🔍 ChildrenContext: Children set:', response.children);

                // If no child is selected and we have children, select the first one
                // if (!selectedChild && response.children.length > 0) {
                //     setSelectedChild(response.children[0]);
                //     console.log('🔍 ChildrenContext: First child selected:', response.children[0]);
                // }

                // Only auto-select a child on first load, not if user explicitly selected "Family" (null)
                // if (selectedChild === null && childrenList.length === 0 && response.children.length > 0) {
                //     setSelectedChild(response.children[0]);
                // }

            } else {
                setError(response.message || 'Failed to fetch children');
                console.error('🔍 ChildrenContext: API error:', response.message);
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch children';
            setError(errorMessage);
            console.error('🔍 ChildrenContext: Exception:', err);
        } finally {
            setIsLoading(false);
        }
    }, [selectedChild]);

    const selectChild = useCallback((child: Child | null) => {
        console.log('🔍 ChildrenContext: selectChild called with:', child);
        setSelectedChild(child);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Fetch children when user becomes authenticated
    useEffect(() => {
        console.log('🔍 ChildrenContext: useEffect triggered - isAuthenticated:', isAuthenticated);
        if (isAuthenticated) {
            console.log('🔍 ChildrenContext: User authenticated, fetching children');
            fetchChildren();
        } else {
            console.log('🔍 ChildrenContext: User not authenticated, clearing children');
            setChildrenList([]);
            setSelectedChild(null);
        }
    }, [isAuthenticated, fetchChildren]);

    const value: ChildrenContextType = {
        children: childrenList,
        selectedChild,
        isLoading,
        error,
        fetchChildren,
        selectChild,
        clearError
    };

    console.log('🔍 ChildrenContext: Current state:', { childrenList, selectedChild, isLoading, error });

    return (
        <ChildrenContext.Provider value={value}>
            {children}
        </ChildrenContext.Provider>
    );
}; 