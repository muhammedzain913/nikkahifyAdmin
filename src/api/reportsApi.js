import axios from 'axios'
import { Url } from '../Redux/userConstant'

const reportsApi = {
  getAllReports: async () => {
    try {
      const response = await axios.get(`${Url}/api/admin/reports`)
      return response.data.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch reports'
      throw new Error(errorMessage)
    }
  },

  updateStatus: async ({ reportId, status, reviewNotes }) => {
    try {
      const response = await axios.patch(`${Url}/api/admin/reports/${reportId}`, {
        status,
        reviewNotes,
      })
      return response.data.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update report'
      throw new Error(errorMessage)
    }
  },
}

export default reportsApi
