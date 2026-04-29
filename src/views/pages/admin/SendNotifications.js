import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilUser } from '@coreui/icons'
import { useSelector } from 'react-redux'
import adminApi from '../../../api/adminApi'

const SendNotifications = () => {
  const adminToken = useSelector((state) => state.user.token)
  const users = useSelector((state) => state.user.users)
  const [broadcastTitle, setBroadcastTitle] = useState('')
  const [broadcastMessage, setBroadcastMessage] = useState('')

  const [targetUserId, setTargetUserId] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [menSearch, setMenSearch] = useState('')
  const [womenSearch, setWomenSearch] = useState('')

  const [broadcastLoading, setBroadcastLoading] = useState(false)
  const [userLoading, setUserLoading] = useState(false)
  const [broadcastFeedback, setBroadcastFeedback] = useState(null)
  const [userFeedback, setUserFeedback] = useState(null)

  const tokenOk = typeof adminToken === 'string' && adminToken.length > 0
  const userList = Array.isArray(users) ? users : []

  const normalizeGender = (g) =>
    String(g || '')
      .trim()
      .toLowerCase()
  const userSearchText = (user) =>
    `${user?.code || ''} ${user?.name || ''} ${user?.email || ''} ${user?._id || ''}`.toLowerCase()

  const menUsers = userList.filter((u) => normalizeGender(u?.gender) === 'men')
  const womenUsers = userList.filter((u) => normalizeGender(u?.gender) === 'women')

  const filteredMenUsers = menSearch.trim()
    ? menUsers.filter((u) => userSearchText(u).includes(menSearch.trim().toLowerCase()))
    : menUsers
  const filteredWomenUsers = womenSearch.trim()
    ? womenUsers.filter((u) => userSearchText(u).includes(womenSearch.trim().toLowerCase()))
    : womenUsers

  const handleBroadcast = async (e) => {
    e.preventDefault()
    setBroadcastFeedback(null)
    if (!tokenOk) {
      setBroadcastFeedback({ type: 'danger', text: 'You must be logged in to send notifications.' })
      return
    }
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) {
      setBroadcastFeedback({ type: 'warning', text: 'Title and message are required.' })
      return
    }
    setBroadcastLoading(true)
    try {
      await adminApi.broadcastNotification(
        {
          title: broadcastTitle.trim(),
          message: broadcastMessage.trim(),
        },
        adminToken,
      )
      setBroadcastFeedback({ type: 'success', text: 'Broadcast notification was sent.' })
      setBroadcastTitle('')
      setBroadcastMessage('')
    } catch (err) {
      setBroadcastFeedback({ type: 'danger', text: err.message || 'Failed to send broadcast.' })
    } finally {
      setBroadcastLoading(false)
    }
  }

  const handleUserNotification = async (e) => {
    e.preventDefault()
    setUserFeedback(null)
    if (!tokenOk) {
      setUserFeedback({ type: 'danger', text: 'You must be logged in to send notifications.' })
      return
    }
    if (!targetUserId.trim() || !userMessage.trim()) {
      setUserFeedback({ type: 'warning', text: 'Select a user and enter a message.' })
      return
    }
    setUserLoading(true)
    try {
      await adminApi.sendNotificationToUser(
        targetUserId.trim(),
        { message: userMessage.trim() },
        adminToken,
      )
      setUserFeedback({ type: 'success', text: 'Notification was sent to that user.' })
      setUserMessage('')
    } catch (err) {
      setUserFeedback({ type: 'danger', text: err.message || 'Failed to send notification.' })
    } finally {
      setUserLoading(false)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        {!tokenOk && (
          <CAlert color="warning" className="mb-4">
            Admin session token is missing. Log in again if sending fails.
          </CAlert>
        )}
      </CCol>

      <CCol lg={6} className="mb-4">
        <CCard>
          <CCardHeader>
            <strong>
              <CIcon icon={cilBell} className="me-2" />
              Notify all users
            </strong>
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleBroadcast}>
              {broadcastFeedback && (
                <CAlert
                  color={broadcastFeedback.type}
                  dismissible
                  onClose={() => setBroadcastFeedback(null)}
                >
                  {broadcastFeedback.text}
                </CAlert>
              )}
              <div className="mb-3">
                <CFormLabel htmlFor="broadcast-title">Title</CFormLabel>
                <CFormInput
                  id="broadcast-title"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="Admin announcement"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="broadcast-message">Message</CFormLabel>
                <CFormTextarea
                  id="broadcast-message"
                  rows={4}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Maintenance tonight at 11:30 PM."
                />
              </div>
              <CButton type="submit" color="primary" disabled={broadcastLoading}>
                {broadcastLoading ? (
                  <>
                    <CSpinner size="sm" className="me-2" /> Sending…
                  </>
                ) : (
                  'Send to all users'
                )}
              </CButton>
            </form>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol lg={6} className="mb-4">
        <CCard>
          <CCardHeader>
            <strong>
              <CIcon icon={cilUser} className="me-2" />
              Notify one user
            </strong>
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleUserNotification}>
              {userFeedback && (
                <CAlert color={userFeedback.type} dismissible onClose={() => setUserFeedback(null)}>
                  {userFeedback.text}
                </CAlert>
              )}
              <div className="mb-3">
                <CFormLabel>Select user (by code)</CFormLabel>
                <CRow className="g-2">
                  <CCol sm={6}>
                    <CFormLabel className="text-medium-emphasis" htmlFor="men-search">
                      Men
                    </CFormLabel>
                    <CFormInput
                      id="men-search"
                      className="mb-2"
                      placeholder="Search by user.code…"
                      value={menSearch}
                      onChange={(e) => setMenSearch(e.target.value)}
                    />
                    <CFormSelect
                      aria-label="Select a men user"
                      value={targetUserId}
                      onChange={(e) => setTargetUserId(e.target.value)}
                    >
                      <option value="">Choose…</option>
                      {filteredMenUsers.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.code || user._id}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  <CCol sm={6}>
                    <CFormLabel className="text-medium-emphasis" htmlFor="women-search">
                      Women
                    </CFormLabel>
                    <CFormInput
                      id="women-search"
                      className="mb-2"
                      placeholder="Search by user.code…"
                      value={womenSearch}
                      onChange={(e) => setWomenSearch(e.target.value)}
                    />
                    <CFormSelect
                      aria-label="Select a women user"
                      value={targetUserId}
                      onChange={(e) => setTargetUserId(e.target.value)}
                    >
                      <option value="">Choose…</option>
                      {filteredWomenUsers.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.code || user._id}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="user-message">Message</CFormLabel>
                <CFormTextarea
                  id="user-message"
                  rows={4}
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Custom message from admin"
                />
              </div>
              <CButton type="submit" color="primary" disabled={userLoading}>
                {userLoading ? (
                  <>
                    <CSpinner size="sm" className="me-2" /> Sending…
                  </>
                ) : (
                  'Send to this user'
                )}
              </CButton>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SendNotifications
