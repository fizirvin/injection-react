import React from 'react';
import { Link } from 'react-router-dom';


class Toolbar extends React.Component {


  render(){
    return (
      <div className="Toolbar">
        
         <Link to="/molds"><button className="Button">Molds</button></Link>
         <Link to="/machines"><button className="Button">Machines</button></Link>
         <Link to="/material"><button className="Button">Material</button></Link>
         <Link to="/models"><button className="Button">Models</button></Link>
         <Link to="/issues"><button className="Button">Issues</button></Link>
         <Link to="/defects"><button className="Button">Defects</button></Link>
         <Link to="/programs"><button className="Button">Programs</button></Link>
         <Link to="/reports"><button className="Button">Reports</button></Link>
         {/* <Link to="/production"><button className="Button">Production</button></Link>
         <Link to="/downtime"><button className="Button">Downtime</button></Link> */}
         {/* <Link to="/efficiency"><button className="Button">Efficiency</button></Link> */}
         <Link to="/quality"><button className="Button">Quality</button></Link>
         <Link to="/graphics"><button className="Button">Graphics</button></Link> 
      </div>
    )
  }
}

export default Toolbar;