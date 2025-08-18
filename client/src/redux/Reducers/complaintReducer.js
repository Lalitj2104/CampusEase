import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const createComplaintRequest = createAction("CREATE_COMPLAINT_REQUEST");
const createComplaintSuccess = createAction("CREATE_COMPLAINT_SUCCESS");
const createComplaintFailure = createAction("CREATE_COMPLAINT_FAILURE");


const getAllComplaintsRequest = createAction("GET_ALL_COMPLAINTS_REQUEST");
const getAllComplaintsSuccess = createAction("GET_ALL_COMPLAINTS_SUCCESS");
const getAllComplaintsFailure = createAction("GET_ALL_COMPLAINTS_FAILURE"); 


const getComplaintByIdRequest = createAction("GET_COMPLAINT_BY_ID_REQUEST");
const getComplaintByIdSuccess = createAction("GET_COMPLAINT_BY_ID_SUCCESS");
const getComplaintByIdFailure = createAction("GET_COMPLAINT_BY_ID_FAILURE");

const getMyComplaintsRequest = createAction("GET_MY_COMPLAINTS_REQUEST");
const getMyComplaintsSuccess = createAction("GET_MY_COMPLAINTS_SUCCESS");
const getMyComplaintsFailure = createAction("GET_MY_COMPLAINTS_FAILURE");

const updateComplaintRequest = createAction("UPDATE_COMPLAINT_REQUEST");
const updateComplaintSuccess = createAction("UPDATE_COMPLAINT_SUCCESS");
const updateComplaintFailure = createAction("UPDATE_COMPLAINT_FAILURE");

const deleteComplaintRequest = createAction("DELETE_COMPLAINT_REQUEST");
const deleteComplaintSuccess = createAction("DELETE_COMPLAINT_SUCCESS");
const deleteComplaintFailure = createAction("DELETE_COMPLAINT_FAILURE");

const markComplaintResolvedRequest = createAction("MARK_COMPLAINT_RESOLVED_REQUEST");
const markComplaintResolvedSuccess = createAction("MARK_COMPLAINT_RESOLVED_SUCCESS");
const markComplaintResolvedFailure = createAction("MARK_COMPLAINT_RESOLVED_FAILURE");

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE"); 


export const complaintReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(createComplaintRequest,(state)=>{
            state.loading = true;
        })
        .addCase(createComplaintSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.complaint=action.payload.data;
        })
        .addCase(createComplaintFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAllComplaintsRequest, (state) => {
            state.loading = true;
        })
        .addCase(getAllComplaintsSuccess, (state, action) => {
            state.loading = false;
            state.complaints = action.payload.data;
            state.message = action.payload.message;
        })
        .addCase(getAllComplaintsFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getComplaintByIdRequest, (state) => {
            state.loading = true;
        })
        .addCase(getComplaintByIdSuccess, (state, action) => {
            state.loading = false;
            state.complaint = action.payload.data;
            state.message = action.payload.message;
        })
        .addCase(getComplaintByIdFailure, (state, action) => {
            state.loading = false;  
            state.error = action.payload;
        })
        .addCase(getMyComplaintsRequest, (state) => {
            state.loading = true;
        })
        .addCase(getMyComplaintsSuccess, (state, action) => {
            state.loading = false;
            state.myComplaints = action.payload.data;
            state.message = action.payload.message;
        })
        .addCase(getMyComplaintsFailure, (state, action) => {
            state.loading = false;  
            state.error = action.payload;
        })
        .addCase(updateComplaintRequest, (state) => {
            state.loading = true;
        })
        .addCase(updateComplaintSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.complaint = action.payload.data;
        })
        .addCase(updateComplaintFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteComplaintRequest, (state) => {
            state.loading = true;
        })
        .addCase(deleteComplaintSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(deleteComplaintFailure, (state, action) => {
            state.loading = false;  
            state.error = action.payload;
        })
        .addCase(markComplaintResolvedRequest, (state) => {
            state.loading = true;
        })
        .addCase(markComplaintResolvedSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.complaint = action.payload.data;
        })
        .addCase(markComplaintResolvedFailure, (state, action) => {
            state.loading = false;  
            state.error = action.payload;
        })
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        });
})