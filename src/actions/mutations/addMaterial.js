const addMaterial = { query: `mutation
    NewMaterial( $input: NewMaterial ){
        newMaterial(input: $input){
            _id
            number
            manufacturer
            description
            acronym
            identification
            type
            unit
            color
        }
    }`
}

export default addMaterial;