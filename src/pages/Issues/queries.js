const issuesQuery = { query: 
    `query {
        issues{
            _id
            issueName
            issueCode
        }
    }`
};

export default issuesQuery