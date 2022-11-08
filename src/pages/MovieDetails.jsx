import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const MovieDetails = () => {

  const {id} = useParams()
  const [movieDetail, setMovieDetail] = useState("")
  const [video, setVideo] = useState([])


  const API_KEY = "d30a8fd3c99b3b48b8263203351de7ab";
  const DetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  const ImageUrl = "https://image.tmdb.org/t/p/w1280";


  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
  } = movieDetail;


   

  const getDetail = async () => {
    try {
      const {data} = await axios(DetailsUrl);
      console.log("data", data);
      setMovieDetail(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getVideos = async () => {
    try {
      const { data } = await axios(videoUrl);
      console.log("data", data);
      setVideo(data.results[0].key);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getDetail();
    getVideos()
  },[]);
  

  return (
    <div className="container py-5">
      <h1 className="text-center">{title}</h1>
      <div className="card w-75 m-auto my-3">
        <div className="card-body">
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1`}
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={ImageUrl + poster_path}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8 d-flex flex-column ">
            <div className="card-body">
              <h5 className="card-title">Overview</h5>
              <p className="card-text">{overview}</p>
            </div>
            <ul className="list-group ">
              <li className="list-group-item">
                {"Release Date : " + release_date}
              </li>
              <li className="list-group-item">{"Rate : " + vote_average}</li>
              <li className="list-group-item">
                {"Total Vote : " + vote_count}
              </li>
              <li className="list-group-item">
                <Link to={-1} className="card-link">
                  Go Back
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails

