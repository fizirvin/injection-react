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

export default modifyDefect;