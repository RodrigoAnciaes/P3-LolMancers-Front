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
      <Link to ='/rotacao' style={{ textDecoration: 'none' }}>
        <button className='btnbar'>Rotação Semanal</button>
      </Link>
      <Link to ='/Amigos' style={{ textDecoration: 'none' }}>
        <button className='btnbar'>Amigos</button>
      </Link>
      
      <Link to ="/Partidas" style={{ textDecoration: 'none' }}>
        <button className='btnbar'>Partidas</button>
      </Link>
      <Link to = "/maestria" style={{ textDecoration: 'none' }}>
        <button className='btnbar'>Perfil</button>
      </Link>
      <Link to ="/" style ={{ textDecoration: 'none' }}>
        <button className='btnbar'onClick={logout}>Logout</button>
      </Link>
     
     
    </div>)}