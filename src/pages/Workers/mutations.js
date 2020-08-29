const addWorker = { query: `mutation
    NewProfile( $input: NewProfile ){
        newProfile(input: $input){
            _id
            number
            firstname
            lastname
            entry
            department
            area
            position
            picture_URL
            gender
            active
            entryNum
            team
        }
    }`
}

const modifyWorker = { query: `mutation
    UpdateProfile( $_id: ID, $input: UpdateProfile ){
        updateProfile(_id: $_id, input: $input){
            _id
            number
            firstname
            lastname
            entry
            department
            area
            position
            picture_URL
            gender
            active
            entryNum
            team
        }
    }`
}

export { 
    addWorker,
    modifyWorker
}