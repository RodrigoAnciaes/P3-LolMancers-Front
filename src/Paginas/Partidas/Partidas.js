// A tab that displays the user's profile information and receives the user as a prop.

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Partida from '../../components/Partida/Partida';
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
       //setGamelist(matchDataArray);
       
       for (const i in matchDataArray){
            for (const j in matchDataArray[i].info.participants){
            //console.log(gameList[i].info.participants[j].summonerName);
                if (matchDataArray[i].info.participants[j].summonerName == props.name){
                    console.log( matchDataArray[i].info.participants[j].summonerName)
                    if(matchDataArray[i].info.participants[j].win == true){
                        matchDataArray[i].info.win = 'Vitória';
                    }
                    else{
                        matchDataArray[i].info.win = 'Derrota';
                    };
                };
        };
        setGamelistAtualizada(matchDataArray);
};
    
   
    };

    useEffect(() => {
        getMatches();
        
    }, []);
    /*useEffect(() => {
        
    setGamelistAtualizada(gameList);
    console.log(atualizawin)
    }, [atualizawin]);

    useEffect(()=>{
        console.log(gameList)
        setAtualizaWin(atualizawin+1);
    },[gameList])*/

    return (
        <div className="container_partidas">
            <Navbar />
            <Partida gameList={gameListAtualizada} name={props.name} />
        </div>
    );
}