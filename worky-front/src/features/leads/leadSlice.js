import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import axios from "axios";

import {stores} from "../../store"

const URL = "http://localhost:8000/";


const initialState = {
    leads: [],
    isLoading: false,
   // test: "this is the state"
}

//get state of the userAuth slice
/*export const getUSerState = createAsyncThunk("leads/getUserState", async ( { user, getState }) => {
    console.log("is is is si ", stores.getState().lucia.user)
    return stores.getState().lucia.user;
});*/



export const getLeads = createAsyncThunk("leads/getLeads", async ({token}) => {
    console.log("errerererer", token.token)
    const config = {
        headers: {
            "Authorization": `Bearer ${token.token}`
        }
    }
    try {
        const fetchLeads = await axios.get(URL, config);
        console.log("fetch triggered in leadslice ", fetchLeads.data)
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
        },
        clearState: (state, action) => {
            console.log("clear state")
            //state.leads.push([])
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
                state.leads.push(action.payload)
            })
            .addCase(getLeads.rejected, (state, action) => {
                state.isLoading = false
                console.error("fetch failed ", state, action)
            })

    }
})

export const {testFunction, clearState} = leadsSlice.actions

console.log("lead slice is ", leadsSlice)

export default leadsSlice.reducer;