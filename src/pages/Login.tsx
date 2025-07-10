import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { LoginCredentials } from '@/lib/interface/auth';
import ForgotPassword from '@/components/ForgotPassword';
import LoginHeader from '@/components/LoginHeader';
import LoginForm from '@/components/LoginForm';
import AuthError from '@/components/AuthError';

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginCredentials) => {
    clearError();
    await login(values);
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex items-center justify-center p-4">
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="p-6 sm:p-8 w-full max-w-md rounded-2xl bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-lg">
        <LoginHeader />
        <AuthError error={error} />
        <LoginForm
          onSubmit={onSubmit}
          onForgotPassword={() => setShowForgotPassword(true)}
          isSubmitting={isLoading}
        />
      </Card>
    </div>
  );
};

export default Login;
