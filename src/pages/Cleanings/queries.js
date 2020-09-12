const moldesQuery = { query: 
    `query {
        moldes{
            _id
            moldeNumber
            moldeSerial
            cavities
            lifecycles
            tcycles
            shot
            quantity
            active
        }
    }`
};

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

export { 
    cleaningsQuery
}