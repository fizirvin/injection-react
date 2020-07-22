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
        }
    }`
}

export default addWorker;