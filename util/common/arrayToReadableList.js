export default (value) => {
  if (value.length === 1) return value[0]
  if (value.length === 2) return value.join(' and ')
  return `${value.slice(0, -1).join(', ')}, and ${value[value.length - 1]}`
}
