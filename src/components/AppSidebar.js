import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import './AppSidebar.css'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'
import { changeState } from '../Redux/Slices/styleSlice'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const style = useSelector((state) => state.style)
  const unfoldable = useSelector((state) => state.style.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.style.sidebarShow)

  useEffect(() => {
    console.log('sidebar', style)
  }, [style])

  return (
    <CSidebar
      className="border-end"
      colorScheme="light"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        // dispatch({ type: 'set', sidebarShow: visible })
        dispatch(changeState({ sidebarShow: visible }))
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          // onClick={() => dispatch({ type: 'set', sidebarShow: false })}
          onClick={() => dispatch(changeState({ sidebarShow: false }))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          // onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
          onClick={() => dispatch(changeState({ sidebarUnfoldable: !unfoldable }))}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
