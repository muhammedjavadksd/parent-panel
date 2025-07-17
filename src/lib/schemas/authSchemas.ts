import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    mobile_number: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Mobile number must contain only digits'),

    password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least 4 characters'),
});

export const loginOtpSchema = Yup.object().shape({
    mobile_number: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Mobile number must contain only digits'),

    otp: Yup.string()
        .required('OTP is required')
        .matches(/^[0-9]{4}$/, 'OTP must be 4 digits'),
});

export const sendOtpSchema = Yup.object().shape({
    mobile_number: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Mobile number must contain only digits'),

});

export const resetPasswordSchema = Yup.object().shape({
    mobile_number: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Mobile number must contain only digits'),

    otp: Yup.string()
        .required('OTP is required')
        .matches(/^[0-9]{4}$/, 'OTP must be 4 digits'),
    new_password: Yup.string()
        .required('New password is required')
        .min(4, 'Password must be at least 4 characters'),
    confirm_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('new_password')], 'Passwords must match'),
});

export const newPasswordSchema = Yup.object().shape({
    new_password: Yup.string()
        .required('New password is required')
        .matches(/^[0-9]{4}$/, 'Password must be exactly 4 digits'),
    confirm_password: Yup.string()
        .required('Confirm password is required')
        .matches(/^[0-9]{4}$/, 'Password must be exactly 4 digits')
        .oneOf([Yup.ref('new_password')], 'Passwords must match'),
});

export const otpAndPasswordSchema = Yup.object().shape({
    otp: Yup.string()
        .required('OTP is required')
        .matches(/^[0-9]{4}$/, 'OTP must be exactly 4 digits'),
    new_password: Yup.string()
        .required('New password is required')
        .matches(/^[0-9]{4}$/, 'Password must be exactly 4 digits'),
    confirm_password: Yup.string()
        .required('Confirm password is required')
        .matches(/^[0-9]{4}$/, 'Password must be exactly 4 digits')
        .oneOf([Yup.ref('new_password')], 'Passwords must match'),
}); 