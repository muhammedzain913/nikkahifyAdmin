import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Url } from '../userConstant'
import { act } from 'react'

const initialState = {
  adminInfo: {},
  token: {},
  users: [],
  pendingUsers: [],
  activeUsers: [],
  flaggedUsers: [],
  dailyActiveUsers: [],
  monthlyActiveUsers: [],
  weeklyMatches: [],
  monthlyMatches: [],
  supportedUsers: [],
  userSelectionMetrics: {},
  profileCompletionMetrics: {},
  test: null,
  isAuthenticated: false,
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

      const response = await axios.post(`${Url}/api/admin/register`, userData)

      const token = response.data.token
      // const oppositeGender = response.data.userData.gender === 'Men' ? 'Women' : 'Men'
      // dispatch(fetchUsersByGender({ oppositeGender, token }))

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
      console.log('reached slice')
      const response = await axios.post(`${Url}/api/admin/login`, userData)
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
      const response = await axios.get(`${Url}/api/admin/flaggedUsers`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getDailyActiveUsers = createAsyncThunk(
  'user/getDailyActiveUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/userActivity/getDailyActiveUsers`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getMonthlyActiveUsers = createAsyncThunk(
  'user/getMonthlyActiveUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/userActivity/getMonthlyActiveUsers`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getWeeklyMatches = createAsyncThunk(
  'user/getWeeklyMatches',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/match/getMatchesByRange/weekly`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getMonthlyMatches = createAsyncThunk(
  'user/getMonthlyMatches',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/match/getMatchesByRange/monthly`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getSupportedUsers = createAsyncThunk(
  'user/getSupportedUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/userShares/getUsersWithShareTypes`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getUserSelectionMetrics = createAsyncThunk(
  'user/getUserSelectionMetrics',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/admin/getUserSelectionMetrics`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const getMostSkippedSection = createAsyncThunk(
  'user/getMostSkippedSection',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/admin/getMostSkippedSection`)
      console.log('frompending', response.data)
      return response.data
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
  },
)

export const testApi = createAsyncThunk(
  'user/testApi',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('reached here in pending')
      const response = await axios.get(`${Url}/api/admin/test`)
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
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.adminInfo = action.payload.userData
        state.token = action.payload.token
        state.isAuthenticated = true
        state.message = action.payload.message
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
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
      .addCase(getDailyActiveUsers.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.dailyActiveUsers = action.payload.data
      })
      .addCase(getDailyActiveUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getDailyActiveUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getMonthlyActiveUsers.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.monthlyActiveUsers = action.payload.data
      })
      .addCase(getMonthlyActiveUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getMonthlyActiveUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getWeeklyMatches.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.weeklyMatches = action.payload.data
      })
      .addCase(getWeeklyMatches.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getWeeklyMatches.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getMonthlyMatches.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.monthlyMatches = action.payload.data
      })
      .addCase(getMonthlyMatches.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getMonthlyMatches.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getSupportedUsers.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.supportedUsers = action.payload.data
      })
      .addCase(getSupportedUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getSupportedUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getUserSelectionMetrics.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.userSelectionMetrics = action.payload.data
      })
      .addCase(getUserSelectionMetrics.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getUserSelectionMetrics.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(testApi.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.test = action.payload.data
      })
      .addCase(testApi.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(testApi.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getMostSkippedSection.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.profileCompletionMetrics = action.payload.data
      })
      .addCase(getMostSkippedSection.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getMostSkippedSection.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('lastone', action.payload.data)
        state.token = action.payload.token
        state.adminInfo = action.payload.userData
        state.isAuthenticated = true
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})
export default userSlice.reducer
