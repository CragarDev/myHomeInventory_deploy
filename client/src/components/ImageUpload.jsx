import React from 'react'

const ImageUpload = () => {
  return (
    <>
      <div>
        <h1>ImageUpload</h1>
        <form action='/upload'>
          <input type='file' name='file' />
          <button type='submit'>Upload</button>
        </form>
      </div>
    </>
  )
}

export default ImageUpload
