import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../../../src/poro.jpg';

import axios from 'axios';
import * as config from '../../config.js'
import { Link,Navigate} from "react-router-dom";


const key = config.API_KEY;

function AtualizaPlayer(username){
  var APIString = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+username+"?api_key="+key;
  //console.log("Pesquisa:"+pesquisa)
  
  

  axios.get(APIString).then(function(response){
    //sucesso
    console.log(response.data);
    var APIPlayer = "https://127.0.0.1:8000/api/user/?summoner_name="+username;
   
    // Post para o banco de dados com o body no formato aplication/json
    axios.post(APIPlayer, {
      "summoner_name": response.data.name,
      "summoner_id": response.data.id,
      "summoner_level": response.data.summonerLevel,
      "profile_icon_id": response.data.profileIconId,
    }).then((response)=>{console.log(response.data)}
    );
   
  }).catch(function(error){
    //erro
    console.log(error)
  });
  
  
}




export default function Registro({ setRegistro }) {
  const [cadastrofeitosucesso,setCadastrofeitosucesso] = useState([]);
  const [cadastronegado,setCadastronegado]=useState([]);


  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(cadastrofeitosucesso)
    cadastraUser(username,password)
    //const token = await cadastraUser(username.toLowerCase(),password.toLowerCase());
    //setToken(token);
    //console.log(token);


  }
  const cadastrado = async e => {
    e.preventDefault();
    setRegistro(true)
    //const token = await cadastraUser(username.toLowerCase(),password.toLowerCase());
    //setToken(token);
    //console.log(token);


  }

  function cadastraUser(username,password) {
    var APIString = "http://127.0.0.1:8000/api/register/";
    axios.post(APIString,{
      "username": username,
      "password": password,
    }).then((response)=>{setCadastrofeitosucesso(true);setCadastronegado(false);setRegistro(true)})
    .catch((error)=>{setCadastronegado(true);setCadastrofeitosucesso(false);});
   }
   if (cadastrofeitosucesso==true){
     return <Navigate to="/Login" />
   }
  
  return(
    <div className='container4'>
    <div className="testNav">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="title">LoLMancers</h1>
      
      
    </div>
   
    <div className="login-wrapper">
      <h1 className='title2'>Por favor, faça seu cadastro</h1>
      <form onSubmit={handleSubmit}>
      <div className="form">
          <input className='autoresize'placeholder='Nick'type="texto" onChange={e => setUserName(e.target.value)}/>
          <input className='autoresize'placeholder='Senha'type="senha" onChange={e => setPassword(e.target.value)}/>
          <button className='btn'type="submit">Register</button>
        </div>
      </form>
      
      <h1 className='title2'>Já possui cadastro? Clique aqui:</h1>
      <form onSubmit={cadastrado}>
      <div className='form'>
        
        <button className='btn' type="submit">Login</button>
        
      </div>
      </form>
      {cadastrofeitosucesso==true?
      <p className='title2'>Cadastro feito com sucesso!</p>:null}
      {cadastronegado==true?
      <h1 className='title2'> Cadastro negado <br/>usuário já cadastrado!</h1>:null}
    </div>
    </div>
  )
}
Registro.propTypes = {
  setRegistro: PropTypes.func.isRequired
};

