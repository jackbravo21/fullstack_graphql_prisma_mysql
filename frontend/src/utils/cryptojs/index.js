import CryptoJS from "crypto-js";
//npm install crypto-js;

const dataDefault = "localData";
const defaultSecretKey = "BaTaTaFrItA_123";              //CUIDADO: NÃO ARMAZENAR CHAVES SECRETA NO FRONTEND;


//Função para criptografar;
export function encryptData(data = dataDefault, secretKey = defaultSecretKey) {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

//Função para descriptografar;
export function decryptData(encryptedData, secretKey = defaultSecretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);       //Retorna a string descriptografada;
}

/*
// Exemplo de uso
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
Usando SubtleCrypto (API nativa do navegador):
O SubtleCrypto é uma API nativa do navegador para criptografia, mais robusta e segura. Porém, ela é mais complexa de usar em comparação com a biblioteca crypto-js.

Aqui está um exemplo básico de como usar a API SubtleCrypto para criptografia simétrica:

javascript
Copiar código
// Função para gerar uma chave de criptografia
async function generateKey() {
    return await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// Função para criptografar
async function encryptData(data, key) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Vetor de inicialização (IV)
    
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encodedData
    );
    
    return { encryptedData, iv };
}

// Função para descriptografar
async function decryptData(encryptedData, iv, key) {
    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encryptedData
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
}

// Exemplo de uso
async function example() {
    const key = await generateKey();
    
    const dataToEncrypt = JSON.stringify({
        id: user.id,
        mail: user.mail,
        fullname: user.fullname,
        administrator: user.administrator,
    });

    // Criptografando
    const { encryptedData, iv } = await encryptData(dataToEncrypt, key);
    
    // Você precisaria salvar `encryptedData` e `iv` em algum lugar, como em um cookie
    console.log(encryptedData);
    
    // Descriptografando
    const decryptedData = await decryptData(encryptedData, iv, key);
    console.log(decryptedData);
}

example();

*/

//////////////////////////////////////////////////////////////

/*
//Outro Exemplo:

1. Criptografando os dados no frontend após receber a resposta no Saga:

No seu Saga:

import CryptoJS from "crypto-js";

// Após obter a resposta do backend (como o login)
function* handleLoginSuccess(action) {
    const userData = action.payload;  // Dados do usuário retornados do backend

    // Criptografar os dados do usuário
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), 'suaChaveSecreta').toString();
    
    // Salvar no cookie (não use HttpOnly aqui porque estamos acessando via JavaScript)
    document.cookie = `userData=${encryptedData}; path=/; max-age=${60 * 60 * 3}`;  // 3 horas
    yield put({ type: "LOGIN_SUCCESS", payload: userData });
}



2. Descriptografando o cookie para obter os dados do usuário:

Na verificação do estado de login (quando a página for carregada):

import CryptoJS from "crypto-js";

// Função para recuperar e descriptografar os dados do cookie
function getUserDataFromCookie() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('userData='));
    if (cookie) {
        const encryptedData = cookie.split('=')[1];
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, 'suaChaveSecreta');
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;  // Retorna os dados do usuário
        } catch (error) {
            console.error("Erro ao descriptografar o cookie:", error);
            return null;
        }
    }
    return null;
}

// Exemplo de como usar a função
const userData = getUserDataFromCookie();
if (userData) {
    // O usuário está logado, use os dados para mostrar o conteúdo
} else {
    // O usuário não está logado
}

*/