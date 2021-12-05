
const router = require('express').Router();

const renderServices = require('../services/renderService');



/**
 * @desc : Authentification Page
 * @methode GET
 */
router.get('/', renderServices.getLogin);

router.get('/administration', renderServices.getAcc);

router.get('/chat-room', renderServices.getChatRoom);

router.get('/users', renderServices.getListeUsers);
router.get('/add-user', renderServices.addUser);
router.get('/update/:id', renderServices.updateUser);


router.get('/logout', renderServices.logout);



/**
 * @desc : Authentification Page
 * @methode GET
 */
router.post('/login', renderServices.login);








module.exports = router;


