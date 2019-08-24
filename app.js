const express = require("express")
const bodyParser = require("body-parser")
//const {Usuario, Producto,  Tienda, Mensaje_Usuario, Mensaje_Producto} = require('./db')
const mongoose = require("mongoose")
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

var libro = {}



const app = express()

app.set('json spaces',4)
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.use(session({
    secret: "a secret secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect("mongodb://localhost:27017/tallerfinal", {useNewUrlParser: true})

const bookSchema = {
    titulo : String,
    autor : String,
    isbn: String,
    calificacion_promedio: Number,
}

const Book = mongoose.model("Book", bookSchema)

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("User", userSchema)


passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html")
})







app.get("/perfil", function(req,res){
    console.log(req.user)

    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/public/vendedor.html")
    }else{
        res.send("error")
    }
})


app.post('/register' , function(req,res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err)

        }else{
            passport.authenticate("local")(req ,res, function(){
                res.send("Usuario Registrado")
            })
        }
    })
})

// login 
app.post('/login', function(req, res){

    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })
    req.login(user, function(err){
        if(err){
            console.log(err)
        }else{
            console.log(user)
            passport.authenticate("local")(req,res,function(){
               res.send("Usuario autenticado")
                console.log("autenticado")
            })
        }
    })
})
// prueba para buscar autores 
app.get("/api", function(req, res){
    Book.find({autores: 'Bill Bryson'}, function(err, foundRestaurant){
        if(!err){
            console.log("api")
           console.log(foundRestaurant)
        }else{
            console.log(err)
        }  
    })
})
app.route("/api/autor/")
// se busca todos los registro del autor 
.post(function(req, res){
    Book.find({autores : req.body.autor}, function(err, foundAuthor){
        if (foundAuthor){
            res.send(foundAuthor)
            console.log(req.body)
        }else{
            console.log(err)
        }
    })
})

// Se encuentra un libro con el nombre especifico 
app.post("/book", function(req, res){
    Book.findOne(
        {titulo:req.body.titulo}).then(books =>{
            console.log(req.body.titulo)
       libro = books 
       res.sendFile(__dirname +"/public/resultado.html")
    })
})


//se envia el libro buscado por la ruta /book post 
app.get("/api/result", function(req, res){
    console.log("get" + libro)
    res.send(libro)
    
})


//calificacion del libro 
app.post("/calificacion", function(req, res){
    console.log(req.body.calificacion)
    
})
/*
/*app.get('/loginperfil' , function(req,res){
    console.log(req.user)
    Usuario.findOne({
        where:{mail:req.user.username}
    }).then(user =>{
       res.send(JSON.stringify(user))
    })
})*/

app.listen(3000, function(){
    console.log("server listening ")
})
