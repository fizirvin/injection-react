const addDefect = { query: `mutation
    NewDefect( $input: NewDefect ){
        newDefect(input: $input){
            _id
            defectName
            defectCode
            isInjection
        }
    }`
}

export default addDefect;