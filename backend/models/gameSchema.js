const mongoose =require('mongoose')

const gameSchema= mongoose.Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    releasedate:{type:Date,required:true},
    image: { type: String ,required:true},
    video:{type: String},
    // Relationships
    genre: [
        { type: mongoose.SchemaTypes.ObjectId, ref: 'Genre',required:true },
    ],
    publisher: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Publisher", 
        required: true,
    }
},
{timestamps: true})
const Game = mongoose.model("Game",gameSchema)
module.exports=Game