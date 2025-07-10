import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sendOtpSchema, resetPasswordSchema } from '@/lib/schemas/authSchemas';
import { useAuth } from '@/hooks/useAuth';
import { ResetPasswordRequest } from '@/lib/interface/auth';

const ForgotPassword: React.FC = () => {
    const { sendOtp, resetPassword, isLoading, error, clearError } = useAuth();
    const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
    const [mobileNumber, setMobileNumber] = useState('');

    const handleSendOtp = async (values: { mobile_number: string }) => {
        clearError();
        const result = await sendOtp(values.mobile_number);
        if (result.status) {
            setMobileNumber(values.mobile_number);
            setStep('otp');
        }
    };

    const handleResetPassword = async (values: ResetPasswordRequest) => {
        clearError();
        await resetPassword(values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <Card className="w-full max-w-md p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {step === 'mobile' ? 'Forgot Password' : 'Reset Password'}
                    </h1>
                    <p className="text-gray-600">
                        {step === 'mobile'
                            ? 'Enter your mobile number to receive OTP'
                            : 'Enter the OTP sent to your mobile'}
                    </p>
                </div>

                {step === 'mobile' ? (
                    <Formik
                        initialValues={{ mobile_number: '' }}
                        validationSchema={sendOtpSchema}
                        onSubmit={handleSendOtp}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <Label htmlFor="mobile_number">Mobile Number</Label>
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

                                {error && (
                                    <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isLoading}
                                    className="w-full"
                                >
                                    {isSubmitting || isLoading ? 'Sending OTP...' : 'Send OTP'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <Formik
                        initialValues={{
                            mobile_number: mobileNumber,
                            otp: '',
                            new_password: '',
                            confirm_password: '',
                        }}
                        validationSchema={resetPasswordSchema}
                        onSubmit={handleResetPassword}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <Label htmlFor="otp">OTP</Label>
                                    <Field
                                        as={Input}
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        placeholder="Enter 4-digit OTP"
                                        className="mt-1"
                                    />
                                    <ErrorMessage
                                        name="otp"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="new_password">New Password</Label>
                                    <Field
                                        as={Input}
                                        id="new_password"
                                        name="new_password"
                                        type="password"
                                        placeholder="Enter new password"
                                        className="mt-1"
                                    />
                                    <ErrorMessage
                                        name="new_password"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="confirm_password">Confirm Password</Label>
                                    <Field
                                        as={Input}
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="mt-1"
                                    />
                                    <ErrorMessage
                                        name="confirm_password"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isLoading}
                                    className="w-full"
                                >
                                    {isSubmitting || isLoading ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                )}

                <div className="text-center">
                    <button
                        onClick={() => setStep('mobile')}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        Back to login
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default ForgotPassword; 