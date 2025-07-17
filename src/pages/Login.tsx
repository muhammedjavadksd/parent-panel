import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { LoginCredentials } from '@/lib/interface/auth';
import ForgotPassword from '@/components/ForgotPassword';
import LoginHeader from '@/components/LoginHeader';
import LoginForm from '@/components/LoginForm';
import LoginOtpForm from '@/components/LoginOtpForm';
import AuthError from '@/components/AuthError';

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [activeTab, setActiveTab] = useState('password');
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginCredentials) => {
    clearError();
    setMobileNumber(values.mobile_number);
    await login(values);
  };

  const onOtpSubmit = async (values: { mobile_number: string; otp: string }) => {
    clearError();
    // TODO: Implement OTP login when backend is ready
    console.log('OTP login:', values);
  };

  const handleForgotPassword = (currentMobileNumber: string) => {
    // Always update the mobile number state with the current value
    setMobileNumber(currentMobileNumber);
    setShowForgotPassword(true);
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex items-center justify-center p-4">
        <ForgotPassword
          onBack={() => setShowForgotPassword(false)}
          initialMobileNumber={mobileNumber}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="p-6 sm:p-8 w-full max-w-md rounded-2xl bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-lg">
        <LoginHeader />
        <AuthError error={error} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="password"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Password Login
            </TabsTrigger>
            <TabsTrigger
              value="otp"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              OTP Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <LoginForm
              onSubmit={onSubmit}
              onForgotPassword={handleForgotPassword}
              isSubmitting={isLoading}
              // 👇 Pass the state updater function down
              onMobileNumberChange={setMobileNumber}
            />
          </TabsContent>

          <TabsContent value="otp">
            <LoginOtpForm
              onSubmit={onOtpSubmit}
              isSubmitting={isLoading}
              // 👇 Pass the current mobile number state down
              initialMobileNumber={mobileNumber}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
