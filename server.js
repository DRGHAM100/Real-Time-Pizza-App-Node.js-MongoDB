const express = require('express');
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = 3000;


app.use(express.static('public'));


app.use(expressLayouts);
app.set('views',path.join(__dirname,'resources/views'));
app.set('view engine','ejs');
app.set('layout','./layouts/main');


app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/cart',(req,res)=>{
    res.render('customers/cart');
});

app.get('/login',(req,res)=>{
    res.render('auth/login');
});

app.get('/register',(req,res)=>{
    res.render('auth/register');
});



app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
});