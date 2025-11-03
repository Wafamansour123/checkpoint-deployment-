const Game = require("../models/gameSchema");
const Publisher = require("../models/publisherSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register function
const register = async (req, res) => {
    try {
      const { companyname, email, password,description} = req.body;
      const newPublisher = await Publisher.findOne({ email });
      if (newPublisher) res.status(400).json({ msg: "publisher Already exists, please login" });
      else {
        const hashPW = await bcrypt.hash(password, 10);
        const createPublisher = await Publisher.create({
          companyname,
          email,
          password: hashPW,
          description
        });
        const token = jwt.sign({ id: createPublisher._id,role:createPublisher.role }, process.env.JWT_SECRET, {
          expiresIn: "15d",
        });
        res
          .status(201)
          .json({ msg: "Publisher created", token: token, id:createPublisher._id,companyname:createPublisher.companyname,email:createPublisher.email, description:createPublisher.description });
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
  
      const publisherExist = await Publisher.findOne({ email });
      
      if (!publisherExist){
        return res.status(400).json({ msg: "publisher not found ,try to register" });
      }
      else {
        const checkPW = await bcrypt.compare(password, publisherExist.password);
        if (!checkPW) res.status(400).json("wrong password");
        else {
          const token = jwt.sign({ id: publisherExist._id,role:publisherExist.role }, process.env.JWT_SECRET, {
            expiresIn: "15d",
          });
          res
            .status(201)
            .json({ msg: "login successful! ", token: token, id:publisherExist._id,companyname:publisherExist.companyname,email:publisherExist.email, description:publisherExist.description, role:publisherExist.role});
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "OUPs something went wrong", error: error.message });
    }
  };
  
  //get publisher data function
  const getPublisherData = async (req, res) => {
    try {
      const publisher = await Publisher.findOne({ _id: req.publisherId },("companyname email description createdAt updatedAt"));
      
      if (!publisher)
        res.status(400).json({ msg: "publisher does not exist try to register" });
      else
      {res.status(200).json({ msg: "publisher info success", publisher: publisher });}
    } catch (error) {
      res
        .status(500)
        .json({ msg: "OUPs something went wrong", error: error.message });
    }
  };

  //get publisher games function
const getPublisherGames = async (req, res) => {
    try {
      
      const publisher = await Publisher.findOne({ _id: req.publisherId});
      if (!publisher){
        res.status(400).json({ msg: "publisher does not exist try to register" });
      }
      else{
        const games = await Game.find({publisher: req.publisherId}).populate("publisher",{password:0,role:0,createdAt:0,updatedAt:0,email:0});
        res.status(201).json({ msg: "got all publisher  games", games: games });
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "OUPs something went wrong", error: error.message });
    }
  };
  

//create game function
const createGame = async (req, res) => {
    try { 
      const { title, description, price, releasedate, genre,image } =
        req.body;
        const gameExist =await Game.findOne({title:title,publisher:req.publisherId,releasedate:releasedate})
        if (gameExist){
         return res.status(400).json({ msg: "game already exist" });
        }
        const publisherExist = await Publisher.findOne({ _id:req.publisherId });
      
      if (!publisherExist){
        return res.status(400).json({ msg: "publisher not found ,try to register" });
      }
      const newGame = await Game.create({
        title: title,
        description: description,
        price: price,
        releasedate: releasedate,
        genre: genre,
        publisher:req.publisherId, 
        image:image
      });
      res.status(201).json({ msg: `Game created succesfully:${newGame._id}`});
    } catch (error) {
      res
        .status(500)
        .json({ msg: "OUPs something went wrong", error: error.message });
    }
  };



  module.exports = {
    register,
    login,
    getPublisherData,
    getPublisherGames,
    createGame
  };


