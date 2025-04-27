import moment from 'moment'

function getUpcomingBookings(param, data) {
  const currentDate = new Date().getTime() / 1000

  if (param && data && data?.length > 0) {
    const newValues = data?.filter((item) => {
      const itemDate = parseInt(item.date)
      const itemTimestamp = parseInt(item.timestamp)

      if (param === 'all') {
        const currentDateStr = new Date(currentDate * 1000).toISOString().split('T')[0]
        const itemDateStr = new Date(itemDate * 1000).toISOString().split('T')[0]

        return (
          itemDateStr > currentDateStr ||
          (itemDateStr === currentDateStr && itemTimestamp >= currentDate)
        )
      } else {
        const selectedDate = parseInt(param)

        const currentDateStr = new Date(currentDate * 1000).toISOString().split('T')[0]
        const selectedDateStr = new Date(selectedDate * 1000).toISOString().split('T')[0]
        const itemDateStr = new Date(itemDate * 1000).toISOString().split('T')[0]

        return (
          (selectedDateStr === currentDateStr && itemTimestamp >= currentDate) ||
          selectedDateStr === itemDateStr
        )
      }
    })
    return newValues
  } else {
    return []
  }
}

function getPrevBookings(param, data) {
  const currentDate = new Date().getTime() / 1000 // current date in Unix timestamp format

  if (param && data && data?.length > 0) {
    const newValues = data?.filter((item) => {
      const itemDate = parseInt(item.date)
      const itemTimestamp = parseInt(item.timestamp)

      if (param === 'all') {
        const currentDateStr = new Date(currentDate * 1000).toISOString().split('T')[0]
        const itemDateStr = new Date(itemDate * 1000).toISOString().split('T')[0]

        return (
          itemDateStr < currentDateStr ||
          (itemDateStr === currentDateStr && itemTimestamp < currentDate)
        )
      } else {
        const selectedDate = parseInt(param)
        const currentDateStr = new Date(currentDate * 1000).toISOString().split('T')[0]
        const selectedDateStr = new Date(selectedDate * 1000).toISOString().split('T')[0]
        const itemDateStr = new Date(itemDate * 1000).toISOString().split('T')[0]

        return (
          (selectedDateStr === currentDateStr && itemTimestamp < currentDate) ||
          selectedDateStr === itemDateStr
        )
      }
    })
    return newValues
  } else {
    return []
  }
}

function getStringTime(value) {
  if (value) {
    const time = value?.toString()?.length > 10 ? parseInt(value) / 1000 : parseInt(value)
    const date = moment.unix(time)
    const formattedTime = date.format('h:mm A')
    return formattedTime
  } else {
    return ''
  }
}

function getStartsInText(value) {
  if (value) {
    const date = moment.unix(
      value.toString().length > 10 ? parseInt(value) / 1000 : parseInt(value)
    )
    const currentDate = moment().startOf('day')
    const eventDate = moment(date).startOf('day')
    const daysRemaining = eventDate.diff(currentDate, 'days')
    if (daysRemaining === 0) {
      return 'Starts today'
    } else {
      return `Starts in ${daysRemaining} days`
    }
  } else {
    return ''
  }
}

function getDateBookings(bookings, activeDate) {
  if (bookings?.length > 0) {
    if (!activeDate || activeDate == 'all') {
      return bookings
    } else {
      const selectedDate =
        activeDate?.toString()?.length > 10 ? parseInt(activeDate) / 1000 : parseInt(activeDate)

      const finalBookings = bookings?.filter((booking) => {
        const bookingDate =
          booking?.date?.toString()?.length > 10
            ? parseInt(booking?.date) / 1000
            : parseInt(booking?.date)

        const date1 = moment.unix(selectedDate)
        const date2 = moment.unix(bookingDate)
        const areSameDate = date1.isSame(date2, 'day')
        return areSameDate
      })
      return finalBookings
    }
  } else {
    return []
  }
}


function getDuration(timestamp, duration) {
  if (timestamp && duration) {
    let time = moment.unix(timestamp / 1000)
    const [hours, minutes] = duration?.split(':').map(Number)
    time.add(hours, 'hours').add(minutes, 'minutes')
    const result = time.format('hh:mm A')
    return result
  } else {
    return
  }
}

export { getDateBookings, getPrevBookings, getStartsInText, getStringTime, getUpcomingBookings,getDuration }
