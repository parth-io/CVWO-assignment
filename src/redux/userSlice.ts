import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from './store'

// Define a type for the slice state
interface UserState {
    actualUser: boolean,
    userName: string
}

// Define the initial state using that type
const initialState: UserState = {
    actualUser: false,
    userName: ""
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        authenticated: (state) => {
            state.actualUser = true;
        },
        unauthenticated: (state) => {
            state.actualUser = false;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        }
    },
})

export const { authenticated, unauthenticated, setUserName } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// The `state` arg is correctly typed as `RootState` already
export const selectAuthState = (state: RootState) => state.user.actualUser
export const selectUserName = (state: RootState) => state.user.userName

export default userSlice.reducer