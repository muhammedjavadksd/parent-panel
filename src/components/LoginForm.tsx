import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { loginSchema } from '@/lib/schemas/authSchemas';
import { LoginCredentials } from '@/lib/interface/auth';
import { useEffect } from 'react';

interface LoginFormProps {
  onSubmit: (values: LoginCredentials) => Promise<void>;
  onForgotPassword: (mobileNumber: string) => void;
  isSubmitting: boolean;
  onMobileNumberChange: (mobileNumber: string) => void; // 👈 2. Add this prop
}

// 👇 Custom inner component to watch mobile number changes
const MobileWatcher = ({ onMobileNumberChange }: { onMobileNumberChange: (val: string) => void }) => {
  const { values } = useFormikContext<LoginCredentials>();

  useEffect(() => {
    onMobileNumberChange(values.mobile_number);
  }, [values.mobile_number, onMobileNumberChange]);

  return null;
};

const LoginForm = ({ onSubmit, onForgotPassword, isSubmitting, onMobileNumberChange }: LoginFormProps) => {
  return (
    <Formik
      initialValues={{ mobile_number: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
            {({ values, setFieldValue, isSubmitting: formikSubmitting }) => {
        
        // 👇 3. This useEffect sends the number up to the parent component
        useEffect(() => {
          onMobileNumberChange(values.mobile_number);
        }, [values.mobile_number, onMobileNumberChange]);

        return (
        <Form className="space-y-4">
          {/* Hook to watch mobile number changes */}
          <MobileWatcher onMobileNumberChange={onMobileNumberChange} />

          <div>
            <Label htmlFor="mobile_number" className="text-gray-700 font-medium">
              Mobile Number
            </Label>
            <Field
              as={Input}
              id="mobile_number"
              name="mobile_number"
              type="tel"
              placeholder="Enter your mobile number"
              className="mt-1"
            />
            <ErrorMessage
              name="mobile_number"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">
              4-Digit Password
            </Label>
            <div className="mt-1">
              <InputOTP
                maxLength={4}
                value={values.password || ''}
                onChange={(value) => setFieldValue('password', value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onForgotPassword(values.mobile_number)}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || formikSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-600 text-white py-2 rounded-lg font-medium min-h-[44px]"
          >
            {isSubmitting || formikSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
