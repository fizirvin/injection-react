const cleaningsQuery = { query: 
    `query {
        cleanings{
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
    }`,
};

const cyclesCleaningQuery = { query: `query 
    Cycles( $cleaning: ID){
        cycles(cleaning: $cleaning){
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