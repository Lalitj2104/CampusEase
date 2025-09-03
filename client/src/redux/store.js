import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './Reducers/userReducer';
import { responseReducer } from './Reducers/responseReducer';
import { voteReducer } from './Reducers/voteReducer';
import { complaintReducer } from './Reducers/complaintReducer';


const store = configureStore({
    reducer:{
        user:userReducer,
        response:responseReducer,
        vote:voteReducer,
        complaint:complaintReducer
    },
});

export default store;