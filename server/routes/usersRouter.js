
const router = require('express').Router();

const userController = require('../controllers/controller')



/**
* @desc : get All Users
* @methode GET
*/
router.get('/getAll', userController.getUsers);

router.post('/create', userController.createUser);

router.get('/find/:id', userController.findById);

router.get('/delete/:id', userController.delete);

router.post('/update-user/:id', userController.updateUser);



module.exports = router;


