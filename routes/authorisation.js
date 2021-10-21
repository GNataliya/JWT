const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const router = express.Router();

const authCtrl = require('../controllers/authorisation.js');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('login');
});

router.post('/login', upload.none(), async (req, res) => {
    
    const { login, pwd } = req.body;

    const result = await authCtrl.login(login, pwd);
    console.log('11 - rout', result)
    const { profile, accessToken } = result.payload;
    // console.log('12 - rout', profile, accessToken)
    if([ 'unknown user', 'invalid password' ].includes(result.status)){
        res.json({ status: 'fail authorisation'});
        return;
    }

    res.json({ status: 'ok', user: profile, accessToken });
});

// // for checking user key on every page and auth user
router.post('/checkUserToken', upload.none(), async (req, res) => {
    
    const accessToken = req.body;    // get user id in session
    console.log('req.body', req.body)
    console.log('checkAndDecode', accessToken, typeof(accessToken))
    
    // if there isn't user token
    // if(!accessToken){                           
    //     res.json({ status: 'unauthorisate'});
    //     return;
    // }

    const checkResult = await authCtrl.checkAndDecode(accessToken); // check privateKey by PublicKey    
    console.log('12 - result', checkResult)
    // res.json({ status: 'ok', payload: checkResult })
    
});

// router.post('/logout', (req, res) => {
//     //res.render('logout');
// });

// create user doc in db
router.post('/signup', upload.none(), async (req, res) => {
   
    const { name, login, pwd } = req.body;
    // console.log('1 - get from front', name, login, pwd)

    const isEmail = await authCtrl.checkEmail(login);
    //console.log('checkEmail', isEmail);
   
    if (isEmail.status === 'email already declarated'){
        res.json({ status: 'dublicate_email' })
        return;
    };

    const createNewUser = await authCtrl.createUser( name, login, pwd );
    console.log('10 - createNewUser', createNewUser)
    // session.uid = createNewUser.id;
    const id = createNewUser.payload.doc._id;
    const userName = createNewUser.payload.doc.name;
    const { accessToken } = createNewUser.payload;
    
    res.json({ status: 'ok', user: id, userName, accessToken  });
});


module.exports = router;
