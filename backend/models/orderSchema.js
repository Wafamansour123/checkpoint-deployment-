const mongoose =require('mongoose')

const orderSchema= mongoose.Schema({
    user: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'User', 
        required: true 
    },

    games: [
        {
             type: mongoose.SchemaTypes.ObjectId, ref: 'Game', required: true 
        }
    ],

    totalPrice: { type: Number, required: true, min: 0 }, 
    
},
{timestamps: true}
)
const Order = mongoose.model("Order",orderSchema)
module.exports=Order