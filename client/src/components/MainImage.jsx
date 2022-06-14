import React from 'react'
import { CardMedia, Card } from '@mui/material'

const MainImage = props => {
  // destructuring the props
  const { inventoryImage, title, _id, maxWidth } = props
  return (
    <>
      <Card sx={{ maxWidth, m: '5px' }}>
        <CardMedia
          component='img'
          height='100%'
          width='100%'
          //   image={`inventoryImages/${inventoryImage}`}
          image={inventoryImage}
          alt={title}
        />
      </Card>
    </>
  )
}

export default MainImage
