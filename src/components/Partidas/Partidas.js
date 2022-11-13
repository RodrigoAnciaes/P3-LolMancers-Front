// A tab that displays the user's profile information and receives the user as a prop.

import React, { useState, useEffect } from 'react';
import axios from 'axios';


import * as config from '../../../src/config.js'
import Navbar from '../../components/Navbar/navbar';

export default function Partidas(props) { 
    const [gameList,setGamelist]=useState([]);
    const [gameListAtualizada,setGamelistAtualizada]=useState([]);
    const [atualizawin,setAtualizaWin]=useState(0);
    const key = config.API_KEY;
    
    
    function getPlayerPUUID(playerName){
        var APIPlayer = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+playerName+"?api_key="+key;
        return axios.get(APIPlayer).then(function(response){
            //sucesso 
            console.log(response.data.puuid);
            return response.data.puuid
            }).catch(function(error){
            //erro
            console.log(error);
        });
    }

    async function getMatches() {
        //API CALL
        console.log(props.name)
        const PUUID = await getPlayerPUUID(props.name);
        const API_Matches = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"+PUUID+"/ids?api_key="+key;

        //get API CALL
        const gameIDs = await axios.get(API_Matches)
            .then(response=>response.data)
            .catch(err=>err)
        //console.log(gameIDs);
       
       //A list of game id strings
       //console.log(gameIDs); 
       var matchDataArray = [];
       for(var i=0; i<gameIDs.length-15;i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com/lol/match/v5/matches/"+matchID+"?api_key="+key)
            .then(response=>response.data)
            .catch(err=>err)
        matchDataArray.push(matchData);
      
       }
       setGamelist(matchDataArray);
       
    
   
    };

    useEffect(() => {
        getMatches();
        
    }, []);
    useEffect(() => {
        for (const i in gameList){
            for (const j in gameList[i].info.participants){
            //console.log(gameList[i].info.participants[j].summonerName);
                if (gameList[i].info.participants[j].summonerName == props.name){
                    console.log( gameList[i].info.participants[j].summonerName)
                    if(gameList[i].info.participants[j].win == true){
                        gameList[i].info.win = 'Vitória';
                    }
                    else{
                        gameList[i].info.win = 'Derrota';
                    };
                };
        };
    };
    setGamelistAtualizada(gameList);
    console.log(atualizawin)
    }, [atualizawin]);

    useEffect(()=>{
        console.log(gameList)
        setAtualizaWin(atualizawin+1);
    },[gameList])
    return (
        <div className="container_partidas">
            <Navbar />
            <div className="NomeHeader">Últimas 5 partidas</div>
          
            {gameListAtualizada.map((gameData,index) => 
            <div className={`games${gameData.info.win == 'Vitória' ? "win": ""}`}>
            <h2>Game {index+1} </h2>
            <h3>Modo de jogo: {gameData.info.gameMode}</h3>
            <h4>{gameData.info.win}</h4>
            <div className="infos">
                <div className="team ">
                    <div className="teamtitle">Time Azul</div>
                    {gameData.info.participants.slice(0,5).map((data,participantIndex) =>
                    <div className="infoplayer">
                        <div className={`infoplayername${data.summonerName==props.name? "data":""}`}>PLAYER {participantIndex+1}: {data.summonerName}</div>
                        <div className="infoplayerkda"> KDA: {data.kills} / {data.deaths} / {data.assists} </div>
                        <img className='UserIcon2' width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/"+data.championName+".png"}></img></div>
                
                    )}
                    </div>

                <div className="team">
                    <div className="teamtitle">Time Vermelho</div>
                    {gameData.info.participants.slice(5,10).map((data,participantIndex) =>
                    <div className="infoplayer">
                        <div className={`infoplayername${data.summonerName==props.name? "data":""}`}>PLAYER {participantIndex+1}: {data.summonerName}</div>
                        <div className="infoplayerkda"> KDA: {data.kills} / {data.deaths} / {data.assists} </div>
                        <img className='UserIcon2' width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/"+data.championName+".png"}></img></div>
            
                )}
                </div>
            </div>
            </div>
            )
        }
        </div>
    );
}