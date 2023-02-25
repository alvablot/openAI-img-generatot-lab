import { useState, useEffect } from 'react'
import './App.css'
const BASE_URL = 'http://localhost:5000'
let caracterArray = []

function App() {
  const [pics, setPics] = useState([])
  const [data, setData] = useState([])
  const [value, setValue] = useState('')
  const [caracter, setCaracter] = useState('')

  const makeCaracter = (obj, index) => {
    caracterArray[index] = obj
    console.log(caracterArray)
  }

  const getImages = async (query) => {
    if (query) {
      try {
        const response = await fetch(`${BASE_URL}${query}`)
        const json = await response.json()
        setPics([...json])
      } catch (error) {
        console.error(error)
        return
      }
    }
  }

  useEffect(() => {
    const getData = async (query) => {
      if (query) {
        try {
          const response = await fetch(`${BASE_URL}${query}`)
          const json = await response.json()
          setData(json.sagaObjects)
          const arr = Object.values(json.sagaObjects[0])
          arr.map((el, i) => {
            caracterArray[i] = null
          })
          console.log(caracterArray)
        } catch (error) {
          console.error(error)
          return
        }
      }
    }
    getData('/caracters')
  }, [])

  return (
    <div className='App'>
      {data.map((obj) => {
        return Object.values(obj).map((el, i) => (
          <>
            <button
              onClick={() => {
                makeCaracter(el, i)
              }}
            >
              {el}
            </button>
            <br />
          </>
        ))
      })}
      <div>{caracter}</div>
      <input
        type='text'
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />

      <button
        onClick={() => {
          if (!caracterArray.includes(null)) {
            setValue(caracterArray.toString())
            setPics('Searching')
            getImages(`?request=${caracterArray.toString()}`)
          } else console.log('Contains empty slots')
        }}
      >
        View
      </button>
      <button
        onClick={() => {
          setPics('Searching')
          getImages(`?request=${value}`)
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
