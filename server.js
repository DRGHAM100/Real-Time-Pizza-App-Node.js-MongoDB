require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDBStore = require('connect-mongodb-session')(session);



// Database Connection
const url = process.env.DB_URL;
mongoose.connect(url,()=>{
    console.log('Database Connected..');
}).catch(err=>{
    console.log('Connected Failed..');
});

// Session Store
var store = new MongoDBStore({
    uri: url,
    collection: 'sessions'
});

// Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: {maxAge: 100 * 60 * 60 * 24} // 24 hours
}));


app.use(flash());

// Assets
app.use(express.static('public'));
app.use(express.json());

// Global Middleware
app.use((req,res,next)=>{
    res.locals.session = req.session;
    next();
})


// Set Template Engine
app.use(expressLayouts);
app.set('views',path.join(__dirname,'resources/views'));
app.set('view engine','ejs');
app.set('layout','./layouts/main');


require('./routes/web')(app);

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
});