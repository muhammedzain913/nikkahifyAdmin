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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
  CButtonGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilFilter,
  cilWarning,
  cilCheckCircle,
  cilBan,
  cilOptions,
} from '@coreui/icons'
import { Country } from 'country-state-city'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../../../Redux/Slices/userSlice'
import adminApi from '../../../api/adminApi'
import { useNavigate } from 'react-router-dom'

const KYC_LABEL = {
  isVerified: { label: 'Verified', color: 'success' },
  isPending:  { label: 'Pending',  color: 'warning' },
  isRejected: { label: 'Rejected', color: 'danger'  },
}

const Users = () => {
  const actualUsers = useSelector((x) => x.user.users)
  const navigate    = useNavigate()
  const dispatch    = useDispatch()

  const [loading,         setLoading]         = useState(false)
  const [selectedGender,  setSelectedGender]  = useState('All')
  const [searchKey,       setSearchKey]       = useState('')
  const [countries,       setCountries]       = useState([])
  const [isModalOpen,     setIsModalOpen]     = useState(false)
  const [filterPreference, setFilterPreference] = useState({ country: '', gender: '', maritalStatus: '' })
  const [filteredUsers,   setFilteredUsers]   = useState([])

  const adminToken = useSelector((x) => x.user.token)

  // Only show active users — admins, banned, suspended, deleted go elsewhere
  const realUsers = (actualUsers ?? []).filter(
    (u) =>
      !u.roles?.includes('admin') &&
      u.gender !== 'admin' &&
      !u.isBanned &&
      !u.isSuspended &&
      !u.isDeleted
  )

  const formatDate = (d) => {
    if (!d) return 'N/A'
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  // Apply all filters
  useEffect(() => {
    let list = realUsers

    if (selectedGender !== 'All') {
      list = list.filter((u) => u.gender === selectedGender)
    }
    if (searchKey.trim()) {
      const q = searchKey.trim().toUpperCase()
      list = list.filter((u) =>
        (u.name || '').toUpperCase().includes(q) ||
        (u.email || '').toUpperCase().includes(q) ||
        (u.phone || '').includes(q)
      )
    }
    if (filterPreference.country) {
      list = list.filter((u) =>
        u.address?.toLowerCase().includes(filterPreference.country.toLowerCase())
      )
    }
    if (filterPreference.gender && filterPreference.gender !== 'all') {
      list = list.filter((u) => u.gender === filterPreference.gender)
    }
    if (filterPreference.maritalStatus) {
      list = list.filter((u) => u.maritalStatus === filterPreference.maritalStatus)
    }

    setFilteredUsers(list)
  }, [actualUsers, selectedGender, searchKey, filterPreference])

  useEffect(() => {
    setCountries(Country.getAllCountries())
  }, [])

  const handleFilterPreference = (value, name) =>
    setFilterPreference((prev) => ({ ...prev, [name]: value }))

  const clearModalFilters = () => {
    setFilterPreference({ country: '', gender: '', maritalStatus: '' })
    setIsModalOpen(false)
  }

  const notifyUser = async (userId, message) => {
    try {
      await adminApi.sendNotificationToUser(userId, { message, title: 'Account Notice — Havv' }, adminToken)
    } catch (e) {
      console.error('Notification failed:', e)
    }
  }

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.name || 'this user'}? They will be moved to Restricted Users.`)) return
    try {
      setLoading(true)
      await adminApi.updateUser(user._id, { isDeleted: true, deletedAt: new Date() })
      await notifyUser(user._id, 'Your account has been removed by Havv admin. If you believe this is a mistake, contact us at admin@havv.app')
      dispatch(getAllUsers())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleBan = async (user) => {
    if (!window.confirm(`Ban ${user.name || 'this user'}?`)) return
    try {
      setLoading(true)
      await adminApi.updateUser(user._id, { isBanned: true, bannedAt: new Date() })
      await notifyUser(user._id, 'Your account has been banned by Havv admin. If you believe this is a mistake, please contact us at admin@havv.app')
      dispatch(getAllUsers())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleSuspend = async (user) => {
    if (!window.confirm(`Suspend ${user.name || 'this user'} for 30 days?`)) return
    try {
      setLoading(true)
      await adminApi.updateUser(user._id, {
        isSuspended: true,
        suspendedAt: new Date(),
        suspensionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
      await notifyUser(user._id, 'Your account has been suspended for 30 days by Havv admin. For support, contact us at admin@havv.app')
      dispatch(getAllUsers())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const kycBadge = (kycInfo) => {
    const k = KYC_LABEL[kycInfo?.status]
    return k
      ? <CBadge color={k.color} style={{ fontSize: '0.72rem' }}>{k.label}</CBadge>
      : <CBadge color="secondary" style={{ fontSize: '0.72rem' }}>No KYC</CBadge>
  }

  const genderBadge = (gender) => (
    <CBadge
      color={gender === 'Men' ? 'info' : gender === 'Women' ? 'danger' : 'secondary'}
      style={{ fontSize: '0.72rem' }}
    >
      {gender}
    </CBadge>
  )

  return (
    <>
      {/* ── Toolbar ── */}
      <CRow className="mb-3 align-items-center g-2">
        <CCol xs={12} md={6}>
          <div className="position-relative">
            <CFormInput
              placeholder="Search by name, email or phone…"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              style={{ paddingLeft: 36 }}
            />
            <span className="position-absolute" style={{ left: 10, top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </span>
          </div>
        </CCol>
        <CCol xs="auto">
          <CButtonGroup>
            {['All', 'Men', 'Women'].map((g) => (
              <CButton
                key={g}
                color="outline-secondary"
                active={g === selectedGender}
                onClick={() => setSelectedGender(g)}
              >
                {g}
              </CButton>
            ))}
          </CButtonGroup>
        </CCol>
        <CCol xs="auto">
          <CButton color="light" onClick={() => setIsModalOpen(true)}>
            <CIcon icon={cilFilter} className="me-1" /> Filter
          </CButton>
        </CCol>
        <CCol xs="auto" className="ms-auto">
          <span className="text-medium-emphasis small">{filteredUsers.length} users</span>
        </CCol>
      </CRow>

      {/* ── Table ── */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody className="p-0">
              <CTable align="middle" hover responsive className="mb-0">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Contact</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Gender</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">KYC</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Subscribed</CTableHeaderCell>
                    <CTableHeaderCell>Location</CTableHeaderCell>
                    <CTableHeaderCell>Joined</CTableHeaderCell>
                    <CTableHeaderCell>Last Active</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredUsers.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan={9} className="text-center text-medium-emphasis py-4">
                        No users found
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  {filteredUsers.map((user) => (
                    <CTableRow key={user._id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/verifyUser/${user._id}`)}>
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
                        {user.phone && (
                          <div className="small text-medium-emphasis">{user.phone}</div>
                        )}
                      </CTableDataCell>

                      <CTableDataCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        {genderBadge(user.gender)}
                      </CTableDataCell>

                      <CTableDataCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        {kycBadge(user.kycInfo)}
                      </CTableDataCell>

                      <CTableDataCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        {user.isSubscribed
                          ? <CBadge color="success" style={{ fontSize: '0.72rem' }}>Yes</CBadge>
                          : <CBadge color="secondary" style={{ fontSize: '0.72rem' }}>No</CBadge>
                        }
                      </CTableDataCell>

                      <CTableDataCell onClick={(e) => e.stopPropagation()}>
                        <div className="small">{user.address || '—'}</div>
                      </CTableDataCell>

                      <CTableDataCell onClick={(e) => e.stopPropagation()}>
                        <div className="small">{formatDate(user.createdAt)}</div>
                      </CTableDataCell>

                      <CTableDataCell onClick={(e) => e.stopPropagation()}>
                        <div className="small">{formatDate(user.lastLogin)}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <CDropdown alignment="end">
                          <CDropdownToggle color="transparent" caret={false} className="p-0">
                            <CIcon icon={cilOptions} />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => navigate(`/verifyUser/${user._id}`)}>
                              View / Verify
                            </CDropdownItem>
                            <CDropdownItem onClick={() => navigate(`/editUser/${user._id}`)}>
                              Edit
                            </CDropdownItem>
                            <CDropdownItem divider />
                            <CDropdownItem onClick={() => handleSuspend(user)} className="text-warning">
                              <CIcon icon={cilBan} className="me-2" /> Suspend (30 days)
                            </CDropdownItem>
                            <CDropdownItem onClick={() => handleBan(user)} className="text-danger">
                              <CIcon icon={cilWarning} className="me-2" /> Ban
                            </CDropdownItem>
                            <CDropdownItem divider />
                            <CDropdownItem onClick={() => handleDelete(user)} className="text-danger">
                              Delete
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ── Filter Modal ── */}
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Filter Users</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6 className="mb-2">Gender</h6>
          {['all', 'Men', 'Women'].map((g) => (
            <div className="form-check mb-1" key={g}>
              <input
                className="form-check-input" type="radio" name="genderFilter"
                id={`gf-${g}`} value={g}
                checked={filterPreference.gender === g}
                onChange={() => handleFilterPreference(g, 'gender')}
              />
              <label className="form-check-label" htmlFor={`gf-${g}`}>
                {g === 'all' ? 'All' : g}
              </label>
            </div>
          ))}

          <hr />
          <h6 className="mb-2">Marital Status</h6>
          {['Single', 'Married', 'Divorced', 'Widowed'].map((s) => (
            <div className="form-check mb-1" key={s}>
              <input
                className="form-check-input" type="radio" name="maritalStatus"
                id={`ms-${s}`} value={s.toLowerCase()}
                checked={filterPreference.maritalStatus === s.toLowerCase()}
                onChange={() => handleFilterPreference(s.toLowerCase(), 'maritalStatus')}
              />
              <label className="form-check-label" htmlFor={`ms-${s}`}>{s}</label>
            </div>
          ))}

          <hr />
          <h6 className="mb-2">Location</h6>
          <CFormInput
            placeholder="Type country name…"
            value={filterPreference.country}
            onChange={(e) => handleFilterPreference(e.target.value, 'country')}
          />
        </CModalBody>
        <CModalFooter>
          <span className="me-auto text-medium-emphasis small">{filteredUsers.length} users match</span>
          <CButton color="secondary" onClick={clearModalFilters}>Clear</CButton>
          <CButton color="secondary" onClick={() => setIsModalOpen(false)}>Cancel</CButton>
          <CButton color="primary" onClick={() => setIsModalOpen(false)}>Apply</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Users
