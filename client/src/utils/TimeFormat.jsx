import Moment from 'moment'

const TimeFormat = props => {
  const { time } = props
  // console.log('time from TimeFormat', time)

  const formatTime = Moment.utc(time)
    .add(-5, 'hours')
    .format('h:mm:ss a')
  // console.log('formatTime', formatTime)

  return (
    <>
      <div className='container'>
        <h5>{formatTime}</h5>
      </div>
    </>
  )
}

export default TimeFormat
