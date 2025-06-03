import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cilOptions, cilPeople, cilUser, cilCheckCircle, cilBan, cilFilter } from '@coreui/icons'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
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
import { Country, State, City } from 'country-state-city'

const WeeklyMatchedUsers = () => {
  const weeklyMatchedUsers = useSelector((x) => x.user.weeklyMatches)
  const navigate = useNavigate()
  const [searchKey, setSearchKey] = useState()
  const [countries, setCountries] = useState([])
  const [countryKey, setCountryKey] = useState()

  const [filterPreference, setFilterPreference] = useState({
    country: '',
    gender: '',
    maritalStatus: '',
  })

  const [filteredMatches, setFilteredUsers] = useState(weeklyMatchedUsers)

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
    console.log('datenotfound')
    if (!dateString) return 'N/A'
    console.log('date found ')
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleFilter = (text) => {
    const updatedData = actualUsers.filter((item) => {
      const item_data = `${item.name.toUpperCase()})`
      const text_data = text.toUpperCase()
      return item_data.indexOf(text_data) > -1
    })
    setFilteredUsers(updatedData)
    setSearchKey(text)
  }

  const handleFilterPreference = (value, name) => {
    setFilterPreference({ ...filterPreference, [name]: value })
  }

  useEffect(() => {
    const fetchCountries = () => {
      const countriesData = Country.getAllCountries()
      setCountries(countriesData)
    }
    fetchCountries()
  }, [])

  const applyFilters = () => {
    // If no criteria are selected, show all users
    if (!filterPreference.country && !filterPreference.gender && !filterPreference.maritalStatus) {
      setFilteredUsers(actualUsers)
      setIsModalOpen(false)
      return
    }

    // Filter users based on selected criteria
    const filtered = actualUsers.filter((user) => {
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

    // Update the filtered users and close the modal
    setFilteredUsers(filtered)
    setIsModalOpen(false)
  }
  useEffect(() => {
    console.log('dau', weeklyMatchedUsers)
  })
  return (
    <>
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
              onChange={(text) => {
                handleFilter(text.target.value)
              }}
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
          <CButton
            onClick={() => {
              setIsModalOpen(!isModalOpen)
            }}
            color="light"
          >
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
                    <CTableHeaderCell>User A</CTableHeaderCell>
                    <CTableHeaderCell>User B</CTableHeaderCell>
                    <CTableHeaderCell>Matched Date</CTableHeaderCell>

                    {/* <CTableHeaderCell className="text-center">Actions</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredMatches.map((match) => (
                    <CTableRow key={match._id}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={match.avatar} status={match.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold">{match.senderId.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold">{match.receiverId.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>{formatDate(match.createdAt)}</CTableDataCell>
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
                    value="Woman"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'gender')
                    }}
                  />
                  <label className="form-check-label" htmlFor="genderFemale">
                    Woman
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
                {/* <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="locationNY"
                            value="New York"
                          />
                          <label className="form-check-label" htmlFor="locationNY">
                            New York, USA
                          </label>
                        </div> */}
                {countries.map((item, index) => {
                  return (
                    <div className="form-check mb-2" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="locationRadio" // Important: all radio buttons must share the same name
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

                {/* <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="locationTokyo"
                            value="Tokyo"
                          />
                          <label className="form-check-label" htmlFor="locationTokyo">
                            Tokyo, Japan
                          </label>
                        </div> */}
                {/* <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="locationParis"
                            value="Paris"
                          />
                          <label className="form-check-label" htmlFor="locationParis">
                            Paris, France
                          </label>
                        </div> */}
                {/* <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="locationSydney"
                            value="Sydney"
                          />
                          <label className="form-check-label" htmlFor="locationSydney">
                            Sydney, Australia
                          </label>
                        </div> */}
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
            <div className="me-auto text-muted">42 users match these filters</div>
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

export default WeeklyMatchedUsers
