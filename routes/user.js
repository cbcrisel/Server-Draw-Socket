const {Router}= require('express');
const { check } = require('express-validator');
const {  postUser} = require('../controllers/user');
const { isRoleValid, existEmail } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router= Router();

//router.get('/', getUsers );

router.post('/',
[check('name','El nombre es obligatorio').not().isEmpty()] ,
[check('password','El password debe de ser mas de 6 letras').isLength({min:6})] ,
[check('email','El correo no es valido').isEmail()] ,
[check('email').custom((email)=>existEmail(email))] ,
check('role').custom((role)=>isRoleValid(role)),
validateFields,
postUser );


module.exports=router;