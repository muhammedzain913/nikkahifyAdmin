import React from 'react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import {
  getActiveUsers,
  getAllUsers,
  getDailyActiveUsers,
  getFlaggedUsers,
  getMonthlyActiveUsers,
  getMonthlyMatches,
  getMostSkippedSection,
  getPendingUsers,
  getSupportedUsers,
  getUserSelectionMetrics,
  getWeeklyMatches,
  testApi,
} from '../../Redux/Slices/userSlice'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import HeatMap from 'react-heatmap-grid'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import DashboardCards from '../widgets/DashboardCards'
import { useEffect } from 'react'

const Dashboard = () => {
  const dispatch = useDispatch()

  // Get data from Redux store
  const {
    users,
    pendingUsers,
    activeUsers,
    flaggedUsers,
    supportedUsers,
    userSelectionMetrics,
    test,
    profileCompletionMetrics
  } = useSelector((state) => state.user)
  const pendingUsersLength = pendingUsers?.length || 0
  const activeUsersLength = activeUsers?.length || 0
  const flaggedUsersLength = flaggedUsers?.length || 0
  const totalUsers = users?.length || 0

  const cardData = [
    {
      id: 1,
      title: 'Total Users',
      value: totalUsers,
      color: '#4361ee',
      path: '/users',
    },
    {
      id: 2,
      title: 'Active Users',
      value: activeUsersLength,
      color: '#3a86ff',
      path: '/activeUsers',
    },
    {
      id: 3,
      title: 'Pending Verifications',
      value: pendingUsersLength,
      color: '#ff9e00',
      path: '/pendingUsers',
    },
    {
      id: 4,
      title: 'Flagged Users',
      value: flaggedUsersLength,
      color: '#e74c3c',
      path: '/flaggedUsers',
    },
  ]

  useEffect(() => {
    console.log('test', profileCompletionMetrics)
  })

  useEffect(() => {
    // Dispatch the getAllUsers thunk when component mounts
    dispatch(getAllUsers())
    dispatch(getPendingUsers())
    dispatch(getActiveUsers())
    dispatch(getFlaggedUsers())
    dispatch(getDailyActiveUsers())
    dispatch(getMonthlyActiveUsers())
    dispatch(getWeeklyMatches())
    dispatch(getMonthlyMatches())
    dispatch(getSupportedUsers())
    dispatch(getUserSelectionMetrics())
    dispatch(testApi())
    dispatch(getMostSkippedSection())


    // console.log(users)
  }, [dispatch])

  // Calculate metrics from users array
  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  const xLabels = new Array(24).fill(0).map((_, i) => `${i}`)

  // Display only even labels
  const xLabelsVisibility = new Array(24).fill(0).map((_, i) => (i % 2 === 0 ? true : false))

  const yLabels = ['Sun', 'Mon', 'Tue']
  // const data = new Array(yLabels.length)
  //   .fill(0)
  //   .map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)))

  const data = yLabels.map(() => xLabels.map(() => Math.floor(Math.random() * 100)))

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}

      {/* <CRow className="mb-4"> */}
      <CCard className="mb-4">
        <CCol xs={12}>
          <DashboardCards items={cardData} />
        </CCol>
      </CCard>
      {/* </CRow> */}
      {/* <DashboardCards /> */}
      {
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  Sign Ups
                </h4>
                <div className="small text-body-secondary">
                  January&nbsp;to&nbsp;
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </CCol>
              <CCol sm={7} className="d-none d-md-block">
                <CButton color="primary" className="float-end">
                  <CIcon icon={cilCloudDownload} />
                </CButton>
                <CButtonGroup className="float-end me-3">
                  {['Day', 'Month', 'Year'].map((value) => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
            </CRow>
            <MainChart />
          </CCardBody>
          <CCardFooter>
            <CRow
              xs={{ cols: 1, gutter: 4 }}
              sm={{ cols: 2 }}
              lg={{ cols: 4 }}
              xl={{ cols: 5 }}
              className="mb-2 text-center"
            >
              {progressExample.map((item, index, items) => (
                <CCol
                  className={classNames({
                    'd-none d-xl-block': index + 1 === items.length,
                  })}
                  key={index}
                >
                  <div className="text-body-secondary">{item.title}</div>
                  <div className="fw-semibold text-truncate">
                    {item.value} ({item.percent}%)
                  </div>
                  <CProgress thin className="mt-2" color={item.color} value={item.percent} />
                </CCol>
              ))}
            </CRow>
          </CCardFooter>
        </CCard>
      }
      {/* {<WidgetsBrand className="mb-4" withCharts />} */}
      {
        // <CRow>
        //   <CCol xs>
        //     <CCard className="mb-4">
        //       <CCardHeader>Flagged Users</CCardHeader>
        //       <CCardBody>
        //         <br />
        //         <CTable align="middle" className="mb-0 border" hover responsive>
        //           <CTableHead className="text-nowrap">
        //             <CTableRow>
        //               <CTableHeaderCell className="bg-body-tertiary text-center">
        //                 <CIcon icon={cilPeople} />
        //               </CTableHeaderCell>
        //               <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
        //               {/* <CTableHeaderCell className="bg-body-tertiary text-center">
        //                 Country
        //               </CTableHeaderCell> */}
        //               {/* <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell> */}
        //               {/* <CTableHeaderCell className="bg-body-tertiary text-center">
        //                 Payment Method
        //               </CTableHeaderCell> */}
        //               {/* <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell> */}
        //             </CTableRow>
        //           </CTableHead>
        //           <CTableBody>
        //             {tableExample.map((item, index) => (
        //               <CTableRow v-for="item in tableItems" key={index}>
        //                 <CTableDataCell className="text-center">
        //                   <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
        //                 </CTableDataCell>
        //                 <CTableDataCell>
        //                   <div>{item.user.name}</div>
        //                   <div className="small text-body-secondary text-nowrap">
        //                     <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
        //                     {item.user.registered}
        //                   </div>
        //                 </CTableDataCell>
        //                 {/* <CTableDataCell className="text-center">
        //                   <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
        //                 </CTableDataCell> */}
        //                 {/* <CTableDataCell>
        //                   <div className="d-flex justify-content-between text-nowrap">
        //                     <div className="fw-semibold">{item.usage.value}%</div>
        //                     <div className="ms-3">
        //                       <small className="text-body-secondary">{item.usage.period}</small>
        //                     </div>
        //                   </div>
        //                   <CProgress thin color={item.usage.color} value={item.usage.value} />
        //                 </CTableDataCell> */}
        //                 {/* <CTableDataCell className="text-center">
        //                   <CIcon size="xl" icon={item.payment.icon} />
        //                 </CTableDataCell> */}
        //                 {/* <CTableDataCell>
        //                   <div className="small text-body-secondary text-nowrap">Last login</div>
        //                   <div className="fw-semibold text-nowrap">{item.activity}</div>
        //                 </CTableDataCell> */}
        //               </CTableRow>
        //             ))}
        //           </CTableBody>
        //         </CTable>
        //       </CCardBody>
        //     </CCard>
        //   </CCol>
        // </CRow>
      }
    </>
  )
}

export default Dashboard
