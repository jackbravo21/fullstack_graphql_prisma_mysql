import CryptoJS from "crypto-js";
//npm install crypto-js;

//Chave secreta;
const defaultSecretKey = "BaTaTaFrItA_123";                  //CUIDADO: NÃO ARMAZENAR CHAVES SECRETA NO FRONTEND;

//Função para criptografar;
export function encryptData(data, secretKey = defaultSecretKey){
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

//Função para descriptografar;
export function decryptData(encryptedData, secretKey = defaultSecretKey){
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);           //Retorna a string descriptografada;
}

//Exemplo de uso;
/*
const secretKey = "minhaChaveSecreta"; // CUIDADO: NÃO ARMAZENAR CHAVES SECRETA NO FRONTEND

const dataToEncrypt = JSON.stringify({
    id: user.id,
    mail: user.mail,
    fullname: user.fullname,
    administrator: user.administrator,
});

// Criptografando
const encryptedData = encryptData(dataToEncrypt, secretKey);

// Armazenando no cookie
document.cookie = `userData=${encryptedData}; path=/; max-age=3600`;

// Recuperando do cookie
const cookie = document.cookie.split("; ").find(row => row.startsWith("userData="));
if (cookie) {
    const encryptedCookie = cookie.split("=")[1];
    
    // Descriptografando
    const decryptedData = decryptData(encryptedCookie, secretKey);
    const userData = JSON.parse(decryptedData);

    console.log(userData);
}
*/