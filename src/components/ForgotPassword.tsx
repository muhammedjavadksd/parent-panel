import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sendOtpSchema, otpAndPasswordSchema } from '@/lib/schemas/authSchemas';
import { useAuth } from '@/hooks/useAuth';
import { ResetPasswordRequest } from '@/lib/interface/auth';

interface ForgotPasswordProps {
    onBack: () => void;
}

const ForgotPassword = ({ onBack }: ForgotPasswordProps) => {
    const [step, setStep] = useState<'mobile' | 'otpAndPassword'>('mobile');
    const [mobileNumber, setMobileNumber] = useState('');
    const { sendOtp, resetPassword, isLoading, error, clearError } = useAuth();

    const handleSendOtp = async (values: { mobile_number: string }) => {
        clearError();
        const result = await sendOtp(values.mobile_number);

        if (result.status) {
            setMobileNumber(values.mobile_number);
            setStep('otpAndPassword');
        }
    };

    const handleOtpAndPasswordReset = async (values: { otp: string; new_password: string; confirm_password: string }) => {
        clearError();
        console.log('OTP and password reset values:', values);
        console.log('Mobile number:', mobileNumber);

        const result = await resetPassword({
            mobile_number: mobileNumber,
            otp: values.otp,
            new_password: values.new_password
        });

        console.log('Reset password result:', result);

        if (result.status) {
            // Password reset successful, user is now logged in
            // The useAuth hook will handle navigation
        }
    };

    const handleResendOtp = async () => {
        clearError();
        const result = await sendOtp(mobileNumber);
        if (result.status) {
            // Show success message
        }
    };

    const handleBack = () => {
        clearError();
        if (step === 'otpAndPassword') {
            setStep('mobile');
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-center text-xl font-semibold text-gray-800">
                    {step === 'mobile' && 'Forgot Password'}
                    {step === 'otpAndPassword' && 'Enter OTP & Set New Password'}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {step === 'mobile' && (
                    <Formik
                        initialValues={{ mobile_number: '' }}
                        validationSchema={sendOtpSchema}
                        onSubmit={handleSendOtp}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
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

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onBack}
                                        className="flex-1"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isLoading || isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                                    >
                                        {isLoading || isSubmitting ? 'Sending...' : 'Send OTP'}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}

                {step === 'otpAndPassword' && (
                    <Formik
                        initialValues={{ otp: '', new_password: '', confirm_password: '' }}
                        validationSchema={otpAndPasswordSchema}
                        onSubmit={handleOtpAndPasswordReset}
                    >
                        {({ values, setFieldValue, isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <Label className="text-gray-700 font-medium">
                                        Enter 4-digit OTP sent to {mobileNumber}
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

                                <div>
                                    <Label htmlFor="new_password" className="text-gray-700 font-medium">
                                        New 4-Digit Password
                                    </Label>
                                    <div className="mt-1">
                                        <InputOTP
                                            maxLength={4}
                                            value={values.new_password || ''}
                                            onChange={(value) => setFieldValue('new_password', value)}
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
                                        name="new_password"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="confirm_password" className="text-gray-700 font-medium">
                                        Confirm 4-Digit Password
                                    </Label>
                                    <div className="mt-1">
                                        <InputOTP
                                            maxLength={4}
                                            value={values.confirm_password || ''}
                                            onChange={(value) => setFieldValue('confirm_password', value)}
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
                                        name="confirm_password"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                                        disabled={isLoading}
                                    >
                                        Resend OTP
                                    </button>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleBack}
                                        className="flex-1"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isLoading || isSubmitting || values.otp.length !== 4 || values.new_password.length !== 4 || values.confirm_password.length !== 4}
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                                    >
                                        {isLoading || isSubmitting ? 'Resetting...' : 'Reset Password'}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </CardContent>
        </Card>
    );
};

export default ForgotPassword; 