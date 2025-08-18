import axios from 'axios';
import { BACKEND_URL } from '../../constants/url';

const URL = BACKEND_URL + 'api/v1/complaint';

export const createComplaint = (details) => async (dispatch) => {
    try {
        dispatch({
            type: 'CREATE_COMPLAINT_REQUEST',
        });
        const { data } = await axios.post(`${URL}/create`, details, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({
            type: 'CREATE_COMPLAINT_SUCCESS',
            payload: { message: data.message, data: data.data },
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_COMPLAINT_FAILURE',
            payload: error.response?.data?.message || 'Something went wrong',
        });
    }
}

export const getAllComplaints = () => async (dispatch) => {
    try {
        dispatch({  
            type: 'GET_ALL_COMPLAINTS_REQUEST',
        });
        const { data } = await axios.get(`${URL}/all`, {
            withCredentials: true,
        });
        dispatch({ 
            type: 'GET_ALL_COMPLAINTS_SUCCESS',
            payload: { data: data.data, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: 'GET_ALL_COMPLAINTS_FAILURE',
            payload: error.response?.data?.message || 'Something went wrong',
        });
    }   
}

export const getComplaintById = (id) => async (dispatch) => {
    try {
        dispatch({  
            type: 'GET_COMPLAINT_BY_ID_REQUEST',
        });
        const { data } = await axios.get(`${URL}/${id}`, {      
            withCredentials: true,
        });
        dispatch({  
            type: 'GET_COMPLAINT_BY_ID_SUCCESS',
            payload: { data: data.data, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: 'GET_COMPLAINT_BY_ID_FAILURE',
            payload: error.response?.data?.message || 'Something went wrong',
        });
    }
}

export const getMyComplaints = () => async (dispatch) => {
    try {
        dispatch({
            type: 'GET_MY_COMPLAINTS_REQUEST',
        });
        const { data } = await axios.get(`${URL}/my`, {
            withCredentials: true,
        });
        dispatch({
            type: 'GET_MY_COMPLAINTS_SUCCESS',
            payload: { data: data.data, message: data.message },
        });
    } catch (error) {
        dispatch({
            type: 'GET_MY_COMPLAINTS_FAILURE',
            payload: error.response?.data?.message || 'Something went wrong',
        });
    }
}       

export const updateComplaint = (id, details) => async (dispatch) => {
    try {
        dispatch({
            type: 'UPDATE_COMPLAINT_REQUEST',
        });
        const { data } = await axios.put(`${URL}/update/${id}`, details, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({  
            type: 'UPDATE_COMPLAINT_SUCCESS',
            payload: { message: data.message, data: data.data },
        });
    } catch (error) {
        dispatch({
            type: 'UPDATE_COMPLAINT_FAILURE',
            payload: error.response?.data?.message || 'Something went wrong',
        });
    }
}

export const deleteComplaint = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'DELETE_COMPLAINT_REQUEST',
        });
        const { data } = await axios.delete(`${URL}/delete/${id}`, {
            withCredentials: true,
        });
        dispatch({
            type: 'DELETE_COMPLAINT_SUCCESS',
            payload: { message: data.message },
        });
    }
    catch (error) {
        dispatch({
            type: 'DELETE_COMPLAINT_FAILURE',
            payload: error.response?.data?.message || 'Something went wrong',
        });
    }
}

export const markComplaintResolved = (id,status) => async (dispatch) => {
    try {
        dispatch({
            type: 'MARK_COMPLAINT_RESOLVED_REQUEST',
        });
        const { data } = await axios.put(`${URL}/status/${id}`, {status}, {
            withCredentials: true,
        });
        dispatch({
            type: 'MARK_COMPLAINT_RESOLVED_SUCCESS',
            payload: { message: data.message, data: data.data },
        });
    } catch (error) {
        dispatch({
            type: 'MARK_COMPLAINT_RESOLVED_FAILURE',
            payload: error.response?.data?.message || 'Something went wrong',
        });
    }
}

