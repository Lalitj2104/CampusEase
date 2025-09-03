import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const addResponseRequest = createAction("ADD_RESPONSE_REQUEST");
const addResponseSuccess = createAction("ADD_RESPONSE_SUCCESS");
const addResponseFailure = createAction("ADD_RESPONSE_FAILURE");

const getResponsesByComplaintRequest = createAction(
	"GET_RESPONSES_BY_COMPLAINT_REQUEST",
);
const getResponsesByComplaintSuccess = createAction(
	"GET_RESPONSES_BY_COMPLAINT_SUCCESS",
);
const getResponsesByComplaintFailure = createAction(
	"GET_RESPONSES_BY_COMPLAINT_FAILURE",
);

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const responseReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(addResponseRequest, (state) => {
			state.loading = true;
		})
		.addCase(addResponseSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.response = action.payload.data;
		})
		.addCase(addResponseFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(getResponsesByComplaintRequest, (state) => {
			state.loading = true;
		})
		.addCase(getResponsesByComplaintSuccess, (state, action) => {
			state.loading = false;
			state.responses = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getResponsesByComplaintFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(clearError, (state) => {
			state.error = null;
		})
		.addCase(clearMessage, (state) => {
			state.message = null;
		});
});
