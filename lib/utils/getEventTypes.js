export default (events) => {
  const allEventTypes = events.map(({ type, type_secondary }) => ({ type, type_secondary }))
  const uniqueEventTypes = []
  allEventTypes.forEach((eventType) => {
    const matchingEventType = uniqueEventTypes.find(({ type, type_secondary }) => {
      return type === eventType.type && type_secondary === eventType.type_secondary
    })
    if (!matchingEventType) uniqueEventTypes.push(eventType)
  })
  return uniqueEventTypes
}
