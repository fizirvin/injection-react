const addUser = { query: `mutation
    NewUser($input: NewUser){
        newUser(input: $input){
            _id
            name
            level
            createdAt
            updatedAt
        }
    }`
}

export default addUser;