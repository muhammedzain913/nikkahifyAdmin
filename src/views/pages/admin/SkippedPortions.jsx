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

const SkippedPortions = () => {
  const { profileCompletionMetrics } = useSelector((state) => state.user)
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          {/* <CTableHeaderCell scope="col">Heading</CTableHeaderCell> */}
          <CTableHeaderCell scope="col">Skipped Details</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {profileCompletionMetrics &&
          profileCompletionMetrics.map((portion, index) => (
            <>
              <CTableRow>

                {/* <CTableDataCell>Otto</CTableDataCell> */}
                <CTableDataCell>
                  {portion}
                </CTableDataCell>
              </CTableRow>
            </>
          ))}

        {}
      </CTableBody>
    </CTable>
  )
}

export default SkippedPortions
