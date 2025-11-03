const mongoose =require('mongoose')

const publisherSchema= mongoose.Schema({
    companyname: { type: String, required: true,unique:true },
    email:{type:String,required:true},
    password:{type:String,required:true},
    description: { type: String, required:true }, 
    logo: { type: String, required: false },
    role:{ type: String, default:"publisher" },
    balance:{type:Number,default:0}
},
{timestamps: true})
const Publisher = mongoose.model("Publisher",publisherSchema)
module.exports=Publisher