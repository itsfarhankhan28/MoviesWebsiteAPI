const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , './uploads/')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString + file.originalname)
    }
})

const upload = multer({storage:storage})

app.use(express.json())
app.use(express.static('uploads'))

require('../db/conn')
const Movies = require('../models/schema')

//Add Movies
app.post('/movies',upload.single('movieImage'),async(req,res)=>{
    console.log(req.file)
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
    }catch(errorr){
        console.log(errorr)
    }
})

//Get Movie by name
app.get('/movies/:name',async(req,res)=>{
    try{
        const name = req.params.name
        const MovieName = await Movies.find({name})
        console.log(MovieName)
        res.send(MovieName)
    }catch(err){
        console.log(err)
    }
})

//Delete Movie 
app.delete('/movies/:id',async(req,res)=>{
    try{
        const movieId = req.params.id
        const deleteMovie = await Movies.findByIdAndDelete({_id:movieId})
        console.log(deleteMovie)
        res.send(deleteMovie)
    }catch(err){
        console.log(err)
    }
})

//Update Movies
app.put('/movies/:id',async(req,res)=>{
    const _id = req.params.id
    const updateMovie = await Movies.findByIdAndUpdate({_id},{
        $set:{
            actors:"KGFChapter2"
        }
    },{
        new:true,
        usefindandModify:false
    })
})

app.listen(port , ()=>{
    console.log(`running port at ${port}`)
})