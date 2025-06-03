// import { useSelector } from 'react-redux'
// import { CCard, CCol } from '@coreui/react'

// import { useEffect } from 'react'
// import DashboardCards from '../../widgets/DashboardCards'

// const UserEngagement = () => {
//   const { loading, error, dailyActiveUsers, monthlyActiveUsers } = useSelector(
//     (state) => state.user,
//   )
  

//   const dailyActiveUsersLength = dailyActiveUsers?.length || 0
//   const monthlyActiveUsersLength = monthlyActiveUsers?.length || 0
//   const cardData = [
//     {
//       id: 1,
//       title: 'Daily Active Users',
//       value: dailyActiveUsersLength,
//       color: '#4361ee',
//       path: '/dailyActiveUsers',
//     },
//     {
//       id: 2,
//       title: 'Monthly Active Users',
//       value: monthlyActiveUsersLength,
//       color: '#3a86ff',
//       path: '/monthlyActiveUsers',
//     },
//   ]
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

// export default UserEngagement



import { useSelector } from 'react-redux'
import { CCard, CCol, CButton, CButtonGroup } from '@coreui/react'
import { useEffect, useState } from 'react'
import DashboardCards from '../../widgets/DashboardCards'

const UserEngagement = () => {
  const { loading, error, dailyActiveUsers, monthlyActiveUsers } = useSelector(
    (state) => state.user,
  )
  
  const [selectedGender, setSelectedGender] = useState('All')
  const [filteredDailyActiveUsers, setFilteredDailyActiveUsers] = useState([])
  const [filteredMonthlyActiveUsers, setFilteredMonthlyActiveUsers] = useState([])
  
  const genderOptions = ['Men', 'Women', 'All']

  // Filter users based on selected gender
  useEffect(() => {
    const filterByGender = (users) => {
      if (selectedGender === 'All') {
        return users || []
      }
      return (users || []).filter(user => user.gender === selectedGender)
    }

    setFilteredDailyActiveUsers(filterByGender(dailyActiveUsers))
    setFilteredMonthlyActiveUsers(filterByGender(monthlyActiveUsers))
  }, [selectedGender, dailyActiveUsers, monthlyActiveUsers])

  const handleGenderChange = (gender) => {
    setSelectedGender(gender)
  }

  const dailyActiveUsersLength = filteredDailyActiveUsers?.length || 0
  const monthlyActiveUsersLength = filteredMonthlyActiveUsers?.length || 0
  
  const cardData = [
    {
      id: 1,
      title: 'Daily Active Users',
      value: dailyActiveUsersLength,
      color: '#4361ee',
      path: '/dailyActiveUsers',
    },
    {
      id: 2,
      title: 'Monthly Active Users',
      value: monthlyActiveUsersLength,
      color: '#3a86ff',
      path: '/monthlyActiveUsers',
    },
  ]

  return (
    <>
      {/* Gender Filter Buttons */}
      <div className="d-flex justify-content-end mb-3">
        <CButtonGroup>
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
      </div>

      <CCard className="mb-4">
        <CCol xs={12}>
          <DashboardCards items={cardData} />
        </CCol>
      </CCard>
      {/* {<WidgetsBrand className="mb-4" withCharts />} */}
    </>
  )
}

export default UserEngagement
