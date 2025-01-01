function getCurrentDateTime(){
    // Obtendo o dia, mês, ano, horas, minutos e segundos
    const now = new Date();               // Dia do mês (1-31)
    const day = now.getDate();            // Dia do mês (1-31)
    const month = now.getMonth() + 1;     // Mês (0-11) - adicionamos 1 para ficar no formato 1-12
    const year = now.getFullYear();       // Ano completo (ex: 2023)
    const hours = now.getHours();         // Horas (0-23)
    const minutes = now.getMinutes();     // Minutos (0-59)
    const seconds = now.getSeconds();     // Segundos (0-59)

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

module.exports = getCurrentDateTime;