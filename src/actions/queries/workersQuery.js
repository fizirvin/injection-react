const workersQuery = { query: `query 
    Workers( $inspectorId: ID, $operatorId: ID ){
        workers(inspectorId: $inspectorId, operatorId: $operatorId){
            operator{
                _id
                firstname
            }
            inspector{
                _id
                firstname
            }
        }
    }`,
};

export default workersQuery