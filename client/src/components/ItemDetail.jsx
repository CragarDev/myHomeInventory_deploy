import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import MainImage from './MainImage'
import DetailsInfo from './DetailsInfo'
import {
  Typography,
  Paper,
  Divider,
  Grid,
  Container,
  ButtonGroup,
  Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const ItemDetail = props => {
  const { _id } = useParams()
  const [inventoryItem, setInventoryItem] = useState({})
  const { deleteToggle, setDeleteToggle } = props
  // destructure the inventory item
  const { title, inventoryImage } = inventoryItem
  const history = useHistory()
  // const [deleteToggle, setDeleteToggle] = useState(false)

  // delete an item
  const deleteInventoryItem = _id => {
    // console.log('DELETE INVENTORY ITEM: ', _id)
    axios
      .delete(`http://localhost:8000/api/inventory/delete/${_id}`)
      .then(res => {
        console.log('DELETE INVENTORY ITEM: ', res.data)
        setDeleteToggle(!deleteToggle)
        history.push('/dashboard')
      })
      .catch(err => {
        console.log('DELETE INVENTORY ITEM: ', err)
      })
  }

  useEffect(() => {
    // console.log('ITEMDETAIL__ _id: ', _id)
    axios
      .get(`http://localhost:8000/api/inventory/getOne/${_id}`)
      .then(res => {
        console.log('INVENTORY ITEM: ', res.data.results)
        setInventoryItem(res.data.results)
      })
      .catch(err => {
        console.log('INVENTORY ITEM: ', err)
      })
  }, [_id])

  // // number formatter for price
  // const priceFormatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: 2
  // })

  return (
    <>
      <Container>
        <Grid container className='mt-3'>
          <Typography variant='h5' component='h1'>
            <span className='fw-bold display-1 text-warning'>
              {inventoryItem.title}
            </span>{' '}
            <span className='ms-5'>Inventory Item Details</span>
          </Typography>
          <Divider></Divider>
          <Paper elevation={12}>
            <Grid
              container
              direction='row'
              spacing={3}
              sx={{ padding: '30px' }}
            >
              <Grid item xs={6}>
                <MainImage
                  maxWidth='600'
                  _id={_id}
                  title={title}
                  inventoryImage={inventoryImage}
                ></MainImage>
              </Grid>
              <Grid item xs={6}>
                <DetailsInfo inventoryItem={inventoryItem}></DetailsInfo>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <ButtonGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            '& > *': {
              m: 5
            }
          }}
          size='medium'
        >
          <Button
            startIcon={<ArrowBackIcon />}
            variant='contained'
            color='primary'
          >
            <Link className='text-decoration-none ' to={`/dashboard`}>
              {' '}
              Dashboard
            </Link>
          </Button>
          <Button startIcon={<EditIcon />} variant='contained' color='success'>
            <Link className='text-decoration-none ' to={`/itemUpdate/${_id}`}>
              {' '}
              Update
            </Link>
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant='outlined'
            color='error'
            onClick={e => {
              deleteInventoryItem(_id)
            }}
          >
            Delete Item
          </Button>
        </ButtonGroup>
      </Container>
    </>
  )
}

export default ItemDetail
