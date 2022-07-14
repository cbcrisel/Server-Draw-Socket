const {Schema,model} = require('mongoose');

const userSchema= Schema({
   name:{
       type: String,
       required: [true, 'El nombre es obligatorio']
   },
   email:{
    type: String,
    required: [true, 'El email es obligatorio'],
    unique:true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    status:{
        type: Boolean,
        default: true, 
    }
})

module.exports= model('User',userSchema);