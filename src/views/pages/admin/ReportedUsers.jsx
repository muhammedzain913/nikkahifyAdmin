import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CSpinner,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormTextarea,
  CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBan, cilCheckCircle, cilX } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../../../Redux/Slices/userSlice'
import adminApi from '../../../api/adminApi'
import axios from 'axios'
import { Url } from '../../../Redux/userConstant'

const STATUS_COLORS = {
  pending: 'warning',
  reviewed: 'success',
  dismissed: 'secondary',
}

const ReportedUsers = () => {
  const adminToken = useSelector((x) => x.user.token)
  const dispatch = useDispatch()

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  const [banModal, setBanModal] = useState({ open: false, report: null })
  const [banReason, setBanReason] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const showAlert = (color, message) => {
    setAlert({ color, message })
    setTimeout(() => setAlert(null), 4000)
  }

  const formatDate = (d) => {
    if (!d) return 'N/A'
    return new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const fetchReports = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${Url}/api/admin/reports`)
      setReports(res.data.data || [])
    } catch (e) {
      console.error('Failed to fetch reports:', e)
      showAlert('danger', 'Failed to load reports')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const handleUpdateStatus = async (reportId, status) => {
    try {
      await axios.patch(`${Url}/api/admin/reports/${reportId}`, { status })
      setReports((prev) =>
        prev.map((r) => (r._id === reportId ? { ...r, status, reviewedAt: new Date().toISOString() } : r)),
      )
      showAlert('success', `Report marked as ${status}`)
    } catch (e) {
      showAlert('danger', 'Failed to update report')
    }
  }

  const handleBanUser = async () => {
    const { report } = banModal
    if (!report) return
    setActionLoading(true)
    try {
      await adminApi.updateUser(report.reportedUser._id, {
        isBanned: true,
        bannedAt: new Date(),
        banReason: banReason || `Reported: ${report.reason}`,
      })
      await handleUpdateStatus(report._id, 'reviewed')
      dispatch(getAllUsers())
      showAlert('success', `${report.reportedUser.name || 'User'} has been permanently banned`)
      setBanModal({ open: false, report: null })
      setBanReason('')
    } catch (e) {
      showAlert('danger', 'Failed to ban user')
    } finally {
      setActionLoading(false)
    }
  }

  const filtered =
    statusFilter === 'all' ? reports : reports.filter((r) => r.status === statusFilter)

  const formatPhone = (phone, countryObj) => {
    if (!phone) return null
    const code = countryObj?.callingCode ? `+${countryObj.callingCode} ` : ''
    return `${code}${phone}`
  }

  const UserCard = ({ user, label }) => {
    if (!user) return <span className="text-muted">Unknown</span>
    return (
      <div>
        <div className="fw-semibold">{user.name || user.displayName || '—'}</div>
        {user.code && <div className="text-muted small">{user.code}</div>}
        <div className="small mt-1">
          {user.email && (
            <div>
              <span className="text-muted">Email: </span>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
          )}
          {user.phone && (
            <div>
              <span className="text-muted">Phone: </span>
              {formatPhone(user.phone, user.phoneCountry)}
            </div>
          )}
          {label === 'reported' && user.guardianPhone && (
            <div>
              <span className="text-muted">Guardian: </span>
              {formatPhone(user.guardianPhone, user.guardianPhoneCountry)}
            </div>
          )}
        </div>
        {label === 'reported' && (user.isBanned || user.isSuspended) && (
          <CBadge color={user.isBanned ? 'danger' : 'warning'} className="mt-1">
            {user.isBanned ? 'Banned' : 'Suspended'}
          </CBadge>
        )}
      </div>
    )
  }

  return (
    <CRow>
      <CCol>
        {alert && (
          <CAlert color={alert.color} dismissible onClose={() => setAlert(null)}>
            {alert.message}
          </CAlert>
        )}

        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Reported Users</strong>
            <CButtonGroup>
              {['all', 'pending', 'reviewed', 'dismissed'].map((s) => (
                <CButton
                  key={s}
                  color={statusFilter === s ? 'primary' : 'outline-secondary'}
                  size="sm"
                  onClick={() => setStatusFilter(s)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {s}
                </CButton>
              ))}
            </CButtonGroup>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div className="text-center py-4">
                <CSpinner />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center text-muted py-4">No reports found</div>
            ) : (
              <CTable responsive hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Reported User</CTableHeaderCell>
                    <CTableHeaderCell>Reported By</CTableHeaderCell>
                    <CTableHeaderCell>Reason</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filtered.map((report) => (
                    <CTableRow key={report._id}>
                      <CTableDataCell style={{ minWidth: 200 }}>
                        <UserCard user={report.reportedUser} label="reported" />
                      </CTableDataCell>
                      <CTableDataCell style={{ minWidth: 180 }}>
                        <UserCard user={report.reportedBy} label="reporter" />
                      </CTableDataCell>
                      <CTableDataCell style={{ minWidth: 160 }}>
                        <span className="badge bg-light text-dark border">{report.reason}</span>
                      </CTableDataCell>
                      <CTableDataCell style={{ minWidth: 140 }}>
                        <div className="small">{formatDate(report.createdAt)}</div>
                        {report.reviewedAt && (
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Reviewed: {formatDate(report.reviewedAt)}
                          </div>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={STATUS_COLORS[report.status] || 'secondary'}>
                          {report.status}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell style={{ minWidth: 220 }}>
                        <div className="d-flex flex-wrap gap-1">
                          {report.status === 'pending' && (
                            <CButton
                              size="sm"
                              color="success"
                              variant="outline"
                              onClick={() => handleUpdateStatus(report._id, 'reviewed')}
                            >
                              <CIcon icon={cilCheckCircle} className="me-1" />
                              Mark Reviewed
                            </CButton>
                          )}
                          {report.status !== 'dismissed' && (
                            <CButton
                              size="sm"
                              color="secondary"
                              variant="outline"
                              onClick={() => handleUpdateStatus(report._id, 'dismissed')}
                            >
                              <CIcon icon={cilX} className="me-1" />
                              Dismiss
                            </CButton>
                          )}
                          {report.reportedUser && !report.reportedUser.isBanned && (
                            <CButton
                              size="sm"
                              color="danger"
                              onClick={() => setBanModal({ open: true, report })}
                            >
                              <CIcon icon={cilBan} className="me-1" />
                              Permanent Ban
                            </CButton>
                          )}
                          {report.reportedUser?.isBanned && (
                            <CBadge color="danger" className="align-self-center">
                              Already Banned
                            </CBadge>
                          )}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Ban Confirmation Modal */}
      <CModal visible={banModal.open} onClose={() => setBanModal({ open: false, report: null })}>
        <CModalHeader>
          <CModalTitle>Permanent Ban</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {banModal.report && (
            <>
              <p>
                You are about to permanently ban{' '}
                <strong>{banModal.report.reportedUser?.name || 'this user'}</strong> (
                {banModal.report.reportedUser?.email}).
              </p>
              <p className="text-muted small">
                Report reason: <em>{banModal.report.reason}</em>
              </p>
              <p>
                A permanent ban removes this user from everyone's profile and prevents them from
                logging in.
              </p>
              <CFormTextarea
                placeholder="Optional: add a ban reason note"
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                rows={3}
              />
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => { setBanModal({ open: false, report: null }); setBanReason('') }}
          >
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleBanUser} disabled={actionLoading}>
            {actionLoading ? <CSpinner size="sm" className="me-1" /> : null}
            Confirm Permanent Ban
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ReportedUsers
