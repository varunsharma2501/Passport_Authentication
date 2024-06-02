const express=require('express');
const router=express.Router();
const User=require("../models/user");
const passport=require("passport");
const initializePassport=require("../passportConfig");

initializePassport(passport);

router.get('/signup',(req,res)=>{
    return res.render("signup");
})

router.get('/login',(req,res)=>{
    return res.render("login")
})

router.post('/signup',async (req,res)=>{

    const user=await User.findOne({username:req.body.username});
    if(user){
        return res.status(400).send("User already exists");
    }

    const {username,password,email}=req.body;
    try{
        const newUser=new User({
            username,
            email,
            password
        })
        await newUser.save();
        res.redirect("/user/login");
    }catch(err){
        console.log(err);
        res.status(500).send("Error signing in");
    }
}) 

router.post('/login',passport.authenticate("local",{failureRedirect:"/user/login",successRedirect:"/",failureFlash:true}),async (req,res)=>{

}) 

router.get("/logout",function(req,res){
    req.logout(function(err){
      if(err){
        return next(err);
      }
      res.redirect('/');
    });
  })
  
module.exports=router;