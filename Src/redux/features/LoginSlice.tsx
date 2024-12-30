import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'
import { RootState } from '../store'

export interface CounterState {
    page: number,
    data:any,
    userName:string,
    isLoading:boolean
}

const initialState: CounterState = {
    page: 1,
    data:[],
    userName:"",
    isLoading:false
}

export const SearchUser = createAsyncThunk(
    'SearchUser/fetch',
    async (_,thunkAPI ) => {
        const state = thunkAPI.getState() as RootState;
        const {userName, page} = state.login
        const url = `https://api.github.com/search/users?q=${userName}&page=${page}&per_page=10`
        try {
            const response = await axios.get(url);
            console.log('GetAllresponse', response);
            return response.data.items
        } catch (error: any) {
            console.log('GetAllFundsApiError', error);   
        }
    },
)

export const loginSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
          },
          setPage : 
          (state) => {
            state.page += 1
          },
          setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
          },
    },
    extraReducers: builder => {
        // Pending stage
        builder.addCase(SearchUser.pending, state => {
          state.isLoading=true
        });
        builder.addCase(SearchUser.fulfilled, (state, action) => {
            if (state.page === 1) {
                // Replace data if it's the first page
                state.data = action.payload;
            } else {
                // Concatenate data for subsequent pages
                state.data = [...state.data, ...action.payload];
            }
            state.isLoading = false;
        });
          builder.addCase(SearchUser.rejected, state => {
         
          });
    }
})


export const {setUsername,setPage, setLoading  } = loginSlice.actions

export default loginSlice.reducer