import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
// const Users = React.lazy(() => import('./views/pages/admin/Users'))


const FlaggedUsers = React.lazy(() => import('./views/pages/admin/FlaggedUsers'))
const MAU = React.lazy(() => import('./views/pages/admin/MonthlyActiveUsers'))
// const Edituser = React.lazy(() => import('./views/pages/admin/EditUserProfile'))
const Test = React.lazy(() => import('./views/pages/admin/Test'))

const App = () => {
  // const { isAuthenticated, token } = useSelector((state) => state.user)
  // return (
  //   <HashRouter>
  //     <Suspense
  //       fallback={
  //         <div className="pt-3 text-center">
  //           <CSpinner color="primary" variant="grow" />
  //         </div>
  //       }
  //     >
  //       {/* <Routes>
  //         <Route exact path="/login" name="Login Page" element={<Login />} />
  //         <Route exact path="/register" name="Register Page" element={<Register />} />
  //         <Route exact path="/404" name="Page 404" element={<Page404 />} />
  //         <Route exact path="/500" name="Page 500" element={<Page500 />} />
  //         <Route path="*" name="Home" element={<DefaultLayout />} />
  //         <Route path="/users" name="Users" element={<Users />} />
  //         <Route path="/pendingUsers" name="PendingUsers" element={<PendingUsers />} />
  //         <Route path="/verifyUser" name="PendingUsers" element={<VerifyUser />} />
  //       </Routes> */}
  //       <Routes>
  //         <Route exact path="/login" name="Login Page" element={<Login />} />
  //         <Route exact path="/register" name="Register Page" element={<Register />} />
  //         <Route exact path="/404" name="Page 404" element={<Page404 />} />
  //         <Route exact path="/500" name="Page 500" element={<Page500 />} />
  //         {/* <Route path="/users" name="Users" element={<Users />} /> */}
  //         <Route path="/pendingUsers" name="PendingUsers" element={<PendingUsers />} />
  //         {/* <Route path="/verifyUser" name="VerifyUser" element={<VerifyUser />} /> */}
  //         <Route path="/verifyUser/:userId" element={<VerifyUser />} />
  //         <Route path="/activeUsers" name="ActiveUsers" element={<ActiveUsers />} />
  //         <Route path="/flaggedUsers" name="FlaggedUsers" element={<FlaggedUsers />} />
  //         <Route path="/test" name="Test" element={<Test />} />
  //         <Route path="/editUser/:userId" name="EditUser" element={<Edituser />} />
  //         <Route path="*" name="Login" element={<Login />} />
  //       </Routes>
  //     </Suspense>
  //   </HashRouter>
  // )
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated && state.user)

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {isAuthenticated ? (
            <Route path="/*" name="Home" element={<DefaultLayout />} />
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
