export default (
  `
  query (
    $id: Int!,
  ) {
    joinVirtualVisit(
      id: $id,
    ) 
  }
  `
)
