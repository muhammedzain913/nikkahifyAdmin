import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Url } from '../userConstant'

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const styleSlice = createSlice({
  name: 'style',
  initialState: initialState,
  reducers: {
    // const changeState = (state = initialState, { type, ...rest }) => {
    //   switch (type) {
    //     case 'set':
    //       return { ...state, ...rest }
    //     default:
    //       return state
    //   }
    // }

    changeState: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { changeState } = styleSlice.actions
export default styleSlice.reducer
