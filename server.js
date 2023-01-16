const express = require("express")
const connectDB = require("./config/conn")

const morgan = require("morgan")
const app = express();



// connection

connectDB()


app.use(express.json())


app.use(morgan('dev'))
app.use('/api/prop',require("./routes/propertyRoute"))

app.get('/',(req,res)=>{
    res.send("hi bhain")
})

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log("server listening on port 8000")
})


