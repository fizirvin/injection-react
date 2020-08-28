const materialsQuery = { query: 
    `query {
        materials{
            _id
            number
            manufacturer
            description
            acronym
            identification
            type
            unit
            color
        }
    }`
};

export default materialsQuery