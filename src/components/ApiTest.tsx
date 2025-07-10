import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { bookingService } from '@/services/bookingService';

const ApiTest = () => {
    const [testResult, setTestResult] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const testApi = async () => {
        setIsLoading(true);
        setTestResult('Testing API...');

        try {
            console.log('🔍 ApiTest: Testing API connection');
            console.log('🔍 ApiTest: Base URL:', import.meta.env.VITE_API_URL);

            // Check authentication token
            const token = localStorage.getItem('accessToken');
            console.log('🔍 ApiTest: Auth token:', token ? 'Present' : 'Missing');

            if (!token) {
                setTestResult('❌ No authentication token found. Please login first.');
                return;
            }

            const result = await bookingService.getBookings({ type: 'upcoming' });

            console.log('🔍 ApiTest: API test result:', result);

            if (result.status) {
                setTestResult(`✅ API Test Successful! Found ${result.data?.bookings?.data?.length || 0} bookings`);
            } else {
                setTestResult(`❌ API Test Failed: ${result.msg}`);
            }
        } catch (error: any) {
            console.error('🔍 ApiTest: Error:', error);
            setTestResult(`❌ API Test Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">API Test</h3>
            <Button
                onClick={testApi}
                disabled={isLoading}
                className="mb-2"
            >
                {isLoading ? 'Testing...' : 'Test API Connection'}
            </Button>
            {testResult && (
                <div className="mt-2 p-2 bg-white border rounded">
                    <pre className="text-sm">{testResult}</pre>
                </div>
            )}
        </div>
    );
};

export default ApiTest; 