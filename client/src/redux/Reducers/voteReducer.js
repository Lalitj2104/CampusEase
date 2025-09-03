import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const toggleVoteRequest = createAction("TOGGLE_VOTE_REQUEST");
const toggleVoteSuccess = createAction("TOGGLE_VOTE_SUCCESS");
const toggleVoteFailure = createAction("TOGGLE_VOTE_FAILURE");

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const voteReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(toggleVoteRequest, (state) => {
			state.loading = true;
		})
		.addCase(toggleVoteSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.vote = action.payload.data;
		})
		.addCase(toggleVoteFailure, (state, action) => {
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
