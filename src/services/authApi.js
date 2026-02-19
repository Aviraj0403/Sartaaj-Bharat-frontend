import Axios from '../utils/Axios';

export const login = (data) => Axios.post('/auth/login', data);

export const customRegister = async (userData) => {
  const res = await Axios.post('/auth/register', userData);
  return res.data;
};

export const registerViaGoogle = async (googleToken) => {
  const res = await Axios.post('/auth/google', { token: googleToken });
  return res.data;
};

export const registerViaPhone = async (phoneData) => {
  const res = await Axios.post('/auth/phone/request-otp', phoneData);
  return res.data;
};

export const signIn = async (credentials) => {
  const res = await Axios.post('/auth/login', credentials);
  return res.data;
};

export const logout = async () => {
  const res = await Axios.post('/auth/logout');
  return res.data;
};

export const forgotPassword = async (emailOrPhone) => {
  const res = await Axios.post('/auth/forgot-password', emailOrPhone);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await Axios.post('/auth/reset-password', data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await Axios.post('/auth/change-password', data);
  return res.data;
};

export const verifyOtp = async (otpData) => {
  const res = await Axios.post('/auth/phone/verify-otp', otpData);
  return res.data;
};

export const getProfile = async () => {
  const res = await Axios.get('/auth/profile');
  return res.data.user;
};

// Assuming updateProfile and uploadAvatar might need corresponding backend routes or using general profile update
export const updateProfile = async (updateData) => {
  const res = await Axios.patch('/auth/profile', updateData);
  return res.data;
};

export const authMe = async () => {
  const res = await Axios.get('/auth/profile'); // Using /profile as /me alternative if not exists
  return res.data;
};

export const refreshToken = async () => {
  const res = await Axios.post('/auth/refresh-token');
  return res.data;
};

// phoneAuth
export const sendPhoneOtp = async (phoneData) => {
  const res = await Axios.post('/auth/phone/request-otp', phoneData);
  return res.data;
};

export const verifyPhoneOtp = async (otpData) => {
  const res = await Axios.post('/auth/phone/verify-otp', otpData);
  return res.data;
};


