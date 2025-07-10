import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema } from '@/lib/schemas/authSchemas';
import { useAuth } from '@/hooks/useAuth';
import { LoginCredentials } from '@/lib/interface/auth';

const Login: React.FC = () => {
    const { login, isLoading, error, clearError } = useAuth();

    const handleSubmit = async (values: LoginCredentials) => {
        clearError();
        await login(values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <Card className="w-full max-w-md p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>

                <Formik
                    initialValues={{
                        mobile_number: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
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

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Field
                                    as={Input}
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="mt-1"
                                />
                                <ErrorMessage
                                    name="password"
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
                                {isSubmitting || isLoading ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </Form>
                    )}
                </Formik>

                <div className="text-center">
                    <a
                        href="/forgot-password"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        Forgot your password?
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default Login; 