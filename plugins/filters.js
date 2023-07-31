import Vue from 'vue'
import moment from 'moment'
import arrayToReadableList from '../util/common/arrayToReadableList'

export const dateFormats = {
  detailed: 'MMM Do YYYY HH:mm:ss',
  condensed: 'MMM Do',
  default: 'MMM Do YYYY',
}

export const formatDate = (value, type) => {
  switch (type) {
    case 'detailed':
      return moment(value).format(dateFormats.detailed)
    case 'calendar':
      return moment(value).calendar()
    case 'fromNow':
      return moment(value).fromNow()
    case 'condensed':
      return moment(value).format(dateFormats.condensed)
    default:
      return moment(value).format(dateFormats.default)
  }
}

export const pluralize = (value, [ singular, plural ]) => {
  return parseInt(value) === 1 ? singular : plural
}

export const displayList = (value) => arrayToReadableList(value)

// Add as filters
Vue.filter('formatDate', formatDate)
Vue.filter('pluralize', pluralize)
Vue.filter('displayList', displayList)
