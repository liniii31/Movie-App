import axios from 'axios';
import './App.css';
import heart from './heart-icon.png';
import React, { useEffect, useState } from 'react';

function App() {
  let [search, setSearch] = useState("harry");
  let [poster, setPoster] = useState([]);
  let [fav, setFav] = useState([])
  useEffect(() => {
    axios.get("http://www.omdbapi.com/?s=harry&apikey=eb04909e")
      .then(response => {
        setPoster(...poster, response.data.Search);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
  }, []);
  function handleInput(e) {
    setSearch(e.target.value);
  }
  function go() {
    if (search === "") {
      alert("Invalid search Keyword");
    } else {
      axios.get("http://www.omdbapi.com/?s=" + search + "&apikey=eb04909e")
        .then(response => {
          if (response.data.Response === "True") {
            setPoster(response.data.Search);
          } else {
            alert(response.data.Error);
          }

        })
        .catch(error => {
          console.log(error);
          alert(error);
        })
    }
  }
  function add(poster) {
    setFav([...fav, poster]);
  }
  function remove(index) {
    var array = [...fav]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      setFav([...array]);
    }
  }
  return (
    <div className="App">
      <header>
        <div className="heading">
          <h1>Movies.</h1>
        </div>
        <div className="search-bar">
          <input id="search" name="search" type="text" onChange={handleInput} />
          <button id="search-button" onClick={go}>Go</button>
        </div>
      </header>
      <hr />
      <div className='movies'>
        {poster.map((value, i) => {
          return (
            <div key={i} className="poster">
              <img src={value.Poster} alt="poster images" />
              <div className="favorite" onClick={() => add(value.Poster)}>Add to Favorite<img src={heart} alt="heart" width="15px" height="15px" /></div>
            </div>
          )
        })}
      </div>
      <header>
        <div className="heading">
          <h1>Favorites.</h1>
        </div>
      </header>
      <hr />
      <div className='favorites'>
        {fav.map((value, i) => {
          return (
            <div key={i} className="poster">
              <img src={value} alt="poster images" />
              <div className="removefavorite" onClick={() => remove(i)}>Remove from Favorite<img src={heart} alt="heart" width="15px" height="15px" /></div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
