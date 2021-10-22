const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const getPrivateKey = require('./getPrivKey');
const getPublicKey = require('./getPubKey');


// create user profile in db and access token for this user
const createUser = async (name, login, pwd) => {    
    
    const doc = await userModel.create({
        name,                                  // get names from schema cells
        auth: {
            login,
            pwd
        }
    });
    
    const profile = {
        id: doc._id,
        name: doc.name
    };

    const accessToken = await createAccessToken(profile);
    
    return {status: 'ok', payload: { profile, accessToken }};
};


// check there is user email in db
const checkEmail = async (login) => {
    const doc = await userModel.findOne({ 'auth.login': login });
    
    // if there isn't such login return unknown user
    if(doc){
        return { status: 'email already declarated'};
    };

    return {status: 'ok'};
}

// check user in db by pwd and login 
const login = async (login, pwd) => {
    const doc = await userModel.findOne({ 'auth.login': login });
    
    // if there isn't such login return unknown user
    if(!doc){
        return { status: 'unknown user'};
    };

    // if there is login => check password
    const check = doc.checkPwd(pwd); 
    if(!check){
        return { status: 'invalid password'};
    };

    // get user id and user name 
    const profile = {
        id: doc.id,
        name: doc.name
    };

    const accessToken = await createAccessToken(profile);
    return {status: 'ok', payload: profile, accessToken };
};


// creste public key and check user's private key 
const checkAndDecode = async (accessToken) => {
    
    const pubKey = await getPublicKey();
    
    const result = await jwt.verify(accessToken, pubKey, { algorithms: ['RS256'] });
    
    return result;
};


// create access token (private) token for user
const createAccessToken = async (payload) => {
    
    const privKey = await getPrivateKey();
    
    const token = await jwt.sign(
        payload,
        privKey,
        { algorithm: 'RS256' },
    );
    
    return token;
};



module.exports = {
    createUser,
    checkEmail,
    login,
    checkAndDecode
}
