const mongoose =require('mongoose')

const wishlistSchema= mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game',
        },
    ],
    
},
{timestamps: true})
const Wishlist = mongoose.model("Wishlist",wishlistSchema)
module.exports=Wishlist