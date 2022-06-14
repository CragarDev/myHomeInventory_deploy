import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { Container } from '@mui/material'

const DetailsInfo = props => {
  // destructuring the props
  const {
    category,
    location,
    make,
    model,
    serialNumber,
    description,
    condition,
    purchasePrice,
    currentValue,
    purchaseLocation
  } = props.inventoryItem
  return (
    <>
      <Container>
        {/* vertical table for the information */}
        <table className='d-table table-hover table-dark'>
          <tbody>
            {/* category */}
            <tr>
              <th className='text-end pe-3' scope='col'>
                Category:{' '}
              </th>
              <td className='text-start h4 mb-5'>
                <span className='fw-bold text-success h5'>{category}</span>
              </td>
            </tr>
            {/* Location */}
            <tr>
              <th className='text-end pe-3' scope='col'>
                Location:{' '}
              </th>
              <td className='text-start h4 mb-5'>
                <span className='fw-bold text-warning h4'>{location}</span>
              </td>
            </tr>
            {/* Make */}
            <tr>
              <th className='text-end pe-3' scope='col'>
                Make:{' '}
              </th>
              <td className='text-start h4 mb-5'>
                <span className='text-light h5'>{make}</span>
              </td>
            </tr>
            {/* Model */}
            <tr>
              <th className='text-end pe-3' scope='col'>
                Model:{' '}
              </th>
              <td className='text-start h4 mb-5'>
                <span className='text-light h5'>{model}</span>
              </td>
            </tr>
            {/* Serial Number */}
            <tr>
              <th className='text-end pe-3' scope='col'>
                Serial Number:{' '}
              </th>
              <td className='text-start h4 mb-5'>
                <span className='text-light h5'>{serialNumber}</span>
              </td>
            </tr>
            {/* Description */}
            <tr>
              <th className='text-end pe-3' scope='col'>
                Description:{' '}
              </th>
              <td className='text-start h4 mb-5'>
                <span className='text-warning h5'>{description}</span>
              </td>
            </tr>
            {/* Condition */}
            <tr>
              <th className='text-end pe-3' scope='col'>
                Condition:{' '}
              </th>
              <td className='text-start h4 mb-5'>
                <span className='text-warning h5'>{condition}</span>
              </td>
            </tr>
            {/* Purchase Price */}
            <tr>
              <th className='text-end pe-3' scope='col'>
                Purchase Price:{' '}
              </th>
              <td className='text-start h4 mb-5'>
                <span className='text-success h5'>
                  {purchasePrice ? (
                    <CurrencyFormat
                      value={purchasePrice}
                      displayType={'text'}
                      fixedDecimalScale={true}
                      thousandSeparator={true}
                      prefix={'$'}
                      decimalScale={2}
                    />
                  ) : null}
                </span>
              </td>
            </tr>
            {/* Current Value */}
            <tr>
              <th className='text-end pe-3' scope='col'>
                Current Value:{' '}
              </th>
              <td className='text-start h4 mb-5'>
                <span className='text-warning h5'>
                  {currentValue ? (
                    <CurrencyFormat
                      value={currentValue}
                      displayType={'text'}
                      fixedDecimalScale={true}
                      thousandSeparator={true}
                      prefix={'$'}
                      decimalScale={2}
                    />
                  ) : null}
                </span>
              </td>
            </tr>
            {/* Purchase Location */}
            <tr>
              <th className='text-end pe-3' scope='col'>
                Purchase Location:{' '}
              </th>
              <td className='text-start h4 mb-5'>
                <span className='text-success h4'>{purchaseLocation}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  )
}

export default DetailsInfo
