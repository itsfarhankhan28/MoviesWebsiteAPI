const express = require('express')
const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

require('../db/conn')
const Movies = require('../models/schema')

//Add Movies
app.post('/movies',async(req,res)=>{
    const movies = new Movies(req.body)
    console.log(movies)

    const MoviesAdded = await movies.save()
    res.status(200).send("Movie added successfully")
})

//Get All Movies
app.get('/movies',async(req,res)=>{
    try{
        const moviesData = await Movies.find()
        console.log(moviesData)
        res.send(moviesData)
    }catch(err){
        console.log(err)
    }
})

//Get Movie By Id
app.get('/movies/:id',async(req,res)=>{
    try{
        const _id = req.params.id
        const movieData = await Movies.findById({_id})
        console.log(movieData)
        res.send(movieData)
    }catch(error){
        console.log(error)
    }
})

app.listen(port , ()=>{
    console.log(`running port at ${port}`)
})