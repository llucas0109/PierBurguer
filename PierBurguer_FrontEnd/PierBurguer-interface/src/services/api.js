import axios from "axios"; // Axios serve para acessar o back end e trocar informaçoes.

const apiPierBurguer = axios.create({ // cria uma nova instancia de configuraçoes personalizaveis.
  baseURL:'http://localhost:3001'  // url que o axios se conectara 
})

// apiPierBurguer.interceptors intercepta a request ou response.
apiPierBurguer.interceptors.request.use(async config =>{  // Intercepta antes de enviar alguma coisa 

  const userData = await localStorage.getItem('NomeDaMykay:paraidentificar')
  const token = userData && JSON.parse(userData).token  // Se ele encontrar userData ele le o JSON.parse(userData).token se nao nao.
  config.headers.authorization = `Bearer ${token}` // Adiciona o Token no Cabeçalho de autorizaçao HTTP.
  // console.log("Interceptaçao comcluida");
  return config
})


export default apiPierBurguer