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

export { 
    moldesQuery,
    cyclesQuery 
}