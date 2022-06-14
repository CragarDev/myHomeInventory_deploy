import React from 'react'
import { Container, Typography, Paper } from '@mui/material'

const TestProject = () => {
  return (
    <>
      <Container maxWidth='sm' sx={{ marginTop: '20px', marginBottom: '20px' }}>
        <Paper
          elevation={6}
          sx={{ padding: '10px', backgroundColor: '#b71c1c' }}
        >
          {' '}
          <Typography align='center' variant='h5'>
            This is a test Project
          </Typography>
          <Typography align='center' variant='h5'>
            The database will be dropped every few days!
          </Typography>
          <Typography align='center' variant='h5'>
            Thank you for trying it out!
          </Typography>
        </Paper>
        <Typography variant='caption' align='center'>
          Images available at{' '}
          <a href='https://www.pexels.com/' target='_blank' rel='noreferrer'>
            https://www.pexels.com/
          </a>
        </Typography>
      </Container>
    </>
  )
}

export default TestProject
