import { useState } from 'react'
import axios from 'axios'
import { Convert } from 'mongo-image-converter'

const FileUpload = () => {
  const [file, setFile] = useState({})
  const [fileName, setFilename] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})
  // for image upload
  const [imageFile, setImageFile] = useState('')

  // convert function
  const convertImage = async event => {
    console.log('Entered convertImage')
    console.log('event', event)
    try {
      const convertedImage = await Convert(imageFile)
      if (convertedImage) {
        console.log('Image CONVERTED:', convertedImage)
        imageSubmitHadler(convertedImage)
      } else {
        console.log('The file is not in format of image/jpeg or image/png')
      }
    } catch (error) {
      console.warn(error.message)
    }
  }

  // image submit handler
  const imageSubmitHadler = convertedImage => {
    console.log('Entered imageSubmitHadler')
    console.log('convertedImage', convertedImage)
    const formData = new FormData()
    formData.append('file', convertedImage)
    axios
      .post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('response', response)
        if (response.data.success) {
          setFile(response.data.file)
          setFilename(response.data.file.name)
          setUploadedFile(response.data.file)
        } else {
          alert('File upload failed')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onChange = e => {
    setFile(e.target.files[0])
    setFilename(e.target.files[0].name)
  }
  console.log('filename', fileName)

  const onSubmit = async e => {
    e.preventDefault()
    // console.log('e--', e)
    console.log('file--file:', file)
    console.log('file--typeof file:', typeof file)
    console.log('file--file.name:', file.name)
    console.log('file--file.size:', file.size)
    console.log('file--file.type:', file.type)
    console.log('fileName--:', fileName)

    const formData = new FormData()
    // console.log('formData', formData)
    formData.append('file', file)
    console.log('formData2', formData)

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const { fileName, filePath } = res.data

      setUploadedFile({ fileName, filePath })
      console.log('res.data', res.data)
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server - 500')
      } else {
        console.log(err.response.data.msg)
      }
    }
  }

  return (
    <>
      {/* <form onSubmit={convertImage} className='container d-grid gap-3'>
        <div className='custom-file mb-4'>
          <label htmlFor='formFile' className='form-label'>
            {fileName === 'Choose Image'
              ? fileName
              : `Uploading Image: ${fileName}`}
          </label>
          <input
            className='form-control'
            type='file'
            id='formFile'
            onChange={onChange}
          />
        </div>
        <input type='submit' value='Upload Image' className='btn btn-warning' />
      </form> */}
      <input type='file' onChange={e => setImageFile(e.target.files[0])} />
      <button onClick={convertImage}> Submit </button>
    </>
  )
}

export default FileUpload
