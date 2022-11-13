import logo from '../../../src/poro.jpg';

import { Link} from "react-router-dom";

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
     
     
    </div>)}