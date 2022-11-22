// Perfil do usuário e dos amigos
// receve the user as a prop
//
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import * as config from '../../config.js'
import Navbar from '../../components/Navbar/navbar';


export default function Perfil(props) {
    const [maestrias, setMaestrias] = useState([]);
    const [campeoes, setCampeoes] = useState([]);
    const [campeoesAtualizados, setCampeoesAtualizados] = useState([]);
    const [atualizaWin, setAtualizaWin] = useState(0);
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

    function getPlayerEncryptedID(playerName){
        var APIPlayer = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+playerName+"?api_key="+key;
        return axios.get(APIPlayer).then(function(response){
            //sucesso 
            console.log(response.data.id);
            return response.data.id
            }).catch(function(error){
            //erro
            console.log(error);
        });
    }

    function getTotalMasteryPoints(encryptedID){
        var APIMAESTRY = "https://br1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/"+encryptedID+"?api_key="+key;
        return axios.get(APIMAESTRY).then(function(response){
            //sucesso 
            console.log(response.data);
            return response.data
            }
            ).catch(function(error){
            //erro
            console.log(error);
        });
    }

        function getListOfMaestries(encryptedID){
            var APIMAESTRY = "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+encryptedID+"?api_key="+key;
            return axios.get(APIMAESTRY).then(function(response){
                //sucesso 
                console.log(response.data);
                return response.data
                }
                ).catch(function(error){
                //erro
                console.log(error);
            });
        }

        function getChampionInfo(championID){
            var APICAMPEAO = "http://ddragon.leagueoflegends.com/cdn/10.11.1/data/pt_BR/champion.json";
            return axios.get(APICAMPEAO).then(function(response){
                //sucesso 
                console.log(response.data.data);
                return response.data.data
                }
                ).catch(function(error){
                //erro
                console.log(error);
            });
        }

        return (
            <div className="container4">
                <div className="NomeHeader">Perfil do usuário</div>
            </div>
        );



}