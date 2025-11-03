const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors')
require("dotenv").config();

app.use(express.json())
app.use(cors())
const dbURI=process.env.Mongo_URI;
const PORT=process.env.PORT;


//database connection 
mongoose.connect(dbURI)
.then(()=>console.log("database connected"))
.catch((err)=>console.log(err));


//user routes config
app.use("/api/user",require("./routes/userRoutes"))
//publisher routes config
app.use("/api/publisher",require("./routes/publisherRoutes"))
//admin routes config
app.use("/api/admin",require("./routes/adminRoutes"))



app.listen(PORT,()=>console.log("my server running on port",PORT))



