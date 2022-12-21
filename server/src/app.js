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

//Get All Movies and with Query
// app.get('/movies',async(req,res)=>{
//     try{
//         const moviesData = await Movies.find(req.query)
//         console.log(moviesData)
//         res.send(moviesData)
//     }catch(err){
//         console.log(err)
//     }
// })

//Get movie with one correct query
app.get('/movies',async(req,res)=>{
    const {name,releaseDate,select} = req.query
    const queryObject = {}

    var MovieData = Movies.find(queryObject)

    if(name){
        queryObject.name = {$regex:name , $options:"i"}
    }

    if(releaseDate){
        queryObject.releaseDate = releaseDate
    }

    if(select){
        const selectedField = select.split(",").join(" ")
        MovieData = MovieData.select(selectedField)
    }

    let page = (req.query.page) || 1
    let limit = (req.query.limit) || 3

    let skip = (page-1) * limit

    MovieData = MovieData.skip(skip).limit(limit)

    const Moviename = await MovieData
    res.send(Moviename)
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

//Get Movie by query
// app.get('/movies' , async(req,res)=>{
//     try{
//         console.log(req.query)
//     }catch(err){
//         console.log(err)
//     }
// })

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