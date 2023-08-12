import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Feature.css";
import Youtube from "react-youtube"

const Feature = () => {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [moreInfo, setMoreInfo] = useState(false);
  const [button,setButton] = useState("More Info")
  const [playButton,setPlayButton] = useState("Play")

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const getFeature = async () => {
      const { data } = await axios.get("/.netlify/functions/getTrending");
      const randomNumber = Math.floor(Math.random() * data.results.length);
      setMovie(data.results[randomNumber]);
    };
    getFeature();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll",() => {
      if(window.scrollY > 100) {
        setTrailer(null)
        setPlayButton("Play")
      }
    })
    return window.removeEventListener("scroll",null)
  },[])

  const handleMoreInfoToggle = () => {
    if(moreInfo){
      setMoreInfo(false)
      setButton("More Info")
    }else{
      setMoreInfo(true)
    setButton("Show Less")
    }
  }

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const handlePlay = async (id) => {
    if (trailer) {
      setTrailer(null);
      setPlayButton("Play")
    } else {
      const { data } = await axios.get(
        `/.netlify/functions/getTrailer?id=${id}`
      );
      setTrailer(data);
      setPlayButton("Stop")
    }
  };

  return (
    <div
      className="Featuer-container"
      style={{
        backgroundImage: movie
          ? `url(${BASE_URL}/${movie.backdrop_path})`
          : null,
        objectFit: "contain",
        backgroundPosition: "center center",
      }}
    >
      {movie ? (
        <div className="Feature-content">
          <h1 className="Feature-title">{movie.title}</h1>
          <div className="Feature-buttons">
            <button
              className="Feature-button"
              onClick={() => handlePlay(movie.id)}
            >
              {playButton}
            </button>
            <button className="Feature-button" onClick={handleMoreInfoToggle}>{button}</button>
          </div>
          {moreInfo ? (
            <div>
            <p className="Feature-overview-moreInfo">{movie.overview}</p>
            <h3>Release Date: {movie.release_date}</h3>
            <h2>Rating: <strong className="Feature-rating">{movie.vote_average.toFixed(2)}</strong> </h2>
          </div>
          ) : (
            <p className="Feature-overview">{truncate(movie.overview, 150)}</p>
          )}
        </div>
      ) : null}
      <div className="Feature-mask"></div>
      {trailer && (
        <div className="Feature-trailer">
          <Youtube
            videoId={trailer}
            opts={{
              height: "500px",
              width: "100%",
              playerVars: { autoplay: 1 },
            }}
            className="Feature-trailer"
          />
        </div>
      )}
    </div>
  );
};

export default Feature;
