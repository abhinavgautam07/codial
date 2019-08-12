const express=require('express');
const router=express.Router();
const newUserController=require('../controllers/new_account_controller');
router.get('/createAccount',newUserController.newAccount);

module.exports=router;



