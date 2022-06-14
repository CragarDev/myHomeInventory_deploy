import React from 'react'

// Css
import '../App.css'

// Material UI
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

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
  return (
    <>
      <div
        className='bgImgLanding'
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
                    sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}
                    className='text-center text-warning'
                    component='h1'
                    variant='h2'
                  >
                    Welcome to My Home Inventory
                  </Typography>
                  <Typography
                    sx={{ mt: 3, mb: 1 }}
                    className='text-center'
                    component='h1'
                    variant='h4'
                  >
                    Please{' '}
                    <span className='text-success'>
                      <a className='text-decoration-none' href='/logIn'>
                        Login
                      </a>
                    </span>{' '}
                    or{' '}
                    <span className='text-warning'>
                      <a className='text-decoration-none' href='/register'>
                        Sign up
                      </a>
                    </span>{' '}
                    to enter!
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <Grid
                      sx={{ mt: 1, mb: 2 }}
                      container
                      justifyContent='space-between'
                    >
                      <Button
                        type='submit'
                        variant='contained'
                        sx={{ mt: 3, mb: 2, mx: 2 }}
                        color='success'
                        href='/logIn'
                      >
                        Log In
                      </Button>
                      <Button
                        type='submit'
                        variant='contained'
                        sx={{ mt: 3, mb: 2, mx: 2 }}
                        color='warning'
                        href='/register'
                      >
                        Register
                      </Button>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </Paper>
            <TestProject />
          </ThemeProvider>
        </div>
      </div>
    </>
  )
}

export default Register
