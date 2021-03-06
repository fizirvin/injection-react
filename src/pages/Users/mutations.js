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

const modifyUser = { query: `mutation
UpdateUser($_id: ID, $input: UpdatedUser ){
    updateUser(_id: $_id, input: $input){
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

export { 
    addUser,
    modifyUser
}