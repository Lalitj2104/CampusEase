import axios from "axios";
import { BACKEND_URL } from "../../constants/url";


const URL = BACKEND_URL + "api/v1/response";

export const addResponseAction = (details) => async (dispatch) => {
	try {
		dispatch({
			type: "ADD_RESPONSE_REQUEST",
		});
		const { data } = await axios.post(`${URL}/add`, details, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});
		dispatch({
			type: "ADD_RESPONSE_SUCCESS",
			payload: { message: data.message, data: data.data },
		});
	} catch (error) {
		dispatch({
			type: "ADD_RESPONSE_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};

export const getResponsesByComplaintAction =(complaintId) => async (dispatch) => {
		try {
			dispatch({
				type: "GET_RESPONSES_BY_COMPLAINT_REQUEST",
			});
			const { data } = await axios.get(`${URL}/${complaintId}`, {
				withCredentials: true,
			});
			dispatch({
				type: "GET_RESPONSES_BY_COMPLAINT_SUCCESS",
				payload: { message: data.message, data: data.data },
			});
		} catch (error) {
			dispatch({
				type: "GET_RESPONSES_BY_COMPLAINT_FAILURE",
				payload: error.response?.data?.message || "Something went wrong",
			});
		}
	};
