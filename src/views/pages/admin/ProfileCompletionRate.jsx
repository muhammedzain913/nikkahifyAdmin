import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CCard, CCol } from '@coreui/react'
import DashboardCards from '../../widgets/DashboardCards'

const ProfileCompletionRate = () => {
  const actualUsers = useSelector((x) => x.user.users)
  const completedProfiles = actualUsers.filter((x) => x.profileCompletionPercentage == 100)
  const comppletedProfileLength = completedProfiles.length
  const mostSkippedSections = useSelector((x) => x.user.profileCompletionMetrics)
  const mostSkippedSectionsLength = mostSkippedSections.length

  useEffect(() => {
    console.log('this is ', actualUsers)
    console.log('this is completed ', completedProfiles)
  })

  const cardData = [
    {
      id: 1,
      title: '100% Completed Profiles',
      value: comppletedProfileLength,
      color: '#4361ee',
      path: '/completedProfileUsers',
    },
    {
      id: 2,
      title: 'Sections Skipped By Most Users',
      value: mostSkippedSectionsLength,
      color: '#4361ee',
      path: '/skippedPortion',
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

export default ProfileCompletionRate
