const addIssue = { query: `mutation
    NewIssue( $input: NewIssue ){
        newIssue(input: $input){
            _id
            issueName
            issueCode
        }
    }`
}

const modifyIssue = { query: `mutation
    UpdateIssue($_id: ID, $input: NewIssue ){
        updateIssue(_id: $_id, input: $input){
            _id
            issueName
            issueCode
        }
    }`
}

export { 
    addIssue,
    modifyIssue
}