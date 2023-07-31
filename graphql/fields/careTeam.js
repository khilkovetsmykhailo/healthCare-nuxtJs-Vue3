import userFields from './user'

export default (
  `
  id
  name
  description
  pictureFileId
  Administrators {
    id
    User {
      ${userFields}
    }
  }
  HealthCareProviders {
    id
    User {
      ${userFields}
    }
  }
  Patients {
    id
    User {
      ${userFields}
    }
  }
  `
)
