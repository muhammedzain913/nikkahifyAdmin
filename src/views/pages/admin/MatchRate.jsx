import React from 'react'
import { useSelector } from 'react-redux'
import { CCard, CCol } from '@coreui/react'
import DashboardCards from '../../widgets/DashboardCards'


const MatchRate = () => {
  const { weeklyMatches, monthlyMatches } = useSelector((state) => state.user)
  const weeklyMatchesLength = weeklyMatches?.length || 0
  const monthlyMatchesLength = monthlyMatches?.length || 0

  const cardData = [
    {
      id: 1,
      title: 'Weekly Matches',
      value: weeklyMatchesLength,
      color: '#4361ee',
      path: '/weeklyMatchedUsers',
    },
    {
      id: 2,
      title: 'Monthly Matches',
      value: monthlyMatchesLength,
      color: '#3a86ff',
      path: '/monthlyMatchedUsers',
    },
  ]
  return (
    <>
      <CCard className="mb-4">
        <CCol xs={12}>
          <DashboardCards items={cardData} />
        </CCol>
      </CCard>
      {/* {<WidgetsBrand className="mb-4" withCharts />} */}
    </>
  )
}

export default MatchRate
