


import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const apiKey = "rQRAxqMb";

  const [art, setArt] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Make an API call to the Rijks Museum API
  useEffect(()=>{
    axios({
      url: "https://www.rijksmuseum.nl/api/en/collection",
      method: "GET",
      dataRespsonse: "json",
      params: {
        key: apiKey,
        imgonly: true,
        q: searchTerm,
      }
    }).then((response)=>{
      console.log(response.data.artObjects);
      setArt(response.data.artObjects);
    });
  }, [searchTerm]);

  const handleInput = function(event){
    console.log("does this work?", event.target.value);
    setUserInput(event.target.value); 
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    setSearchTerm(userInput);
  }

  return (
    <div className='App'>
      <h1>Welcome back to the Art Museum</h1>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="search">Search for art: </label>
        <input type="text" id="search" onChange={ handleInput } value={userInput}/>
        <button>Search</button>
      </form>

      {art.map((artwork)=>{
        return (
          <div key={artwork.id}>
            <h2>{artwork.longTitle}</h2>
            <img src={artwork.webImage.url} alt={artwork.title} />
          </div>
        )
      })}
    </div>
  );
}

export default App;


//key rQRAxqMb