import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import pokedex from './assets/images/pokedex.png';

function App() {
  const [pokeInfo, setPokeInfo] = useState({});
  const [pokeImg, setPokeImg] = useState();

  async function getPokeByLink(link = ""){
    const _pokeInfo = await (await axios.get(link)).data;
    if(!_pokeInfo)
      return;
    if(_pokeInfo.sprites.versions["generation-v"]["black-white"].animated.front_default)
      setPokeImg(_pokeInfo.sprites.versions["generation-v"]["black-white"].animated.front_default);
    else 
    setPokeImg(_pokeInfo.sprites.front_default);
      setPokeInfo(_pokeInfo);
  }
 
  async function listPokemon(id = "0"){
    id = Number(id)
    if ((id == 0 || id < 0))
      return
    const link = `https://pokeapi.co/api/v2/pokemon?offset=${id - 1}&limit=1`;
    const _pokeInfo = await (await axios.get(link)).data;
    if ((id > _pokeInfo.count))
      return;
    getPokeByLink(_pokeInfo.results[0].url)
  }

  async function handleButton(next = false) {
    let id = pokeInfo.id || 0
    id = next ? id + 1 : id - 1;
    listPokemon(id);
  }

  function handleSearch(tearm = "") {
    tearm = tearm.toLowerCase()
    getPokeByLink(`https://pokeapi.co/api/v2/pokemon/${tearm}`)
  }

  useEffect(() => {
    listPokemon(1)
  },[]);
  return (
    <div className="App">
      <div className="container">
        <div className="content">
        <div className="pokedex">
          <img className = 'pokeDex' src={ pokedex }/>
          <img className = 'pokeImg' src={pokeImg} alt="" />
          <marquee className="pokeDat" loop={1} direction="left" scrolldelay={1}>
              <span className="pokeNum">{pokeInfo.id}</span> - 
              <span className="pokeNam">{pokeInfo.name}</span>
          </marquee>

          <form className='pokeSea' action="#">
            <input 
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              className='pokeInp'
              placeholder='Name or Number'
              required
              />
          </form>

          <div className="buttons">
            <button
              onClick={() => handleButton(false)}
              className="button btn-prev">{"< Prev"}</button>
            <button 
              onClick={() => handleButton(true)}
              className="button btn-next">{"Next >"}</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
