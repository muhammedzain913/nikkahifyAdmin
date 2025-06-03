import React, { useEffect } from 'react'
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

const PromotingUsers = () => {
  const supportingUsers = useSelector((state) => state.user.supportedUsers)
  const getBadgeColor = (shareType) => {
    const colors = {
      whatsapp: 'success',
      instagram: 'danger',
      telegram: 'info',
      facebook: 'primary',
      sms: 'warning',
      email: 'secondary',
      copy_link: 'dark',
    }
    return colors[shareType] || 'secondary'
  }
  useEffect(() => {
    console.log('supporting users', supportingUsers)
  })
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Id</CTableHeaderCell>
          <CTableHeaderCell scope="col">Name</CTableHeaderCell>
          {/* <CTableHeaderCell scope="col">Heading</CTableHeaderCell> */}
          <CTableHeaderCell scope="col">Shared Platforms</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {supportingUsers &&
          supportingUsers.map((user, index) => (
            <>
              <CTableRow>
                <CTableHeaderCell scope="row">{user.userId}</CTableHeaderCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                {/* <CTableDataCell>Otto</CTableDataCell> */}
                <CTableDataCell>
                  <div className="d-flex flex-wrap gap-1">
                    {user.shareTypes.map((platform, index) => (
                      <CBadge
                        key={index}
                        color={getBadgeColor(platform)}
                        shape="rounded-pill"
                        size="sm"
                      >
                        {platform}
                      </CBadge>
                    ))}
                  </div>
                </CTableDataCell>
              </CTableRow>
            </>
          ))}

        {}
      </CTableBody>
    </CTable>
  )
}

export default PromotingUsers
