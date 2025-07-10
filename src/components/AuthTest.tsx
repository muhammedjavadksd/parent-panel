import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AuthTest = () => {
    const { user, isAuthenticated, isLoading, error, clearError } = useAuth();

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Authentication Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <p><strong>Status:</strong> {isLoading ? 'Loading...' : isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
                    {user && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p><strong>User:</strong> {user.parent_name}</p>
                            <p><strong>Mobile:</strong> {user.mobile_number}</p>
                            <p><strong>ID:</strong> {user.id}</p>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700"><strong>Error:</strong> {error}</p>
                        <Button onClick={clearError} variant="outline" size="sm" className="mt-2">
                            Clear Error
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AuthTest; 