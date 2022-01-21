import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from './store'

// Define a type for the slice state
interface UserState {
    signedIn: boolean,
    userName: string
}

// Define the initial state using that type
const initialState: UserState = {
    signedIn: false,
    userName: ""
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        authenticated: (state) => {
            state.signedIn = true;
        },
        unauthenticated: (state) => {
            state.signedIn = false;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = state.signedIn ? action.payload : "";
        }
    },
})

export const { authenticated, unauthenticated, setUserName } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// The `state` arg is correctly typed as `RootState` already
export const selectAuthState = (state: RootState) => state.user.signedIn
export const selectUserName = (state: RootState) => state.user.userName

export default userSlice.reducer