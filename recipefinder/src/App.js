import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "ce5d828c";
  const APP_KEY = "ebebd07068082982f9aca71680fcf991";
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updatesearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <h1 className="Header">Recipe Finder</h1>
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updatesearch}/>
        <button className="search-button" type="submit">
          Submit
        </button>
      </form>
      <div className="Recipe">
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label} ingredients={recipe.recipe.ingredients} image={recipe.recipe.image}/>
      ))}
      </div>
    </div>
  );
}

export default App;
