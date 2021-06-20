const {response} = require('express');
const User= require('../models/user');
const bcrypt= require('bcryptjs');

const postUser=async(req, res)=> {    
    const {name,email,role,password}= req.body;
    const user = new User({name,email,role,password});
    //Encriptar en BD
     const salt = bcrypt.genSaltSync();
     user.password=bcrypt.hashSync(password,salt);
    //Guardar en BD
    await user.save();    
    res.json({
        msg:'post api',
        user
    })
}

module.exports= {
    postUser
}

