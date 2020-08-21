const workersQuery = { query: `query 
    Workers( $inspectorId: ID, $operatorId: ID ){
        workers(inspectorId: $inspectorId, operatorId: $operatorId){
            operator{
                _id
                firstname
                lastname
            }
            inspector{
                _id
                firstname
                lastname
            }
        }
    }`,
};

export default workersQuery