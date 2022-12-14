const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    name:String,
    info:String,
    actors:String,
    releaseDate:Number,
    CountryOfOrigin:String,
    Language:String,
    FilmingLocation:String,
    ProductionCompanies:String,
    Ratings:Number,
    movieImage:{
        data:Buffer,
        contentType:String
    }
})

const Movies = mongoose.model("Movies",movieSchema)

module.exports = Movies