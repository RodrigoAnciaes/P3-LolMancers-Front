import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../../../src/poro.jpg';

import axios from 'axios';
import * as config from '../../config.js'

const key = config.API_KEY;

function AtualizaPlayer(username){
  var APIString = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+username+"?api_key="+key;
  //console.log("Pesquisa:"+pesquisa)
  
  

  axios.get(APIString).then(function(response){
    //sucesso
    console.log(response.data);
    var APIPlayer = "https://tranquil-fjord-45089.herokuapp.com/api/user/?summoner_name="+username;
    
    // Post para o banco de dados com o body no formato aplication/json
    axios.post(APIPlayer, {
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


async function loginUser(username) {
  return axios
  .get("https://tranquil-fjord-45089.herokuapp.com/api/user/?summoner_name="+username)
  .then(response => {
    AtualizaPlayer(username);
    return response.data;
  }
  )
 }

export default function Login({ setToken }) {


  const [username, setUserName] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(username.toLowerCase());
    setToken(token);
    console.log(token);


  }
  return(
    <div className='container4'>
    <div className="testNav">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="title">LoLMancers</h1>
      
    </div>
   
    <div className="login-wrapper">
      <h1 className='title2'>Por favor, faça o Login</h1>
      <form onSubmit={handleSubmit}>
      <div className="form">
          <input className='autoresize'placeholder='Nick'type="texto" onChange={e => setUserName(e.target.value)}/>

          <button className='btn'type="submit">Log</button>
        </div>
      </form>
    </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

