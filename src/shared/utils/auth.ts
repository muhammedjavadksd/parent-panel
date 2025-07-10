export const generateOtp = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

export const validateMobileNumber = (mobile: string): boolean => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 4;
}; 