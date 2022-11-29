import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from '../../config.js'
import Navbar from '../../components/Navbar/navbar'; 

export default function Maestria(props){
    const [maestria,setMaestria]=useState({});
    const [champion,setChampion]=useState({});

    function getSummonerId(name){
        const linkSummonerId = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name+"?api_key="+config.API_KEY;
        return axios.get(linkSummonerId)
            .then(function(response){
                console.log(response.data.id);
                return response.data.id})
            .catch(function(error){
                console.log(error);});
    }

    async function getMastery(name){
        const summonerId = await getSummonerId(name); 
        const linkMastery = "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summonerId+"?api_key="+config.API_KEY;
        axios.get(linkMastery)
            .then(function(mastery){
                console.log(mastery.data);
                const championId = mastery.data[0].championId;
                const championPoints = mastery.data[0].championPoints;

                const linkChampion = "http://ddragon.leagueoflegends.com/cdn/11.6.1/data/pt_BR/champion.json";
                axios.get(linkChampion)
                    .then(function(champion){
                        const championName = Object.keys(champion.data.data).find(key => champion.data.data[key].key == championId);
                        const championImage = champion.data.data[championName].image.full;
                        setChampion({name: championName, image: championImage});
                        setMaestria({championName: championName, championPoints: championPoints});})
                    .catch(function(erro){console.log(erro)})})
            .catch(function(erro){console.log(erro)});
    }

    async function getChampionScores(name){
        const summonerId = await getSummonerId(name); 
        const linkChampionScores = "https://br1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/"+summonerId+"?api_key="+config.API_KEY;
        console.log(linkChampionScores);
        const championScores = await axios.get(linkChampionScores)
            .then(function(response){
                console.log(response.data)
                return response.data})
            .catch(function(erro){
                console.log(erro)})
        
    }


    useEffect(()=>{
        getMastery(props.name);
        getChampionScores(props.name);
    },[]);

    return (
        <div className="maestria">
            <Navbar />
            <div className="maestria-container">
                <h2 className="maestria-title">Maestria de {props.name}</h2> 
                <div className="maestria-content">
                    <div className="maestria-one">
                        <img className="maestria-img" src={"http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/"+champion.image} alt="champion"/>
                        <h3 className="maestria-champion">{champion.name}</h3>
                        <h3 className="maestria-points">{maestria.championPoints}</h3>
                    </div>
                </div>  
            </div>
        </div>
    );


}   