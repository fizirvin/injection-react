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

const modifyMaterial = { query: `mutation
    UpdateMaterial($_id: ID, $input: NewMaterial ){
        updateMaterial(_id: $_id, input: $input){
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

export { 
    addMaterial,
    modifyMaterial
}