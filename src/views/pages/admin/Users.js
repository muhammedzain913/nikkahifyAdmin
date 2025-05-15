// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CSpinner,
//   CBadge,
// } from '@coreui/react'
// import {
//   cibCcAmex,
//   cibCcApplePay,
//   cibCcMastercard,
//   cibCcPaypal,
//   cibCcStripe,
//   cibCcVisa,
//   cibGoogle,
//   cibFacebook,
//   cibLinkedin,
//   cifBr,
//   cifEs,
//   cifFr,
//   cifIn,
//   cifPl,
//   cifUs,
//   cibTwitter,
//   cilCloudDownload,
//   cilPeople,
//   cilUser,
//   cilUserFemale,
// } from '@coreui/icons'

// import {
//     CAvatar,
//     CButton,
//     CButtonGroup,
//     CCard,
//     CCardBody,
//     CCardFooter,
//     CCardHeader,
//     CCol,
//     CProgress,
//     CRow,
//     CTable,
//     CTableBody,
//     CTableDataCell,
//     CTableHead,
//     CTableHeaderCell,
//     CTableRow,
//   } from '@coreui/react'
// import avatar1 from '../../../../src/assets/images/avatars/1.jpg'
// import avatar2 from '../../../../src/assets/images/avatars/2.jpg'
// import avatar3 from '../../../../src/assets/images/avatars/3.jpg'
// import avatar4 from '../../../../src/assets/images/avatars/4.jpg'
// import avatar5 from '../../../../src/assets/images/avatars/5.jpg'
// import avatar6 from '../../../../src/assets/images/avatars/6.jpg'
// import { getAllUsers } from '../../../Redux/Slices/userSlice' // Adjust the import path
// import CIcon from '@coreui/icons-react'
// const Users = () => {
//   const dispatch = useDispatch()
//   const { users, loading, error } = useSelector((state) => state.user)

//   const tableExample = [
//     {
//       avatar: { src: avatar1, status: 'success' },
//       user: {
//         name: 'Yiorgos Avraamu',
//         new: true,
//         registered: 'Jan 1, 2023',
//       },
//       country: { name: 'USA', flag: cifUs },
//       usage: {
//         value: 50,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'success',
//       },
//       payment: { name: 'Mastercard', icon: cibCcMastercard },
//       activity: '10 sec ago',
//     },
//     {
//       avatar: { src: avatar2, status: 'danger' },
//       user: {
//         name: 'Avram Tarasios',
//         new: false,
//         registered: 'Jan 1, 2023',
//       },
//       country: { name: 'Brazil', flag: cifBr },
//       usage: {
//         value: 22,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'info',
//       },
//       payment: { name: 'Visa', icon: cibCcVisa },
//       activity: '5 minutes ago',
//     },
//     {
//       avatar: { src: avatar3, status: 'warning' },
//       user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
//       country: { name: 'India', flag: cifIn },
//       usage: {
//         value: 74,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'warning',
//       },
//       payment: { name: 'Stripe', icon: cibCcStripe },
//       activity: '1 hour ago',
//     },
//     {
//       avatar: { src: avatar4, status: 'secondary' },
//       user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
//       country: { name: 'France', flag: cifFr },
//       usage: {
//         value: 98,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'danger',
//       },
//       payment: { name: 'PayPal', icon: cibCcPaypal },
//       activity: 'Last month',
//     },
//     {
//       avatar: { src: avatar5, status: 'success' },
//       user: {
//         name: 'Agapetus Tadeáš',
//         new: true,
//         registered: 'Jan 1, 2023',
//       },
//       country: { name: 'Spain', flag: cifEs },
//       usage: {
//         value: 22,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'primary',
//       },
//       payment: { name: 'Google Wallet', icon: cibCcApplePay },
//       activity: 'Last week',
//     },
//     {
//       avatar: { src: avatar6, status: 'danger' },
//       user: {
//         name: 'Friderik Dávid',
//         new: true,
//         registered: 'Jan 1, 2023',
//       },
//       country: { name: 'Poland', flag: cifPl },
//       usage: {
//         value: 43,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'success',
//       },
//       payment: { name: 'Amex', icon: cibCcAmex },
//       activity: 'Last week',
//     },
//   ]

//   useEffect(() => {
//     // Fetch users data when component mounts
//     dispatch(getAllUsers())
//   }, [dispatch])

//   // Function to determine user status badge color
//   const getBadgeColor = (status) => {
//     switch (status) {
//       case 'active':
//         return 'success'
//       case 'inactive':
//         return 'secondary'
//       case 'pending':
//         return 'warning'
//       default:
//         return 'primary'
//     }
//   }

//   return (
//     <CRow>
//       <CCol xs>
//         <CCard className="mb-4">
//           <CCardHeader>Flagged Users</CCardHeader>
//           <CCardBody>
//             <br />
//             <CTable align="middle" className="mb-0 border" hover responsive>
//               <CTableHead className="text-nowrap">
//                 <CTableRow>
//                   <CTableHeaderCell className="bg-body-tertiary text-center">
//                     <CIcon icon={cilPeople} />
//                   </CTableHeaderCell>
//                   <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
//                   {
//                     <CTableHeaderCell className="bg-body-tertiary text-center">
//                       Country
//                     </CTableHeaderCell>
//                   }
//                   {<CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>}
//                   {
//                     <CTableHeaderCell className="bg-body-tertiary text-center">
//                       Payment Method
//                     </CTableHeaderCell>
//                   }
//                   {<CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>}
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {tableExample.map((item, index) => (
//                   <CTableRow v-for="item in tableItems" key={index}>
//                     <CTableDataCell className="text-center">
//                       <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
//                     </CTableDataCell>
//                     <CTableDataCell>
//                       <div>{item.user.name}</div>
//                       <div className="small text-body-secondary text-nowrap">
//                         <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
//                         {item.user.registered}
//                       </div>
//                     </CTableDataCell>
//                     {
//                       <CTableDataCell className="text-center">
//                         <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
//                       </CTableDataCell>
//                     }
//                     {
//                       <CTableDataCell>
//                         <div className="d-flex justify-content-between text-nowrap">
//                           <div className="fw-semibold">{item.usage.value}%</div>
//                           <div className="ms-3">
//                             <small className="text-body-secondary">{item.usage.period}</small>
//                           </div>
//                         </div>
//                         <CProgress thin color={item.usage.color} value={item.usage.value} />
//                       </CTableDataCell>
//                     }
//                     {
//                       <CTableDataCell className="text-center">
//                         <CIcon size="xl" icon={item.payment.icon} />
//                       </CTableDataCell>
//                     }
//                     {
//                       <CTableDataCell>
//                         <div className="small text-body-secondary text-nowrap">Last login</div>
//                         <div className="fw-semibold text-nowrap">{item.activity}</div>
//                       </CTableDataCell>
//                     }
//                   </CTableRow>
//                 ))}
//               </CTableBody>
//             </CTable>
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default Users

// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   CAvatar,
//   CButton,
//   CButtonGroup,
//   CCard,
//   CCardBody,
//   CCardFooter,
//   CCardHeader,
//   CCol,
//   CProgress,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CSpinner,
//   CBadge,
// } from '@coreui/react'

// import CIcon from '@coreui/icons-react'
// import {
//   cibCcAmex,
//   cibCcApplePay,
//   cibCcMastercard,
//   cibCcPaypal,
//   cibCcStripe,
//   cibCcVisa,
//   cibGoogle,
//   cibFacebook,
//   cibLinkedin,
//   cifBr,
//   cifEs,
//   cifFr,
//   cifIn,
//   cifPl,
//   cifUs,
//   cibTwitter,
//   cilCloudDownload,
//   cilPeople,
//   cilUser,
//   cilUserFemale,
// } from '@coreui/icons'

// // Fix the import path to match your project structure
// import { getAllUsers } from '../../../redux/slices/userSlice'

// // Fix the avatar import paths to match your project structure
// import avatar1 from '../../../assets/images/avatars/1.jpg'
// import avatar2 from '../../../assets/images/avatars/2.jpg'
// import avatar3 from '../../../assets/images/avatars/3.jpg'
// import avatar4 from '../../../assets/images/avatars/4.jpg'
// import avatar5 from '../../../assets/images/avatars/5.jpg'
// import avatar6 from '../../../assets/images/avatars/6.jpg'

// const Users = () => {
//   const dispatch = useDispatch()
//   const { users, loading, error } = useSelector((state) => state.user)

//   const tableExample = [
//     {
//       user: {
//         name: 'Yiorgos Avraamu',
//         new: true,
//         registered: 'Jan 1, 2023',
//       },
//       country: { name: 'USA', flag: cifUs },
//       usage: {
//         value: 50,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'success',
//       },
//       payment: { name: 'Mastercard', icon: cibCcMastercard },
//       activity: '10 sec ago',
//     },
//     {
//       user: {
//         name: 'Avram Tarasios',
//         new: false,
//         registered: 'Jan 1, 2023',
//       },
//       country: { name: 'Brazil', flag: cifBr },
//       usage: {
//         value: 22,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'info',
//       },
//       payment: { name: 'Visa', icon: cibCcVisa },
//       activity: '5 minutes ago',
//     },
//     {
//       user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
//       country: { name: 'India', flag: cifIn },
//       usage: {
//         value: 74,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'warning',
//       },
//       payment: { name: 'Stripe', icon: cibCcStripe },
//       activity: '1 hour ago',
//     },
//     {
//       user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
//       country: { name: 'France', flag: cifFr },
//       usage: {
//         value: 98,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'danger',
//       },
//       payment: { name: 'PayPal', icon: cibCcPaypal },
//       activity: 'Last month',
//     },
//     {
//       user: {
//         name: 'Agapetus Tadeáš',
//         new: true,
//         registered: 'Jan 1, 2023',
//       },
//       country: { name: 'Spain', flag: cifEs },
//       usage: {
//         value: 22,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'primary',
//       },
//       payment: { name: 'Google Wallet', icon: cibCcApplePay },
//       activity: 'Last week',
//     },
//     {
//       user: {
//         name: 'Friderik Dávid',
//         new: true,
//         registered: 'Jan 1, 2023',
//       },
//       country: { name: 'Poland', flag: cifPl },
//       usage: {
//         value: 43,
//         period: 'Jun 11, 2023 - Jul 10, 2023',
//         color: 'success',
//       },
//       payment: { name: 'Amex', icon: cibCcAmex },
//       activity: 'Last week',
//     },
//   ]

//   useEffect(() => {
//     console.log('hihiusers',users)
//   })

//   // Function to determine user status badge color
//   const getBadgeColor = (status) => {
//     switch (status) {
//       case 'active':
//         return 'success'
//       case 'inactive':
//         return 'secondary'
//       case 'pending':
//         return 'warning'
//       default:
//         return 'primary'
//     }
//   }

//   return (
//     <CRow>
//       <CCol xs>
//         <CCard className="mb-4">
//           <CCardHeader>Flagged Users</CCardHeader>
//           <CCardBody>
//             {loading ? (
//               <div className="text-center my-3">
//                 <CSpinner />
//               </div>
//             ) : error ? (
//               <div className="text-danger">Error loading users: {error}</div>
//             ) : (
//               <>
//                 <br />
//                 <CTable align="middle" className="mb-0 border" hover responsive>
//                   <CTableHead className="text-nowrap">
//                     <CTableRow>
//                       <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
//                       {/* <CTableHeaderCell className="bg-body-tertiary text-center">
//                         Country
//                       </CTableHeaderCell> */}
//                       {/* <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell> */}
//                       {/* <CTableHeaderCell className="bg-body-tertiary text-center">
//                         Payment Method
//                       </CTableHeaderCell> */}
//                       {/* <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell> */}
//                     </CTableRow>
//                   </CTableHead>
//                   <CTableBody>
//                     {users.map((item, index) => (
//                       <CTableRow v-for="item in tableItems" key={index}>
//                         <CTableDataCell>
//                           <div>{item.name}</div>
//                           <div className="small text-body-secondary text-nowrap">
//                             {/* <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '} */}
//                             {/* {item.user.registered} */}
//                           </div>
//                         </CTableDataCell>
//                         {/* <CTableDataCell className="text-center">
//                           <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
//                         </CTableDataCell> */}
//                         {/* <CTableDataCell>
//                           <div className="d-flex justify-content-between text-nowrap">
//                             <div className="fw-semibold">{item.usage.value}%</div>
//                             <div className="ms-3">
//                               <small className="text-body-secondary">{item.usage.period}</small>
//                             </div>
//                           </div>
//                           <CProgress thin color={item.usage.color} value={item.usage.value} />
//                         </CTableDataCell> */}
//                         {/* <CTableDataCell className="text-center">
//                           <CIcon size="xl" icon={item.payment.icon} />
//                         </CTableDataCell> */}
//                         {/* <CTableDataCell>
//                           <div className="small text-body-secondary text-nowrap">Last login</div>
//                           <div className="fw-semibold text-nowrap">{item.activity}</div>
//                         </CTableDataCell> */}
//                       </CTableRow>
//                     ))}
//                   </CTableBody>
//                 </CTable>
//               </>
//             )}
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default Users

// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   CAvatar,
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CSpinner,
//   CBadge,
//   CDropdown,
//   CDropdownToggle,
//   CDropdownMenu,
//   CDropdownItem,
// } from '@coreui/react'

// import CIcon from '@coreui/icons-react'
// import {
//   cilPeople,
//   cilUser,
//   cilOptions,
//   cilSearch,
//   cilFilter,
//   cilSortAlphaDown,
//   cilSortAlphaUp,
//   cilCheckCircle,
//   cilBan,
//   cilWarning,
// } from '@coreui/icons'

// // Import user data from redux slice
// import { getAllUsers } from '../../../redux/slices/userSlice'

// // Import default avatar image
// import defaultAvatar from '../../../assets/images/avatars/1.jpg'

// const Users = () => {
//   const dispatch = useDispatch()
//   const { users, loading, error } = useSelector((state) => state.user)

//   // State for search and filters
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filteredUsers, setFilteredUsers] = useState([])
//   const [sortField, setSortField] = useState('name')
//   const [sortDirection, setSortDirection] = useState('asc')

//   useEffect(() => {
//     // Fetch users data when component mounts
//     dispatch(getAllUsers())
//   }, [dispatch])

//   useEffect(() => {
//     // Filter and sort users when users array or search/filter/sort states change
//     if (users && users.length > 0) {
//       let filtered = [...users]

//       // Apply search filter
//       if (searchTerm) {
//         filtered = filtered.filter(
//           (user) =>
//             user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             user.username?.toLowerCase().includes(searchTerm.toLowerCase()),
//         )
//       }

//       // Apply sorting
//       filtered.sort((a, b) => {
//         let aValue = a[sortField] || ''
//         let bValue = b[sortField] || ''

//         if (typeof aValue === 'string') aValue = aValue.toLowerCase()
//         if (typeof bValue === 'string') bValue = bValue.toLowerCase()

//         if (sortDirection === 'asc') {
//           return aValue > bValue ? 1 : -1
//         } else {
//           return aValue < bValue ? 1 : -1
//         }
//       })

//       setFilteredUsers(filtered)
//     } else {
//       setFilteredUsers([])
//     }
//   }, [users, searchTerm, sortField, sortDirection])

//   // Function to determine user status badge color
//   const getBadgeColor = (status) => {
//     switch (status) {
//       case 'active':
//         return 'success'
//       case 'inactive':
//         return 'secondary'
//       case 'pending':
//         return 'warning'
//       case 'suspended':
//         return 'danger'
//       default:
//         return 'primary'
//     }
//   }

//   // Function to format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A'
//     const date = new Date(dateString)
//     return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
//   }

//   // Function to toggle sort direction or change sort field
//   const handleSort = (field) => {
//     if (field === sortField) {
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
//     } else {
//       setSortField(field)
//       setSortDirection('asc')
//     }
//   }

//   return (
//     <CRow>
//       <CCol xs>
//         <CCard className="mb-4">
//           <CCardHeader className="d-flex justify-content-between align-items-center">
//             <div>
//               <strong>User Management</strong>
//               <div className="small text-body-secondary">
//                 {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
//               </div>
//             </div>
//             <CButton color="primary" size="sm">
//               <CIcon icon={cilUser} className="me-2" />
//               Add New User
//             </CButton>
//           </CCardHeader>
//           <CCardBody>
//             {/* Search and filter bar */}
//             {/* <CRow className="mb-3">
//               <CCol md={6}>
//                 <CInputGroup>
//                   <CInputGroupText>
//                     <CIcon icon={cilSearch} />
//                   </CInputGroupText>
//                   <CFormInput
//                     placeholder="Search by name, email or username"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </CInputGroup>
//               </CCol>
//               <CCol md={6} className="d-flex justify-content-end">
//                 <CDropdown className="me-2">
//                   <CDropdownToggle color="light">
//                     <CIcon icon={cilFilter} className="me-2" /> Filter
//                   </CDropdownToggle>
//                   <CDropdownMenu>
//                     <CDropdownItem onClick={() => setSearchTerm('')}>All Users</CDropdownItem>
//                     <CDropdownItem onClick={() => setSearchTerm('active')}>
//                       Active Users
//                     </CDropdownItem>
//                     <CDropdownItem onClick={() => setSearchTerm('inactive')}>
//                       Inactive Users
//                     </CDropdownItem>
//                     <CDropdownItem onClick={() => setSearchTerm('pending')}>
//                       Pending Users
//                     </CDropdownItem>
//                   </CDropdownMenu>
//                 </CDropdown>
//               </CCol>
//             </CRow> */}

//             {loading ? (
//               <div className="text-center my-5">
//                 <CSpinner />
//                 <div className="mt-2">Loading users...</div>
//               </div>
//             ) : error ? (
//               <div className="text-danger p-3 bg-light rounded">
//                 <CIcon icon={cilWarning} className="me-2" />
//                 Error loading users: {error}
//               </div>
//             ) : (
//               <CTable align="middle" className="mb-0 border" hover responsive striped>
//                 <CTableHead className="text-nowrap">
//                   <CTableRow>
//                     <CTableHeaderCell
//                       className="bg-body-tertiary"
//                       style={{ width: '50px' }}
//                     ></CTableHeaderCell>
//                     <CTableHeaderCell
//                       className="bg-body-tertiary"
//                       onClick={() => handleSort('name')}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <div className="d-flex align-items-center">
//                         User
//                         {sortField === 'name' && (
//                           <CIcon
//                             icon={sortDirection === 'asc' ? cilSortAlphaDown : cilSortAlphaUp}
//                             className="ms-2"
//                             size="sm"
//                           />
//                         )}
//                       </div>
//                     </CTableHeaderCell>
//                     <CTableHeaderCell
//                       className="bg-body-tertiary"
//                       onClick={() => handleSort('email')}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <div className="d-flex align-items-center">
//                         Email
//                         {sortField === 'email' && (
//                           <CIcon
//                             icon={sortDirection === 'asc' ? cilSortAlphaDown : cilSortAlphaUp}
//                             className="ms-2"
//                             size="sm"
//                           />
//                         )}
//                       </div>
//                     </CTableHeaderCell>
//                     <CTableHeaderCell className="bg-body-tertiary text-center">
//                       Status
//                     </CTableHeaderCell>
//                     <CTableHeaderCell
//                       className="bg-body-tertiary"
//                       onClick={() => handleSort('createdAt')}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <div className="d-flex align-items-center">
//                         Registration Date
//                         {sortField === 'createdAt' && (
//                           <CIcon
//                             icon={sortDirection === 'asc' ? cilSortAlphaDown : cilSortAlphaUp}
//                             className="ms-2"
//                             size="sm"
//                           />
//                         )}
//                       </div>
//                     </CTableHeaderCell>
//                     <CTableHeaderCell
//                       className="bg-body-tertiary"
//                       onClick={() => handleSort('lastLogin')}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <div className="d-flex align-items-center">
//                         Last Login
//                         {sortField === 'lastLogin' && (
//                           <CIcon
//                             icon={sortDirection === 'asc' ? cilSortAlphaDown : cilSortAlphaUp}
//                             className="ms-2"
//                             size="sm"
//                           />
//                         )}
//                       </div>
//                     </CTableHeaderCell>
//                     <CTableHeaderCell className="bg-body-tertiary text-center">
//                       Actions
//                     </CTableHeaderCell>
//                   </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                   {filteredUsers.length > 0 ? (
//                     filteredUsers.map((user, index) => (
//                       <CTableRow key={user.id || index}>
//                         <CTableDataCell className="text-center">
//                           <CAvatar
//                             size="md"
//                             src={user.avatar || defaultAvatar}
//                             status={user.status || 'secondary'}
//                           />
//                         </CTableDataCell>
//                         <CTableDataCell>
//                           <div className="fw-semibold">{user.name || 'Unknown'}</div>
//                           <div className="small text-body-secondary">
//                             @{user.username || 'unknown'}
//                           </div>
//                         </CTableDataCell>
//                         <CTableDataCell>
//                           <div>{user.email || 'N/A'}</div>
//                           {user.phone && (
//                             <div className="small text-body-secondary">{user.phone}</div>
//                           )}
//                         </CTableDataCell>
//                         <CTableDataCell className="text-center">
//                           <CBadge color={getBadgeColor(user.status || 'pending')}>
//                             {user.status || 'pending'}
//                           </CBadge>
//                         </CTableDataCell>
//                         <CTableDataCell>{formatDate(user.createdAt)}</CTableDataCell>
//                         <CTableDataCell>{formatDate(user.lastLogin)}</CTableDataCell>
//                         <CTableDataCell className="text-center">
//                           <CDropdown alignment="end">
//                             <CDropdownToggle color="light" size="sm" caret={false}>
//                               <CIcon icon={cilOptions} />
//                             </CDropdownToggle>
//                             <CDropdownMenu>
//                               <CDropdownItem>
//                                 <CIcon icon={cilUser} className="me-2" />
//                                 View Profile
//                               </CDropdownItem>
//                               <CDropdownItem>
//                                 <CIcon icon={cilCheckCircle} className="me-2" />
//                                 Activate
//                               </CDropdownItem>
//                               <CDropdownItem>
//                                 <CIcon icon={cilBan} className="me-2" />
//                                 Suspend
//                               </CDropdownItem>
//                               <CDropdownItem className="text-danger">Delete</CDropdownItem>
//                             </CDropdownMenu>
//                           </CDropdown>
//                         </CTableDataCell>
//                       </CTableRow>
//                     ))
//                   ) : (
//                     <CTableRow>
//                       <CTableDataCell colSpan="6" className="text-center py-4">
//                         <div className="text-body-secondary">
//                           <CIcon icon={cilPeople} size="xl" className="mb-3" />
//                           <div>No users found</div>
//                           <div className="small">Try adjusting your search or filter criteria</div>
//                         </div>
//                       </CTableDataCell>
//                     </CTableRow>
//                   )}
//                 </CTableBody>
//               </CTable>
//             )}
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default Users

import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilOptions, cilPeople, cilUser, cilCheckCircle, cilBan, cilFilter } from '@coreui/icons'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { Country, State, City } from 'country-state-city'

// Import default avatar placeholder
import defaultAvatar from '../../../assets/images/avatars/1.jpg'
import { useSelector } from 'react-redux'
import adminApi from '../../../api/adminApi'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  // Use users array from redux store in your actual implementation
  const actualUsers = useSelector((x) => x.user.users)
  const navigate = useNavigate()

  const [searchKey, setSearchKey] = useState()
  const [countries, setCountries] = useState([])
  const [countryKey, setCountryKey] = useState()

  const [filterPreference, setFilterPreference] = useState({
    country: '',
    gender: '',
    maritalStatus: '',
  })

  const [filteredUsers, setFilteredUsers] = useState(actualUsers)

  const [isModalOpen, setIsModalOpen] = useState(false)

  // Function to determine user status badge color
  const getBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'secondary'
      case 'pending':
        return 'warning'
      case 'suspended':
        return 'danger'
      default:
        return 'primary'
    }
  }

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleFilter = (text) => {
    const updatedData = actualUsers.filter((item) => {
      const item_data = `${item.name.toUpperCase()})`
      const text_data = text.toUpperCase()
      return item_data.indexOf(text_data) > -1
    })
    setFilteredUsers(updatedData)
    setSearchKey(text)
  }

  const handleFilterPreference = (value, name) => {
    setFilterPreference({ ...filterPreference, [name]: value })
  }

  useEffect(() => {
    console.log('this is the ', filterPreference)
  }, [filterPreference])

  useEffect(() => {
    const fetchCountries = () => {
      const countriesData = Country.getAllCountries()
      setCountries(countriesData)
    }
    fetchCountries()
  }, [])

  const applyFilters = () => {
    // If no criteria are selected, show all users
    if (!filterPreference.country && !filterPreference.gender && !filterPreference.maritalStatus) {
      setFilteredUsers(actualUsers)
      setIsModalOpen(false)
      return
    }

    // Filter users based on selected criteria
    const filtered = actualUsers.filter((user) => {
      // Check if country is in the address string
      const matchesCountry =
        !filterPreference.country ||
        (user.address &&
          user.address.toLowerCase().includes(filterPreference.country.toLowerCase()))

      const matchesGender =
        !filterPreference.gender ||
        filterPreference.gender === 'all' ||
        user.gender === filterPreference.gender

      const matchesMaritalStatus =
        !filterPreference.maritalStatus || user.maritalStatus === filterPreference.maritalStatus

      // User must match ALL selected criteria
      return matchesCountry && matchesGender && matchesMaritalStatus
    })

    // Update the filtered users and close the modal
    setFilteredUsers(filtered)
    setIsModalOpen(false)
  }

  const handleDelete = (userId) => {
    try {
      adminApi.deleteUser(userId)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <CRow className="mb-3 mx-2 align-items-center" style={{ marginTop: '20px' }}>
        <CCol xs="10" md="11">
          <div className="position-relative">
            <CFormInput
              type="text"
              placeholder="Search..."
              className="ps-5 shadow-sm"
              style={{
                height: '42px',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.3s ease',
                borderRadius: '0',
                border: '1px solid #dee2e6',
              }}
              value={searchKey}
              onChange={(text) => {
                handleFilter(text.target.value)
              }}
            />
            <div
              className="position-absolute"
              style={{
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6c757d',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </CCol>
        <CCol xs="2" md="1" className="d-flex align-items-center">
          <CButton
            onClick={() => {
              setIsModalOpen(!isModalOpen)
            }}
            color="light"
          >
            <CIcon icon={cilFilter} />
            <span className="d-none d-md-inline ms-1">Filter</span>
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive striped>
                <CTableHead className="text-nowrap bg-light">
                  <CTableRow>
                    <CTableHeaderCell style={{ width: '50px' }}></CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell>Registration Date</CTableHeaderCell>
                    <CTableHeaderCell>Last Login</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>

                    {/* <CTableHeaderCell className="text-center">Actions</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredUsers.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={user.avatar} status={user.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold">{user.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{user.email}</div>
                        {user.phone && (
                          <div className="small text-body-secondary">{user.phone}</div>
                        )}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CBadge color={getBadgeColor(user.status)}>{user.status}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{formatDate(user.createdAt)}</CTableDataCell>
                      <CTableDataCell>{formatDate(user.lastLogin)}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {/* <CDropdown alignment="end"> }
                        {/* <CDropdownToggle color="light" size="sm" caret={false}>
                          <CIcon icon={cilOptions} />
                        </CDropdownToggle> */}
                        {/* <CDropdownMenu>
                          <CDropdownItem>
                            <CIcon icon={cilUser} className="me-2" />
                            View Profile
                          </CDropdownItem>
                          <CDropdownItem>
                            <CIcon icon={cilCheckCircle} className="me-2" />
                            Activate
                          </CDropdownItem>
                          <CDropdownItem>
                            <CIcon icon={cilBan} className="me-2" />
                            Suspend
                          </CDropdownItem>
                          <CDropdownItem className="text-danger">Delete</CDropdownItem>
                        </CDropdownMenu> */}
                        {/* </CDropdown> */}

                        <CDropdown alignment="end">
                          <CDropdownToggle color="transparent" caret={false} className="p-0">
                            <div
                              className="text-center"
                              style={{ width: '24px', cursor: 'pointer' }}
                            >
                              <i className="fas fa-ellipsis-v"></i>
                              {/* Or use SVG for more control */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <circle cx="8" cy="4" r="1.5" />
                                <circle cx="8" cy="8" r="1.5" />
                                <circle cx="8" cy="12" r="1.5" />
                              </svg>
                            </div>
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => navigate(`/verifyUser/${user._id}`)}>
                              Verify User
                            </CDropdownItem>
                            {/* <CDropdownItem href="#">Edit User</CDropdownItem> */}
                            <CDropdownItem onClick={() => navigate(`/editUser/${user._id}`)}>
                              Edit User
                            </CDropdownItem>
                            <CDropdownItem
                              onClick={() => {
                                handleDelete(user._id)
                              }}
                              href="#"
                              className="text-danger"
                            >
                              Delete User
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="lg"
          aria-labelledby="FilterModalLabel"
        >
          <CModalHeader>
            <CModalTitle id="FilterModalLabel">Filter Users</CModalTitle>
          </CModalHeader>
          <CModalBody style={{ minHeight: '400px', padding: '20px' }}>
            {/* Gender Filter Section */}
            <div className="mb-4">
              <h5 className="mb-3">Gender</h5>
              <div className="d-flex flex-column">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genderFilter"
                    id="genderAll"
                    value="all"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="genderAll">
                    All
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genderFilter"
                    id="genderMale"
                    value="Men"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'gender')
                    }}
                  />
                  <label className="form-check-label" htmlFor="genderMale">
                    Men
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genderFilter"
                    id="genderFemale"
                    value="Woman"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'gender')
                    }}
                  />
                  <label className="form-check-label" htmlFor="genderFemale">
                    Woman
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="genderFilter"
                    id="genderOther"
                    value="other"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'gender')
                    }}
                  />
                  <label className="form-check-label" htmlFor="genderOther">
                    Other
                  </label>
                </div>
              </div>
            </div>

            <hr />

            {/* Location Filter Section */}
            <div className="mb-4">
              <h5 className="mb-3">Location</h5>
              <CFormInput
                type="text"
                id="locationSearch"
                placeholder="Search locations..."
                className="mb-3"
              />
              <div className="location-options" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {/* <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="locationNY"
                    value="New York"
                  />
                  <label className="form-check-label" htmlFor="locationNY">
                    New York, USA
                  </label>
                </div> */}
                {countries.map((item, index) => {
                  return (
                    <div className="form-check mb-2" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="locationRadio" // Important: all radio buttons must share the same name
                        id={`location${index}`}
                        value={item.name}
                        onChange={(event) => {
                          handleFilterPreference(event.target.value, 'country')
                        }}
                      />
                      <label className="form-check-label" htmlFor={`location${index}`}>
                        {item.name}
                      </label>
                    </div>
                  )
                })}

                {/* <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="locationTokyo"
                    value="Tokyo"
                  />
                  <label className="form-check-label" htmlFor="locationTokyo">
                    Tokyo, Japan
                  </label>
                </div> */}
                {/* <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="locationParis"
                    value="Paris"
                  />
                  <label className="form-check-label" htmlFor="locationParis">
                    Paris, France
                  </label>
                </div> */}
                {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="locationSydney"
                    value="Sydney"
                  />
                  <label className="form-check-label" htmlFor="locationSydney">
                    Sydney, Australia
                  </label>
                </div> */}
              </div>
            </div>

            <hr />

            {/* Marital Status Filter Section */}
            <div className="mb-4">
              <h5 className="mb-3">Marital Status</h5>
              <div className="d-flex flex-column">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    id="statusSingle"
                    value="single"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'maritalStatus')
                    }}
                  />
                  <label className="form-check-label" htmlFor="statusSingle">
                    Single
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    id="statusMarried"
                    value="married"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'maritalStatus')
                    }}
                  />
                  <label className="form-check-label" htmlFor="statusMarried">
                    Married
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    id="statusDivorced"
                    value="divorced"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'maritalStatus')
                    }}
                  />
                  <label className="form-check-label" htmlFor="statusDivorced">
                    Divorced
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    id="statusWidowed"
                    value="widowed"
                    onChange={(event) => {
                      handleFilterPreference(event.target.value, 'maritalStatus')
                    }}
                  />
                  <label className="form-check-label" htmlFor="statusWidowed">
                    Widowed
                  </label>
                </div>
              </div>
            </div>
          </CModalBody>
          <CModalFooter>
            <div className="me-auto text-muted">42 users match these filters</div>
            <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CButton>
            <CButton onClick={applyFilters} color="primary">
              Apply Filters
            </CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  )
}

export default Users
