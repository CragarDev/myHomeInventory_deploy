import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import InventoryForm from '../utils/InventoryForm'

// const inventoryValues = {}

const AddItem = props => {
  const [newInventoryToggle, setNewInventoryToggle] = useState(false)

  const [loggedInUserId, setLoggedInUserId] = useState('')
  const [loggedInUserFirstName, setLoggedInUserFirstName] = useState('')
  const [loggedInUserLastName, setLoggedInUserLastName] = useState('')
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('')

  const { loggedInUserToggle, setLoggedInUserToggle } = props

  const [errors, setErrors] = useState({})
  const history = useHistory()

  // get logged in user
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/user/loggedInUser', {
        withCredentials: true
      })
      .then(res => {
        console.log('GETTING LOGGED IN USER__res.data ==>', res.data)
        if (res.data.results) {
          // this means there is a user logged in
          setLoggedInUserId(res.data.results._id)
          setLoggedInUserFirstName(res.data.results.firstName)
          setLoggedInUserLastName(res.data.results.lastName)
          setLoggedInUserEmail(res.data.results.email)
        }
      })
      .catch(err => {
        console.log('GETTING LOGGED IN USER__res.data ==>ERROR:', err)
        setLoggedInUserToggle(!loggedInUserToggle)
        history.push('/login')
      })
  }, [loggedInUserToggle])
  return (
    <>
      <div className='bgImgAddItem'>
        {/* <h1 className='text-center text-warning'>Add Inventory Item</h1>
        <hr /> */}
        <InventoryForm
          newInventoryToggle={newInventoryToggle}
          setNewInventoryToggle={setNewInventoryToggle}
          loggedInUserId={loggedInUserId}
        />
      </div>
    </>
  )
}

export default AddItem
