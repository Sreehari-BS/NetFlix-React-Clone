import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Section.css";
import Youtube from "react-youtube";

const Section = ({ genre, functionName, isLarge }) => {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const getMovies = async (id) => {
      const { data } = await axios.get(
        `/.netlify/functions/${functionName}?id=${id}`
      );
      setMovies(data.results);
    };
    getMovies(genre.id);
  }, []);

  console.log(movies)

  const handlePosterClick = async (id) => {
    if (trailer) {
      setTrailer(null);
    } else {
      const { data } = await axios.get(
        `/.netlify/functions/getTrailer?id=${id}`
      );
      setTrailer(data);
    }
  };

  return (
    <div className="Section-row" style={{ marginTop: isLarge ? "660px" : "" }}>
      <h2 className="Section-row-title">{genre.name}</h2>
      <div className="Section-row-poster">
        {movies.map((movie) => (
          <div>
            <img
              src={`${BASE_URL}/${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              alt={`Image of ${movie.title}`}
              key={movie.id}
              className={`Section-row-poster-img ${isLarge ? "isLarge" : ""}`}
              onClick={() => handlePosterClick(movie.id)}
            />
            <p>{isLarge ? "" : movie.title}</p>
          </div>
        ))}
      </div>
      {trailer && (
        <div className="Section-row-trailer">
          <Youtube
            videoId={trailer}
            opts={{
              height: "500px",
              width: "100%",
              playerVars: { autoplay: 1 },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Section;
