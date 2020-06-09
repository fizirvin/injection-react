const addMolde = { query: `mutation
    NewMolde( $input: NewMolde ){
        newMolde(input: $input){
            _id
            moldeNumber
            moldeSerial
            cavities
            lifecycle
            tcycles
        }
    }`
}

export default addMolde;