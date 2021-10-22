const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const getPrivateKey = require('./getPrivKey');
const getPublicKey = require('./getPubKey');


// create user profile in db and access token for this user
const createUser = async (name, login, pwd) => {    // name
    // console.log('2 - back create', name, login, pwd)
    const doc = await userModel.create({
        name,                                  // get names from schema cells
        auth: {
            login,
            pwd
        }
    })
    // console.log('3 - doc', doc)
    
    const profile = {
        id: doc._id,
        name: doc.name
    };

    const accessToken = await createAccessToken(profile);
    // console.log('9 - accessToken', accessToken)
    return {status: 'ok', payload: { profile, accessToken }};
    // return profile;
}

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
    //console.log('doc', doc)
    
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

    // return {status: 'ok', payload: { profile }};
    const accessToken = await createAccessToken(profile);
    return {status: 'ok', payload: profile, accessToken };
};

// creste public key and check user's private key 
const checkAndDecode = async (accessToken) => {
    console.log('13 - accessToken', accessToken, typeof(accessToken))
    // const token = await JSON.stringify(accessToken);
    // console.log('13-a - token', token)
    const pubKey = await getPublicKey();
    // console.log('14 - pubKey', pubKey)
    const result = await jwt.verify(accessToken, pubKey, { algorithms: ['RS256'] });
    console.log('15 - result', result)
    return result;
}

// create access token (private) token for user
const createAccessToken = async (payload) => {
    // console.log('4 - payload', payload)
    const privKey = await getPrivateKey();
    // console.log('7 - privKey', privKey);
    const token = await jwt.sign(
        payload,
        privKey,
        { algorithm: 'RS256' },
    );
    // console.log('8 - token', token)
    return token;
}


// //get user profile in db by ID
// const getProfile = async (id) => {
//     const doc = await userModel.findOne({_id: id});
//     console.log('docByIs', doc)    
//     return { status: 'ok', payload: { profile: doc }};
// };



module.exports = {
    createUser,
    checkEmail,
    login,
    checkAndDecode
    // getProfile
}