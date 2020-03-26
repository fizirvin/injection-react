import React from 'react';
import { Link } from 'react-router-dom';


class Toolbar extends React.Component {


  render(){
    return (
      <div className="Toolbar">
        
         <Link to="/Molds"><button className="Button">Molds</button></Link>
         <Link to="/Machines"><button className="Button">Machines</button></Link>
         <Link to="/Models"><button className="Button">Models</button></Link>
         <Link to="/Issues"><button className="Button">Issues</button></Link>
      
      </div>
    )
  }
}

export default Toolbar;