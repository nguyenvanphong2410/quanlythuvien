const bcrypt = require("bcrypt");


// generatePassword
async function generatePassword(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// comparePassword
async function comparePassword(password,passwordHash){
    const validPassword = await bcrypt.compare(password, passwordHash);
    if (validPassword) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    generatePassword,
    comparePassword
};