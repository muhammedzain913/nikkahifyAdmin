import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import authApi from '../../../api/userApi'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import { registerUser } from '../../../Redux/Slices/userSlice'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

const Register = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    userName: '',
    password: '',
    email: '',
  })

  const handleInputChange = (name, value) => {
    console.log(name, value)
    setUserInfo({
      ...userInfo,
      [name]: value,
    })
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleRegister = async () => {
    const { email, password, userName } = userInfo

    setLoading(true)
    if (!email || !password || !userName) {
      Alert.alert('Error', 'Please fill all the fields')
      return
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address')
      return
    }
    try {
      console.log('hi')
      const resultAction = await dispatch(registerUser(userInfo))
      unwrapResult(resultAction)
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
    setLoading(false)
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  {/* <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={userInfo.email}
                      onChange={(email) => handleInputChange('email', email.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="User Name"
                      autoComplete="email"
                      type="text"
                      value={userInfo.userName}
                      onChange={(userName) => handleInputChange('userName', userName.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={userInfo.password}
                      onChange={(password) => handleInputChange('password', password.target.value)}
                    />
                  </CInputGroup>

                  {/* <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup> */}
                  <div className="d-grid">
                    <CButton onClick={handleRegister} color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
