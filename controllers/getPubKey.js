const fs = require('fs-extra');
const path = require('path');

let pubKey = null;

const getPublicKey = async () => {

    if (!pubKey) {
        // const keyPath = path.join(__dirname, '../../keys/pub.key');
        const keyPath = path.join(__dirname, '../keys/pub.key');
        pubKey = await fs.readFile( keyPath, 'utf-8'); 
    }
    console.log('12 - pubKey', pubKey)
    return pubKey;
};

module.exports = getPublicKey;