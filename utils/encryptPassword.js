const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encodeBase64 = require("crypto-js/enc-base64");



function encryptPassword(password){
    const token = uid2(16);
    const salt = uid2(16);
    const hash = SHA256(salt+password).toString(encodeBase64);

    console.log("encryptPassword  computed hash "+hash);

    return{token, salt,hash};
}

module.exports = encryptPassword;