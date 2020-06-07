const addModel = { query: `mutation
    NewPartNumber( $input: NewPartNumber ){
        newPartNumber(input: $input){
            _id
            partNumber
            partName
            family
        }
    }`
}

export default addModel;