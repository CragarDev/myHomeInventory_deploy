import React from 'react'
import FileUpload from './FileUpload'

const InventoryImageUpload = () => {
  return (
    <>
      <div className='container mt-4 py-4 bg-white'>
        <h1 className='text-center text-dark mb-4'>Inventory Image Upload</h1>
        <FileUpload />
      </div>
    </>
  )
}

export default InventoryImageUpload
