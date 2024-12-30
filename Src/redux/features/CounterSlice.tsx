import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

export interface CounterState {
    value: number,
    data:any

}

const initialState: CounterState = {
    value: 0,
    data:[]
}

export const GetAllFunds = createAsyncThunk(
    'GetAllFunds/fetch',
    async (_, ) => {

        const url = 'https://dummyjson.com/products'
        try {
            const response = await axios.get(url);
            return response.data.products
        } catch (error: any) {
            console.log('GetAllFundsApiError', error);
           
        }
    },
)

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
    extraReducers: builder => {
        // Pending stage
        builder.addCase(GetAllFunds.pending, state => {
          
        });
        builder.addCase(GetAllFunds.fulfilled, (state, action) => {
            state.data =action.payload ;
            console.log(state.data, "kkkkkkk")

          });
          builder.addCase(GetAllFunds.rejected, state => {
         
          });
    }
})


export const { increment, decrement, incrementByAmount, } = counterSlice.actions

export default counterSlice.reducer