const mongoose =require('mongoose')

const librarySchema= mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    games: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Game',
        },
    ]
},
{timestamps: true})
const Library = mongoose.model("Library",librarySchema)
module.exports=Library