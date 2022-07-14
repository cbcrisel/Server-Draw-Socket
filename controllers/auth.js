const {response, request}= require('express');
const User = require('../models/user');
const bcryptjs= require('bcryptjs');
const {generateJWT} =require('../helpers/generate-jwt');

const login=async(req=request,res=response)=>{
    const {email,password}=req.body
    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:'Usuario No Existe'
            })
        }

        if(!user.status){
            return res.status(400).json({
                msg:'El usuario no esta activo'
            })
        }
        const validPassword = bcryptjs.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario/ Contraseña no son correctos - password'
            });
        }
        const token = await generateJWT(user.id);

        res.json({
           user,
           token
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg:'Server Error'
        })
    }
}



module.exports={
    login
}