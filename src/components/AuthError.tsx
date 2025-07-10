
import { ErrorMessage } from '@/components/ui/error-message';

interface AuthErrorProps {
  error: string;
}

const AuthError = ({ error }: AuthErrorProps) => {
  if (!error) return null;

  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <ErrorMessage message={error} className="mt-0" />
    </div>
  );
};

export default AuthError;
