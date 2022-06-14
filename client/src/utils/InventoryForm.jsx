import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField
} from '@mui/material'
import axios from 'axios'

const InventoryForm = props => {
  const { loggedInUserId } = props
  // console.log('Type of Logged In User', loggedInUserId)
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [condition, setCondition] = useState('')
  const [description, setDescription] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currentValue, setCurrentValue] = useState('')
  const [inventoryImage, setInventoryImage] = useState('')
  const [purchaseLocation, setPurchaseLocation] = useState('')
  const [user_id, setUser_id] = useState(loggedInUserId)
  // to fill the select menu with the categories
  const [categoryList, setCategoryList] = useState([])
  const [catToAdd, setCatToAdd] = useState('')
  const [categoryName, setCategoryName] = useState(catToAdd)
  const [newInventorySubmit, setNewInventorySubmit] = useState(false)
  const [formData, setFormData] = useState({})

  // to push the new category to the category database
  const [newCategory, setNewCategory] = useState('')

  // for errors
  const [errors, setErrors] = useState({})

  // for redirect
  const history = useHistory()

  // for handling form submission
  const submitNewInventory = event => {
    event.preventDefault()

    // console.log('submitNewInventory...event:', event)

    const formData = new FormData()

    formData.append('user_id', loggedInUserId)
    formData.append('category', category)
    // console.log('category', category)
    formData.append('title', title)
    // console.log('title', title)
    formData.append('location', location)
    // console.log('location', location)
    formData.append('condition', condition)
    // console.log('condition', condition)
    formData.append('description', description)
    // console.log('description', description)
    formData.append('make', make)
    // console.log('make', make)
    formData.append('model', model)
    // console.log('model', model)
    formData.append('serialNumber', serialNumber)
    // console.log('serialNumber', serialNumber)
    formData.append('purchasePrice', purchasePrice === '' ? 0 : purchasePrice)
    // console.log('purchasePrice', purchasePrice)
    formData.append('currentValue', currentValue === '' ? 0 : currentValue)
    // console.log('currentValue', currentValue)
    formData.append('inventoryImage', inventoryImage)
    // console.log('inventoryImage', inventoryImage)
    formData.append('purchaseLocation', purchaseLocation)
    // console.log('purchaseLocation', purchaseLocation)

    // console.log('formData', formData)

    // const inventory = {
    //   category,
    //   title,
    //   location,
    //   condition,
    //   description,
    //   make,
    //   model,
    //   serialNumber,
    //   purchasePrice,
    //   currentValue,
    //   inventoryImage
    // }
    axios
      .post('http://localhost:8000/api/inventory/new', formData)
      .then(res => {
        console.log('INVENTORY FORM RESPONSE', res)

        if (res.data.error) {
          console.log('INVENTORY FORM ERRORS', res.data.error)
          setErrors(res.data.error.errors)
        } else {
          console.log('INVENTORY FORM SUCCESS')
          // clear the form
          setNewInventorySubmit(true)
          setCategory('')
          setTitle('')
          setLocation('')
          setCondition('')
          setDescription('')
          setMake('')
          setModel('')
          setSerialNumber('')
          setPurchasePrice('')
          setCurrentValue('')
          setInventoryImage('')
          setCatToAdd('')
          setErrors({})
          props.setNewInventoryToggle(!props.newInventoryToggle)
          history.push('/dashboard')
        }
      })
      .catch(err => {
        console.log('INVENTORY FORM ERROR', err)
      })
    // console.log('INVENTORY FORM SUBMITTED')
  }

  const addNewCategoryToCurrentCategory = event => {
    // console.log('addNewCategoryToCurrentCategory', event)
    // console.log('catToAdd after entering new category button', catToAdd)
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
          onSubmit={submitNewInventory}
          enctype='multipart/form-data'
        >
          {/* <Box> */}
          <Paper variant='elevation' elevation={12}>
            <CssBaseline />

            {/* Header Text */}
            <Typography
              align='center'
              sx={{ mt: 3, p: 5, fontWeight: 'bold' }}
              component='h1'
              variant='h2'
              color='success.main'
            >
              Add New Inventory Item{' '}
            </Typography>

            {/* MAIN FORM GRID */}
            <Grid container spacing={2} sx={{ padding: 5 }}>
              {/* ********************** inventoryImage Upload ***************************/}
              <Grid item xs={12}>
                <input
                  type='file'
                  name='inventoryImage'
                  accept='image/png, image/jpeg, image/jpg'
                  onChange={e => setInventoryImage(e.target.files[0])}
                />
              </Grid>
              {/* ************************************************************ */}
              <input
                type='hidden'
                name='user_id'
                id='user_id'
                value={user_id}
              />
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
                    Category
                  </InputLabel>
                  <Select
                    name='category'
                    color='success'
                    labelId='category-select'
                    id='category-select'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <MenuItem value=''>
                      <em>select a category</em>
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
                  {category === 'addCategory' && (
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
              </Grid>

              {/* title */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Title{' '}
                </Typography>
                <TextField
                  onChange={e => setTitle(e.target.value)}
                  required
                  fullWidth
                  color='success'
                  label='Title'
                  variant='filled'
                  name='title'
                />
                <p className='text-danger'>{errors.title?.message} </p>
              </Grid>
              {/* location */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Location{' '}
                </Typography>
                <TextField
                  onChange={e => setLocation(e.target.value)}
                  fullWidth
                  required
                  color='success'
                  label='Location'
                  variant='filled'
                  name='location'
                />
                <p className='text-danger'>{errors.location?.message} </p>
              </Grid>
              {/* condition */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Condition{' '}
                </Typography>
                <TextField
                  onChange={e => setCondition(e.target.value)}
                  fullWidth
                  color='success'
                  label='Condition'
                  variant='filled'
                  name='condition'
                />
                <p className='text-danger'>{errors.condition?.message} </p>
              </Grid>
              {/* description */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Description{' '}
                </Typography>
                <TextField
                  onChange={e => setDescription(e.target.value)}
                  fullWidth
                  color='success'
                  label='Description'
                  variant='filled'
                  name='description'
                />
                <p className='text-danger'>{errors.description?.message} </p>
              </Grid>
              {/* make */}
              <Grid item xs={4}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Make{' '}
                </Typography>
                <TextField
                  onChange={e => setMake(e.target.value)}
                  fullWidth
                  color='success'
                  label='Make'
                  variant='filled'
                  name='make'
                />
                <p className='text-danger'>{errors.make?.message} </p>
              </Grid>
              {/* model */}
              <Grid item xs={4}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Model{' '}
                </Typography>
                <TextField
                  onChange={e => setModel(e.target.value)}
                  fullWidth
                  color='success'
                  label='Model'
                  variant='filled'
                  name='model'
                />
                <p className='text-danger'>{errors.model?.message} </p>
              </Grid>
              {/* serial number */}
              <Grid item xs={4}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Serial Number{' '}
                </Typography>
                <TextField
                  onChange={e => setSerialNumber(e.target.value)}
                  fullWidth
                  color='success'
                  label='Serial Number'
                  variant='filled'
                  name='serialNumber'
                />
                <p className='text-danger'>{errors.serialNumber?.message} </p>
              </Grid>
              {/* purchase price */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Purchase Price{' '}
                </Typography>
                <TextField
                  onChange={e => setPurchasePrice(e.target.value)}
                  fullWidth
                  color='success'
                  label='Purchase Price'
                  variant='filled'
                  name='purchasePrice'
                  type='number'
                />
                <p className='text-danger'>{errors.purchasePrice?.message} </p>
              </Grid>
              {/* current value */}
              <Grid item xs={6}>
                <Typography
                  sx={{ mt: 1, mb: 1 }}
                  component='h4'
                  variant='p'
                  type='number'
                >
                  Current Value{' '}
                </Typography>
                <TextField
                  onChange={e => setCurrentValue(e.target.value)}
                  fullWidth
                  color='success'
                  label='Current Value'
                  variant='filled'
                  name='currentValue'
                  type='number'
                />
                <p className='text-danger'>{errors.currentValue?.message} </p>
              </Grid>
              {/* purchase Location */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, mb: 1 }} component='h4' variant='p'>
                  Purchase Location{' '}
                </Typography>
                <TextField
                  onChange={e => setPurchaseLocation(e.target.value)}
                  fullWidth
                  color='success'
                  label='purchaseLocation'
                  variant='filled'
                  name='purchaseLocation'
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
              color='success'
              sx={{ p: 3, fontSize: '1.5rem' }}
            >
              Submit Item
            </Button>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default InventoryForm
