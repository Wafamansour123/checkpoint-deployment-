const User = require("../models/userSchema");
const Game = require("../models/gameSchema");
const Admin = require("../models/adminSchema");
const Library = require("../models/librarySchema");
const Wishlist = require("../models/wishlistSchema");
const Publisher = require("../models/publisherSchema");
const Genre = require("../models/genreSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register function
const register = async (req, res) => {
    try {
      const { email, password} = req.body;
      const newAdmin = await Admin.findOne({ email });
      if (newAdmin) res.status(400).json({ msg: "admin Already exists, please login" });
      else {
        const hashPW = await bcrypt.hash(password, 10);
        const createAdmin = await Admin.create({
          email,
          password: hashPW,
        });
        const token = jwt.sign({ id: createAdmin._id,role:createAdmin.role }, process.env.JWT_SECRET, {
          expiresIn: "15d",
        });
        res
          .status(201)
          .json({ msg: "Admin created", token: token, id:createAdmin._id,email:createAdmin.email});
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "OUPs something went wrong", error: error.message });
    }
  };
  
  //login function
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const adminExist = await Admin.findOne({ email });
      
      if (!adminExist){
        return res.status(400).json({ msg: "admin not found ,try to register" });
      }
      else {
        const checkPW = await bcrypt.compare(password, adminExist.password);
        if (!checkPW) res.status(400).json("wrong password");
        else {
          const token = jwt.sign({ id: adminExist._id,role:adminExist.role }, process.env.JWT_SECRET, {
            expiresIn: "15d",
          });
          res
            .status(201)
            .json({ msg: "login successful! ", token: token, });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "OUPs something went wrong", error: error.message });
    }
  };
  
 



//create multiple games function
const createMultipleGames = async (req, res) => {
    try { 
      const { games } =
        req.body;
    
      for(const game of games)  
      {
        await Game.create({
        title: game.title,
        description: game.description,
        price: game.price,
        releasedate: game.releasedate,
        genre: game.genre,
        publisher:game.publisherId, 
        image:game.image
      });}
      res.status(201).json({ msg: `Games created succesfully`});
    } catch (error) {
      res
        .status(500)
        .json({ msg: "OUPs something went wrong", error: error.message });
    }
  };



  //create multiple genres function
const createMultipleGenres = async (req, res) => {
    try { 
      const { genres } =
        req.body;
    
      for(const genre of genres)  
      {
        await Genre.create({
        title: genre.title,
      });}
      res.status(201).json({ msg: `genres created succesfully`});
    } catch (error) {
      res
        .status(500)
        .json({ msg: "OUPs something went wrong", error: error.message });
    }
  };


    //create multiple users function
const registerMultipleUsers = async (req, res) => {
    try { 
      const { users } =
        req.body;
    
      for(const user of users)  
      {
        const hashPW = await bcrypt.hash(user.password, 10);
        const newUser = await User.create({
            firstname:user.firstname,
            secondname:user.secondname,
            email:user.email,
            password:hashPW,
            alias:user.alias,
            
      });
      
      //initiliazing empty library and wishlist
      await Library.create({
        user: newUser._id,
      });
      await Wishlist.create({
        user: newUser._id,
      });
    
    }
      res.status(201).json({ msg: `Users created succesfully`});
    } catch (error) {
      res
        .status(500)
        .json({ msg: "OUPs something went wrong", error: error.message });
    }
  };

      //create multiple publishers function
const registerMultiplePublishers = async (req, res) => {
    try { 
      const { publishers } =
        req.body;
    
      for(const publisher of publishers)  
      {
        const hashPW = await bcrypt.hash(publisher.password, 10);
        const newPublisher = await Publisher.create({
            companyname:publisher.companyname,
            description:publisher.description,
            email:publisher.email,
            password:hashPW,
            
      });
    
    }
      res.status(201).json({ msg: `Users created succesfully`});
    } catch (error) {
      res
        .status(500)
        .json({ msg: "OUPs something went wrong", error: error.message });
    }
  };



  module.exports = {
    register,
    login,
    registerMultipleUsers,
    createMultipleGenres,
    registerMultiplePublishers,
    createMultipleGames,
  };


