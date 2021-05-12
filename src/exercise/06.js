// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {useEffect} from "react";
import {useState} from "react";

/**
 * @return {string}
 */
function PokemonInfo({pokemonName}) {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState({ message: 'oh no bad input' });

    useEffect(() => {
        if(!pokemonName) {
            return
        }
        setError(null);
        setPokemon(null);
        fetchPokemon(pokemonName).then(
            pokemon => setPokemon(pokemon),
            error => setError(error),
        )
    }, [pokemonName]);

    if(error) {
        return (
            <div role="alert">
                There was an error: {''}
                <pre style={{ whiteSpace: 'normal'}}>{error.message}</pre>
            </div>
        )
    }

  if(!pokemonName) {
      return 'Submit Pokemon'
  }
  if(!pokemon) {
      return <PokemonInfoFallback name={pokemonName} />
  } else {
      return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
