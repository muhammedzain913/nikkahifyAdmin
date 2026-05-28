import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilUserFemale,
  cilWarning,
  cilCheckCircle,
  cilCreditCard,
  cilArrowRight,
  cilClock,
} from '@coreui/icons'
import { CChartDoughnut } from '@coreui/react-chartjs'

import {
  getAllUsers,
  getPendingUsers,
  getActiveUsers,
  getFlaggedUsers,
  getWeeklyMatches,
  getMonthlyMatches,
  getSubscriptionStats,
} from '../../Redux/Slices/userSlice'
import MainChart from './MainChart'

const StatCard = ({ title, value, icon, color, onClick, subtitle }) => (
  <CCard
    onClick={onClick}
    style={{
      cursor: onClick ? 'pointer' : 'default',
      borderTop: `3px solid ${color}`,
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    }}
    className="h-100 dashboard-stat-card"
    onMouseEnter={e => { if (onClick) e.currentTarget.style.transform = 'translateY(-2px)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
  >
    <CCardBody className="d-flex align-items-center gap-3 py-3">
      <div
        style={{
          width: 48, height: 48, borderRadius: 12,
          backgroundColor: `${color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <CIcon icon={icon} style={{ color, width: 22, height: 22 }} />
      </div>
      <div>
        <div style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1 }}>{value ?? <CSpinner size="sm" />}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--cui-text-medium-emphasis)', marginTop: 2 }}>{title}</div>
        {subtitle && <div style={{ fontSize: '0.72rem', color, marginTop: 1 }}>{subtitle}</div>}
      </div>
    </CCardBody>
  </CCard>
)

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { users, pendingUsers, activeUsers, flaggedUsers, weeklyMatches, monthlyMatches, subscriptionStats } =
    useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getPendingUsers())
    dispatch(getActiveUsers())
    dispatch(getFlaggedUsers())
    dispatch(getWeeklyMatches())
    dispatch(getMonthlyMatches())
    dispatch(getSubscriptionStats())
  }, [dispatch])

  const totalUsers = users?.length ?? 0
  const menCount = users?.filter(u => u.gender === 'Men').length ?? 0
  const womenCount = users?.filter(u => u.gender === 'Women').length ?? 0
  const pendingCount = pendingUsers?.length ?? 0
  const flaggedCount = flaggedUsers?.length ?? 0
  const activeSubscribers = subscriptionStats?.active ?? 0
  const totalRevenue = subscriptionStats?.totalRevenue ?? 0

  const recentPending = [...(pendingUsers ?? [])].slice(0, 5)
  const recentFlagged = [...(flaggedUsers ?? [])].slice(0, 5)

  const formatRevenue = (paise) => {
    const rupees = paise / 100
    return rupees >= 1000
      ? `₹${(rupees / 1000).toFixed(1)}k`
      : `₹${rupees.toFixed(0)}`
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const genderChartData = {
    labels: ['Men', 'Women', 'Other'],
    datasets: [{
      data: [menCount, womenCount, Math.max(0, totalUsers - menCount - womenCount)],
      backgroundColor: ['#4361ee', '#f72585', '#adb5bd'],
      borderWidth: 0,
    }],
  }

  const subscriptionChartData = {
    labels: ['Active', 'Expired', 'Cancelled'],
    datasets: [{
      data: [
        subscriptionStats?.active ?? 0,
        subscriptionStats?.expired ?? 0,
        subscriptionStats?.cancelled ?? 0,
      ],
      backgroundColor: ['#2ec4b6', '#e76f51', '#adb5bd'],
      borderWidth: 0,
    }],
  }

  return (
    <>
      {/* ── Row 1: KPI cards ── */}
      <CRow className="g-3 mb-4">
        <CCol xs={6} md={4} xl={2}>
          <StatCard title="Total Users" value={totalUsers} icon={cilPeople} color="#4361ee" onClick={() => navigate('/users')} />
        </CCol>
        <CCol xs={6} md={4} xl={2}>
          <StatCard title="Men" value={menCount} icon={cilUser} color="#3a86ff" onClick={() => navigate('/users')} />
        </CCol>
        <CCol xs={6} md={4} xl={2}>
          <StatCard title="Women" value={womenCount} icon={cilUserFemale} color="#f72585" onClick={() => navigate('/users')} />
        </CCol>
        <CCol xs={6} md={4} xl={2}>
          <StatCard title="Pending KYC" value={pendingCount} icon={cilClock} color="#ff9e00" onClick={() => navigate('/pendingUsers')} subtitle={pendingCount > 0 ? 'Needs review' : undefined} />
        </CCol>
        <CCol xs={6} md={4} xl={2}>
          <StatCard title="Flagged Users" value={flaggedCount} icon={cilWarning} color="#e74c3c" onClick={() => navigate('/flaggedUsers')} subtitle={flaggedCount > 0 ? 'Action needed' : undefined} />
        </CCol>
        <CCol xs={6} md={4} xl={2}>
          <StatCard title="Active Subscribers" value={activeSubscribers} icon={cilCreditCard} color="#2ec4b6" subtitle={formatRevenue(totalRevenue) + ' revenue'} />
        </CCol>
      </CRow>

      {/* ── Row 2: Sign-ups chart + Donut charts ── */}
      <CRow className="g-3 mb-4">
        <CCol xs={12} lg={8}>
          <CCard className="h-100">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <div>
                <strong>Sign Ups</strong>
                <div className="small text-medium-emphasis">January to {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              </div>
            </CCardHeader>
            <CCardBody>
              <MainChart />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} lg={4}>
          <CRow className="g-3 h-100">
            <CCol xs={12}>
              <CCard className="h-100">
                <CCardHeader><strong>Gender Split</strong></CCardHeader>
                <CCardBody className="d-flex flex-column align-items-center justify-content-center">
                  <CChartDoughnut
                    style={{ maxHeight: 150 }}
                    data={genderChartData}
                    options={{ plugins: { legend: { position: 'bottom' } }, cutout: '70%', maintainAspectRatio: false }}
                  />
                  <div className="d-flex gap-3 mt-2 text-center" style={{ fontSize: '0.78rem' }}>
                    <div><div className="fw-bold" style={{ color: '#4361ee' }}>{menCount}</div><div className="text-medium-emphasis">Men</div></div>
                    <div><div className="fw-bold" style={{ color: '#f72585' }}>{womenCount}</div><div className="text-medium-emphasis">Women</div></div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={12}>
              <CCard className="h-100">
                <CCardHeader><strong>Subscriptions</strong></CCardHeader>
                <CCardBody className="d-flex flex-column align-items-center justify-content-center">
                  <CChartDoughnut
                    style={{ maxHeight: 150 }}
                    data={subscriptionChartData}
                    options={{ plugins: { legend: { position: 'bottom' } }, cutout: '70%', maintainAspectRatio: false }}
                  />
                  <div className="d-flex gap-3 mt-2 text-center" style={{ fontSize: '0.78rem' }}>
                    <div><div className="fw-bold" style={{ color: '#2ec4b6' }}>{subscriptionStats?.tiers?.basic ?? 0}</div><div className="text-medium-emphasis">Basic</div></div>
                    <div><div className="fw-bold" style={{ color: '#4361ee' }}>{subscriptionStats?.tiers?.silver ?? 0}</div><div className="text-medium-emphasis">Silver</div></div>
                    <div><div className="fw-bold" style={{ color: '#f72585' }}>{subscriptionStats?.tiers?.gold ?? 0}</div><div className="text-medium-emphasis">Gold</div></div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>

      {/* ── Row 3: Match stats ── */}
      <CRow className="g-3 mb-4">
        <CCol xs={6} md={3}>
          <StatCard title="Weekly Matches" value={weeklyMatches?.length ?? 0} icon={cilCheckCircle} color="#2ec4b6" onClick={() => navigate('/weeklyMatchedUsers')} />
        </CCol>
        <CCol xs={6} md={3}>
          <StatCard title="Monthly Matches" value={monthlyMatches?.length ?? 0} icon={cilCheckCircle} color="#4361ee" onClick={() => navigate('/monthlyMatchedUsers')} />
        </CCol>
        <CCol xs={6} md={3}>
          <StatCard title="Active Users" value={activeUsers?.length ?? 0} icon={cilPeople} color="#3a86ff" onClick={() => navigate('/activeUsers')} />
        </CCol>
        <CCol xs={6} md={3}>
          <StatCard title="Total Revenue" value={formatRevenue(totalRevenue)} icon={cilCreditCard} color="#f72585" />
        </CCol>
      </CRow>

      {/* ── Row 4: Quick-action tables ── */}
      <CRow className="g-3">
        <CCol xs={12} lg={6}>
          <CCard>
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>Pending KYC Verifications</strong>
              <CButton size="sm" color="warning" variant="outline" onClick={() => navigate('/pendingUsers')}>
                View All <CIcon icon={cilArrowRight} className="ms-1" />
              </CButton>
            </CCardHeader>
            <CCardBody className="p-0">
              {recentPending.length === 0 ? (
                <div className="text-center text-medium-emphasis py-4">No pending verifications</div>
              ) : (
                <CTable hover responsive className="mb-0">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Gender</CTableHeaderCell>
                      <CTableHeaderCell>Joined</CTableHeaderCell>
                      <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {recentPending.map((user) => (
                      <CTableRow key={user._id}>
                        <CTableDataCell>
                          <div className="fw-semibold">{user.name || '—'}</div>
                          <div className="small text-medium-emphasis">{user.email}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={user.gender === 'Men' ? 'info' : 'danger'} style={{ fontSize: '0.7rem' }}>
                            {user.gender}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell className="small text-medium-emphasis">{formatDate(user.createdAt)}</CTableDataCell>
                        <CTableDataCell>
                          <CButton size="sm" color="warning" onClick={() => navigate(`/verifyUser/${user._id}`)}>
                            Review
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} lg={6}>
          <CCard>
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>Flagged Users</strong>
              <CButton size="sm" color="danger" variant="outline" onClick={() => navigate('/flaggedUsers')}>
                View All <CIcon icon={cilArrowRight} className="ms-1" />
              </CButton>
            </CCardHeader>
            <CCardBody className="p-0">
              {recentFlagged.length === 0 ? (
                <div className="text-center text-medium-emphasis py-4">No flagged users</div>
              ) : (
                <CTable hover responsive className="mb-0">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Gender</CTableHeaderCell>
                      <CTableHeaderCell>Joined</CTableHeaderCell>
                      <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {recentFlagged.map((user) => (
                      <CTableRow key={user._id}>
                        <CTableDataCell>
                          <div className="fw-semibold">{user.name || '—'}</div>
                          <div className="small text-medium-emphasis">{user.email}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={user.gender === 'Men' ? 'info' : 'danger'} style={{ fontSize: '0.7rem' }}>
                            {user.gender}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell className="small text-medium-emphasis">{formatDate(user.createdAt)}</CTableDataCell>
                        <CTableDataCell>
                          <CButton size="sm" color="danger" variant="outline" onClick={() => navigate(`/verifyUser/${user._id}`)}>
                            Review
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
