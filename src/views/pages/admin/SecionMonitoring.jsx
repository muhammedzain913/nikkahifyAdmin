// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { CCard, CCardBody, CCardHeader } from '@coreui/react'
// import DashboardCards from '../../widgets/DashboardCards'
// import { CButtonGroup, CButton } from '@coreui/react'

// // Helper to get most selected item
// const getMostSelected = (arr) => {
//   if (!arr || arr.length === 0) return { name: 'N/A', count: 0 }
//   return arr.reduce((max, item) => (item.count > max.count ? item : max))
// }

// // Helper to format field names nicely
// const formatTitle = (str) => str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())

// // Optional: give each card a color
// const colors = ['#4ECDC4', '#FF6B6B', '#1A535C', '#FFA41B', '#5F27CD', '#10AC84']
// const getColor = (i) => colors[i % colors.length]

// // Define how fields are grouped into sections
// // const metricGroups = {
// //   'Identity & Background': ['path', 'aqeedah', 'sect'],
// //   Appearance: ['bodyType', 'complexion', 'height'],
// //   'Religious Practice': ['salah', 'recitationOfQuran', 'hijab'],
// // }

// const metricGroups = {
//   'Identity & Background': [
//     'path',
//     'aqeedah',
//     'sect',
//     'gender',
//     'maritalStatus',
//     'motherTongue',
//     'address',
//   ],
//   Appearance: ['bodyType', 'height', 'weight', 'hairType', 'hairStyle', 'beardType'],
//   'Religious Practice': ['salah', 'recitationOfQuran', 'fasting', 'zakath'],
//   'Education and Work': [
//     'highestEducation',
//     'college',
//     'occupation',
//     'company',
//     'employedIn',
//     'annualIncome',
//   ],
//   Preferences: [
//     'preferredLocation',
//     'preferredColor',
//     'preferredBodyType',
//     'preferredSect',
//     'preferredPath',
//     'preferredMaritalStatus',
//     'preferredEducation',
//     'preferredProfession',
//     'relegiousPreference',
//   ],
// }

// const SectionMonitoring = () => {
//   const metrics = useSelector((state) => state.user.userSelectionMetrics)
//   const [selectedGender, setSelectedGender] = useState('All')

//   const handleGenderSelection = (gender) => {
//     setSelectedGender(gender)
//   }

//   // <div className="section-monitoring">
//   //   {Object.entries(metricGroups).map(([sectionTitle, fields], sectionIndex) => {
//   //     const sectionCards = fields.map((field, fieldIndex) => {
//   //       const mostSelected = getMostSelected(metrics?.[field])
//   //       return {
//   //         id: `${sectionIndex}-${fieldIndex}`,
//   //         title: `Most Selected ${formatTitle(field)}`,
//   //         value: `${mostSelected.name} (${mostSelected.count})`,
//   //         color: getColor(fieldIndex),
//   //       }
//   //     })

//   //     return (
//   //       <CCard className="mb-4" key={sectionTitle}>
//   //         <CCardHeader>{sectionTitle}</CCardHeader>
//   //         <CCardBody>
//   //           <DashboardCards items={sectionCards} />
//   //         </CCardBody>
//   //       </CCard>
//   //     )
//   //   })}
//   // </div>

//   if (selectedGender === 'All')
//     return (
//       <>
//         <CButtonGroup className="float-end me-3">
//           {['Men', 'Women', 'All'].map((value) => (
//             <CButton
//               onClick={() => handleGenderSelection(value)}
//               color="outline-secondary"
//               key={value}
//               className="mx-0"
//               active={value === 'All'}
//             >
//               {value}
//             </CButton>
//           ))}
//         </CButtonGroup>

//         <div>
//           {Object.entries(metricGroups).map(([sectionTitle, feilds]) => {
//             const sectionCards = feilds.map((feild, index) => {
//               const mostSelected = getMostSelected(metrics?.[feild])
//               return {
//                 id: `${index}-${index}`,
//                 title: `Most Selected ${formatTitle(feild)}`,
//                 value: `${mostSelected.name} (${mostSelected.count})`,
//                 color: getColor(index),
//               }
//             })

//             return (
//               <CCard className="mb-4" key={sectionTitle}>
//                 <CCardHeader>{sectionTitle}</CCardHeader>
//                 <CCardBody>
//                   <DashboardCards items={sectionCards} />
//                 </CCardBody>
//               </CCard>
//             )
//           })}
//         </div>
//       </>
//     )

//   if (selectedGender === 'Men')
//     return (
//       <>
//         <CButtonGroup className="float-end me-3">
//           {['Men', 'Women', 'All'].map((value) => (
//             <CButton
//               onClick={() => handleGenderSelection(value)}
//               color="outline-secondary"
//               key={value}
//               className="mx-0"
//               active={value === 'All'}
//             >
//               {value}
//             </CButton>
//           ))}
//         </CButtonGroup>

//         <div>
//           {Object.entries(metricGroups).map(([sectionTitle, feilds]) => {
//             const sectionCards = feilds.map((feild, index) => {
//               const mostSelected = getMostSelected(metrics?.[feild])
//               return {
//                 id: `${index}-${index}`,
//                 title: `Most Selected ${formatTitle(feild)}`,
//                 value: `${mostSelected.name} (${mostSelected.count})`,
//                 color: getColor(index),
//               }
//             })

//             return (
//               <CCard className="mb-4" key={sectionTitle}>
//                 <CCardHeader>{sectionTitle}</CCardHeader>
//                 <CCardBody>
//                   <DashboardCards items={sectionCards} />
//                 </CCardBody>
//               </CCard>
//             )
//           })}
//         </div>
//       </>
//     )
// }

// export default SectionMonitoring


import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CCard, CCardBody, CCardHeader, CButtonGroup, CButton } from '@coreui/react'
import DashboardCards from '../../widgets/DashboardCards'

// Helper to get most selected item
const getMostSelected = (arr) => {
  if (!arr || arr.length === 0) return { name: 'N/A', count: 0 }
  return arr.reduce((max, item) => (item.count > max.count ? item : max))
}

// Helper to format field names nicely
const formatTitle = (str) => str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())

// Optional: give each card a color
const colors = ['#4ECDC4', '#FF6B6B', '#1A535C', '#FFA41B', '#5F27CD', '#10AC84']
const getColor = (i) => colors[i % colors.length]

// Metric groups for display
const metricGroups = {
  'Identity & Background': ['path', 'aqeedah', 'sect', 'gender', 'maritalStatus', 'motherTongue', 'address'],
  Appearance: ['bodyType', 'height', 'weight', 'hairType', 'hairStyle', 'beardType'],
  'Religious Practice': ['salah', 'recitationOfQuran', 'fasting', 'zakath'],
  'Education and Work': [
    'highestEducation',
    'college',
    'occupation',
    'company',
    'employedIn',
    'annualIncome',
  ],
  Preferences: [
    'preferredLocation',
    'preferredColor',
    'preferredBodyType',
    'preferredSect',
    'preferredPath',
    'preferredMaritalStatus',
    'preferredEducation',
    'preferredProfession',
    'relegiousPreference',
  ],
}

const SectionMonitoring = () => {
  const metrics = useSelector((state) => state.user.userSelectionMetrics)
  const [selectedGender, setSelectedGender] = useState('All')

  const genderOptions = ['Men', 'Women', 'All']
  const selectedMetrics = metrics?.[selectedGender] || {}

  return (
    <>
      <CButtonGroup className="float-end me-3">
        {genderOptions.map((gender) => (
          <CButton
            onClick={() => setSelectedGender(gender)}
            color="outline-secondary"
            key={gender}
            className="mx-0"
            active={gender === selectedGender}
          >
            {gender}
          </CButton>
        ))}
      </CButtonGroup>

      <div className="section-monitoring">
        {Object.entries(metricGroups).map(([sectionTitle, fields], sectionIndex) => {
          const sectionCards = fields.map((field, fieldIndex) => {
            const mostSelected = getMostSelected(selectedMetrics?.[field])
            return {
              id: `${sectionIndex}-${fieldIndex}`,
              title: `Most Selected ${formatTitle(field)}`,
              value: `${mostSelected.name} (${mostSelected.count})`,
              color: getColor(fieldIndex),
            }
          })

          return (
            <CCard className="mb-4" key={sectionTitle}>
              <CCardHeader>{sectionTitle}</CCardHeader>
              <CCardBody>
                <DashboardCards items={sectionCards} />
              </CCardBody>
            </CCard>
          )
        })}
      </div>
    </>
  )
}

export default SectionMonitoring

