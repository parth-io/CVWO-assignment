import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from './store'

// Define a type for the slice state
interface SearchState {
    searchText: string
}

// Define the initial state using that type
const initialState: SearchState = {
    searchText: ""
}

export const searchSlice = createSlice({
    name: 'search',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSearchString: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        }
    }
})

export const { setSearchString } = searchSlice.actions

// Other code such as selectors can use the imported `RootState` type
// The `state` arg is correctly typed as `RootState` already
export const selectSearchState = (state: RootState) => state.search.searchText

export default searchSlice.reducer