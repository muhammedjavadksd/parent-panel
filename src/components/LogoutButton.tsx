import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface LogoutButtonProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
    children?: React.ReactNode;
}

const LogoutButton = ({
    variant = 'outline',
    size = 'default',
    className = '',
    children
}: LogoutButtonProps) => {
    const { logout, isLoading } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleLogout}
            disabled={isLoading || isLoggingOut}
            className={className}
        >
            {(isLoading || isLoggingOut) ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
                <LogOut className="h-4 w-4 mr-2" />
            )}
            {children || 'Logout'}
        </Button>
    );
};

export default LogoutButton; 