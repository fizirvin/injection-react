const selectedCyclesQuery = { query: 
    `query {
        selectedCycles{
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
    selectedCyclesQuery
}