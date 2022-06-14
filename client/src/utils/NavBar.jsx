// Used in App.js

import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

// material ui
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import HomeIcon from '@mui/icons-material/Home'

const NavBar = props => {
  const [pageButtonSelected, setPageButtonSelected] = useState('')
  // console.log('NavBar__props.toggleSwitch==> ', props.toggleSwitch)
  // for the buttons and icons components to show and hide
  const [showButtons, setShowButtons] = useState(false)
  const [showIcons, setShowIcons] = useState(false)

  const history = useHistory('/')

  const clickHandlerButtons = () => {
    setShowButtons(!showButtons)
  }
  const clickHandlerIcons = () => {
    setShowIcons(!showIcons)
  }

  // :::::::::::::::::::::::: from the docs :::::::::::::::::::::::::::
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
    // console.log('handleOpenNavMenu__anchorElNav==> ', anchorElNav)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = event => {
    // console.log(
    //   'handleCloseNavMenu__event.target.innerText==> ',
    //   event.target.innerText
    // )
    const navToo = event.target.innerText.toLowerCase()
    // console.log('handleCloseNavMenu__navToo==> ', navToo)
    setPageButtonSelected(navToo.toLowerCase())

    props.setToggleSwitch(!props.toggleSwitch)

    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // log out user and redirect to login page
  const logOutHandler = () => {
    // console.log('logOutHandler')
    axios
      .get('http://localhost:8000/api/user/logout', { withCredentials: true })
      .then(res => {
        console.log('logOutHandler__res.data==> ', res.data)
        history.push('/mhi')
      })
      .catch(err => {
        console.log('logOutHandler__err==> ', err)
      })
  }

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  return (
    <AppBar color='success' position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Home/Logo Buttons */}
          <Tooltip title='My Home Inventory'>
            <HomeIcon
              sx={{ display: { xs: 'none', md: 'flex' }, fontSize: '1.75rem' }}
            />
          </Tooltip>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/mhi'
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Squada One, cursive, monospace',
              fontSize: '1.75rem',
              fontWeight: 400,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              marginRight: '1rem'
            }}
          >
            MHI
          </Typography>

          <HomeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Squada One, cursive, monospace',
              fontSize: '1.75rem',
              fontWeight: 400,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            MHI
          </Typography>
          {/* these are the pages buttons */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}></Box>
          <Link to='/login'>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: '' }}
            >
              Login
            </Button>
          </Link>
          <Link to='/register'>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: '' }}
            >
              Register
            </Button>
          </Link>
          <Link to='/dashboard'>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: '' }}
            >
              Dashboard
            </Button>
          </Link>
          <Link to='/addItem'>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: '' }}
            >
              Add New Item
            </Button>
          </Link>

          <Button
            variant='text'
            // color='error'
            onClick={logOutHandler}
            sx={{ my: 2, color: 'red', display: '' }}
          >
            Logout
          </Button>

          <Box />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
