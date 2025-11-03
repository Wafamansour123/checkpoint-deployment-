const mongoose =require('mongoose')

const userSchema= mongoose.Schema({
    firstname:{type:String,required:true},
    secondname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    alias:{type:String,required:true},
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    balance:{type:Number,default:0}
   

},
{timestamps: true})
const User = mongoose.model("User",userSchema)
module.exports=User