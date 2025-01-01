
//Validação do email;
export const validateMail = (mail) => {
//^[^\s@]+@[^\s@]+\.[^\s@]+$ é uma expressão regular que verifica se o email tem o formato "parte@dominio.extensao";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(mail) || mail.length < 6) {
        console.log("Não é um email válido!");
        return("Não é um email válido!");
    }
    return true;
}

export const validatePassword = (password) => {
    const hasLetters = /[A-Za-z]/;          //Verifica se contem uma letra;
    const hasNumbers = /\d/;                //Verifica se contem um numero;

    //Verifica se a senha contém letras;
    if(!hasLetters.test(password)){
        console.log("A senha deve conter pelo menos uma letra!");
        return("A senha deve conter pelo menos uma letra!");
    }
    //Verifica se contém números;
    if(!hasNumbers.test(password)){
        console.log("A senha deve conter pelo menos um número!");
        return("A senha deve conter pelo menos um número!");
    }
    //Verifica o tamanho mínimo;
    if(password.length < 6){
        console.log("A senha deve ter no mínimo 6 caracteres!");
        return("A senha deve ter no mínimo 6 caracteres!");
    }
    return true;
}

export const validateImageFile = (file) => {
    // Regex para extensões de imagens válidas
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|JPG|JPEG|PNG|GIF|BMP)$/i; // "i" torna o regex case insensitive
    if (!imageRegex.test(file.name)) {
        console.log("O arquivo não é uma imagem válida!");
        return("O arquivo não é uma imagem válida!");
    }
    return true;
};