const addCleaning = { query: `mutation
NewCleaning( $input: NewCleaning ){
    newCleaning(input: $input){
        _id
        molde{
            _id
            moldeNumber
        }
        date
        shift
        comments
        quantity
        end
        shiftEnd
        active
    }
}`
}

const modifyCleaning = { query: `mutation
UpdateCleaning($_id: ID, $input: NewCleaning ){
    updateCleaning(_id: $_id, input: $input){
            _id
            molde{
                _id
                moldeNumber
            }
            date
            shift
            comments
            quantity
            end
            shiftEnd
            active
        }
    }`
}

const finishCleaning = { query: `mutation
FinishCleaning($_id: ID, $input: FinishCleaning ){
    finishCleaning(_id: $_id, input: $input){
            _id
            molde{
                _id
                moldeNumber
            }
            date
            quantity
            shift
            comments
            end
            shiftEnd
            active
        }
    }`
}

export { 
    addCleaning,
    modifyCleaning,
    finishCleaning
}