import React, { useEffect, useState } from 'react'

import {
  CAvatar,
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilOptions, cilPeople, cilWarning, cilCheckCircle, cilBan, cilFilter } from '@coreui/icons'
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButtonGroup,
} from '@coreui/react'
import { Country, State, City } from 'country-state-city'

// Import default avatar placeholder
import defaultAvatar from '../../../assets/images/avatars/1.jpg'
import { useSelector } from 'react-redux'
import adminApi from '../../../api/adminApi'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  // Use users array from redux store in your actual implementation
  const actualUsers = useSelector((x) => x.user.users)
  const [loading, setLoading] = useState(true)
  const [selectedGender, setSelectedGender] = useState('All')
  const navigate = useNavigate()

  const [searchKey, setSearchKey] = useState('')
  const [countries, setCountries] = useState([])
  const [countryKey, setCountryKey] = useState()

  const genderOptions = ['Men', 'Women', 'All']

  const [filterPreference, setFilterPreference] = useState({
    country: '',
    gender: '',
    maritalStatus: '',
  })

  const [filteredUsers, setFilteredUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Function to determine user status badge color
  const getBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'secondary'
      case 'pending':
        return 'warning'
      case 'suspended':
        return 'danger'
      default:
        return 'primary'
    }
  }

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  // Get gender filtered users
  const getGenderFilteredUsers = () => {
    if (selectedGender === 'All') {
      return actualUsers
    }
    return actualUsers.filter((user) => user.gender === selectedGender)
  }

  // Apply all filters (gender, search, and modal filters)
  const applyAllFilters = () => {
    let users = getGenderFilteredUsers()

    // Apply search filter
    if (searchKey && searchKey.trim()) {
      users = users.filter((item) => {
        const item_data = `${item.name.toUpperCase()}`
        const text_data = searchKey.toUpperCase()
        return item_data.indexOf(text_data) > -1
      })
    }

    // Apply modal filters (country, gender from modal, marital status)
    if (filterPreference.country || filterPreference.gender || filterPreference.maritalStatus) {
      users = users.filter((user) => {
        // Check if country is in the address string
        const matchesCountry =
          !filterPreference.country ||
          (user.address &&
            user.address.toLowerCase().includes(filterPreference.country.toLowerCase()))

        const matchesGender =
          !filterPreference.gender ||
          filterPreference.gender === 'all' ||
          user.gender === filterPreference.gender

        const matchesMaritalStatus =
          !filterPreference.maritalStatus || user.maritalStatus === filterPreference.maritalStatus

        // User must match ALL selected criteria
        return matchesCountry && matchesGender && matchesMaritalStatus
      })
    }

    setFilteredUsers(users)
  }

  // Handle search filter
  const handleFilter = (text) => {
    setSearchKey(text)
  }

  // Handle gender selection change
  const handleGenderChange = (gender) => {
    setSelectedGender(gender)
  }

  const handleFilterPreference = (value, name) => {
    setFilterPreference({ ...filterPreference, [name]: value })
  }

  // Apply filters from modal
  const applyFilters = () => {
    setIsModalOpen(false)
    // applyAllFilters will be called by useEffect
  }

  // Clear modal filters
  const clearModalFilters = () => {
    setFilterPreference({
      country: '',
      gender: '',
      maritalStatus: '',
    })
    setIsModalOpen(false)
  }

  // Effect to apply all filters when dependencies change
  useEffect(() => {
    applyAllFilters()
  }, [actualUsers, selectedGender, searchKey, filterPreference])

  // Effect to fetch countries
  useEffect(() => {
    const fetchCountries = () => {
      const countriesData = Country.getAllCountries()
      setCountries(countriesData)
    }
    fetchCountries()
  }, [])

  const handleDelete = (userId) => {
    try {
      adminApi.deleteUser(userId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSuspendUser = async (user) => {
    console.log('data', user)
    try {
      setLoading(true)
      const updatedUser = {
        ...user,
        isSuspended: true,
        suspensionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'suspended',
      }
      await adminApi.updateUser(user._id, updatedUser)
      alert('User updated successfully!')
      navigate('/admin/users') // Navigate back to users list
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  const handleBanUser = async (user) => {
    console.log('data', user)
    try {
      setLoading(true)
      const updatedUser = {
        ...user,
        isBanned: true,
        status: 'banned',
      }
      await adminApi.updateUser(user._id, updatedUser)
      alert('User updated successfully!')
      navigate('/admin/users') // Navigate back to users list
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  const handleUnbanUser = async (user) => {
    console.log('data', user)
    try {
      setLoading(true)
      const updatedUser = {
        ...user,
        isBanned: false,
        status: 'pending',
      }
      await adminApi.updateUser(user._id, updatedUser)
      alert('User updated successfully!')
      navigate('/admin/users') // Navigate back to users list
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  const handleUnsuspendUser = async (user) => {
    console.log('data', user)
    try {
      setLoading(true)
      const updatedUser = {
        ...user,
        isSuspended: false,
        suspensionEndDate: null,
        status: 'pending',
      }
      await adminApi.updateUser(user._id, updatedUser)
      alert('User updated successfully!')
      navigate('/admin/users') // Navigate back to users list
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CButtonGroup className="float-end me-3">
        {genderOptions.map((gender) => (
          <CButton
            onClick={() => handleGenderChange(gender)}
            color="outline-secondary"
            key={gender}
            className="mx-0"
            active={gender === selectedGender}
          >
            {gender}
          </CButton>
        ))}
      </CButtonGroup>

      <CRow className="mb-3 mx-2 align-items-center" style={{ marginTop: '20px' }}>
        <CCol xs="10" md="11">
          <div className="position-relative">
            <CFormInput
              type="text"
              placeholder="Search..."
              className="ps-5 shadow-sm"
              style={{
                height: '42px',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.3s ease',
                borderRadius: '0',
                border: '1px solid #dee2e6',
              }}
              value={searchKey}
              onChange={(e) => handleFilter(e.target.value)}
            />
            <div
              className="position-absolute"
              style={{
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6c757d',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </CCol>
        <CCol xs="2" md="1" className="d-flex align-items-center">
          <CButton onClick={() => setIsModalOpen(!isModalOpen)} color="light">
            <CIcon icon={cilFilter} />
            <span className="d-none d-md-inline ms-1">Filter</span>
          </CButton>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive striped>
                <CTableHead className="text-nowrap bg-light">
                  <CTableRow>
                    <CTableHeaderCell style={{ width: '50px' }}></CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell>Registration Date</CTableHeaderCell>
                    <CTableHeaderCell>Last Login</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredUsers.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={user.avatar} status={user.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold">{user.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{user.email}</div>
                        {user.phone && (
                          <div className="small text-body-secondary">{user.phone}</div>
                        )}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CBadge color={getBadgeColor(user.status)}>{user.status}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{formatDate(user.createdAt)}</CTableDataCell>
                      <CTableDataCell>{formatDate(user.lastLogin)}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CDropdown alignment="end">
                          <CDropdownToggle color="transparent" caret={false} className="p-0">
                            <div
                              className="text-center"
                              style={{ width: '24px', cursor: 'pointer' }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <circle cx="8" cy="4" r="1.5" />
                                <circle cx="8" cy="8" r="1.5" />
                                <circle cx="8" cy="12" r="1.5" />
                              </svg>
                            </div>
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => navigate(`/verifyUser/${user._id}`)}>
                              Verify User
                            </CDropdownItem>
                            <CDropdownItem onClick={() => navigate(`/editUser/${user._id}`)}>
                              Edit User
                            </CDropdownItem>
                            <CDropdownItem
                              onClick={() => handleDelete(user._id)}
                              className="text-danger"
                            >
                              Delete User
                            </CDropdownItem>
                            {user.isSuspended === false ? (
                              <CDropdownItem
                                onClick={() => handleSuspendUser(user)}
                                className="text-warning"
                              >
                                <CIcon icon={cilBan} className="me-2" />
                                Suspend User
                              </CDropdownItem>
                            ) : (
                              <CDropdownItem
                                onClick={() => handleUnsuspendUser(user)}
                                className="text-success"
                              >
                                <CIcon icon={cilCheckCircle} className="me-2" />
                                Unsuspend User
                              </CDropdownItem>
                            )}

                            {user.isBanned === false ? (
                              <CDropdownItem
                                onClick={() => handleBanUser(user)}
                                className="text-danger"
                              >
                                <CIcon icon={cilWarning} className="me-2" />
                                Ban User
                              </CDropdownItem>
                            ) : (
                              <CDropdownItem
                                onClick={() => handleUnbanUser(user)}
                                className="text-info"
                              >
                                <CIcon icon={cilCheckCircle} className="me-2" />
                                Unban User
                              </CDropdownItem>
                            )}
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

        <CModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="lg"
          aria-labelledby="FilterModalLabel"
        >
          <CModalHeader>
            <CModalTitle id="FilterModalLabel">Filter Users</CModalTitle>
          </CModalHeader>
          <CModalBody style={{ minHeight: '400px', padding: '20px' }}>
            {/* Gender Filter Section */}
            <div className="mb-4">
              <h5 className="mb-3">Gender</h5>
              <div className="d-flex flex-column">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genderFilter"
                    id="genderAll"
                    value="all"
                    defaultChecked
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'gender')
                    }}
                  />
                  <label className="form-check-label" htmlFor="genderAll">
                    All
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genderFilter"
                    id="genderMale"
                    value="Men"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'gender')
                    }}
                  />
                  <label className="form-check-label" htmlFor="genderMale">
                    Men
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genderFilter"
                    id="genderFemale"
                    value="Women"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'gender')
                    }}
                  />
                  <label className="form-check-label" htmlFor="genderFemale">
                    Women
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genderFilter"
                    id="genderOther"
                    value="other"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'gender')
                    }}
                  />
                  <label className="form-check-label" htmlFor="genderOther">
                    Other
                  </label>
                </div>
              </div>
            </div>

            <hr />

            {/* Location Filter Section */}
            <div className="mb-4">
              <h5 className="mb-3">Location</h5>
              <CFormInput
                type="text"
                id="locationSearch"
                placeholder="Search locations..."
                className="mb-3"
              />
              <div className="location-options" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {countries.map((item, index) => {
                  return (
                    <div className="form-check mb-2" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="locationRadio"
                        id={`location${index}`}
                        value={item.name}
                        onChange={(event) => {
                          handleFilterPreference(event.target.value, 'country')
                        }}
                      />
                      <label className="form-check-label" htmlFor={`location${index}`}>
                        {item.name}
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>

            <hr />

            {/* Marital Status Filter Section */}
            <div className="mb-4">
              <h5 className="mb-3">Marital Status</h5>
              <div className="d-flex flex-column">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    id="statusSingle"
                    value="single"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'maritalStatus')
                    }}
                  />
                  <label className="form-check-label" htmlFor="statusSingle">
                    Single
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    id="statusMarried"
                    value="married"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'maritalStatus')
                    }}
                  />
                  <label className="form-check-label" htmlFor="statusMarried">
                    Married
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    id="statusDivorced"
                    value="divorced"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'maritalStatus')
                    }}
                  />
                  <label className="form-check-label" htmlFor="statusDivorced">
                    Divorced
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    id="statusWidowed"
                    value="widowed"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'maritalStatus')
                    }}
                  />
                  <label className="form-check-label" htmlFor="statusWidowed">
                    Widowed
                  </label>
                </div>
              </div>
            </div>
          </CModalBody>
          <CModalFooter>
            <div className="me-auto text-muted">
              {filteredUsers.length} users match these filters
            </div>
            <CButton color="secondary" onClick={clearModalFilters}>
              Clear Filters
            </CButton>
            <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CButton>
            <CButton onClick={applyFilters} color="primary">
              Apply Filters
            </CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  )
}

export default Users
