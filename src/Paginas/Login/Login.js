import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../../../src/poro.jpg';

import axios from 'axios';
import * as config from '../../config.js'
import Alert from 'react-bootstrap/Alert';


const key = config.API_KEY;

function AtualizaPlayer(username){
  var APIString = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+username+"?api_key="+key;
  //console.log("Pesquisa:"+pesquisa)
  console.log('entrou atualiza player')
  

  axios.get(APIString).then(function(response){
    //sucesso
    
    console.log('entrou get api string, preparando para post no user')
    console.log(response.data.name)
    var APIPlayer = "http://127.0.0.1:8000/api/user/?summoner_name="+username;
    console.log(APIPlayer);
    // Post para o banco de dados com o body no formato aplication/json
    //axios.get(APIPlayer);
    axios.get(APIPlayer, {
      "summoner_name": response.data.name,
      "summoner_id": response.data.id,
      "summoner_level": response.data.summonerLevel,
      "profile_icon_id": response.data.profileIconId,
      
    }).then((response)=>{console.log(response)}
    );
   
  }).catch(function(error){
    //erro
    console.log(error);
  });
  
}


async function loginUser(username,password) {
  
  return axios
  .post("http://127.0.0.1:8000/api/login/",{
    "username": username,
    "password":password
  })
  .then(response => {
    
    
    return response.data;
  }
  )
  .catch(error => {console.log(error)});
  
 }
 async function autenticaUsuario(token) {
  
  return axios
  .get("http://127.0.0.1:8000/api/get_user/",{headers:{"Authorization":`Token ${token.token}`}}
  )
 }

export default function Login({ setNome },{setRegistro}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginfalha, setLoginfalha] = useState();
  const [logincadastrado, setLogincadastrado] = useState();
 
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(username,password);
    console.log(token)
    if (token == null){
      setLoginfalha(true);
      
    }
    else{
      setLoginfalha(false);
      console.log(token)
      const nomeusuario = await autenticaUsuario(token);
      console.log(nomeusuario.data);
      setNome([nomeusuario.data,token.token]);
      console.log(token.token);
      AtualizaPlayer(username,token);
    }
    //console.log(token);
  }
  const cadastrado = async e => {
    setRegistro(false);
  }
  return(
    <div className='container4'>
    <div className="testNav">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="title">LoLMancers</h1>
      
    </div>
  
   
    <div className="login-wrapper">
    {loginfalha==true?
      <Alert key='danger' variant='danger'>
      Login negado! Reveja o usuário ou senha!
      </Alert>:null}
      <h1 className='title2'>Por favor, faça o Login</h1>
      
      <form onSubmit={handleSubmit}>
        
      <div className="form">
      
        
          <input className='autoresize'placeholder='Nick'type="texto" onChange={e => setUserName(e.target.value)}/>
          <input className='autoresize'placeholder='Senha'type="texto" onChange={e => setPassword(e.target.value)}/>

          <button className='botao'type="submit">Log</button>
          
        </div>
        
      </form>
      <h1 className='title2'>Deseja se cadastrar? Clique aqui:</h1>
      <form onSubmit={cadastrado}>
      <div className='form'>
        
        <button className='botao' type="submit">Cadastro</button>
        
      </div>
      </form>
      {loginfalha==true?
      <p className='title2'></p>:null}
      
    </div>
    </div>
  )
}

Login.propTypes = {
  setNome: PropTypes.func.isRequired,
  
};

