const addIssue = { query: `mutation
    NewIssue( $input: NewIssue ){
        newIssue(input: $input){
            _id
            issueName
            issueCode
        }
    }`
}

export default addIssue;