import { useSelector, useDispatch } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CButtonGroup,
  CProgress,
  CBadge,
  CSpinner,
} from '@coreui/react'
import { CChartDoughnut, CChartBar } from '@coreui/react-chartjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilUserFemale,
  cilCheckCircle,
  cilCreditCard,
  cilArrowRight,
  cilSpeedometer,
  cilBan,
  cilHeart,
  cilChart,
} from '@coreui/icons'
import {
  getDailyActiveUsers,
  getMonthlyActiveUsers,
  getAllUsers,
  getWeeklyMatches,
  getMonthlyMatches,
  getSubscriptionStats,
  getMostSkippedSection,
} from '../../../Redux/Slices/userSlice'

const StatCard = ({ title, value, icon, color, onClick, subtitle, loading }) => (
  <CCard
    onClick={onClick}
    style={{
      cursor: onClick ? 'pointer' : 'default',
      borderTop: `3px solid ${color}`,
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    }}
    className="h-100"
    onMouseEnter={(e) => {
      if (onClick) e.currentTarget.style.transform = 'translateY(-2px)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
    }}
  >
    <CCardBody className="d-flex align-items-center gap-3 py-3">
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: `${color}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <CIcon icon={icon} style={{ color, width: 22, height: 22 }} />
      </div>
      <div>
        <div style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1 }}>
          {loading ? <CSpinner size="sm" /> : (value ?? '—')}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--cui-text-medium-emphasis)', marginTop: 2 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: '0.72rem', color, marginTop: 1 }}>{subtitle}</div>
        )}
      </div>
      {onClick && (
        <div className="ms-auto">
          <CIcon icon={cilArrowRight} style={{ color: 'var(--cui-text-medium-emphasis)', width: 14 }} />
        </div>
      )}
    </CCardBody>
  </CCard>
)

const InsightBadge = ({ value, threshold, good = 'up' }) => {
  const isGood = good === 'up' ? value >= threshold : value <= threshold
  return (
    <CBadge color={isGood ? 'success' : 'warning'} className="ms-2" style={{ fontSize: '0.7rem' }}>
      {isGood ? 'Healthy' : 'Needs Attention'}
    </CBadge>
  )
}

const UserEngagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    dailyActiveUsers,
    monthlyActiveUsers,
    weeklyMatches,
    monthlyMatches,
    users,
    subscriptionStats,
    profileCompletionMetrics,
    status,
  } = useSelector((state) => state.user)

  const [selectedGender, setSelectedGender] = useState('All')
  const genderOptions = ['Men', 'Women', 'All']
  const loading = status === 'loading'

  useEffect(() => {
    dispatch(getDailyActiveUsers())
    dispatch(getMonthlyActiveUsers())
    dispatch(getAllUsers())
    dispatch(getWeeklyMatches())
    dispatch(getMonthlyMatches())
    dispatch(getSubscriptionStats())
    dispatch(getMostSkippedSection())
  }, [dispatch])

  // ── Gender filtering ──────────────────────────────────────────────────────
  const filterByGender = (arr) => {
    if (selectedGender === 'All') return arr || []
    return (arr || []).filter((u) => u.gender === selectedGender)
  }

  const filteredDAU = filterByGender(dailyActiveUsers)
  const filteredMAU = filterByGender(monthlyActiveUsers)

  // ── Core activity metrics ─────────────────────────────────────────────────
  const dauCount = filteredDAU.length
  const mauCount = filteredMAU.length
  const stickiness = mauCount > 0 ? ((dauCount / mauCount) * 100).toFixed(1) : '0.0'

  // Gender split in DAU (always all genders for the chart)
  const dauAll = dailyActiveUsers || []
  const mauAll = monthlyActiveUsers || []
  const dauMen = dauAll.filter((u) => u.gender === 'Men').length
  const dauWomen = dauAll.filter((u) => u.gender === 'Women').length
  const mauMen = mauAll.filter((u) => u.gender === 'Men').length
  const mauWomen = mauAll.filter((u) => u.gender === 'Women').length

  // ── User health metrics ───────────────────────────────────────────────────
  const totalUsers = users?.length || 0
  const completedProfiles = users?.filter((u) => u.profileCompletionPercentage === 100).length || 0
  const incompleteProfiles = totalUsers - completedProfiles
  const avgCompletion =
    totalUsers > 0
      ? Math.round(
          (users || []).reduce((sum, u) => sum + (u.profileCompletionPercentage || 0), 0) /
            totalUsers,
        )
      : 0
  const profileCompletionPct =
    totalUsers > 0 ? ((completedProfiles / totalUsers) * 100).toFixed(1) : '0.0'

  // Inactive (zombie) users = total users not seen in monthly active
  const mauIdSet = new Set((monthlyActiveUsers || []).map((u) => u._id))
  const inactiveCount = (users || []).filter((u) => !mauIdSet.has(u._id)).length
  const retentionRate =
    totalUsers > 0 ? (100 - (inactiveCount / totalUsers) * 100).toFixed(1) : '0.0'

  // ── Match metrics ─────────────────────────────────────────────────────────
  const weeklyMatchCount = weeklyMatches?.length || 0
  const monthlyMatchCount = monthlyMatches?.length || 0
  const matchRateWeekly =
    dauCount > 0 ? ((weeklyMatchCount / dauCount) * 100).toFixed(1) : '0.0'

  // ── Subscription metrics ──────────────────────────────────────────────────
  const activeSubscribers = subscriptionStats?.active || 0
  const expiredSubs = subscriptionStats?.expired || 0
  const cancelledSubs = subscriptionStats?.cancelled || 0
  const totalRevenuePaise = subscriptionStats?.totalRevenue || 0
  const paidConversionRate =
    totalUsers > 0 ? ((activeSubscribers / totalUsers) * 100).toFixed(1) : '0.0'

  const formatRevenue = (paise) => {
    const rupees = paise / 100
    return rupees >= 1000 ? `₹${(rupees / 1000).toFixed(1)}k` : `₹${rupees.toFixed(0)}`
  }

  // ── Most skipped section ──────────────────────────────────────────────────
  const mostSkippedSection =
    typeof profileCompletionMetrics === 'string'
      ? profileCompletionMetrics
      : profileCompletionMetrics?.section ||
        profileCompletionMetrics?.sectionName ||
        profileCompletionMetrics?.name ||
        'N/A'

  // ── Chart data ────────────────────────────────────────────────────────────
  const genderActivityChart = {
    labels: ['Men', 'Women'],
    datasets: [
      {
        label: 'Daily Active (DAU)',
        data: [dauMen, dauWomen],
        backgroundColor: '#4361ee',
        borderRadius: 6,
      },
      {
        label: 'Monthly Active (MAU)',
        data: [mauMen, mauWomen],
        backgroundColor: '#4361ee40',
        borderRadius: 6,
      },
    ],
  }

  const subscriptionDonut = {
    labels: ['Active', 'Expired', 'Cancelled'],
    datasets: [
      {
        data: [activeSubscribers, expiredSubs, cancelledSubs],
        backgroundColor: ['#2ec4b6', '#e76f51', '#adb5bd'],
        borderWidth: 0,
      },
    ],
  }

  const profileDonut = {
    labels: ['Completed (100%)', 'Incomplete'],
    datasets: [
      {
        data: [completedProfiles, incompleteProfiles],
        backgroundColor: ['#4361ee', '#dee2e6'],
        borderWidth: 0,
      },
    ],
  }

  const activityDonut = {
    labels: ['Monthly Active', 'Inactive / Dormant'],
    datasets: [
      {
        data: [mauCount, inactiveCount],
        backgroundColor: ['#2ec4b6', '#e76f51'],
        borderWidth: 0,
      },
    ],
  }

  return (
    <>
      {/* ── Header ── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-0 fw-bold">User Engagement Metrics</h5>
          <div className="small text-medium-emphasis">
            Real-time insights into how users interact with the app
          </div>
        </div>
        <CButtonGroup>
          {genderOptions.map((g) => (
            <CButton
              key={g}
              color="outline-secondary"
              active={g === selectedGender}
              onClick={() => setSelectedGender(g)}
            >
              {g}
            </CButton>
          ))}
        </CButtonGroup>
      </div>

      {/* ── Row 1: Core KPI Cards ── */}
      <CRow className="g-3 mb-4">
        <CCol xs={6} md={4} xl={2}>
          <StatCard
            title="Daily Active Users"
            value={dauCount}
            icon={cilPeople}
            color="#4361ee"
            onClick={() => navigate('/dailyActiveUsers')}
            subtitle={`${selectedGender === 'All' ? 'All genders' : selectedGender}`}
            loading={loading && !dauCount}
          />
        </CCol>
        <CCol xs={6} md={4} xl={2}>
          <StatCard
            title="Monthly Active Users"
            value={mauCount}
            icon={cilChart}
            color="#3a86ff"
            onClick={() => navigate('/monthlyActiveUsers')}
            subtitle={`${selectedGender === 'All' ? 'All genders' : selectedGender}`}
            loading={loading && !mauCount}
          />
        </CCol>
        <CCol xs={6} md={4} xl={2}>
          <StatCard
            title="Stickiness (DAU/MAU)"
            value={`${stickiness}%`}
            icon={cilSpeedometer}
            color="#f72585"
            subtitle={stickiness >= 20 ? 'Strong retention' : 'Needs improvement'}
          />
        </CCol>
        <CCol xs={6} md={4} xl={2}>
          <StatCard
            title="Active Subscribers"
            value={activeSubscribers}
            icon={cilCreditCard}
            color="#2ec4b6"
            subtitle={`${paidConversionRate}% conversion`}
          />
        </CCol>
        <CCol xs={6} md={4} xl={2}>
          <StatCard
            title="Weekly Matches"
            value={weeklyMatchCount}
            icon={cilHeart}
            color="#ff9e00"
            onClick={() => navigate('/weeklyMatchedUsers')}
            subtitle={`${matchRateWeekly}% of DAU matched`}
          />
        </CCol>
        <CCol xs={6} md={4} xl={2}>
          <StatCard
            title="Profile Completion"
            value={`${avgCompletion}%`}
            icon={cilCheckCircle}
            color={avgCompletion >= 70 ? '#2ec4b6' : '#e76f51'}
            subtitle={`${completedProfiles} fully complete`}
          />
        </CCol>
      </CRow>

      {/* ── Row 2: Gender Activity Chart + Subscription Donut ── */}
      <CRow className="g-3 mb-4">
        <CCol xs={12} lg={8}>
          <CCard className="h-100">
            <CCardHeader>
              <strong>Gender Activity Breakdown</strong>
              <div className="small text-medium-emphasis">
                DAU vs MAU split by gender — shows which segment is most engaged
              </div>
            </CCardHeader>
            <CCardBody>
              <CChartBar
                data={genderActivityChart}
                options={{
                  plugins: { legend: { position: 'top' } },
                  scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
                  maintainAspectRatio: false,
                }}
                style={{ height: 220 }}
              />
              <div className="d-flex gap-4 mt-3 justify-content-center" style={{ fontSize: '0.8rem' }}>
                <div className="text-center">
                  <div className="fw-bold" style={{ color: '#4361ee', fontSize: '1.1rem' }}>
                    {dauMen}
                  </div>
                  <div className="text-medium-emphasis">Men (DAU)</div>
                </div>
                <div className="text-center">
                  <div className="fw-bold" style={{ color: '#f72585', fontSize: '1.1rem' }}>
                    {dauWomen}
                  </div>
                  <div className="text-medium-emphasis">Women (DAU)</div>
                </div>
                <div className="text-center">
                  <div className="fw-bold" style={{ color: '#3a86ff', fontSize: '1.1rem' }}>
                    {mauMen}
                  </div>
                  <div className="text-medium-emphasis">Men (MAU)</div>
                </div>
                <div className="text-center">
                  <div className="fw-bold" style={{ color: '#ff6b9d', fontSize: '1.1rem' }}>
                    {mauWomen}
                  </div>
                  <div className="text-medium-emphasis">Women (MAU)</div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} lg={4}>
          <CCard className="h-100">
            <CCardHeader>
              <strong>Subscription Health</strong>
              <div className="small text-medium-emphasis">
                Revenue: {formatRevenue(totalRevenuePaise)}
              </div>
            </CCardHeader>
            <CCardBody className="d-flex flex-column align-items-center justify-content-center">
              <CChartDoughnut
                style={{ maxHeight: 160 }}
                data={subscriptionDonut}
                options={{
                  plugins: { legend: { position: 'bottom' } },
                  cutout: '70%',
                  maintainAspectRatio: false,
                }}
              />
              <div className="d-flex gap-3 mt-3 text-center" style={{ fontSize: '0.78rem' }}>
                <div>
                  <div className="fw-bold" style={{ color: '#2ec4b6', fontSize: '1.1rem' }}>
                    {subscriptionStats?.tiers?.basic ?? 0}
                  </div>
                  <div className="text-medium-emphasis">Basic</div>
                </div>
                <div>
                  <div className="fw-bold" style={{ color: '#4361ee', fontSize: '1.1rem' }}>
                    {subscriptionStats?.tiers?.silver ?? 0}
                  </div>
                  <div className="text-medium-emphasis">Silver</div>
                </div>
                <div>
                  <div className="fw-bold" style={{ color: '#f72585', fontSize: '1.1rem' }}>
                    {subscriptionStats?.tiers?.gold ?? 0}
                  </div>
                  <div className="text-medium-emphasis">Gold</div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ── Row 3: User Health + Activity Distribution ── */}
      <CRow className="g-3 mb-4">
        <CCol xs={12} lg={4}>
          <CCard className="h-100">
            <CCardHeader>
              <strong>Profile Completion Health</strong>
              <div className="small text-medium-emphasis">
                How thoroughly users fill their profiles
              </div>
            </CCardHeader>
            <CCardBody>
              <CChartDoughnut
                style={{ maxHeight: 150 }}
                data={profileDonut}
                options={{
                  plugins: { legend: { position: 'bottom' } },
                  cutout: '70%',
                  maintainAspectRatio: false,
                }}
              />
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.8rem' }}>
                  <span>Average Completion</span>
                  <strong>{avgCompletion}%</strong>
                </div>
                <CProgress
                  value={avgCompletion}
                  color={avgCompletion >= 70 ? 'success' : avgCompletion >= 40 ? 'warning' : 'danger'}
                  className="mb-3"
                  style={{ height: 8 }}
                />

                <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.8rem' }}>
                  <span>Fully Completed (100%)</span>
                  <strong>{profileCompletionPct}%</strong>
                </div>
                <CProgress
                  value={parseFloat(profileCompletionPct)}
                  color="primary"
                  className="mb-3"
                  style={{ height: 8 }}
                />

                {mostSkippedSection !== 'N/A' && (
                  <div
                    className="mt-3 p-2 rounded"
                    style={{ backgroundColor: 'var(--cui-tertiary-bg)', fontSize: '0.8rem' }}
                  >
                    <div className="text-medium-emphasis">Most Skipped Section</div>
                    <div className="fw-semibold" style={{ color: '#e76f51' }}>
                      {mostSkippedSection}
                    </div>
                    <div className="text-medium-emphasis mt-1">
                      Focus onboarding improvements here
                    </div>
                  </div>
                )}
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} lg={4}>
          <CCard className="h-100">
            <CCardHeader>
              <strong>User Activity Status</strong>
              <div className="small text-medium-emphasis">
                Active vs dormant users out of {totalUsers} total
              </div>
            </CCardHeader>
            <CCardBody>
              <CChartDoughnut
                style={{ maxHeight: 150 }}
                data={activityDonut}
                options={{
                  plugins: { legend: { position: 'bottom' } },
                  cutout: '70%',
                  maintainAspectRatio: false,
                }}
              />
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.8rem' }}>
                  <span>Monthly Retention Rate</span>
                  <strong>{retentionRate}%</strong>
                </div>
                <CProgress
                  value={parseFloat(retentionRate)}
                  color={
                    parseFloat(retentionRate) >= 60
                      ? 'success'
                      : parseFloat(retentionRate) >= 30
                      ? 'warning'
                      : 'danger'
                  }
                  className="mb-3"
                  style={{ height: 8 }}
                />

                <div className="d-flex justify-content-between small mb-1">
                  <div>
                    <div className="fw-bold" style={{ color: '#2ec4b6' }}>{mauCount}</div>
                    <div className="text-medium-emphasis">Monthly Active</div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold" style={{ color: '#e76f51' }}>{inactiveCount}</div>
                    <div className="text-medium-emphasis">Dormant Users</div>
                  </div>
                </div>

                {inactiveCount > 0 && (
                  <div
                    className="mt-2 p-2 rounded"
                    style={{ backgroundColor: 'var(--cui-tertiary-bg)', fontSize: '0.78rem' }}
                  >
                    <span style={{ color: '#e76f51' }}>⚠ </span>
                    <span className="text-medium-emphasis">
                      {inactiveCount} users haven&apos;t been active this month — consider a
                      re-engagement notification campaign.
                    </span>
                  </div>
                )}
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} lg={4}>
          <CCard className="h-100">
            <CCardHeader>
              <strong>Match Activity</strong>
              <div className="small text-medium-emphasis">
                How often active users are getting matched
              </div>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3 p-3 rounded" style={{ backgroundColor: 'var(--cui-tertiary-bg)' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ff9e00' }}>
                      {weeklyMatchCount}
                    </div>
                    <div className="small text-medium-emphasis">Weekly Matches</div>
                  </div>
                  <CButton
                    size="sm"
                    color="warning"
                    variant="outline"
                    onClick={() => navigate('/weeklyMatchedUsers')}
                  >
                    View <CIcon icon={cilArrowRight} className="ms-1" />
                  </CButton>
                </div>
              </div>

              <div className="mb-3 p-3 rounded" style={{ backgroundColor: 'var(--cui-tertiary-bg)' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#4361ee' }}>
                      {monthlyMatchCount}
                    </div>
                    <div className="small text-medium-emphasis">Monthly Matches</div>
                  </div>
                  <CButton
                    size="sm"
                    color="primary"
                    variant="outline"
                    onClick={() => navigate('/monthlyMatchedUsers')}
                  >
                    View <CIcon icon={cilArrowRight} className="ms-1" />
                  </CButton>
                </div>
              </div>

              <div className="mt-2">
                <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.8rem' }}>
                  <span>Weekly Match Rate (per DAU)</span>
                  <strong>{matchRateWeekly}%</strong>
                </div>
                <CProgress
                  value={Math.min(parseFloat(matchRateWeekly), 100)}
                  color={parseFloat(matchRateWeekly) >= 10 ? 'success' : 'warning'}
                  style={{ height: 8 }}
                />
                <div className="text-medium-emphasis mt-1" style={{ fontSize: '0.72rem' }}>
                  Target: ≥10% of daily active users get a weekly match
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ── Row 4: Actionable Insight Cards ── */}
      <CRow className="g-3">
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>Actionable Insights</strong>
              <div className="small text-medium-emphasis">
                Key ratios and indicators to guide product decisions
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow className="g-3">
                <CCol xs={6} md={3}>
                  <div className="border rounded p-3 h-100">
                    <div className="small text-medium-emphasis mb-1">DAU / MAU Stickiness</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f72585' }}>
                      {stickiness}%
                    </div>
                    <div className="small text-medium-emphasis mt-1">
                      {parseFloat(stickiness) >= 20
                        ? 'Excellent — users return daily'
                        : parseFloat(stickiness) >= 10
                        ? 'Moderate — push notifications may help'
                        : 'Low — improve core engagement loop'}
                    </div>
                  </div>
                </CCol>

                <CCol xs={6} md={3}>
                  <div className="border rounded p-3 h-100">
                    <div className="small text-medium-emphasis mb-1">Paid Conversion Rate</div>
                    <div
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        color: parseFloat(paidConversionRate) >= 5 ? '#2ec4b6' : '#e76f51',
                      }}
                    >
                      {paidConversionRate}%
                    </div>
                    <div className="small text-medium-emphasis mt-1">
                      {activeSubscribers} paid out of {totalUsers} total users
                    </div>
                  </div>
                </CCol>

                <CCol xs={6} md={3}>
                  <div className="border rounded p-3 h-100">
                    <div className="small text-medium-emphasis mb-1">Gender Balance (DAU)</div>
                    <div
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        color: dauAll.length > 0 && dauMen > 0 && dauWomen > 0 ? '#4361ee' : '#e76f51',
                      }}
                    >
                      {dauAll.length > 0
                        ? `${Math.round((dauMen / Math.max(dauAll.length, 1)) * 100)}% M`
                        : '—'}
                    </div>
                    <div className="small text-medium-emphasis mt-1">
                      {dauMen} Men · {dauWomen} Women active today
                      {dauWomen === 0 && dauMen > 0 && ' — no women active today'}
                    </div>
                  </div>
                </CCol>

                <CCol xs={6} md={3}>
                  <div className="border rounded p-3 h-100">
                    <div className="small text-medium-emphasis mb-1">Monthly Retention Rate</div>
                    <div
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        color: parseFloat(retentionRate) >= 40 ? '#2ec4b6' : '#e76f51',
                      }}
                    >
                      {retentionRate}%
                    </div>
                    <div className="small text-medium-emphasis mt-1">
                      {inactiveCount} dormant users — consider re-engagement push
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UserEngagement
