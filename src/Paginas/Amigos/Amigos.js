import React, { useEffect,useState } from 'react';
import * as config from '../../../src/config.js'


import axios from 'axios';

import Navbar from '../../components/Navbar/navbar';


export default function Amigos(props) {
  const [pesquisa,setPesquisa]=useState([]);
  const [amigos,setAmigos] = useState([]);
  const [players,setPlayers]=useState([]);
  const key = config.API_KEY;
  const [filtrado,setFiltrado]=useState([]);
  
  const[atualiza,setAtualiza]=useState(1);

  const filtra=[];
  /*function AtualizaPlayer(username){
    var APIString = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+username+"?api_key="+key;
    //console.log("Pesquisa:"+pesquisa)
    
    
  
    axios.get(APIString).then(function(response){
      //sucesso
     
      console.log(response.data);
      var APIPlayer = "http://127.0.0.1:8000/api/user/?summoner_name="+props.name;
      console.log(APIPlayer);
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
    
  }*/

  function getAmigos(name){
    
    var APISavedPlayers = "http://127.0.0.1:8000/api/saved_player_operations/?summoner_name="+props.name.toLowerCase()
    
    axios.get(APISavedPlayers,{headers:{"Authorization":`Token ${props.tokenzada}`}})
      .then((response) => {
        setAmigos(response.data);
        console.log(amigos,response.data);
       
      })
      
  }
  function getPlayers(name){
    var APIplayers = "http://127.0.0.1:8000/api/user_operations/";
    axios.get(APIplayers)
      .then((response) => {
        setPlayers(response.data);
        getAmigos();
      })
  }
  function deletePlayers(name){
    var lower = name.toLowerCase();
    var APISavedPlayers = "http://127.0.0.1:8000/api/saved_player_operations/?summoner_name="+props.name.toLowerCase()+"&saved_player="+lower;
    axios.delete(APISavedPlayers,{headers:{"Authorization":`Token ${props.tokenzada}`}}).then((response) => {
      setAtualiza(atualiza+1);
    });
    
  }

  function filtraPlayers(name){
    for (var i in players){
      var lower = amigos.map(element => {
        return element.toLowerCase();
      });
      var text = players[i].summoner_name.toLowerCase();
      if(lower.includes(text)){
        //if players[i].summoner_id != null or if there is only one player with that name in the database
        if(players[i].summoner_id != null || players[i].summoner_id == null && players.filter(element => element.summoner_name.toLowerCase() == text).length == 1){
          filtra.push(players[i]);
        }
        
        
      }
    } 
    setFiltrado(filtra);
    //console.log(filtrado);
    
  }
  
  function savePlayer(event){
    console.log(props.tokenzada)
    var APISavedPlayers = "http://127.0.0.1:8000/api/saved_player_operations/?summoner_name="+props.name.toLowerCase()+"&saved_player="+pesquisa.toLowerCase();
    var APIString = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+pesquisa+"?api_key="+key;
    //console.log("Pesquisa:"+pesquisa)
    
    

    axios.get(APIString).then(function(response){
      //sucesso
      console.log(response.data)
      var APIPlayer = "http://127.0.0.1:8000/api/user_operations/";
      
      // Post para o banco de dados com o body no formato aplication/json
      axios.post(APIPlayer, {
        "summoner_name": response.data.name,
        "summoner_id": response.data.id,
        "summoner_level": response.data.summonerLevel,
        "profile_icon_id": response.data.profileIconId,
      }).then((response)=>{if(amigos.includes(pesquisa.toLowerCase())){
        console.log('já existe');
      }else{
        //axios.post(APISavedPlayers);
        axios.post(APISavedPlayers,{"summoner_name":pesquisa.toLowerCase()},{headers:{"Authorization":`Token ${props.tokenzada}`}});
      }
      setAtualiza(atualiza+1)}

      );

      
     
    }).catch(function(error){
      //erro
      console.log(error);
    });
    
  }

  function fazTudo(){
    getPlayers();
   
  }
  useEffect(()=>{
    filtraPlayers();
  },[amigos])

  useEffect(()=>{
    fazTudo();
    //AtualizaPlayer();
  },[])
  useEffect(()=>{
    fazTudo();
  },[atualiza])
  
  return(
    
    <div className="container4">
    <Navbar />
    
    <div className='container5'>
    <div className="NomeHeader">Lista de Amigos</div>
      <div className="form">
        <input className="autoresize" placeholder="Nick do seu amigo" type="texto" onChange={e => setPesquisa(e.target.value)}></input>
        <button className='btn' onClick ={savePlayer}>Adicione um amigo!</button>
        
        
      </div>
      <div className="container2">{filtrado.map((player) => (
        <div className='container2'>
            <div className="User">
              <div className="UserNick" key={player.id}>Nick: {player.summoner_name}</div>
              <div className="UserLevel" key={player.id}>Nivel: {player.summoner_level}</div>
          
              <img alt='icon'className='UserIcon' width="100" height="100" key={player.id} src={"https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/"+player.profile_icon_id+".png"}></img>
              
              <button className='btn' value={player.summoner_name} onClick ={e=>deletePlayers(e.target.value)}>Deletar amigo!</button>
              
            </div>
      
        </div>
        ))}</div>
      
      </div>
      
    </div>
    
  )
}
