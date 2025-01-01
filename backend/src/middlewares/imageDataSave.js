const fs = require('fs');
const path = require('path');
const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
const crypto = require('crypto');

const generateUniqueFileName = (originalName) => {
    //Cria um nome randomico para o arquivo;
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    const lastFive = originalName.slice(-5);
    const randomBytes = crypto.randomBytes(4).toString('hex');
    return `${uniqueSuffix}`+`${randomBytes}`+`${lastFive}`;
};

const imageDataSave = async(imageFile) => {

//Desestruturando informações do arquivo recebido
const { createReadStream, filename } = await imageFile;
const extension = filename.split('.').pop().toLowerCase();

//Validação de extensão
if (!allowedExtensions.includes(extension)) {
  console.error("Erro: Arquivo inválido. Apenas imagens são permitidas!");
  throw new Error("Arquivo inválido. Apenas imagens são permitidas!");
}

//Gerar nome único para o arquivo
const newName = generateUniqueFileName(filename);

//Caminho para salvar o arquivo
const uploadDir = path.join(__dirname, '../images');
const filePath = path.join(uploadDir, newName);

//Garantir que o diretório de upload exista
if(!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

//Salvar o arquivo
const stream = createReadStream();
const out = fs.createWriteStream(filePath);
stream.pipe(out);
await new Promise((resolve, reject) => {
  out.on('finish', resolve);
  out.on('error', reject);
});

console.log(`Arquivo salvo com sucesso em: ${filePath}`);

return newName;

}

module.exports = { imageDataSave };