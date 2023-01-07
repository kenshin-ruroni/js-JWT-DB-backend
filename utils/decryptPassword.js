const SHA256 = require("crypto-js/sha256");
const encodeBase64 = require("crypto-js/enc-base64");



function decryptPassword(token,salt,hash,password){

    const hashToCompare = SHA256(salt+password).toString(encodeBase64);

    console.log("decryptPassword    "+password);
console.log("decryptPassword    hash "+hashToCompare);

    return (hashToCompare === hash) ? token : null;
}

module.exports = decryptPassword;