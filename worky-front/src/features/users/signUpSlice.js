import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8000/user/signup"

const initialState = {
    user: [],
    isLoading: false
}

export const signUpUser = createAsyncThunk("users/createUser", async ({text}) => {
    try {
        const response = await axios.post(URL, text)
        console.log("response.data", response.data)
        return response.data
    } catch (error) {
       return error.response.data
    }
})

const signUpSlice = createSlice({
    name: "userSignUp",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state, action) => {
                console.log("pending action ", action)
                state.isLoading = true
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                console.log("fulfilled action ", action)
                state.isLoading = false
                state.user.push(action.payload)
            })
            .addCase(signUpUser.rejected, (state, action) => {
                console.log("rejected action ", action)
                state.isLoading = false
                console.log("rejected")
            })
    }

    })

export default signUpSlice.reducer;
