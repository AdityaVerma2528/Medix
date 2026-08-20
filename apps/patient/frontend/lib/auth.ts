import axios from "axios";

const backendUrl = "http://localhost:5000";

const authApi = axios.create({
    baseURL: `${backendUrl}/auth`,
    withCredentials: true,
})

export interface SignupData {
    email: string;
    password: string;
    name: string;
}

export interface PasswordLoginData {
    email: string;
    password: string;
}

export interface RequestLoginOtpData {
    email: string;
}

export interface VerifyLoginOtpData {
    email: string;
    otp: string;
}

export interface ForgotPasswordRequestData {
    email: string;
}

export interface VerifyPasswordResetOtpData {
    email: string;
    otp: string;
}

export interface ResetPasswordData {
    email: string;
    otp: string;
    newPassword: string;
}

export async function signup(data: SignupData) {
    const response = await authApi.post(
        "/signup",
        data
    );

    return response.data;
}

export async function loginWithPassword(data: PasswordLoginData) {
    const response = await authApi.post(
        "/login/password",
        data
    );

    return response.data;
}

export async function requestLoginOtp(data: RequestLoginOtpData) {
    const response = await authApi.post(
        "/login/otp/request",
        data
    );

    return response.data;
}

export async function verifyLoginOtp(data: VerifyLoginOtpData) {
    const response = await authApi.post(
        "/login/otp/verify",
        data
    );

    return response.data;
}

export async function logout() {
    const response = await authApi.post(
        "/logout"
    );

    return response.data;
}

export async function requestPasswordResetOtp(
    data: ForgotPasswordRequestData
) {
    const response = await authApi.post(
        "/forgot-password/request",
        data
    );

    return response.data;
}

export async function verifyPasswordResetOtp(
    data: VerifyPasswordResetOtpData
) {
    const response = await authApi.post(
        "/forgot-password/verify",
        data
    );

    return response.data;
}

export async function resetPassword(data: ResetPasswordData) {
    const response = await authApi.post(
        "/forgot-password/reset",
        data
    );

    return response.data;
}