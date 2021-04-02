import dayjs from 'dayjs'

export function dateFormat(value, format) {
  if (typeof value === 'string') {
    value = parseInt(value)
  }
  return dayjs(value).format(format)
}
