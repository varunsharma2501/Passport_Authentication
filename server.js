const express=require("express");
const app=express();
const flash=require('express-flash');
const session=require('express-session');
const passport=require('passport')
// const path = require('path');

const userRoute=require('./routes/user');


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));

app.use(flash());
app.use(session({
    secret:"My name is varun",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());


app.get("/",checkAuthenticated,(req,res)=>{
    res.send("Home page")
})

app.use('/user',userRoute);

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated( )){
        return next();
    }
    else{
        res.redirect('/user/login');
    }
}

app.listen(3000,()=>{
    console.log("listening on 3000 port")
})
