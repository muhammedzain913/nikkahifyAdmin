import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CListGroup,
//   CListGroupItem,
//   CButton,
//   CSpinner,
//   CAlert,
//   CBadge,
//   CAvatar,
//   CNav,
//   CNavItem,
//   CNavLink,
//   CTabContent,
//   CTabPane,
//   CCardFooter,
// } from '@coreui/react'
import {
  cilUser,
  cilLocationPin,
  cilBriefcase,
  cilPhone,
  cilEnvelopeClosed,
  cilHeart,
  cilBook,
  cilPeople,
  cilStar,
  cilCheckCircle, // Add this
  cilX, // Add this
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'


import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
  CContainer,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CAlert,
  CProgress,
  CSpinner,
  CButton, // Add this
} from '@coreui/react'
import adminApi from '../../../api/adminApi'

const VerifyUser = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState(1)
  const { userId } = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await adminApi.getUserById(userId)
        console.log('from component', response.userData)
        await setUser(response.userData)
        setLoading(false)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [])

  useEffect(() => {
    console.log('afterfetch', user)
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const calculateAge = (dateString) => {
    const birthDate = new Date(dateString)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleSubmit = (action) => {
    const statusObj = {
      status: action,
      userId: userId,
    }

    adminApi.verifyUser(statusObj)
  }

  const renderInfoItem = (label, value) => (
    <CTableRow>
      <CTableDataCell className="text-medium-emphasis" style={{ width: '40%' }}>
        {label}
      </CTableDataCell>
      <CTableDataCell>{value || 'Not specified'}</CTableDataCell>
    </CTableRow>
  )

  const renderColorItem = (label, color) => (
    <CTableRow>
      <CTableDataCell className="text-medium-emphasis" style={{ width: '40%' }}>
        {label}
      </CTableDataCell>
      <CTableDataCell>
        <div className="d-flex align-items-center gap-2">
          <span>{color}</span>
          <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: color,
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
      </CTableDataCell>
    </CTableRow>
  )

  if (loading) {
    return (
      <CContainer
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '400px' }}
      >
        <CSpinner color="primary" />
      </CContainer>
    )
  }

  return (
    // <div>
    //     hihi
    // </div>
    <CContainer>
      {/* Header Card */}
      <CCard className="mb-4">
        <CCardBody className="bg-primary text-white">
          <CRow className="align-items-center">
            <CCol md={8}>
              <h2 className="mb-3 text-capitalize">{user.name}</h2>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  <CIcon icon={cilEnvelopeClosed} size="sm" />
                  <span>{user.email}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <CIcon icon={cilPhone} size="sm" />
                  <span>
                    {user.phoneCountry?.flag} {user.phoneCountry?.callingCode} {user.phone}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <CIcon icon={cilLocationPin} size="sm" />
                  <span>{user.address}</span>
                </div>
              </div>
            </CCol>
            <CCol md={4} className="text-end">
              <CBadge color={user.status === 'pending' ? 'warning' : 'success'} className="mb-2">
                Status: {user.status?.toUpperCase()}
              </CBadge>
              <div className="mt-2">
                <small>Profile Completion</small>
                <CProgress
                  value={user.profileCompletionPercentage}
                  className="mt-1"
                  color="success"
                >
                  <span className="text-white fw-bold">{user.profileCompletionPercentage}%</span>
                </CProgress>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CRow>
        {/* Basic Information */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <CIcon icon={cilUser} className="me-2" />
              Basic Information
            </CCardHeader>
            <CCardBody>
              <CTable small borderless responsive>
                <CTableBody>
                  {renderInfoItem('Gender', user.gender)}
                  {renderInfoItem(
                    'Date of Birth',
                    `${formatDate(user.dob)} (${calculateAge(user.dob)} years)`,
                  )}
                  {renderInfoItem('Marital Status', user.maritalStatus)}
                  {renderInfoItem('Guardian', user.guardian)}
                  {renderInfoItem('Languages Known', user.languagesKnown?.join(', '))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Physical Attributes */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <CIcon icon={cilUser} className="me-2" />
              Physical Attributes
            </CCardHeader>
            <CCardBody>
              <CTable small borderless responsive>
                <CTableBody>
                  {renderInfoItem('Height', user.height)}
                  {renderInfoItem('Weight', user.weight)}
                  {renderInfoItem('Body Type', user.bodyType)}
                  {renderInfoItem('Hair Type', user.hairType)}
                  {renderInfoItem('Hair Style', user.hairStyle)}
                  {renderInfoItem('Beard Type', user.beardType)}
                  {renderInfoItem('Wears Glasses', user.isWearGlass)}
                  {renderColorItem('Skin Tone', user.color)}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Education & Career */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <CIcon icon={cilBriefcase} className="me-2" />
              Education & Career
            </CCardHeader>
            <CCardBody>
              <CTable small borderless responsive>
                <CTableBody>
                  {renderInfoItem('Highest Education', user.highestEducation)}
                  {renderInfoItem('College', user.college)}
                  {renderInfoItem('Occupation', user.occupation)}
                  {renderInfoItem('Company', user.company)}
                  {renderInfoItem('Annual Income', `₹ ${user.annualIncome}`)}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Religious Information */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <CIcon icon={cilBook} className="me-2" />
              Religious Information
            </CCardHeader>
            <CCardBody>
              <CTable small borderless responsive>
                <CTableBody>
                  {renderInfoItem('Sect', user.sect)}
                  {renderInfoItem('Madhab', user.madhab)}
                  {renderInfoItem('Aqeedah', user.aqeedah)}
                  {renderInfoItem('Path', user.path)}
                  {renderInfoItem('Salah', user.salah)}
                  {renderInfoItem('Fasting', user.fasting)}
                  {renderInfoItem('Zakath', user.zakath)}
                  {renderInfoItem('Quran Recitation', user.recitationOfQuran)}
                  {renderInfoItem('Religious Preference', user.relegiousPreference)}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Partner Preferences */}
        <CCol md={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CIcon icon={cilHeart} className="me-2" />
              Partner Preferences
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <CTable small borderless responsive>
                    <CTableBody>
                      {renderInfoItem(
                        'Age Range',
                        `${user.preferredAge?.[0]} - ${user.preferredAge?.[1]}`,
                      )}
                      {renderInfoItem(
                        'Height Range',
                        `${user.preferredHeightRange?.[0]} - ${user.preferredHeightRange?.[1]}`,
                      )}
                      {renderInfoItem('Education', user.preferredEducation)}
                      {renderInfoItem('Profession', user.preferredProfession)}
                      {renderInfoItem('Sect', user.preferredSect)}
                    </CTableBody>
                  </CTable>
                </CCol>
                <CCol md={6}>
                  <CTable small borderless responsive>
                    <CTableBody>
                      {renderInfoItem('Body Type', user.preferredBodyType)}
                      {renderInfoItem('Location', user.preferredLocation)}
                      {renderInfoItem(
                        'Distance Range',
                        `${user.preferredDistance?.[0]} - ${user.preferredDistance?.[1]}`,
                      )}
                      {renderInfoItem('Open to Requests From', user.openToRequestFrom?.join(', '))}
                      {renderColorItem('Preferred Skin Tone', user.preferredColor)}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Wedding Expectations */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <CIcon icon={cilStar} className="me-2" />
              Wedding Expectations
            </CCardHeader>
            <CCardBody>
              <CTable small borderless responsive>
                <CTableBody>
                  {renderInfoItem('Nikkah Expectation', user.nikkahExpectation)}
                  {renderInfoItem('Wedding Expectations', user.weddingExpectations)}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Introduction */}
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <CIcon icon={cilPeople} className="me-2" />
              Introduction
            </CCardHeader>
            <CCardBody>
              <CAlert color="light" className="mb-0">
                {user.introduction || 'No introduction provided'}
              </CAlert>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Account Information */}
        <CCol md={12}>
          <CCard className="mb-4">
            <CCardHeader>Account Information</CCardHeader>
            <CCardBody>
              <CTable small borderless responsive>
                <CTableBody>
                  {renderInfoItem('User ID', user._id)}
                  {renderInfoItem('Roles', user.roles?.join(', '))}
                  {renderInfoItem('Profile Status', user.status)}
                  {renderInfoItem('Profile Completion', `${user.profileCompletionPercentage}%`)}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Admin Actions */}
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Admin Actions</strong>
          </CCardHeader>
          <CCardBody>
            <div className="d-flex justify-content-center gap-3">
              <CButton
                onClick={() => {
                  handleSubmit('approved')
                }}
                color="success"
                size="lg"
                className="px-5"
              >
                <CIcon icon={cilCheckCircle} className="me-2" />
                Approve User
              </CButton>
              <CButton
                onClick={() => {
                  handleSubmit('rejected')
                }}
                color="danger"
                size="lg"
                className="px-5"
              >
                <CIcon icon={cilX} className="me-2" />
                Reject User
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CContainer>
  )
}

export default VerifyUser
