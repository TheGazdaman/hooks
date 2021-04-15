// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageWithState(key, defaultValue = '', {serialize = JSON.stringify, deserialize = JSON.parse} = {}) {
    const [state, setState] = React.useState(() => {
      const valueInLocaleStorage = window.localStorage.getItem(key);
      if (valueInLocaleStorage) {
        return deserialize(valueInLocaleStorage)
      }
      return defaultValue;
    });
      React.useEffect(() => {
        window.localStorage.setItem(key, serialize(state))
      }, [key, serialize, state]);

    return [state, setState]
  }

function Greeting({initialName = ''}) {

   const [name, setName] = useLocalStorageWithState('name', initialName);

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0);

  return (
  <>
    <button onClick={() => setCount(prevCount => prevCount + 1)}>{count}</button>
    <Greeting initialName={"George"} />
  </>
  )
}

export default App
