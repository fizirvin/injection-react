const moldesQuery = { query: 
    `query {
        moldes{
            _id
            moldeNumber
            moldeSerial
            cavities
            lifecycles
            tcycles
        }
    }`
};

const cyclesQuery = { query: 
    `query {
        cycles{
            report
            date
            shift
            machine
            part
            molde
            real
            cycles
        }
    }`
};

const cleaningsQuery = { query: `query 
    Cleanings( $molde: ID ){
        cleanings(molde: $molde ){
            _id
            molde{
                _id
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

export { 
    moldesQuery,
    cyclesQuery,
    cleaningsQuery
}