import axios from 'axios'
import { Url } from '../Redux/userConstant'
const api = axios.create({
  baseURL: Url,
})

const reportsApi = {
  getUserReports: async (userId) => {
    try {
      console.log('puserid', userId)
      const response = await api.get(`/api/reports/user-reports/${userId}`)
      console.log('aaa', response.data.data)
      return response.data.data
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error)
      const errorMessage = error.response?.data?.message || 'Failed to fetch user'
      throw new Error(errorMessage)
    }
  },

  updateStatus: async ({ reportId, reportStatus, reviewNotes }) => {
    try {
      //   console.log('puserid', userId)
      const response = await axios.put(`${Url}/api/reports/reports/${reportId}`, {
        reportStatus,
        reviewNotes,
      })
      return response.data.data
    } catch (error) {
      //   console.error(`Error fetching user ${userId}:`, error)
      const errorMessage = error.response?.data?.message || 'Failed to fetch user'
      throw new Error(errorMessage)
    }
  },
  takeAction: async ({ reportId, userId, actionType, actionNotes }) => {
    try {
      console.log('Taking action:', { reportId, userId, actionType })
      const response = await axios.post(`${Url}/api/reports/actions/${userId}`, {
        reportId,
        actionType,
        notes: actionNotes,
        // Remove userId from body since it's now in the URL path
      })
      return response.data.data
    } catch (error) {
      console.error(`Error taking action on report ${reportId}:`, error)
      const errorMessage = error.response?.data?.message || 'Failed to take action'
      throw new Error(errorMessage)
    }
  },
}

export default reportsApi
