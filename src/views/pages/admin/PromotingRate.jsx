// import React from 'react'
// import { useSelector } from 'react-redux'
// import { CCard, CCol } from '@coreui/react'
// import { useEffect } from 'react'
// import DashboardCards from '../../widgets/DashboardCards'

// const PromotingRate = () => {
//   const { supportedUsers } = useSelector((state) => state.user)
//   const supportedUsersLength = supportedUsers?.length || 0
//   const cardData = [
//     {
//       id: 1,
//       title: 'Promoting Users',
//       value: supportedUsersLength,
//       color: '#4361ee',
//       path: '/promotingUsers',
//     },
//   ]

//   useEffect(()=>{
//     console.log('hihisupport',supportedUsers)
//   })
//   return (
//     <>
//       <CCard className="mb-4">
//         <CCol xs={12}>
//           <DashboardCards items={cardData} />
//         </CCol>
//       </CCard>
//       {/* {<WidgetsBrand className="mb-4" withCharts />} */}
//     </>
//   )
// }

// export default PromotingRate



import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CCard, CCol, CButton, CButtonGroup } from '@coreui/react'
import DashboardCards from '../../widgets/DashboardCards'

const PromotingRate = () => {
  const { supportedUsers } = useSelector((state) => state.user)
  
  const [selectedGender, setSelectedGender] = useState('All')
  const [filteredSupportedUsers, setFilteredSupportedUsers] = useState([])
  
  const genderOptions = ['Men', 'Women', 'All']

  // Filter users based on selected gender
  useEffect(() => {
    if (selectedGender === 'All') {
      setFilteredSupportedUsers(supportedUsers || [])
    } else {
      const filtered = (supportedUsers || []).filter(user => user.gender === selectedGender)
      setFilteredSupportedUsers(filtered)
    }
  }, [selectedGender, supportedUsers])

  const handleGenderChange = (gender) => {
    setSelectedGender(gender)
  }

  const supportedUsersLength = filteredSupportedUsers?.length || 0
  
  const cardData = [
    {
      id: 1,
      title: 'Promoting Users',
      value: supportedUsersLength,
      color: '#4361ee',
      path: '/promotingUsers',
    },
  ]

  useEffect(() => {
    console.log('hihisupport', supportedUsers)
    console.log('filtered supportedUsers', filteredSupportedUsers)
    console.log('selected gender', selectedGender)
  }, [supportedUsers, filteredSupportedUsers, selectedGender])

  return (
    <>
      {/* Gender Filter Buttons */}
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

      <div style={{ clear: 'both', marginBottom: '20px' }}></div>

      <CCard className="mb-4">
        <CCol xs={12}>
          <DashboardCards items={cardData} />
        </CCol>
      </CCard>
      {/* {<WidgetsBrand className="mb-4" withCharts />} */}
    </>
  )
}

export default PromotingRate
