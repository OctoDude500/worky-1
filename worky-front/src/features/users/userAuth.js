import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8000/user/signup"
const URLlogin = "http://localhost:8000/user/login"

const initialState = {
    user: [],
    isLoading: false
}

export const signUpUser = createAsyncThunk("users/createUser", async ({text}) => {
    try {
        const response = await axios.post(URL, text)
        console.log("response.data", response)
        return response.data
    } catch (error) {
        console.log("is error ", error.response.data)
       return error.response.data
    }
})

export const loginUser = createAsyncThunk("users/login", async ({text}) => {
    try {
        const response = await axios.post(URLlogin, text)
        console.log("login data", response.data)
        return response.data
    } catch (error) {
        console.log("login error", error.response.data)
        return error.response.data
    }
})
console.log("is user state ", initialState.user)
const userAuth = createSlice({
    name: "userSignUp",
    initialState,
    reducers: {
        /*saveToLocal: (state, action) => {
            if(state.user) {

                localStorage.setItem("isUser", JSON.stringify({email: state.user[0].email, token: state.user[0].token }))
                console.log("save to local", state.user)
            }
        },*/
        signOut: (state, action) => {
            state.user = []
            localStorage.removeItem("isUser")
            console.log("signout")
        },
        loggedUser: (state, action) => {
            console.log("logged action", action.payload)
            state.user = [action.payload]
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state, action) => {
                console.log("pending action ", action)
                state.isLoading = true
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                console.log("fulfilled action ", action)
                console.log("fulfilled signup state ", state)
                state.isLoading = false
                state.user.push(action.payload)
                localStorage.setItem("isUser", JSON.stringify({email: state.user[0].email, token: state.user[0].token }))
            })
            .addCase(signUpUser.rejected, (state, action) => {
                console.log("rejected action ", action)
                state.isLoading = false
                console.log("rejected")
            })
            .addCase(loginUser.pending, (state, action) => {
                console.log("login pending", action)
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("login fulfilled", action)
                console.log("fulfilled login state ", state.user)
                state.isLoading = false
                state.user.push(action.payload)
               localStorage.setItem("isUser", JSON.stringify({email: state.user[0].email, token: state.user[0].token }))
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("login rejected", action)
                state.isLoading = false
            })
    }

    })

console.log("signup slice", userAuth)
export const {saveToLocal, signOut, loggedUser} = userAuth.actions;
export default userAuth.reducer;
