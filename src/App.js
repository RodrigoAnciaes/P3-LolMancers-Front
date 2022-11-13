
import './App.css';
import React from "react"
import { useState } from "react";
import axios from 'axios';
import Login from './components/Login/Login';
import * as config from '../src/config.js'
import Info from "./components/info";
import Amigos from "./components/Amigos/Amigos";
import Partidas from "./components/Partidas/Partidas";

import Rotacao from "./components/rotacao/rotacao";
import {Routes,Route} from "react-router-dom";

var n = 0;
function App() {
  
  const key = config.API_KEY;
 
  const [userInRiotServer, setUser] = useState({});

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
  
  const [userInDataBase, setToken] = useState();
  const [chave, setKey] = useState();
  
  if(!userInDataBase) {
    return <Login setToken={setToken} />

  }
  if (n === 0){
    searchUser(userInDataBase.summoner_name);
    n = 1;
  }
  console.log(userInDataBase)
  
  return (
    <>
    <Routes>
      <Route path = '/' element={<Info name={userInRiotServer.name} level={userInRiotServer.summonerLevel} link={"https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/"+userInRiotServer.profileIconId+".png"}></Info>}/>
      <Route path = '/Amigos' element={<Amigos name={userInRiotServer.name}></Amigos>}/>
      <Route path = '/rotacao' element={<Rotacao name={userInRiotServer.name}></Rotacao>}/>
      <Route path = '/Partidas' element={<Partidas name={userInRiotServer.name}></Partidas>}/>
    </Routes>
   </>
  );
}

export default App;
