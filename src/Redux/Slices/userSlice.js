import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Url } from '../userConstant'

const initialState = {
  token: null,
  users: [],
  pendingUsers: [],
  activeUsers: [],
  flaggedUsers: [],
  status: 'idle',
  error: null,
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      console.log('HIHI')
      // Calculate profile completion before sending data
      //   const profileCompletionPercentage = calculateProfileCompletion(userData)
      //   userData.profileCompletionPercentage = profileCompletionPercentage

      const response = await axios.post(`${Url}/api/authentication/register`, userData)

      const token = response.data.token
      const oppositeGender = response.data.userData.gender === 'Men' ? 'Women' : 'Men'
      dispatch(fetchUsersByGender({ oppositeGender, token }))

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${Url}/api/authentication/login`, userData)

      // Call the gender API
      const token = response.data.token
      await AsyncStorage.setItem('userId', response.data.userData._id)
      await AsyncStorage.setItem('token', response.data.token)

      const oppositeGender = response.data.userData.gender === 'Men' ? 'Women' : 'Men'
      dispatch(fetchUsersByGender({ oppositeGender, token }))

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in slice')
      const response = await axios.get(`${Url}/api/admin/all`)
      console.log('all', response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getPendingUsers = createAsyncThunk(
  'user/getPendingUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/admin/pendingUsers`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getActiveUsers = createAsyncThunk(
  'user/getActiveUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/admin/activeUsers`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getFlaggedUsers = createAsyncThunk(
  'user/getFlaggedUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/admin/activeUsers`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
) 




const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        console.log('hihireached')
        state.users = action.payload.data
        console.log('fromhere', state.users)
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getPendingUsers.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.pendingUsers = action.payload.data
      })
      .addCase(getPendingUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getPendingUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getActiveUsers.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.activeUsers = action.payload.data
      })
      .addCase(getActiveUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getActiveUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getFlaggedUsers.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.flaggedUsers = action.payload.data
      })
      .addCase(getFlaggedUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getFlaggedUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})
export default userSlice.reducer
