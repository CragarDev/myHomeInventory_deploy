import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import MainImage from './MainImage'

// material ui imports
import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  CssBaseline,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
  InputLabel,
  FormHelperText
} from '@mui/material'

const ItemUpdate = props => {
  const { _id } = useParams()
  // console.log('_id===>', _id)
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [catToAdd, setCatToAdd] = useState('')
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [newInventoryImage, setNewInventoryImage] = useState('')
  const { updatedInventoryToggle, setUpdatedInventoryToggle } = props

  // create state variables for the form inputs
  const [inventoryItemToUpdate, setInventoryItemToUpdate] = useState({})
  // console.log('inventoryItemToUpdate===>', inventoryItemToUpdate)
  // console.log(
  //   'inventoryItemToUpdate.category===>',
  //   inventoryItemToUpdate.category
  // )

  // useEffect to get the inventory item to update
  // this
  useEffect(() => {
    // console.log('ITEM UPDATE:_id===>', _id)
    axios
      .get(`http://localhost:8000/api/inventory/getOne/${_id}`)
      .then(res => {
        console.log('UPDATE INVENTORY- get item - RESPONSE', res)
        setCategory(res.data.results.category)
        setInventoryItemToUpdate(res.data.results)
      })
      .catch(err => {
        console.log(
          'UPDATE INVENTORY- Error getting the product at that id',
          err
        )
      })
  }, [_id])

  // function to add a new category to the category list
  const addNewCategoryToCurrentCategory = event => {
    // console.log('addNewCategoryToCurrentCategory', event)
    // console.log('catToAdd after entering new category button', catToAdd)
    setInventoryItemToUpdate({
      ...inventoryItemToUpdate,
      category: catToAdd
    })
    setCategory(catToAdd)
    // console.log('category after entering new category button', category)
    addNewCategorySubmit()
  }

  // add the new category to the category database
  const addNewCategorySubmit = () => {
    // console.log('catToAdd', catToAdd)

    const addNewCat = {
      categoryName: catToAdd
    }

    // console.log('addNewCat', addNewCat)
    // console.log('addNewCat.categoryName', addNewCat.categoryName)

    axios
      .post('http://localhost:8000/api/category/new', addNewCat)
      .then(res => {
        console.log('NEW CATEGORY submit--res.data:', res)

        if (res.data.error) {
          console.log('NEW CATEGORY submit--res.data.error:', res.data.error)
          setErrors(res.data.error.errors)
          setCategory('addCategory')
        } else {
          console.log(
            'NEW CATEGORY submit--res.data.newCategory:',
            res.data.newCategory
          )
          setErrors({})
        }
      })
      .catch(err => {
        console.log('NEW CATEGORY ERROR', err)
      })
  }

  // use to update the form inputs
  const changeHandler = e => {
    setInventoryItemToUpdate({
      ...inventoryItemToUpdate,
      [e.target.name]: e.target.value
    })
  }
  // use to update the select form input
  const selectChangeHandler = e => {
    setCategory(e.target.value)
    setInventoryItemToUpdate({
      ...inventoryItemToUpdate,
      [e.target.name]: e.target.value
    })
  }

  // get list of categories from the database
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/category')
      .then(res => {
        console.log('CATEGORY LIST', res.data.results)
        setCategoryList(res.data.results)
      })
      .catch(err => {
        console.log('CATEGORY LIST ERROR', err)
      })
  }, [])

  // update submit function
  const updateSubmitHandler = e => {
    e.preventDefault()
    // console.log('updateSubmitHandler', e)

    const formData = new FormData()

    formData.append('category', inventoryItemToUpdate.category)
    formData.append('title', inventoryItemToUpdate.title)
    formData.append('location', inventoryItemToUpdate.location)
    formData.append('condition', inventoryItemToUpdate.condition)
    formData.append('description', inventoryItemToUpdate.description)
    formData.append('make', inventoryItemToUpdate.make)
    formData.append('model', inventoryItemToUpdate.model)
    formData.append('serialNumber', inventoryItemToUpdate.serialNumber)
    formData.append('purchasePrice', inventoryItemToUpdate.purchasePrice)
    formData.append('currentValue', inventoryItemToUpdate.currentValue)
    formData.append('user_id', inventoryItemToUpdate.user_id)

    // formData.append('inventoryImage', inventoryItemToUpdate.inventoryImage)
    {
      newInventoryImage
        ? formData.append('inventoryImage', newInventoryImage)
        : formData.append(
            'inventoryImage',
            inventoryItemToUpdate.inventoryImage
          )
    }

    formData.append('purchaseLocation', inventoryItemToUpdate.purchaseLocation)

    axios
      .put(`http://localhost:8000/api/inventory/update/${_id}`, formData)
      .then(res => {
        // console.log('UPDATE INVENTORY- res:', res)
        console.log('UPDATE INVENTORY- res.data:', res.data)
        if (res.data.error) {
          console.log('UPDATE INVENTORY- res.data.error:', res.data.error)
          setErrors(res.data.error)
        } else {
          console.log('UPDATE INVENTORY FORM SUCCESS')
          // clear the form
          setInventoryItemToUpdate({
            category: '',
            title: '',
            location: '',
            condition: '',
            description: '',
            make: '',
            model: '',
            serialNumber: '',
            purchasePrice: '',
            currentValue: '',
            inventoryImage: '',
            purchaseLocation: '',
            user_id: ''
          })
          setNewInventoryImage('')
          // clear the errors
          setErrors({})
          // set the updatedInventoryToggle to the opposite of what it is
          setUpdatedInventoryToggle(!updatedInventoryToggle)
          // redirect to the inventory page
          history.push('/dashboard')
        }
      })
      .catch(err => {
        console.log(
          'UPDATE INVENTORY FORM: Error after updating the product - ERROR',
          err
        )
      })
    // console.log('UPDATE INVENTORY FORM SUBMITTED')
  }

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          component='form'
          noValidate
          onSubmit={updateSubmitHandler}
          enctype='multipart/form-data'
        >
          {/* <Box> */}
          <Paper variant='elevation' elevation={12}>
            <CssBaseline />
            {/* <form onSubmit={handleSubmit} className='text-start'> */}
            {/* Header Text */}
            <Typography
              align='center'
              sx={{ mt: 3, p: 5, fontWeight: 'bold' }}
              component='h1'
              variant='h2'
              color='warning.main'
            >
              Update Inventory Item{' '}
            </Typography>

            {/* MAIN FORM GRID */}
            <Grid container spacing={2} sx={{ padding: 5 }}>
              {/* ********************** inventoryImage Upload ***************************/}
              <Grid item xs={12}>
                <Grid item xs={3} my={2}>
                  <MainImage
                    _id={_id}
                    title={title}
                    inventoryImage={inventoryItemToUpdate.inventoryImage}
                  />
                </Grid>
                <Typography variant='body2' gutterBottom color='warning.main'>
                  Click to upload new image{' '}
                </Typography>
                <input
                  type='file'
                  name='newInventoryImage'
                  accept='image/png, image/jpeg, image/jpg'
                  onChange={e => setNewInventoryImage(e.target.files[0])}
                />
              </Grid>
              {/* ******************* Category Start ***************************************** */}
              {/* Category */}
              <Grid item xs={12} sx={{ padding: 1 }}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Category{' '}
                </Typography>
                <FormControl className=''>
                  <InputLabel
                    required
                    sx={{ mt: 1, mb: 1 }}
                    id='category-select'
                  >
                    Select to change categories
                  </InputLabel>
                  <Select
                    name='category'
                    color='success'
                    labelId='category-select'
                    id='category-select'
                    value={category}
                    onChange={selectChangeHandler}
                  >
                    <MenuItem value=''>
                      <em> Select new category</em>
                    </MenuItem>
                    {/* here is the list of categories */}
                    {categoryList.map(category => (
                      <MenuItem
                        key={category._id}
                        value={category.categoryName}
                      >
                        {category.categoryName}
                      </MenuItem>
                    ))}
                    {/* selection will trigger the add category input and button to add a new category to the database  */}
                    <MenuItem value='addCategory'>
                      <em>... Add Category</em>
                    </MenuItem>
                    {catToAdd ? (
                      <MenuItem value={catToAdd}>
                        <em>adding: {catToAdd}</em>
                      </MenuItem>
                    ) : null}
                  </Select>
                  {/* if select === 'addCategory' then show an input field to input a new category. the database and then update the list and have that new category selected for submission */}
                  {inventoryItemToUpdate.category === 'addCategory' && (
                    <>
                      <TextField
                        onChange={e => setCatToAdd(e.target.value)}
                        required
                        fullWidth
                        color='success'
                        label='Add New Category'
                        variant='filled'
                        name='categoryName'
                        value={catToAdd}
                      />
                      <button
                        onClick={e => {
                          addNewCategoryToCurrentCategory(e)
                        }}
                      >
                        Enter New Category
                      </button>
                    </>
                  )}
                  <p className='text-danger'>{errors.categoryName?.message} </p>

                  <FormHelperText>
                    Select 'Add Category' to add a new category
                  </FormHelperText>
                </FormControl>
                <p className='text-danger'>{errors.category?.message} </p>
                {/* <p>
                  Current Category -{' '}
                  <span className='text-success'>
                    {inventoryItemToUpdate.category}
                  </span>
                </p> */}
              </Grid>

              {/* ************************ Category End ************************************ */}

              {/* title */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Title{' '}
                </Typography>
                <TextField
                  onChange={changeHandler}
                  required
                  fullWidth
                  color='warning'
                  variant='filled'
                  label={inventoryItemToUpdate.title ? null : 'Title'}
                  name='title'
                  id='title'
                  value={inventoryItemToUpdate.title}
                />
                <p className='text-danger'>{errors.title?.message} </p>
              </Grid>
              {/* location */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Location{' '}
                </Typography>
                <TextField
                  onChange={changeHandler}
                  fullWidth
                  required
                  color='warning'
                  variant='filled'
                  name='location'
                  label={inventoryItemToUpdate.location ? null : 'Location'}
                  id='location'
                  value={inventoryItemToUpdate.location}
                />
                <p className='text-danger'>{errors.location?.message} </p>
              </Grid>
              {/* condition */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Condition{' '}
                </Typography>
                <TextField
                  onChange={changeHandler}
                  fullWidth
                  color='warning'
                  variant='filled'
                  label={inventoryItemToUpdate.condition ? null : 'Condition'}
                  name='condition'
                  id='condition'
                  value={inventoryItemToUpdate.condition}
                />
                <p className='text-danger'>{errors.condition?.message} </p>
              </Grid>
              {/* description */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Description{' '}
                </Typography>
                <TextField
                  onChange={changeHandler}
                  fullWidth
                  color='warning'
                  variant='filled'
                  label={
                    inventoryItemToUpdate.description ? null : 'Description'
                  }
                  name='description'
                  id='description'
                  value={inventoryItemToUpdate.description}
                />
                <p className='text-danger'>{errors.description?.message} </p>
              </Grid>
              {/* make */}
              <Grid item xs={4}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Make{' '}
                </Typography>
                <TextField
                  onChange={changeHandler}
                  fullWidth
                  color='warning'
                  variant='filled'
                  label={inventoryItemToUpdate.make ? null : 'Make'}
                  name='make'
                  id='make'
                  value={inventoryItemToUpdate.make}
                />
                <p className='text-danger'>{errors.make?.message} </p>
              </Grid>
              {/* model */}
              <Grid item xs={4}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Model{' '}
                </Typography>
                <TextField
                  onChange={changeHandler}
                  fullWidth
                  color='warning'
                  variant='filled'
                  label={inventoryItemToUpdate.model ? null : 'Model'}
                  name='model'
                  id='model'
                  value={inventoryItemToUpdate.model}
                />
                <p className='text-danger'>{errors.model?.message} </p>
              </Grid>
              {/* serial number */}
              <Grid item xs={4}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Serial Number{' '}
                </Typography>
                <TextField
                  onChange={changeHandler}
                  fullWidth
                  color='warning'
                  variant='filled'
                  label={
                    inventoryItemToUpdate.serialNumber ? null : 'Serial Number'
                  }
                  name='serialNumber'
                  id='serialNumber'
                  value={inventoryItemToUpdate.serialNumber}
                />
                <p className='text-danger'>{errors.serialNumber?.message} </p>
              </Grid>
              {/* purchase price */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Purchase Price{' '}
                </Typography>
                <TextField
                  onChange={changeHandler}
                  fullWidth
                  color='warning'
                  variant='filled'
                  type='number'
                  label={
                    inventoryItemToUpdate.purchasePrice === 0
                      ? 'Purchase Price'
                      : inventoryItemToUpdate.purchasePrice > 0
                      ? null
                      : 'Purchase Price'
                  }
                  name='purchasePrice'
                  id='purchasePrice'
                  value={
                    inventoryItemToUpdate.purchasePrice === 0
                      ? 'Purchase Price'
                      : inventoryItemToUpdate.purchasePrice
                  }
                />
                <p className='text-danger'>{errors.purchasePrice?.message} </p>
              </Grid>
              {/* current value */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Current Value{' '}
                </Typography>
                <TextField
                  onChange={changeHandler}
                  fullWidth
                  color='warning'
                  variant='filled'
                  type='number'
                  label={
                    inventoryItemToUpdate.currentValue === 0
                      ? 'Current Value'
                      : inventoryItemToUpdate.currentValue > 0
                      ? null
                      : 'Current Value'
                  }
                  name='currentValue'
                  id='currentValue'
                  value={
                    inventoryItemToUpdate.currentValue === 0
                      ? 'currentValue'
                      : inventoryItemToUpdate.currentValue
                  }
                />
                <p className='text-danger'>{errors.currentValue?.message} </p>
              </Grid>
              {/* purchase Location */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Purchase Location{' '}
                </Typography>
                <TextField
                  onChange={changeHandler}
                  fullWidth
                  color='warning'
                  variant='filled'
                  label={
                    inventoryItemToUpdate.purchaseLocation
                      ? null
                      : 'Purchase Location'
                  }
                  name='purchaseLocation'
                  id='purchaseLocation'
                  value={inventoryItemToUpdate.purchaseLocation}
                />
                <p className='text-danger'>
                  {errors.purchaseLocation?.message}{' '}
                </p>
              </Grid>
            </Grid>
            <Button
              size='large'
              type='submit'
              fullWidth
              variant='contained'
              color='warning'
              sx={{ p: 3, fontSize: '1.5rem' }}
            >
              Update Item
            </Button>
            {/* </form> */}
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default ItemUpdate
