import Moment from 'moment'
// import PropTypes from 'prop-types'

// const currentDate = new Date()

function DateFormat (props) {
  const { date } = props
  // console.log('date from DateFormat', date)
  const formatDate = Moment.utc(date)
    .add(-6, 'hours')
    .format('MMMM Do YYYY') // MMM Do YY _ DD-MM-YYYY
  // console.log('DateFormat: formatDate', formatDate)
  return (
    <>
      <div className='container'>
        <h5>{formatDate}</h5>
      </div>
    </>
  )
}

// DateFormat.defaultProps = {
//   date: currentDate
// }

// DateFormat.propTypes = {
//   date: PropTypes.string
// }

export default DateFormat
