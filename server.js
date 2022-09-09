const express = require('express');
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    res.render('home');
});

app.use(express.static('public'));


app.use(expressLayouts);
app.set('views',path.join(__dirname,'resources/views'));
app.set('view engine','ejs');



app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
});