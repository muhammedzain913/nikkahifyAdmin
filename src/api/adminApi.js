// adminApi.js
import axios from 'axios'
import { Url } from '../Redux/userConstant'
const api = axios.create({
  baseURL: Url,
})

/** @param {string} token */
function authHeader(token) {
  if (!token || typeof token !== 'string') {
    throw new Error('Admin token is required')
  }
  return { Authorization: token.replace(/^Bearer\s+/i, '') }
}
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

  /**
   * Fetch short-lived (signed) URLs for KYC document images.
   * Backend must validate admin auth + ownership before signing.
   */
  getKycDocumentSignedUrls: async (kycId) => {
    try {
      const response = await api.get(`/api/admin/kyc/${kycId}/document-signed-urls`)
      return response.data
    } catch (error) {
      console.error(`Error fetching signed KYC urls for ${kycId}:`, error)
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch signed KYC document URLs'
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

  /**
   * Push notification to all app users (admin).
   * @param {{ title: string, message: string, data?: object }} payload
   * @param {string} adminToken JWT from Redux after login
   */
  broadcastNotification: async (payload, adminToken) => {
    try {
      const response = await api.post(`/api/admin/notifications/broadcast`, payload, {
        headers: { ...authHeader(adminToken) },
      })
      return response.data
    } catch (error) {
      console.error('broadcastNotification:', error)
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to send broadcast notification'
      throw new Error(errorMessage)
    }
  },

  /**
   * Push notification to a single user (admin).
   * @param {string} userId
   * @param {{ message: string }} body
   * @param {string} adminToken JWT from Redux after login
   */
  sendNotificationToUser: async (userId, body, adminToken) => {
    try {
      const response = await api.post(`/api/admin/notifications/user/${userId}`, body, {
        headers: { ...authHeader(adminToken) },
      })
      return response.data
    } catch (error) {
      console.error('sendNotificationToUser:', error)
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to send user notification'
      throw new Error(errorMessage)
    }
  },

  // ... other methods
}

export default adminApi
