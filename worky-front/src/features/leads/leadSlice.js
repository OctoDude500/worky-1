import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import axios from "axios";

import {stores} from "../../store"

const URL = "http://localhost:8000/";


const initialState = {
    leads: [],
    user: [],
    isLoading: false,
}

//get state of the userAuth slice
export const getUSerState = createAsyncThunk("leads/getUserState", async ( { user, getState }) => {
    console.log("is is is si ", stores.getState().lucia.user)
    return stores.getState().lucia.user;
});



export const getLeads = createAsyncThunk("leads/getLeads", async (state) => {
    //const hasUser = useSelector((stores) => stores.lucia.user)
    console.log("errerererer", state)
    const config = {
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjY0NGJjY2ItYWY5ZC00MjU0LWIzZTUtYjRlYzJlNDk5N2Y1IiwiaWF0IjoxNjYyNjc5ODExLCJleHAiOjE2NjI3NjYyMTF9.E5JgOmhRxXv0NSua3OkXYOXqgykhQ5-wpRShg4ksDTA"
        }
    }
    try {
        const fetchLeads = await axios.get(URL, config);
        return fetchLeads.data;
    } catch (error) {
        console.error(error)
    }
})

const leadsSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        testFunction: (state, action) => {
            console.log("test function action ", action)
        }
    },
    extraReducers: (builder) => {
        builder
            //get
            .addCase(getLeads.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getLeads.fulfilled, (state, action) => {
                console.log("getleads fulfilled action ", action);
                state.isLoading = false
                state.leads = action.payload
            })
            .addCase(getLeads.rejected, (state, action) => {
                state.isLoading = false
                console.error("fetch failed ", state, action)
            })
            .addCase(getUSerState.fulfilled, (state, action) => {
                //get state of the userAuth slice
                state.user = action.payload
                console.log("is da user ", state.user[0].token)
            })
    }
})

export const {testFunction} = leadsSlice.actions

console.log("lead slice is ", leadsSlice)

export default leadsSlice.reducer;