import { response } from "express";
import Jwt from "jsonwebtoken";
import auth from "../../../../config/auth.js";

export default (request, response, next) => {
  const authToken = request.headers.authorization // Pega o token
  console.log("Token Chegou:",authToken)
  if(!authToken){
    return response.status(401).json({  error: "token not provided"  })
  }
// token so obten a posiçao 1 
  const token = authToken.split(' ')[1] // split cria item no arrem toda vez que encontrar um espaço. ele aceita outros tipos
  
  try{
    Jwt.verify(token, auth.secret, function(err, decoded){ // Verifica se o token e falido e entao envia para decoded
      if(err){
        throw new Error() // ele joga automaticamente para o cath
      }
      request.userId = decoded.id  // toda request de toda a aplicaçao nao impotando de qual arquivo, contera essas informaçoes.
      request.userName = decoded.name // toda request de toda a aplicaçao nao impotando de qual arquivo, contera essas informaçoes.
      console.log(decoded)
      
    })
  } catch(err) {
    return response.status(401).json({ error: "Token is invalid" })
  }
  console.log('AAAAAAAAAAAAAAA')
   return next() // Faz continuar o fluxo da aplicaçao da qilo que estiver abaixo da chamada dessa funçao
}