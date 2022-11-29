import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from '../../config.js'
import Navbar from '../../components/Navbar/navbar'; 
import data from './champion.json';

export default function Maestria(props){
    const [maestria,setMaestria]=useState({});

    function getSummonerId(name){
        const linkSummonerId = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name+"?api_key="+config.API_KEY;
        return axios.get(linkSummonerId)
            .then(function(response){
                // console.log(response.data.id)
                return response.data.id})
            .catch(function(error){
                console.log(error)})
    }

    async function getMastery(name){
        const summonerId = await getSummonerId(name); 
        const linkMastery = "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summonerId+"?api_key="+config.API_KEY;
        // console.log(linkMastery);
        const mastery = await axios.get(linkMastery)
            .then(function(response){
                console.log(response.data)
                return response.data})
            .catch(function(erro){
                console.log(erro)})
        console.log(mastery[0]);

        const championId = mastery[0].championId;
        const championPoints = mastery[0].championPoints;

        // const championNameById = "https://ddragon.leagueoflegends.com/cdn/8.1.1/data/en_US/champion.json"   
        // const championName = await axios.get(championNameById)
        //     .then(function(response){  
        //         console.log(response.data.data);
        //         return response.data.data})
        //     .catch(function(erro){
        //         console.log(erro)})

        for (const [champion, details] of Object.entries(data.data)){
            if (details.key == championId){
                console.log(details.name);
                setMaestria({name: champion, points: championPoints});
                console.log(maestria);
            }
        }
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
                        <span> <strong>Campeão: </strong>{maestria.name} </span>
                        <span> <strong>Pontos: </strong>{maestria.points} </span>
                    </div>
                </div>  
            </div>
        </div>
    );
}   