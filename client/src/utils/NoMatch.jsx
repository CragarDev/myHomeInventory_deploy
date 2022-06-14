import React from 'react'
import { useLocation } from 'react-router-dom'
import { Container } from '@mui/material'

const NoMatch = () => {
  const location = useLocation()
  return (
    <>
      <Container>
        <h1>Page NOT Found</h1>
        <h3 className='text-danger'>
          No Page found at: <code>{location.pathname}</code>
        </h3>
        <img src='https://http.cat/401' alt='' />
      </Container>
    </>
  )
}

export default NoMatch
