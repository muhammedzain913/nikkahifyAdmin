import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CBadge,
} from '@coreui/react'
import { useSelector } from 'react-redux'

const CompletedProfileUsers = () => {
  const actualUsers = useSelector((x) => x.user.users)
  const completedProfiles = actualUsers.filter((x) => x.profileCompletionPercentage == 100)
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Id</CTableHeaderCell>
          <CTableHeaderCell scope="col">Name</CTableHeaderCell>
          {/* <CTableHeaderCell scope="col">Heading</CTableHeaderCell> */}
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {completedProfiles &&
          completedProfiles.map((user, index) => (
            <>
              <CTableRow>
                <CTableHeaderCell scope="row">{user._id}</CTableHeaderCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                {/* <CTableDataCell>Otto</CTableDataCell> */}
              </CTableRow>
            </>
          ))}

        {}
      </CTableBody>
    </CTable>
  )
}

export default CompletedProfileUsers
