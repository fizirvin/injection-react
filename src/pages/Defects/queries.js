const defectsQuery = { query: 
    `query {
        defects{
            _id
            defectName
            defectCode
            isInjection
        }
    }`
};

export default defectsQuery