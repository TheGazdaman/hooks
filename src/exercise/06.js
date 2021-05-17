// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {useEffect} from "react";
import {useState} from "react";

/**
 * @return {string}
 */

class ErrorBoundary extends React.Component {
    state = {error: null};
    static getDerivedStateFromError(error) {
        return {error}
    }
    render() {
        const {error} = this.state;
        if(error) {
            return <this.props.FallbackComponent error={error} />
        }
        return this.props.children
    }
}

function PokemonInfo({pokemonName}) {
    const [status, setStatus] = useState('idle');
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState({ message: 'oh no bad input' });

    useEffect(() => {
        if(!pokemonName) {
            return
        }
        setStatus('pending');
        setError(null);
        setPokemon(null);
        fetchPokemon(pokemonName).then(
            pokemon => {
                setPokemon(pokemon);
                setStatus('resolved')
            },
            setError(error),
            setStatus('rejected')
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
function ErrorFallback(error) {
    return (
        <div role="alert">
            There was an error: {''}
            <pre style={{ whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
    )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
          <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback}>
            <PokemonInfo pokemonName={pokemonName} />
          </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
