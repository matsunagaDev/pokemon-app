import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  const loadPokemonDetails = async (data) => {
    // 全ポケモンの詳細データを取得
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全ポケモンのデータを取得
      const res = await getAllPokemon(initialURL);
      loadPokemonDetails(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <h1>ポケモンデータを取得しました</h1>
      )}
    </div>
  );
}

export default App;
