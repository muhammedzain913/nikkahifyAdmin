import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CButtonGroup,
  CSpinner,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../../../Redux/Slices/userSlice'
import adminApi from '../../../api/adminApi'
import { useNavigate } from 'react-router-dom'

const TABS = ['Banned', 'Suspended', 'Deleted']

const RestrictedUsers = () => {
  const actualUsers  = useSelector((x) => x.user.users)
  const adminToken   = useSelector((x) => x.user.token)
  const dispatch     = useDispatch()
  const navigate     = useNavigate()

  const [tab,     setTab]     = useState('Banned')
  const [loading, setLoading] = useState(false)
  const [alert,   setAlert]   = useState(null)

  const formatDate = (d) => {
    if (!d) return 'N/A'
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const realUsers = (actualUsers ?? []).filter(
    (u) => !u.roles?.includes('admin') && u.gender !== 'admin'
  )

  const bannedUsers    = realUsers.filter((u) => u.isBanned && !u.isDeleted)
  const suspendedUsers = realUsers.filter((u) => u.isSuspended && !u.isDeleted)
  const deletedUsers   = realUsers.filter((u) => u.isDeleted)

  const displayUsers =
    tab === 'Banned'    ? bannedUsers :
    tab === 'Suspended' ? suspendedUsers :
    deletedUsers

  const notifyUser = async (userId, message) => {
    try {
      await adminApi.sendNotificationToUser(userId, { message, title: 'Account Update — Havv' }, adminToken)
    } catch (e) {
      console.error('Notification failed:', e)
    }
  }

  const showAlert = (color, message) => {
    setAlert({ color, message })
    setTimeout(() => setAlert(null), 4000)
  }

  const handleReinstate = async (user) => {
    if (!window.confirm(`Reinstate ${user.name || 'this user'}? Their account will be restored.`)) return
    try {
      setLoading(true)
      const patch =
        tab === 'Banned'
          ? { isBanned: false, bannedAt: null }
          : tab === 'Suspended'
          ? { isSuspended: false, suspensionEndDate: null, suspendedAt: null }
          : { isDeleted: false, deletedAt: null }

      await adminApi.updateUser(user._id, patch)
      await notifyUser(
        user._id,
        'Good news! Your Havv account has been reinstated. You can now log in again. For any questions, contact admin@havv.app'
      )
      dispatch(getAllUsers())
      showAlert('success', `${user.name || 'User'} has been reinstated and notified.`)
    } catch (e) {
      console.error(e)
      showAlert('danger', 'Failed to reinstate user. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const restrictionDate = (user) => {
    if (tab === 'Banned')    return formatDate(user.bannedAt)
    if (tab === 'Suspended') return formatDate(user.suspendedAt)
    return formatDate(user.deletedAt)
  }

  const suspensionExpiry = (user) => {
    if (!user.suspensionEndDate) return '—'
    const end = new Date(user.suspensionEndDate)
    const now = new Date()
    if (end < now) return <span className="text-success">Expired</span>
    const days = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
    return <span className="text-warning">{days}d left</span>
  }

  return (
    <>
      {alert && (
        <CAlert color={alert.color} dismissible onClose={() => setAlert(null)} className="mb-3">
          {alert.message}
        </CAlert>
      )}

      <CRow className="mb-3 align-items-center">
        <CCol>
          <CButtonGroup>
            {TABS.map((t) => (
              <CButton
                key={t}
                color={
                  t === 'Banned' ? 'outline-danger' :
                  t === 'Suspended' ? 'outline-warning' :
                  'outline-secondary'
                }
                active={tab === t}
                onClick={() => setTab(t)}
              >
                {t}
                <CBadge
                  color={t === 'Banned' ? 'danger' : t === 'Suspended' ? 'warning' : 'secondary'}
                  className="ms-2"
                  style={{ fontSize: '0.7rem' }}
                >
                  {t === 'Banned' ? bannedUsers.length : t === 'Suspended' ? suspendedUsers.length : deletedUsers.length}
                </CBadge>
              </CButton>
            ))}
          </CButtonGroup>
        </CCol>
        {loading && <CCol xs="auto"><CSpinner size="sm" /></CCol>}
      </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardBody className="p-0">
              <CTable hover responsive className="mb-0">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Contact</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Gender</CTableHeaderCell>
                    <CTableHeaderCell>
                      {tab === 'Banned' ? 'Banned On' : tab === 'Suspended' ? 'Suspended On' : 'Deleted On'}
                    </CTableHeaderCell>
                    {tab === 'Suspended' && <CTableHeaderCell>Expires In</CTableHeaderCell>}
                    <CTableHeaderCell>Joined</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Reinstate</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {displayUsers.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan={7} className="text-center text-medium-emphasis py-4">
                        No {tab.toLowerCase()} users
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  {displayUsers.map((user) => (
                    <CTableRow
                      key={user._id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/verifyUser/${user._id}`)}
                    >
                      <CTableDataCell onClick={(e) => e.stopPropagation()}>
                        <div className="fw-semibold">{user.name || '—'}</div>
                        {user.dob && (
                          <div className="small text-medium-emphasis">
                            {(() => {
                              const birth = new Date(user.dob)
                              const today = new Date()
                              let age = today.getFullYear() - birth.getFullYear()
                              const m = today.getMonth() - birth.getMonth()
                              if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
                              return `${age} yrs`
                            })()}
                          </div>
                        )}
                      </CTableDataCell>

                      <CTableDataCell onClick={(e) => e.stopPropagation()}>
                        <div style={{ fontSize: '0.85rem' }}>{user.email}</div>
                        {user.phone && <div className="small text-medium-emphasis">{user.phone}</div>}
                      </CTableDataCell>

                      <CTableDataCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <CBadge
                          color={user.gender === 'Men' ? 'info' : user.gender === 'Women' ? 'danger' : 'secondary'}
                          style={{ fontSize: '0.72rem' }}
                        >
                          {user.gender}
                        </CBadge>
                      </CTableDataCell>

                      <CTableDataCell onClick={(e) => e.stopPropagation()}>
                        <div className="small">{restrictionDate(user)}</div>
                      </CTableDataCell>

                      {tab === 'Suspended' && (
                        <CTableDataCell onClick={(e) => e.stopPropagation()}>
                          <div className="small">{suspensionExpiry(user)}</div>
                        </CTableDataCell>
                      )}

                      <CTableDataCell onClick={(e) => e.stopPropagation()}>
                        <div className="small">{formatDate(user.createdAt)}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <CButton
                          size="sm"
                          color="success"
                          variant="outline"
                          disabled={loading}
                          onClick={() => handleReinstate(user)}
                        >
                          <CIcon icon={cilCheckCircle} className="me-1" />
                          Reinstate
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default RestrictedUsers
