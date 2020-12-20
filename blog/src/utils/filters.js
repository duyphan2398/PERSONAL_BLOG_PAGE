import Vue from 'vue'
import * as moment from 'moment-timezone'

Vue.filter('formatDate', function (value, format = '') {
  let date = moment(value)
  if (!date.isValid()) return ''
  return date.format(format)
})

Vue.filter('momentTimestamp', function (value, format = '') {
  return moment.unix(value).format(format)
})


Vue.filter('truncate', (text, suffix, num) => {
  if (text !== undefined && text.length > num) {
    return text.substring(0, num) + suffix
  } else {
    return text
  }
})

Vue.filter('imageThumbnailObject', value => {
  return value || require('../assets/images/dummy_image.jpg')
})
