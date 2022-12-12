import logo from '../../../src/poro.jpg';

import { Link} from "react-router-dom";
function logout(){
  localStorage.removeItem('token');
  // recarrega a página
  window.location.reload();
}


export default function Navbar(){
    return(
<div className="testNav">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="title">LoLMancers</h1>
      <Link to ='/' style={{ textDecoration: 'none' }}>
        <button className='btnbar'>Home</button>
      </Link>
   
     
    </div>)}