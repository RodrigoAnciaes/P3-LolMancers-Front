import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from '../../config.js'
import Navbar from '../../components/Navbar/navbar'; 

export default function Maestria(props){
    const [maestria,setMaestria]=useState({});
    const [maestria2,setMaestria2]=useState({});
    const [maestria3,setMaestria3]=useState({});
    const [champion,setChampion]=useState({});
    const [champion2,setChampion2]=useState({});
    const [champion3,setChampion3]=useState({});

    function getSummonerId(name){
        const linkSummonerId = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name+"?api_key="+config.API_KEY;
        return axios.get(linkSummonerId).then(function(response){
            console.log(response.data.id);
            return response.data.id
            }).catch(function(error){
            console.log(error);
        });
    }

    async function getMastery(name, n){
        const summonerId = await getSummonerId(name); 
        const linkMastery = "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summonerId+"?api_key="+config.API_KEY;
        // console.log(linkMastery);
        axios.get(linkMastery)
            .then(function(mastery){
        console.log(mastery.data);
        const championId = mastery.data[n].championId;
        const championPoints = mastery.data[n].championPoints;
        console.log("championId: "+championId);
        console.log("championPoints: "+championPoints);

        const linkChampion = "http://ddragon.leagueoflegends.com/cdn/11.6.1/data/pt_BR/champion.json";
        axios.get(linkChampion)
            .then(function(champion){
                // the champion object has the champion name as its key and contains the champion data including the champion id named key
            const championName = Object.keys(champion.data.data).find(key => champion.data.data[key].key == championId);
            const championImage = champion.data.data[championName].image.full;
            setChampion({name: championName, image: championImage});
            setMaestria({championName: championName, championPoints: championPoints});
        }
                ).catch(function(erro){console.log(erro)})
}).catch(function(erro){console.log(erro)});}

async function getMastery2(name, n){
    const summonerId = await getSummonerId(name); 
    const linkMastery = "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summonerId+"?api_key="+config.API_KEY;
    // console.log(linkMastery);
    axios.get(linkMastery)
        .then(function(mastery){
    console.log(mastery.data);
    const championId = mastery.data[n].championId;
    const championPoints = mastery.data[n].championPoints;
    console.log("championId: "+championId);
    console.log("championPoints: "+championPoints);

    const linkChampion = "http://ddragon.leagueoflegends.com/cdn/11.6.1/data/pt_BR/champion.json";
    axios.get(linkChampion)
        .then(function(champion){
            // the champion object has the champion name as its key and contains the champion data including the champion id named key
        const championName = Object.keys(champion.data.data).find(key => champion.data.data[key].key == championId);
        const championImage = champion.data.data[championName].image.full;
        setChampion2({name: championName, image: championImage});
        setMaestria2({championName: championName, championPoints: championPoints});
    }
            ).catch(function(erro){console.log(erro)})
}).catch(function(erro){console.log(erro)});}


async function getMastery3(name, n){
    const summonerId = await getSummonerId(name); 
    const linkMastery = "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summonerId+"?api_key="+config.API_KEY;
    // console.log(linkMastery);
    axios.get(linkMastery)
        .then(function(mastery){
    console.log(mastery.data);
    const championId = mastery.data[n].championId;
    const championPoints = mastery.data[n].championPoints;
    console.log("championId: "+championId);
    console.log("championPoints: "+championPoints);

    const linkChampion = "http://ddragon.leagueoflegends.com/cdn/11.6.1/data/pt_BR/champion.json";
    axios.get(linkChampion)
        .then(function(champion){
            // the champion object has the champion name as its key and contains the champion data including the champion id named key
        const championName = Object.keys(champion.data.data).find(key => champion.data.data[key].key == championId);
        const championImage = champion.data.data[championName].image.full;
        setChampion3({name: championName, image: championImage});
        setMaestria3({championName: championName, championPoints: championPoints});
    }
            ).catch(function(erro){console.log(erro)})
}).catch(function(erro){console.log(erro)});}


// its needed to get the 3 top maestries from getMastery
    useEffect(() => {
        getMastery(props.name, 0);
        getMastery2(props.name, 1);
        getMastery3(props.name, 2);
    }, []);

    return(
        <div>
            <Navbar name={props.name} tokenzada={props.tokenzada}/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Maestria</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2>Top 3 Maestrias</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <h3>1º</h3>
                        <img src={"http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/"+champion.image} alt="champion"/>
                        <h4>{maestria.championName}</h4>
                        <h4>{maestria.championPoints}</h4>
                    </div>
                    <div className="col-4">
                        <h3>2º</h3>
                        <img src={"http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/"+champion2.image} alt="champion"/>
                        <h4>{maestria2.championName}</h4>
                        <h4>{maestria2.championPoints}</h4>
                    </div>
                    <div className="col-4">
                        <h3>3º</h3>
                        <img src={"http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/"+champion3.image} alt="champion"/>
                        <h4>{maestria3.championName}</h4>
                        <h4>{maestria3.championPoints}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
    


}   