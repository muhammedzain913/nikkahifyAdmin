import axios from 'axios'
import { Url } from '../Redux/userConstant'
const api = axios.create({
  baseURL: Url,
})

// Authentication API calls
const authApi = {
  sendOtp: async (userData) => {
    try {
      console.log('hihi');
      const response = await api.post(`/api/otp/send-otp`, userData)
      return response.data
    } catch (error) {
      // You could do some logging here
      console.error(`Error fetching `, error)

      // You could transform error messages here
      const errorMessage = error.response?.data?.message || 'Failed to fetch user'

      // Then rethrow so the caller can still handle it
      throw new Error(errorMessage)
    }
  },
}

export default authApi
