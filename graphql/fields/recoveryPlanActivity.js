import activityFields from './activity'

export default (withActivity = true) => (
  `
  id
  startDate
  stopDate
  days
  times
  duration
  reps
  sets
  order
  ${withActivity ? (
    `
    Activity {
      ${activityFields}
    }
    `
  ) : ''}
  `
)
