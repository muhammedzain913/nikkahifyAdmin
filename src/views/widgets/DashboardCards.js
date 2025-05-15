import React from 'react'
import './DashboardCards.css'
import { useNavigate } from 'react-router-dom'

const DashboardCards = ({ totalUsers, pendingUsers, activeUsers, flaggedUsers }) => {
  const navigate = useNavigate()
  // Card data array for mapping
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
      value: activeUsers,
      color: '#3a86ff',
      path: '/activeUsers',
    },
    {
      id: 3,
      title: 'Pending Verifications',
      value: pendingUsers,
      color: '#ff9e00',
      path: '/pendingUsers',
    },
    {
      id: 3,
      title: 'Flagged Users',
      value: flaggedUsers,
      color: '#ff9e00',
      path: '/flaggedUsers',
    },
  ]

  const handleCardClick = (path) => {
    console.log(path)
    navigate(path)
  }

  return (
    <div className="dashboard-cards-container">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="dashboard-card-item"
          style={{ borderTop: `4px solid ${card.color}` }}
          onClick={() => {
            handleCardClick(card.path)
          }}
        >
          <div className="dashboard-card-content">
            <h3 className="dashboard-card-title">{card.title}</h3>
            <p className="dashboard-card-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardCards
