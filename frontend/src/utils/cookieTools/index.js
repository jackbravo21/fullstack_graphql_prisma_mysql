const nameCookieDefault = "localKey";
const localDataDefault = "localData";
const timeToLiveDefault = 60 * 60 * 3;      //3 horas;

//Salvo no cookie, sem HttpOnly;
export function createCookie(nameCookie = nameCookieDefault, localData = localDataDefault, timeToLive = timeToLiveDefault) {
    document.cookie = `${nameCookie}=${localData}; path=/; max-age=${timeToLive}`;
}

//Função para obter o valor do cookie;
export function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length === 2) return parts.pop().split(';').shift();
    return null;
}




/*

Explicacao do getCookie:

- const value = `; ${document.cookie}`:
document.cookie: Retorna uma string com todos os cookies disponíveis no formato cookie1=valor1; cookie2=valor2; ....
**const value = \;\ ${document.cookie}`**: Adiciona um ; ` no início da string. Isso facilita a busca por um cookie específico, garantindo que o nome do cookie seja encontrado mesmo se estiver no início da string.

- const parts = value.split(`; ${name}=`);
**value.split(\;\ ${name}=`)**: Divide a string no ponto onde encontra ; nome_do_cookie=`.

- if (parts.length === 2) return parts.pop().split(';').shift();
    parts.length === 2: Verifica se o cookie foi encontrado. Se sim:
    parts.pop(): Pega a última parte do array (a parte com o valor do cookie e possivelmente outros cookies concatenados).
    .split(';'): Divide essa parte onde há ; (no caso de outros cookies estarem concatenados).
    .shift(): Pega o primeiro elemento, que é o valor do cookie desejado.

- return null;
Se o cookie não for encontrado (ou seja, parts.length !== 2), retorna null.

=================

- Uso:
- Se você já criou o cookie com:
document.cookie = `userData=valorExemplo; path=/; max-age=10800`;

- E depois chamar:
const valor = getCookie("userData");
console.log(valor);

- O console exibirá:
valorExemplo
*/