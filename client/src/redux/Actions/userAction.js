import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

const URL = BACKEND_URL + "api/v1/user";

export const loginUser = (details) => async (dispatch) => {
	try {
		dispatch({
			type: "USER_LOGIN_REQUEST",
		});

		const { data } = await axios.post(`${URL}/login`, details, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		dispatch({
			type: "USER_LOGIN_SUCCESS",
			payload: {
				message: data.message,
				id: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "USER_LOGIN_FAILURE",
			payload: error.response?.data?.message|| "Something went wrong",
		});
	}
};

export const registerUser = (details) => async (dispatch) => {
	try {
		dispatch({
			type: "USER_REGISTER_REQUEST",
		});

		const { data } = await axios.post(`${URL}/register`, details, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		dispatch({
			type: "USER_REGISTER_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "USER_REGISTER_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const verifyRegisterOtp = (id, otp) => async (dispatch) => {
	try {
		dispatch({
			type: "REGISTER_OTP_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/verify/${id}`,
			{ otp },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			},
		);
		dispatch({
			type: "REGISTER_OTP_SUCCESS",
			payload:{
				data:data.data,
				message:data.message},
		});
	} catch (error) {
		dispatch({
			type: "REGISTER_OTP_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const resendRegisterOtp = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "RESEND_REGISTER_OTP_REQUEST",
		});

		const { data } = await axios.get(`${URL}/resend/${id}`);
		dispatch({
			type: "RESEND_REGISTER_OTP_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "RESEND_REGISTER_OTP_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const forgotUserPassword = (email) => async (dispatch) => {
	try {
		dispatch({
			type: "FORGOT_USER_PASSWORD_REQUEST",
		});
		console.log(email)
		const { data } = await axios.post(
			`${URL}/forget`,
			 {email} ,
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			},
		);
		dispatch({
			type: "FORGOT_USER_PASSWORD_SUCCESS",
			payload: {
				message: data.message,
				id: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "FORGOT_USER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const resetUserPassword = (id, otp) => async (dispatch) => {
	try {
		dispatch({
			type: "RESET_USER_PASSWORD_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/reset/${id}`,
			{ otp },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			},
		);
		dispatch({
			type: "RESET_USER_PASSWORD_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "RESET_USER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const changeUserPassword = (id, password) => async (dispatch) => {
	try {
		dispatch({
			type: "CHANGE_USER_PASSWORD_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/changepassword/${id}`,
			{ password },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			},
		);

		dispatch({
			type: "CHANGE_USER_PASSWORD_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "CHANGE_USER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const logoutUser = () => async (dispatch) => {
	try {
		dispatch({
			type: "LOGOUT_USER_REQUEST",
		});
		const { data } = await axios.post(`${URL}/logout`, {},{
			withCredentials: true,
		});
		dispatch({
			type: "LOGOUT_USER_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "LOGOUT_USER_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const updateUserProfile = (userData) => async (dispatch) => {
	try {
		dispatch({ type: "UPDATE_USER_PROFILE_REQUEST" });

		const { data } = await axios.put(
			`${URL}/update`,
			userData,
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			},
		);

		dispatch({
			type: "UPDATE_USER_PROFILE_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "UPDATE_USER_PROFILE_FAILURE",
			payload: error.response?.data?.message ,
		});
	}
};


export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch({ type: "GET_ALL_USERS_REQUEST" });

		const { data } = await axios.get(`${URL}/all`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_ALL_USERS_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_ALL_USERS_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};

export const deleteUserAccount = (id) => async (dispatch) => {
	try {
		dispatch({ type: "DELETE_USER_REQUEST" });

		const { data } = await axios.delete(`${URL}/delete/${id}`, {
			withCredentials: true,
		});

		dispatch({
			type: "DELETE_USER_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "DELETE_USER_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};

export const getUserProfile = () => async (dispatch) => {
	try {
		dispatch({ type: "GET_USER_PROFILE_REQUEST" });

		const { data } = await axios.get(`${URL}/me`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_USER_PROFILE_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_USER_PROFILE_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};
