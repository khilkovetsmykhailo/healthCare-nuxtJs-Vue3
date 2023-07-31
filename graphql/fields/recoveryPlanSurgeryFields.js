import userFields from './user';

export default (
  `
  id
  surgeryDate
  Surgeon {
    id
    User {
      ${userFields}
    }
  }
  Surgery {
    id
    name
    Type {
      id
      name
    }
  }
  `
)
