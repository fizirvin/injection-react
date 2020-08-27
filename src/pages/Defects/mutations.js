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

const modifyDefect = { query: `mutation
UpdateDefect($_id: ID, $input: NewDefect ){
    updateDefect(_id: $_id, input: $input){
            _id
            defectName
            defectCode
            isInjection
        }
    }`
}

export { 
    addDefect,
    modifyDefect
}