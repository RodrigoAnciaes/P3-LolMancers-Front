// A tab that displays the user's profile information and receives the user as a prop.

import React, { useState, useEffect } from 'react';
import axios from 'axios';


import * as config from '../../config.js'
import Navbar from '../Navbar/navbar';
import Spinner from 'react-bootstrap/Spinner';
export default function Partida(props) { 
    
    return (
        <div className="container_partidas">
        <div className="NomeHeader">Últimas 5 partidas</div>
        {props.gameList[0] ==  null ? 
        <Spinner animation="border" role="status" style={{ width: "5rem", height: "5rem" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>:
        props.gameList.map((gameData,index) => 
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
                        <img className='UserIcon2' width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/"+data.championName+".png"}></img></div>
                
                    )}
                    </div>

                <div className="team">
                    <div className="teamtitle">Time Vermelho</div>
                    {gameData.info.participants.slice(5,10).map((data,participantIndex) =>
                    <div className="infoplayer">
                        <div className={`infoplayername${data.summonerName==props.name? "data":""}`}>PLAYER {participantIndex+1}: {data.summonerName}</div>
                        <div className="infoplayerkda"> KDA: {data.kills} / {data.deaths} / {data.assists} </div>
                        <img className='UserIcon2' width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/"+data.championName+".png"}></img></div>
            
                )}
                </div>
            </div>
            </div>
            )
        }
        </div>
    );
}