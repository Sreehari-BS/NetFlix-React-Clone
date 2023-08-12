const axios = require("axios");
require("dotenv").config();

exports.handler = async () => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`)
        return{
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } catch (error) {
        return{
            statusCode: 500,
            body: error.toString(),
        }
    }
}