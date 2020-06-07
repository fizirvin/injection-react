const modifyModel = { query: `mutation
UpdatePartNumber($_id: ID, $input: NewPartNumber ){
    updatePartNumber(_id: $_id, input: $input){
            _id
            partNumber
            partName
            family
        }
    }`
}

export default modifyModel;