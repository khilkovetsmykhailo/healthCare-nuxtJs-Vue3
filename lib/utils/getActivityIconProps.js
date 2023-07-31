export default (type) => {
  switch (type) {
    case 'RELAXATION':
      return {
        icon: 'wellness',
        color: 'lavender',
      }
    case 'ARTICLE':
      return {
        icon: 'info',
      }
    case 'SURVEY':
      return {
        icon: 'survey',
        color: 'yellow',
      }
    case 'WALKING':
      return {
        icon: 'walking',
        fontAwesome: true,
      }
    case 'EXERCISE':
    case 'STRETCH':
    default:
      return {
        icon: 'activity',
      }
  }
}
