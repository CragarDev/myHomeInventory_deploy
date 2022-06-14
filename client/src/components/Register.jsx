import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

// Css
import '../App.css'

// Material UI
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

// axios
import axios from 'axios'
import TestProject from '../utils/TestProject'

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    success: {
      main: '#4caf50',
      light: '#8bc34a'
    }
  }
})

const Register = props => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { loggedInUserToggle, setLoggedInUserToggle } = props

  // errors state variable
  const [errors, setErrors] = useState({})

  // history hook
  const history = useHistory()
  //  const [newUserToggle, setNewUserToggle] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    // console.log('firstName', firstName)
    // console.log('lastName', lastName)
    // console.log('email', email)
    // console.log('password', password)
    // console.log('confirmPassword', confirmPassword)

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }

    // console.log('newUser after input', newUser)

    // use axios to post the author
    axios
      .post('http://localhost:8000/api/user/register', newUser, {
        withCredentials: true
      })
      .then(res => {
        console.log('REGISTER FORM: Res: ', res)
        if (res.data.error) {
          console.log('REGISTER FORM: Error: ', res.data.error)
          setErrors(res.data.error.errors)
        } else {
          // clear the form
          setFirstName('')
          setLastName('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setErrors({})
          props.setNewUserToggle(!props.newUserToggle)
          setLoggedInUserToggle(!loggedInUserToggle)
          // redirect to the home page
          history.push('/dashboard')
        }
      })
      .catch(err => {
        console.log('REGISTER FORM: Error: ', err)
      })
    // console.log('REGISTER FORM: Submitted')
  }
  return (
    <>
      <div
        className='bgImgRegister'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div className='container mt-5'>
          <ThemeProvider theme={theme}>
            <Paper
              elevation={12}
              variant='elevation'
              style={{ backgroundColor: 'whitesmoke' }}
            >
              <Container>
                <CssBaseline />
                <Box
                  sx={{
                    marginBottom: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    sx={{ mt: 3, mb: 1 }}
                    className='text-center'
                    component='h1'
                    variant='h4'
                  >
                    Thank you! for registering with My Home Inventory
                  </Typography>
                  <Avatar sx={{ p: 3, m: 1, bgcolor: 'warning.main' }}>
                    <HowToRegRoundedIcon fontSize='large' />
                  </Avatar>
                  <Typography component='h1' variant='h6'>
                    Please Register - all fields are required
                  </Typography>
                  <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e => setFirstName(e.target.value)}
                          autoComplete='given-name'
                          color='warning'
                          name='firstName'
                          required
                          fullWidth
                          id='firstName'
                          label='First Name'
                          autoFocus
                        />
                        <p className='text-danger'>
                          {errors.firstName?.message}{' '}
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={e => setLastName(e.target.value)}
                          required
                          color='warning'
                          fullWidth
                          id='lastName'
                          label='Last Name'
                          name='lastName'
                          autoComplete='family-name'
                        />

                        <p className='text-danger'>
                          {errors.lastName?.message}{' '}
                        </p>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={e => setEmail(e.target.value)}
                          required
                          color='warning'
                          fullWidth
                          id='email'
                          type='email'
                          label='Email Address'
                          name='email'
                          autoComplete='email'
                        />

                        <p className='text-danger'>{errors.email?.message} </p>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={e => setPassword(e.target.value)}
                          required
                          color='warning'
                          fullWidth
                          name='password'
                          label='Password'
                          type='password'
                          id='password'
                          autoComplete='new-password'
                        />

                        <p className='text-danger'>
                          {errors.password?.message}{' '}
                        </p>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={e => setConfirmPassword(e.target.value)}
                          required
                          color='warning'
                          fullWidth
                          name='confirmPassword'
                          label='Confirm Password'
                          type='password'
                          id='confirmPassword'
                          autoComplete='new-password'
                        />
                        <p className='text-danger'>
                          {errors.confirmPassword?.message}{' '}
                        </p>
                      </Grid>
                    </Grid>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2 }}
                      color='warning'
                    >
                      Sign Up
                    </Button>
                    <Grid
                      sx={{ mt: 1, mb: 2 }}
                      container
                      justifyContent='flex-end'
                    >
                      <Grid item>
                        <Link
                          className='text-light text-decoration-none'
                          to='/logIn'
                        >
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                    <TestProject />
                  </Box>
                </Box>
              </Container>
            </Paper>
          </ThemeProvider>
        </div>
      </div>
    </>
  )
}

export default Register
