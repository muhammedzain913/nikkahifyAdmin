import React, { useEffect, useRef, useState } from 'react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import { number } from 'prop-types'
import { useSelector } from 'react-redux'

const MainChart = () => {
  const users = useSelector((x) => x.user.users)
  const date = new Date()
  const firstDate = new Date(date.getFullYear(), 0, 1)
  const [numberOfSignup, setNumberOfSignUp] = useState([])
  const chartRef = useRef(null)
  const [dateArray, setDateArray] = useState([])

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  useEffect(() => {
    let givenDateTime = firstDate
    let createdDate = new Date(givenDateTime)
    createdDate.setDate(1)
    let currentDate = new Date()
    let dateAndYearList = [createdDate.toLocaleString('en', { month: 'long' })]
    while (createdDate.setMonth(createdDate.getMonth() + 1) < currentDate) {
      dateAndYearList.push(createdDate.toLocaleString('en', { month: 'long' }))
    }
    setDateArray(dateAndYearList)
  }, [])
  const random = () => Math.round(Math.random() * 100)

  useEffect(() => {
    // Only run this code if both arrays have data
    if (dateArray && dateArray.length > 0 && users && users.length > 0) {
      var listedNumbers = dateArray.map((month) => {
        const filteredUsers = users.filter((user) => {
          const userMonth = new Date(user.createdAt).toLocaleString('en-US', { month: 'long' });
          return userMonth === month;
        })
        return filteredUsers.length;
      })

      setNumberOfSignUp(listedNumbers);
    }
  }, [dateArray, users]);



  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: dateArray,
          datasets: [
            {
              label: 'SignUps',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: numberOfSignup,
              fill: true,
            },
            // {
            //   label: 'My Second dataset',
            //   backgroundColor: 'transparent',
            //   borderColor: getStyle('--cui-success'),
            //   pointHoverBackgroundColor: getStyle('--cui-success'),
            //   borderWidth: 2,
            //   data: [
            //     random(50, 200),
            //     random(50, 200),
            //     random(50, 200),
            //     random(50, 200),
            //     random(50, 200),
            //     random(50, 200),
            //     random(50, 200),
            //   ],
            // },
            // {
            //   label: 'My Third dataset',
            //   backgroundColor: 'transparent',
            //   borderColor: getStyle('--cui-danger'),
            //   pointHoverBackgroundColor: getStyle('--cui-danger'),
            //   borderWidth: 1,
            //   borderDash: [8, 5],
            //   data: [65, 65, 65, 65, 65, 65, 65],
            // },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: 250,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
