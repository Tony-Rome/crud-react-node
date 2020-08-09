const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
//crear servidor
const app = express();

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
	const existe = whitelist.some( dominio => dominio === origin);
    if(existe){
   	callback(null,true) 
    }else{
   	callback(new Error('No permitido por CORS')) 
    }
 }
}
//habilita cors con lista limitada permitida
app.use(cors(corsOptions));
//habilita cors para cualquier peticion
//app.use(cors());

mongoose.Promise = global.Promise 
mongoose.connect('mongodb://localhost/veterinaria',{
  	useNewUrlParser: true,
  	useUnifiedTopology: true,
  	useFindAndModify: false 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes()); //invoca la funciona del index.js

//puerto para servidor
app.listen(4000,() => {
	console.log("app arrancando"); 
})
