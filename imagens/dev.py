<div>
      <Navbar />
        
        <h2>LOLMancers</h2>
        
        <input type="texto" onChange={e => setPesquisa(e.target.value)}></input>
        <button onClick ={e=>search(e)}>Pesquise!</button>
        
        {JSON.stringify(jogadorData) != '{}' ? 
          <><p>Nick: {jogadorData.name} </p>
          <><p>Nível: {jogadorData.summonerLevel}</p></>
          <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/"+jogadorData.profileIconId+".png"}></img>
          <><p>Número total de maestria: {maestria}</p></>
          </> 
          : 
          <><p>No player data</p></>}
    </div>