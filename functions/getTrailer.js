const MovieTrailer = require("movie-trailer");
require("dotenv").config();

exports.handler = async (event) => {
  try {
    const { id } = event.queryStringParameters;
    const data = await MovieTrailer(null, {
      id: true,
      apikey: process.env.TMDB_API_KEY,
      tmdbId: id,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};