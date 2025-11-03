const User = require("../models/userSchema");
const Game = require("../models/gameSchema");
const Order = require("../models/orderSchema");
const Library = require("../models/librarySchema");
const Wishlist = require("../models/wishlistSchema");
const Publisher = require("../models/publisherSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register function
const register = async (req, res) => {
  try {
    const { firstname, secondname, email, password, alias } = req.body;
    const newUser = await User.findOne({ email });
    const newAlias = await User.findOne({ alias });
    if (newUser) res.status(400).json({ msg: "user exist" });
    else if (newAlias) res.status(400).json({ msg: "choose another alias" });
    else {
      const hashPW = await bcrypt.hash(password, 10);
      const createUser = await User.create({
        firstname,
        secondname,
        email,
        password: hashPW,
        alias,
      });
      const token = jwt.sign(
        { id: createUser._id, role: createUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "15d",
        }
      );
      //initiliazing empty library and wishlist
      await Library.create({
        user: createUser._id,
      });
      await Wishlist.create({
        user: createUser._id,
      });

      res.status(201).json({
        msg: "user created",
        token: token,
       userInfo: {id: createUser._id,
        firstname: createUser.firstname,
        secondname: createUser.secondname,
        email: createUser.email,
        alias: createUser.alias,
      balance:createUser.balance}
      });
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

    const userExist = await User.findOne({ email });
    if (!userExist)
      res.status(400).json({ msg: "user not found ,try to register" });
    else {
      const checkPW = await bcrypt.compare(password, userExist.password);
      if (!checkPW) res.status(400).json({ msg: "wrong password" });
      else {
        const token = jwt.sign(
          { id: userExist._id, role: userExist.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "15d",
          }
        );
        res.status(201).json({
          msg: "login successful! ",
          token: token,
          userInfo:{id: userExist._id,
          firstname: userExist.firstname,
          secondname: userExist.secondname,
          email: userExist.email,
          alias: userExist.alias,
          balance:userExist.balance}
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "OUPs something went wrong", error: error.message });
  }
};

//get user data function
const getUserData = async (req, res) => {
  try {
   
    const user = await User.findOne(
      { _id: req.userId },
      "firstname secondname alias email createdAt updatedAt balance"
    );
    if (!user)
      res.status(400).json({ msg: "user does not exist try to register" });
    else {
      res.status(200).json({ msg: "user info success", userData: user });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "OUPs something went wrong", error: error.message });
  }
};

//get games function
const getGame = async (req, res) => {
  try {
    const games = await Game.find(
      {},
      "title price description releasedate genre publisher image"
    ).populate("publisher", "companyname description").populate("genre","title");
    res.status(201).json({ msg: "get all games", games: games });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "OUPs something went wrong", error: error.message });
  }
};

//create order function
const createOrder = async (req, res) => {
  try {
    
    const userExist = await User.findOne({ _id:req.userId });
    if (!userExist)
      {return res.status(400).json({ msg: "user not found ,try to register" })}

    

    const { gameList } = req.body;
    const gamesToBuy = await Game.find(
      { _id: { $in: gameList } },
      "price publisher"
    ).populate("publisher", "_id ");
    const userLibrary=await Library.findOne({user:req.userId},("games"))
    
    if((gameList.some(elem => userLibrary.games.includes(elem)))){
      
      return res.status(400).json({msg:"one or multiple games are already in user library!!!"})
    }

    const userBalance = await User.findOne({ _id: req.userId }, "balance");
    const totalPrice = gamesToBuy.reduce((sum, game) => sum + game.price, 0);
    if (userBalance.balance <= totalPrice) {
      res.status(400).json({ msg: "user balance is not enough" });
    } else {
      //order creation for logs only to admins
      const newOrder = await Order.create({
        user: req.userId,
        games: gameList,
        totalPrice: totalPrice,
      });
//removing the price of total games from user balance
      const newUserbalance = await User.findOneAndUpdate(
        { _id: req.userId },
        { $inc: { balance: -totalPrice } },
        { new: true }
      );
//adding the balance spent by the user to each publisher owned by the game that has been bought
      for (const element of gamesToBuy) {
        const price = element.price;
        await Publisher.findOneAndUpdate(
          { _id: element.publisher._id },
          { $inc: { balance: price } },
          { new: true }
        );
      }
      //function so that the games that are ordered get added to the library of the user
      
      let newUserLibrary=userLibrary.games.concat(gameList)
      await Library.findOneAndUpdate(
        { user: req.userId },
        { $addToSet:{games:newUserLibrary} },
        { new: true, upsert: true }
     )


      res.status(201).json({ msg: "order sent!!", order:newOrder,newUserBalance:newUserbalance.balance });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "OUPs something went wrong", error: error.message });
  }
};

//get order function
const getUserOrder = async (req, res) => {
  try {
    const userOrder = await Order.find({ user: req.userId }).populate("games");
    res
      .status(201)
      .json({ msg: "all user orders found", userOrder: userOrder });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "OUPs something went wrong", error: error.message });
  }
};

//get library function
const getUserLibrary = async (req, res) => {
  try {
    const userId = req.userId;
    const userLibrary = await Library.findOne(
      { user: userId },
      "games"
    ).populate("games", { publisher: 0 });
    res.status(201).json({ msg: "user Library found", userLibrary: userLibrary });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "OUPs something went wrong", error: error.message });
  }
};

//get wishlist function
const getUserWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const userWishlist = await Wishlist.findOne(
      { user: userId },
      "games"
    ).populate("games", { publisher: 0 });
    res
      .status(201)
      .json({ msg: "user Wishlist found", userWishlist: userWishlist });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "OUPs something went wrong", error: error.message });
  }
};

//add free games to library function
const updateUserLibrary = async (req, res) => {
  try {
    const userId = req.userId;
    const { gameId } = req.body;
    const game = await Game.findById(gameId);
    const user = await User.findById(userId);
    if (!game || !user) {
      return res.status(404).json({ error: "Game or user not found" });
    }
    //check if the game is not free
    else if(
      game.price>0
    ){
      return res.status(404).json({ error: "please order the game first to add it to library" });
    }
    //MIGHT NEED TO ADD A CHECK IF THE GAME ALREADY IN LIBRARY
    //DUPLICATION WIL NOT HAPPEN THANKS TO ADDTOSET BUT
    //STILL IT DEPENDS ON THE FRONT END
    else {
      const userLibrary = await Library.findOneAndUpdate(
        { user: userId },
        { $addToSet: { games: gameId } },
        { new: true, upsert: true }
      );
      res
        .status(201)
        .json({ msg: `game added to library successfully ${gameId}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "OUPs something went wrong", error: error.message });
  }
};

//update wishlist function
const updateUserWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { gameId } = req.body;
    const game = await Game.findById(gameId);
    const user = await User.findById(userId);
    if (!game || !user) {
      return res.status(404).json({ error: "Game or user not found" });
    }
    //MIGHT NEED TO ADD A CHECK IF THE GAME ALREADY IN LIBRARY
    //DUPLICATION WIL NOT HAPPEN THANKS TO ADDTOSET BUT
    //STILL IT DEPENDS ON THE FRONT END
    else {
      const userWishlist = await Wishlist.findOneAndUpdate(
        { user: userId },
        { $addToSet: { games: gameId } },
        { new: true, upsert: true }
      );
      res
        .status(201)
        .json({ msg: `game added to wishlist successfully ${gameId}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "OUPs something went wrong", error: error.message });
  }
};

module.exports = {
  register,
  login,
  getUserData,
  getGame,
  createOrder,
  getUserOrder,
  getUserLibrary,
  getUserWishlist,
  updateUserLibrary,
  updateUserWishlist,
};
