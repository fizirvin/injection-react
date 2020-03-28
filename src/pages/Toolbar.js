import React from 'react';
import { Link } from 'react-router-dom';


class Toolbar extends React.Component {


  render(){
    return (
      <div className="Toolbar">
        
         <Link to="/molds"><button className="Button">Molds</button></Link>
         <Link to="/machines"><button className="Button">Machines</button></Link>
         <Link to="/models"><button className="Button">Models</button></Link>
         <Link to="/issues"><button className="Button">Issues</button></Link>
      
      </div>
    )
  }
}

export default Toolbar;