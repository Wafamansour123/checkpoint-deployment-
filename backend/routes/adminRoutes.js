const router = require("express").Router();
const {
    register,
    login,
    registerMultipleUsers,
    createMultipleGenres,
    registerMultiplePublishers,
    createMultipleGames,

} = require("../controllers/adminControllers");
const { adminMiddleware } = require("../middleware/adminMiddleware");

router.post("/register", register);
router.post("/login", login);


router.post("/createmultipleusers",  adminMiddleware, registerMultipleUsers);

router.post("/createmultiplegenres",  adminMiddleware, createMultipleGenres);

router.post("/addmultiplepublishers",  adminMiddleware,registerMultiplePublishers);


router.post("/addmultiplegames",  adminMiddleware, createMultipleGames);



module.exports = router;