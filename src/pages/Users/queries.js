const usersQuery = { query: 
    `query {
        users{
            _id
            shortCat
            fullUat
            fullCat
            active
            level
            name
        }
    }`
};

export default usersQuery