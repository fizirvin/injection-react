const loginQuery = { query: `query 
    LoginQuery($name: String, $password: String){
        login(name:$name, password:$password){
            userId
            token
            name
        }
    }`,
};

export default loginQuery