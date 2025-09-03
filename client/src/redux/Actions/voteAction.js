import axios from "axios";
import { BACKEND_URL } from "../../constants/url";
import { toggleVote } from './../../../../server/controllers/VotesController';


const URL = BACKEND_URL + "api/v1/vote";

export const toggleVoteAction = (id,complaintId) => async (dispatch) => {
    try {
        dispatch({
            type: "TOGGLE_VOTE_REQUEST",
        });
        const { data } = await axios.get(`${URL}`,complaintId, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch({
            type: "TOGGLE_VOTE_SUCCESS",
            payload: { message: data.message, data: data.data },
        });
    } catch (error) {
        dispatch({
            type: "TOGGLE_VOTE_FAILURE",
            payload: error.response?.data?.message || "Something went wrong",
        });
    }
};
    
