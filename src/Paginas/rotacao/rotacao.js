// A tab that displays the user's profile information and receives the user as a prop.

import React, { useState, useEffect } from 'react';
import axios from 'axios';


import * as config from '../../../src/config.js'
import Navbar from '../../components/Navbar/navbar';
import RotacaoSemanal from '../../components/Rotacao/RotacaoSemanal';

export default function Rotacao() { 
    const [rotation,setRotation]=useState([]);
    const [championNameList,setChampionNameList]=useState([]);
    const key = config.API_KEY;
    
    
    function getChampName(id){
        var championArrayName=[];
        var APIChamps = 'https://ddragon.leagueoflegends.com/cdn/12.20.1/data/de_DE/champion.json'
        axios.get(APIChamps).then(function(response){
            let championList = response.data.data;
        
            for (var i in championList) {
                //console.log(championList[i].key,id)
                if (id.includes(parseInt(championList[i].key))) {
                  championArrayName.push(championList[i].id);
                  
                  //console.log(championList[i].id);
                }
            }
            console.log(championArrayName)
            setChampionNameList(championArrayName);
        });
    }
   
    
    function getRotation(){
        var APIRotation = "https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key="+key;
        axios.get(APIRotation).then(function(response){
            //sucesso 
            setRotation(response.data.freeChampionIds)
            console.log(response.data.freeChampionIds);
            
            }).catch(function(error){
            //erro
            console.log(error);
        });
      }
    

    useEffect(() => {
        //searchUser(props.name);
        getRotation();
    }
    , []);
    useEffect(() => {
        getChampName(rotation)
    }
    , [rotation]);

    return (
        <div className="container4">
            <Navbar />
            <RotacaoSemanal championNameList={championNameList}/>
              
        </div>
        
    );
}




