const workerQuery = { query: `query {
    profiles {
        _id
        number
        firstname
        lastname
        entry
        department
        position
        area
        picture_URL
        gender
        team
        active
        entryNum
      }
  }`,
};

export default workerQuery