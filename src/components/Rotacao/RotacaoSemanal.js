import React, { useState, useEffect } from 'react';

export default function RotacaoSemanal(props) { 
    return (
        <div className="container4">
        <div className="NomeHeader">Rotação Semanal Grátis</div>
              <div className="container2">{props.championNameList.map((champname) => (
                <div className='container2'>
                    <div className="User">
                    <div className="UserNick" key={champname.id}> {champname}</div>
                    <img alt='icon'className='UserIcon' width="100" height="100" key={champname.id} src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/"+champname+".png"}></img>
                    </div>
            
      
                </div>
        
            ))
            }
            </div>
        </div>
    );
}