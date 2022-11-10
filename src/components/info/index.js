
import logo from '../../../src/poro.jpg';

import { Link} from "react-router-dom";


export default function Info(props) {
  

  return (
    <div className='container4'>
    <div className="testNav">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="title">LoLMancers</h1>
      
    </div>
    
    <div className='container5'>
    <div className='NomeHeader'>Bem Vindo {props.name}!</div>
    <div className="User">
      {JSON.stringify(props.name) !== '{}' ? 
        <><p className='UserNick'>Nick: {props.name} </p>
        <><p className='UserLevel'>Nível: {props.level}</p></>
        <img className='UserIcon' width="100" height="100" src={props.link}></img>
        
        </> 
        : 
        <><p className='UserNick'>No player data</p></>}
    </div>
    <div className='NomeHeader'>O que você deseja fazer?</div>
    <div className="rotas">
      <Link to ='/Amigos' style={{ textDecoration: 'none' }}>
        <button className='btnbar'>Minha lista de Amigos</button>
      </Link>
      <Link to ='/rotacao' style={{ textDecoration: 'none' }}>
        <button className='btnbar'>Rotação Semanal Grátis</button>
      </Link>
    </div>
    </div>
    </div>
    );
}