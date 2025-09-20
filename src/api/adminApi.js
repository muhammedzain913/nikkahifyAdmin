// adminApi.js
import axios from 'axios'
import { Url } from '../Redux/userConstant'
const api = axios.create({
  baseURL: Url,
})
const adminApi = {
  // ... other methods

  // Get specific user by ID
  getUserById: async (userId) => {
    try {
      console.log('puserid', userId)
      const response = await api.get(`/api/admin/individual/${userId}`)
      //   console.log(response.data)
      return response.data
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error)
      const errorMessage = error.response?.data?.message || 'Failed to fetch user'
      throw new Error(errorMessage)
    }
  },

  verifyUser: async (statusObj) => {
    try {
      console.log('puserid', statusObj)
      const response = await api.post(`/api/admin/verifyuser`, statusObj)
      return response.data
    } catch (error) {
      console.error(`Error fetching user `, error)
      const errorMessage = error.response?.data?.message || 'Failed to fetch user'
      throw new Error(errorMessage)
    }
  },

  verifyKycUser: async (reqObj) => {
    try {
      console.log('puserid', reqObj)
      const response = await api.patch(`/api/admin/verifyKyc/${reqObj.postId}`, {
        status: reqObj.status,
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching user `, error.message)
      const errorMessage = error.response?.data?.message || 'Failed to fetch user'
      throw new Error(errorMessage)
    }
  },

  deleteUser: async (userId) => {
    try {
      console.log('puserid', userId)
      const response = await api.delete(`/api/admin/${userId}`)
      //   console.log(response.data)
      return response.data
    } catch (error) {
      console.error(`Error fetching user `, error.message)
      const errorMessage = error.response?.data?.message || 'Failed to fetch user'
      throw new Error(errorMessage)
    }
  },
  updateUser: async (userId, updates) => {
    try {
      console.log('updating user:', userId, 'with data:', updates)
      const response = await api.put(`/api/admin/update_user/${userId}`, updates)
      return response.data
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error)
      const errorMessage = error.response?.data?.message || 'Failed to update user'
      throw new Error(errorMessage)
    }
  },

  // ... other methods
}

export default adminApi
