import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Stack,
  ImageList,
  ImageListItem,
  ListSubheader
} from '@mui/material'
import ItemCard from './ItemCard'

const AllInventoryItems = props => {
  console.log('Entering AllInventoryItems')
  // state varible to hold the inventory items
  const [inventoryItems, setInventoryItems] = useState([])

  // logged in user id
  const {
    loggedInUserId,
    updatedInventoryToggle,
    setUpdatedInventoryToggle
  } = props
  console.log('ALLINVENTORYITEMS__props', props)
  console.log('ALLINVENTORYITEMS__Logged in user id: ', loggedInUserId)

  // history object to redirect to the edit page
  const history = useHistory()

  // toggle for deleting items and rerendering the list
  const { deleteToggle, setDeleteToggle } = props

  // bring in all the inventory items
  useEffect(() => {
    // console.log('ALLINVENTORYITEMS__Logged in user id: ', loggedInUserId)
    axios
      .get(`http://localhost:8000/api/inventory/user/${loggedInUserId}`)
      .then(res => {
        console.log('All INVENTORY ITEMS: ', res.data)
        setInventoryItems(res.data.results)
      })
      .catch(err => {
        console.log('ALL INVENTORY: error from server: ', err)
      })
  }, [
    loggedInUserId,
    deleteToggle,
    props.newInventoryItemToggle,
    updatedInventoryToggle
  ])

  // delete an item
  const deleteInventoryItem = _id => {
    // console.log('DELETE INVENTORY ITEM: ', _id)
    axios
      .delete(`http://localhost:8000/api/inventory/delete/${_id}`)
      .then(res => {
        console.log('DELETE INVENTORY ITEM: ', res.data)
        setDeleteToggle(!deleteToggle)
      })
      .catch(err => {
        console.log('DELETE INVENTORY ITEM: ', err)
      })
  }

  return (
    <Stack height='100vh'>
      <Container
        display='flex'
        bgcolor='success.dark'
        sx={{
          padding: '16px'
        }}
      >
        {' '}
        {/* <ImageList sx={{ width: 1000, height: 800 }}> */}
        <ImageList
          sx={{
            height: '100vu',
            backgroundColor: 'success.dark',
            padding: '20px'
          }}
        >
          <ImageListItem key='Subheader' cols={4}>
            <ListSubheader component='div'>All Inventory Items</ListSubheader>
          </ImageListItem>
          {inventoryItems.map(inventoryItem => (
            <ImageListItem key={inventoryItem._id}>
              <ItemCard
                _id={inventoryItem._id}
                title={inventoryItem.title}
                category={inventoryItem.category}
                inventoryImage={inventoryItem.inventoryImage}
                deleteInventoryItem={deleteInventoryItem}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Stack>
  )
}

export default AllInventoryItems
