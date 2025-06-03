import React, { useEffect, useState ,useMemo} from 'react'

const funcSet = new Set()

const Test = () => {
  const [number, setNumber] = useState(2)
  const [color, setColor] = useState('yellow')
  const slowNumber = useMemo(() =>{
    console.log('reached bakkuvatty')
    for (var i = 0; i <= 1000000000; i++) {}
    return number * 2
  },[number])
  
 
  useEffect(() => {
    console.log('this is the number', number)
  })

  return (
    <div>
      <input value={number} onChange={(e) => setNumber(e.target.value)}></input>
      <h1 style={{ color: 'black' }}>{number}</h1>
      <h1 style={{ color: 'black' }}>{slowNumber}</h1>
      <button
        onClick={() => {
          if (color === 'yellow') {
            console.log('reached here')
            setColor('green')
          } else {
            console.log('reached here in 2nd')
            setColor('yellow')
          }
        }}
      >
        Change Color
      </button>

      <div style={{ backgroundColor: color }}>
        Muthe karale Thene
      </div>
    </div>
  )
}

export default Test
