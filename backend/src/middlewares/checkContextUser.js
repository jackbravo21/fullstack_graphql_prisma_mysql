const checkAuth = (context) => {
    if(!context.user) {
      //console.log("CheckAuth: ", context.user);
      throw new Error("UNAUTHORIZED: Acesso negado! Você precisa estar logado.");
    }
}

module.exports = { checkAuth };