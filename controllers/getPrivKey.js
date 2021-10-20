const fs = require('fs-extra');
const path = require('path');

let privKey = null;

// create private key for user if he does'n have
const getPrivateKey = async () => {

    if (!privKey) {
        // const keyPath = path.join(__dirname, '../../keys/priv.key');
        const keyPath = path.join(__dirname, '../keys/priv.key');   
        privKey = await fs.readFile( keyPath, 'utf-8'); 
    }
    // console.log('6 - privKey', privKey)
    return privKey;
};

module.exports = getPrivateKey;