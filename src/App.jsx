import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pics, setPics] = useState([])
  const [value, setValue] = useState('')

  function getData(query) {
    if (query) {
      fetch(`http://localhost:5000?request=${query}`)
        .then((res) => res.json())
        .then((json) => {
          //console.log(json)
          setPics([...json])
        })
        .catch((error) => {
          return
        })
    }
  }
  // useEffect(() => {
  //   console.log(value)
  // }, [value])

  return (
    <div className='App'>
      <input
        type='text'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      <button
        onClick={() => {
          setPics('Searching')
          getData(value)
        }}
      >
        View
      </button>
      <br />
      <br />
      {pics === 'Searching' ? (
        <div>Loading...</div>
      ) : (
        pics.map((pic) => <img key={pic.url.slice(-10)} src={pic.url} width='600' />)
      )}
    </div>
  )
}

export default App
