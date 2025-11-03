const router = require("express").Router();
const {
  register,
  login,
  createGame,
  getPublisherData,
  getPublisherGames
} = require("../controllers/publisherController");
const { publisherMiddleware } = require("../middleware/publisherMiddleware");

//get games created by publisher
router.get("/getpublishergames",publisherMiddleware, getPublisherGames);

//publisher register and login
router.post("/register", register);
router.post("/login",login);

//publisher info
router.get("/", publisherMiddleware, getPublisherData);

//publisher create game
router.post("/creategame", publisherMiddleware, createGame);



module.exports = router;