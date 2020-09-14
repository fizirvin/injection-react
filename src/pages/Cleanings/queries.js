const cleaningsQuery = { query: 
    `query {
        cleanings{
            _id
            molde{
                _id
                moldeNumber
            }
            date
            cycles
            shift
            team
            comments
            counted
        }
    }`,
};

const cyclesCleaningQuery = { query: `query 
    Cycles( $molde: ID, $initial: Date){
        cycles(molde: $molde, initial:$initial){
            report
            date
            shift
            machine
            part
            molde
            real
            cycles
        }
    }`,
};

export { 
    cleaningsQuery,
    cyclesCleaningQuery
}