import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CAlert,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'
import { Url } from '../../../Redux/userConstant'
import appLogo from '../../../assets/images/logo-icon.png'

const AdminProfile = () => {
  const adminInfo = useSelector((state) => state.user.adminInfo)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const createdAt = adminInfo?.createdAt
    ? new Date(adminInfo.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—'

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setAlert(null)

    if (newPassword !== confirmPassword) {
      setAlert({ color: 'danger', message: 'New passwords do not match.' })
      return
    }
    if (newPassword.length < 6) {
      setAlert({ color: 'danger', message: 'New password must be at least 6 characters.' })
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(`${Url}/api/admin/changePassword`, {
        userId: adminInfo._id,
        oldPassword,
        newPassword,
      })
      if (res.data.status === 'success') {
        setAlert({ color: 'success', message: 'Password changed successfully.' })
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong.'
      setAlert({ color: 'danger', message: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <CRow className="justify-content-center">
      <CCol md={8} lg={6}>

        {/* Admin Info Card */}
        <CCard className="mb-4">
          <CCardBody className="text-center py-4">
            <img
              src={appLogo}
              alt="Havv"
              width={72}
              height={72}
              style={{ borderRadius: '50%', marginBottom: 16 }}
            />
            <h4 className="mb-1 fw-bold">{adminInfo?.name || '—'}</h4>
            <p className="text-medium-emphasis mb-2">{adminInfo?.email || '—'}</p>
            <CBadge color="success" className="px-3 py-1" style={{ fontSize: '0.8rem' }}>
              {adminInfo?.roles?.[0] || 'admin'}
            </CBadge>
            <hr className="my-3" />
            <div className="d-flex justify-content-around text-center">
              <div>
                <div className="text-medium-emphasis small">Account ID</div>
                <div className="fw-semibold" style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
                  {adminInfo?.code || adminInfo?._id?.slice(-8) || '—'}
                </div>
              </div>
              <div>
                <div className="text-medium-emphasis small">Member Since</div>
                <div className="fw-semibold">{createdAt}</div>
              </div>
            </div>
          </CCardBody>
        </CCard>

        {/* Change Password Card */}
        <CCard>
          <CCardHeader className="fw-semibold">Change Password</CCardHeader>
          <CCardBody>
            {alert && (
              <CAlert color={alert.color} dismissible onClose={() => setAlert(null)}>
                {alert.message}
              </CAlert>
            )}
            <CForm onSubmit={handleChangePassword}>
              <div className="mb-3">
                <CFormLabel>Current Password</CFormLabel>
                <CFormInput
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  placeholder="Enter current password"
                />
              </div>
              <div className="mb-3">
                <CFormLabel>New Password</CFormLabel>
                <CFormInput
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password"
                />
              </div>
              <div className="mb-4">
                <CFormLabel>Confirm New Password</CFormLabel>
                <CFormInput
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                />
              </div>
              <CButton type="submit" color="primary" disabled={loading} className="w-100">
                {loading ? <CSpinner size="sm" className="me-2" /> : null}
                {loading ? 'Updating...' : 'Update Password'}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>

      </CCol>
    </CRow>
  )
}

export default AdminProfile
