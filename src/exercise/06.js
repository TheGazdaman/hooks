// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {useEffect} from "react";
import {useState} from "react";

/**
 * @return {string}
 */
function PokemonInfo({pokemonName}) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        if(!pokemonName) {
            return
        }
        fetchPokemon(pokemonName).then(
            pokemonData => {
                setPokemon(pokemonData)
            }
        )
    }, [pokemonName]);

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
