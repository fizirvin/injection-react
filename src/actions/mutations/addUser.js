const addUser = { query: `mutation
    NewUser($input: NewUser){
        newUser(input: $input){
            _id
            shortCat
            fullUat
            fullCat
            active
            level
            name
        }
    }`
}

export default addUser;