import React, { useState } from 'react'
import AllInventoryItems from './AllInventoryItems'
import { Container } from '@mui/material'

const ItemsList = props => {
  const [newInventoryItemToggle, setNewInventoryItemToggle] = useState(false)
  const {
    deleteToggle,
    setDeleteToggle,
    updatedInventoryToggle,
    setUpdatedInventoryToggle
  } = props
  const { loggedInUserId } = props
  // console.log('ITEMSLIST__Logged in user id: ', loggedInUserId)
  return (
    <>
      <Container>
        {/* <h1>All Inventory Items List</h1> */}
        {/* <Category /> */}
        <AllInventoryItems
          newInventoryItemToggle={newInventoryItemToggle}
          setNewInventoryItemToggle={setNewInventoryItemToggle}
          deleteToggle={deleteToggle}
          setDeleteToggle={setDeleteToggle}
          loggedInUserId={loggedInUserId}
          updatedInventoryToggle={updatedInventoryToggle}
          setUpdatedInventoryToggle={setUpdatedInventoryToggle}
        />
      </Container>
    </>
  )
}

export default ItemsList
