// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { CContainer, CSpinner } from '@coreui/react'
// import { FormControl } from '@mui/material'
// import { useState } from 'react'
// import adminApi from '../../../api/adminApi'
// import { InputLabel, Input, FormHelperText } from '@mui/material'
// const EditUserProfile = () => {
//   const { userId } = useParams()
//   const [loading, setLoading] = useState(true)
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         setLoading(true)
//         const response = await adminApi.getUserById(userId)
//         console.log('from component', response.userData)
//         await setUser(response.userData)
//         setLoading(false)
//       } catch (error) {
//         console.log(error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (userId) {
//       fetchUser()
//     }
//   }, [])

//   useEffect(() => {
//     console.log('user', user)
//   }, [user])

//   //   if (loading) {
//   //     return (
//   //       <CContainer
//   //         className="d-flex justify-content-center align-items-center"
//   //         style={{ minHeight: '400px' }}
//   //       >
//   //         <CSpinner color="primary" />
//   //       </CContainer>
//   //     )
//   //   }
//   return (
//     <>
//       <FormControl>
//         <InputLabel htmlFor="my-input">Email address</InputLabel>
//         <Input id="my-input" aria-describedby="my-helper-text" />
//         <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="my-input">Email address</InputLabel>
//         <Input id="my-input" aria-describedby="my-helper-text" />
//         <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="my-input">Email address</InputLabel>
//         <Input id="my-input" aria-describedby="my-helper-text" />
//         <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
//       </FormControl>
//     </>
//   )
// }

// export default EditUserProfile


import { useForm } from "react-hook-form"


export default function App() {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  )
}
