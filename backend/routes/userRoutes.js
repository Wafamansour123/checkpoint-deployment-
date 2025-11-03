const router = require("express").Router();
const {
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
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

//get games
router.get("/getallgames", getGame);

//user register and login
router.post("/register", register);
router.post("/login", login);

//user info
router.get("/getuserdata", authMiddleware, getUserData);

//user orders
router.post("/createorder", authMiddleware, createOrder);
router.get("/getuserorder", authMiddleware, getUserOrder);


//user library and wishlist
router.get("/getuserlibrary", authMiddleware, getUserLibrary);
router.get("/getuserwishlist", authMiddleware, getUserWishlist);
router.put("/updateuserlibrary", authMiddleware, updateUserLibrary);
router.put("/updateuserwishlist", authMiddleware, updateUserWishlist);

module.exports = router;
