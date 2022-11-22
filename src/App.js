
import './App.css';
import React from "react"
import { useState } from "react";
import axios from 'axios';
import Login from './Paginas/Login/Login';
import * as config from '../src/config.js'
import Info from "./Paginas/info";
import Amigos from "./Paginas/Amigos/Amigos";
import Partidas from "./Paginas/Partidas/Partidas";
import Registro from "./Paginas/Registro/Registro";

import Rotacao from "./Paginas/rotacao/rotacao";
import {Routes,Route} from "react-router-dom";
import Perfil from './Paginas/perfil/Perfil';

var n = 0;
function App() {
  
  const key = config.API_KEY;
 
  const [userInRiotServer, setUser] = useState({});
  const [userInDataBase, setNome] = useState();
  const [registrofeito, setRegistro] = useState();
  const [tokenzada, setToken] = useState();
  const [chave, setKey] = useState();
  
  function searchUser(name){
    var APIString = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name+"?api_key="+key;
    
    
    axios.get(APIString).then(function(response){
      //sucesso 
      setUser(response.data)
      console.log(response.data);
      
    }).catch(function(error){
      //erro
      console.log(error);
    });
  }
  
  
  
  /*if(!userInDataBase) {
    return <Registro setToken={setToken} />

  }
  if (n === 0){
    searchUser(userInDataBase.summoner_name);
    n = 1;
  }
  console.log(userInDataBase)*/
  //console.log(typeof userInDataBase);
  if (!registrofeito){
    console.log('oi')
    return <Registro setRegistro={setRegistro}/>
  }
  if (registrofeito && !userInDataBase){
    console.log('oi2')
    return <Login setNome={setNome} setRegistro={setRegistro}/>
  }
  console.log(userInDataBase);
  if (typeof userInDataBase[0] == "string" && typeof userInDataBase[0] != "undefined" && n===0){
    searchUser(userInDataBase[0]);
    console.log(userInRiotServer.name);
    n = 1;
  } 
  //console.log(userInRiotServer.name);
  return (
    <>
    <Routes>
      <Route path = '/' element={<Info name={userInRiotServer.name} level={userInRiotServer.summonerLevel} link={"https://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/"+userInRiotServer.profileIconId+".png"}></Info>}/>
      <Route path = '/Amigos' element={<Amigos name={userInRiotServer.name} tokenzada={userInDataBase[1]} ></Amigos>} />
      <Route path = '/rotacao' element={<Rotacao name={userInRiotServer.name}></Rotacao>}/>
      <Route path = '/Partidas' element={<Partidas name={userInRiotServer.name}></Partidas>}/>
      <Route path = '/perfil' element={<Perfil name={userInRiotServer.name} level={userInRiotServer.summonerLevel} link={"https://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/"+userInRiotServer.profileIconId+".png"}></Perfil>}/>
    </Routes>
   </>
  );
}

export default App;
