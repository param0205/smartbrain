const express=require('express')
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors = require('cors');
const knex= require('knex');
const register=require('./controller/register') ;
const signin=require('./controller/signin') ;
const profile=require('./controller/profile') ;
const image =require('./controller/image');

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', 
    user : 'postgres',
    password : 'gandhi02',
    database : 'smartbrain'
  }
});

const app=express();

app.use(bodyParser.json());
app.use(cors());





app.get('/',(req,res)=>{res.send('it is working !')})
app.post('/signin',(res,req)=>{signin.handleSignin(res,req,bcrypt,db)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id' ,(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image' ,(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl' ,(req,res)=>{image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is running on port ${process.env.PORT}`)
});

 
