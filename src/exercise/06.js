// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {useEffect} from "react";
import {useState} from "react";
import {ErrorBoundary} from "react-error-boundary";

/**
 * @return {string}
 */

function PokemonInfo({pokemonName}) {
    const [state, setState] = useState({
        status: pokemonName ? 'pending' : 'idle',
        pokemon: null,
        error: null,
    });
    const { status, pokemon, error } = state;

    useEffect(() => {
        if(!pokemonName) {
            return null
        }
        setState({status: 'pending'} );
        fetchPokemon(pokemonName).then(
            pokemon => {
                setState({status: 'resolved', pokemon});
            },
            error => {setState({status: 'rejected', error})}
        )
    }, [pokemonName]);

    if(status === 'idle') {
        return 'Submit Pokemon'
    } else if (status === 'pending') {
        return <PokemonInfoFallback name={pokemonName} />
    } else if (status === 'rejected') {
       throw error
    } else if (status === 'resolved') {
        return <PokemonDataView pokemon={pokemon} />
    }

    throw new Error('this should be impossible')
}
function ErrorFallback({error, resetErrorBoundary}) {
    return (
        <div role="alert">
            There was an error: {''}
            <pre style={{ whiteSpace: 'normal'}}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
    )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[pokemonName]}>
            <PokemonInfo pokemonName={pokemonName} />
          </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
