import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
    children: ReactNode;
    fallback?: ReactNode;
}

const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
        return (
            fallback || (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
                    <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </div>
            )
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    return <>{children}</>;
};

export default AuthGuard; 