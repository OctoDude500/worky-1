import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8000/";

const initialState = {
    leads: [],
    isLoading: false,
}

export const getLeads = createAsyncThunk("leads/getLeads", async () => {
    try {
        const fetchLeads = await axios.get(URL);
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
            .addCase(getLeads.rejected, (state) => {
                state.isLoading = false
                console.error("fetch failed")
            })
    }
})

export const {testFunction} = leadsSlice.actions

console.log("lead slice is ", leadsSlice)
export default leadsSlice.reducer;