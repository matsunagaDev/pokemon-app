import { use, useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');

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

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全ポケモンのデータを取得
      const res = await getAllPokemon(initialURL);
      console.log(res);
      setPrevURL(res.previous);
      setNextURL(res.next);
      loadPokemonDetails(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const handleNextPage = async () => {
    setLoading(true);
    const res = await getAllPokemon(nextURL);
    await loadPokemonDetails(res.results);
    setNextURL(res.next);
    setPrevURL(res.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    const res = await getAllPokemon(prevURL);
    await loadPokemonDetails(res.results);
    setNextURL(res.next);
    setPrevURL(res.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, index) => {
                return <Card key={index} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
