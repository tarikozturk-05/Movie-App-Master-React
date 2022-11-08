import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";

const Main = () => {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const API_KEY = "d30a8fd3c99b3b48b8263203351de7ab";


  const VERI_URL =`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`

  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;


  const getApi=async()=>{
    try {
     const {data} = await axios(VERI_URL)     
     setMovies(data.results);
    } catch (error) {
      console.log('error', error)

    }
  }

   const searchApi = async () => {
     try {
       const { data } = await axios(SEARCH_API);
       setMovies(data.results);
     } catch (error) {
       console.log("error", error);
     }
   };

  const handleSubmit =(e)=>{
    e.preventDefault()
      if (currentUser && search) {
        searchApi();
      } else if (!currentUser) {
        toastWarnNotify("Please Login");
       setTimeout(() => {
        navigate("/login")
       }, 3000);
      } else {
        toastWarnNotify("Please Enter a Text");
      }
  }

  useEffect(() => {
    getApi()
  }, [])
  
  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search search-input"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-dark" type="submit">
          SEARCH
        </button>
      </form>
      <div className="d-flex justify-content-center flex-wrap">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default Main;
