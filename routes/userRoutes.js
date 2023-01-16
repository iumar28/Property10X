const express = require('express')
const User = require('../models/user')
const router = express.Router();

const Jwt=require('jsonwebtoken')
const jwtkey = 'e-commerce'

const app = express();

app.use(express.json())

router.post("/register", async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save();

    result = result.toObject();
    delete result.password

        Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                resp.send({ result: 'no token created' });
            }
            resp.send({result,auth:token})
        })
    
})

router.post("/login", async (req, resp) => {
    console.log(req.body)
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if(user){
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send({ result: 'no token created' })
                }
                resp.send({user,auth:token})
            })
        }
        else {
            resp.send({ result: 'no user found' })
        }
        
    }
    else {
        resp.send({ result: 'no user found' })
    }
})
router.post("/logout",async(req,res)=>{
    const logout = () => {
        localStorage.clear();
        navigate('/register')
    }
})
module.exports = router;
