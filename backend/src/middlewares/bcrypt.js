const bcrypt = require('bcrypt');
const defaultSaltRounds = 10;                  //salts do bcrypt, entre 4-15, recomendado 10;

//se nao for enviado um valor como segundo argumento, vai ser usado como padrao a defaultSaltRounds;
const securePassword = async(userPassword, saltRounds = defaultSaltRounds) => { 
    const userHash = await bcrypt.hash(userPassword, saltRounds);
    return userHash;
};

const comparePassword = async(userPassword, dbPassword) => {
    const compare = await bcrypt.compare(userPassword, dbPassword);
    return compare;
};

module.exports = { securePassword, comparePassword };

