import { configureStore, createSlice } from "@reduxjs/toolkit";

const intitialAuthState = {isAuth:false,email:''}
const authSlice=createSlice({
    name:'auth',
    initialState:intitialAuthState,
    reducers:{
        auth(state,action){
            state.isAuth=true;
            state.email=action.payload
        },
        logout(state){
            state.isAuth=false;
            state.email='';
        }
    }
})

const intitialInboxState = {inbox:[]}
const inboxSlice=createSlice({
    name:'inbox',
    initialState:intitialInboxState,
    reducers:{
        getInbox(state,action){
            state.inbox=action.payload;
        }
    }
})
const intitialSentState = {sent:[]}
const sentSlice=createSlice({
    name:'sent',
    initialState:intitialSentState,
    reducers:{
        getSent(state,action){
            state.sent=action.payload;
        }
    }
})

const store =configureStore({reducer:{'inbox':inboxSlice.reducer,'sent':sentSlice.reducer,'auth':authSlice.reducer}})


export const inboxActions=inboxSlice.actions
export const sentActions=sentSlice.actions
export const authActions=authSlice.actions


export default store;