import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button
} from '@mui/material'

const ItemCard = props => {
  const { _id, title, category, inventoryImage, deleteInventoryItem } = props

  return (
    <>
      <Box>
        <Card sx={{ maxWidth: 240, p: '5px', m: '5px' }}>
          {inventoryImage !== undefined ? (
            <CardMedia
              component='img'
              height='150px'
              src={inventoryImage}
              alt={title}
            />
          ) : (
            <img
              src={require('../assets/images/noImageAvalilable.jpg')}
              width='150px'
              alt='not available'
            />
          )}
          <CardContent>
            <Typography variant='h5' component='div'>
              {title}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {category}
            </Typography>
          </CardContent>
          <CardActions>
            <Button color='warning' variant='text' size='small'>
              <Link className='text-decoration-none' to={`/itemDetail/${_id}`}>
                {' '}
                View
              </Link>
            </Button>
            <Button color='success' variant='text' size='small'>
              <Link
                className='text-decoration-none text-warning'
                to={`/itemUpdate/${_id}`}
              >
                {' '}
                Update
              </Link>
            </Button>
            <Button
              color='error'
              variant='text'
              size='small'
              onClick={e => {
                deleteInventoryItem(_id)
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}

export default ItemCard
