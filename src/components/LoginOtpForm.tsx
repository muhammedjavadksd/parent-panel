import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { loginOtpSchema, sendOtpSchema } from '@/lib/schemas/authSchemas';
import { useToast } from '@/hooks/use-toast';

interface LoginOtpFormProps {
  onSubmit: (values: { mobile_number: string; otp: string }) => Promise<void>;
  isSubmitting: boolean;
  initialMobileNumber?: string; // 👈 1. Add this prop
}

const LoginOtpForm = ({ onSubmit, isSubmitting, initialMobileNumber = '' }: LoginOtpFormProps) => {
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const { toast } = useToast();

  const handleSendOtp = async (mobileNumber: string) => {
    if (!mobileNumber) {
      toast({
        title: "Error",
        description: "Please enter a mobile number first",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement actual OTP sending when backend is ready
    setOtpSent(true);
    setMobileNumber(mobileNumber);
    toast({
      title: "OTP Sent",
      description: `OTP sent to +91${mobileNumber}`,
    });
  };

  return (
    <Formik
      initialValues={{
        mobile_number: initialMobileNumber, // 👈 2. Use the prop here
        otp: '',
      }}
      validationSchema={otpSent ? loginOtpSchema : sendOtpSchema}
      onSubmit={onSubmit}
      enableReinitialize // 👈 3. Add this to update the form when the prop changes
    >
      {({ values, setFieldValue, isSubmitting: formikSubmitting, isValid }) => (
        <Form className="space-y-4">
          <div>
            <Label htmlFor="mobile_number" className="text-gray-700 font-medium">
              Mobile Number
            </Label>
            <div className="flex gap-2 mt-1">
              <Field
                as={Input}
                id="mobile_number"
                name="mobile_number"
                type="tel"
                placeholder="Enter your mobile number"
                className="flex-1"
                disabled={otpSent}
              />
              <Button
                type="button"
                onClick={() => handleSendOtp(values.mobile_number)}
                disabled={!values.mobile_number || otpSent}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4"
              >
                {otpSent ? 'Sent' : 'Send OTP'}
              </Button>
            </div>
            <ErrorMessage
              name="mobile_number"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {otpSent && (
            <div>
              <Label htmlFor="otp" className="text-gray-700 font-medium">
                4-Digit OTP
              </Label>
              <div className="mt-1">
                <InputOTP
                  maxLength={4}
                  value={values.otp || ''}
                  onChange={(value) => setFieldValue('otp', value)}
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
                name="otp"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          )}

          {otpSent && (
            <Button
              type="submit"
              disabled={isSubmitting || formikSubmitting || !isValid}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-600 text-white py-2 rounded-lg font-medium min-h-[44px]"
            >
              {isSubmitting || formikSubmitting ? 'Signing In...' : 'Sign In with OTP'}
            </Button>
          )}

          {otpSent && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setFieldValue('otp', '');
                }}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Resend OTP
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginOtpForm; 