import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import TestProject from '../utils/TestProject'

// Material UI
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

export default function LogIn (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const { loggedInUserToggle, setLoggedInUserToggle } = props

  const history = useHistory()

  const loginHandler = event => {
    event.preventDefault()
    // console.log('email', email)
    // console.log('password', password)

    // put the form info into an object
    const formInfo = {
      email: email,
      password: password
    }

    axios
      .post('http://localhost:8000/api/user/login', formInfo, {
        withCredentials: true
      })
      .then(res => {
        console.log('LOGIN RESPONSE__res.data', res.data)
        // save the token in the local storage
        // localStorage.setItem('token', res.data.token)
        // redirect to the dashboard
        // history.push('/dashboard')
        if (res.data.error) {
          console.log('ERROR__res.data.error', res.data.error)
          setErrors(res.data.error.errors)
        } else {
          // save the token in the local storage
          // localStorage.setItem('token', res.data.token)
          // clear the form
          setEmail('')
          setPassword('')
          // redirect to the dashboard
          setLoggedInUserToggle(!loggedInUserToggle)
          history.push('/dashboard')
        }
      })
      .catch(err => {
        console.log('LOGIN FORM ERROR__err', err)
      })
    // console.log('LOGGED IN: Submitted')
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3951746/pexels-photo-3951746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'success.dark'
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#e0e0e0'
            }}
          >
            <Typography component='h1' variant='h3' color='success.main'>
              Welcome to My Home Inventory
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Please Login or Sign up for access!
            </Typography>
            <Box
              component='form'
              width='100%'
              noValidate
              onSubmit={loginHandler}
              sx={{ mt: 1 }}
            >
              <TextField
                color='success'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={e => setEmail(e.target.value)}
              />
              <p className='text-danger'>{errors.email?.message} </p>
              <TextField
                color='success'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={e => setPassword(e.target.value)}
              />
              <p className='text-danger'>{errors.password?.message} </p>
              {/* <FormControlLabel
                control={<Checkbox value='remember' color='success' />}
                label='Remember me'
              /> */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                color='warning'
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href='/register' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <TestProject />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
