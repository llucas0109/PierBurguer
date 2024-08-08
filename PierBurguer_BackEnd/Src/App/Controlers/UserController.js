/*
// Um controler nao pode ter dois metodos iguais
// se precisar usar o index novameente criase uma nova controler
store = cadastrar / Adicionar
index = listar varios
show = mostra apenas um
updata = atualizar
delete = deletar 
*/
// Depois que recebe uma response que nos criamos ele para de ler o resto do codigo e as outras response
import * as yup from "yup" // Tudo que for so export sera juntado em um yup so.
import { v4 } from "uuid"
import User from "../Models/User.js"
import { response } from "express"

class Usercontroller { 
 async store(request,response){
  const schena = yup.object().shape({  // 'yup.object()' Define que é um objeto, E 'shape' Verifica se o formato.
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    admin: yup.boolean(),
  })

  await schena.isValid(request.body) //  schema.isValid Testa se é valido com os dados de schema se é objeto e se o formato e seus dados E retorna true ou false.
  /* // Quando tudo é tru ele entra no if automaticamente
  if(!(await schema.isValid(request.body))){ 
    return response.status(400).json({error: "Make sure your date is correct"})
  } */

  // 'try catch' try Conssegue pegar o erro e enviar como propriedade do catch.  
  try{ 
    // abortEarly: false  faz aparecer todos os erros invez de somente um
    await schena.validateSync(request.body,{ abortEarly: false }) // 'schena.validateSync' ve se é valido e se nao for dá como returna os erros que aparareceram
  } 
  catch(err){
    return response.status(400).json({error: err.errors})
  }

  const {  name, password, email, admin } = request.body

  const userExist = await User.findOne({ // findOne vai retornar true ou false
    where: { email }, // 'where:{}' Determina o que deve procurar
  })
  
  // Quase tenhamos algum tipo de dado negativo(null undefined etc) ele nao entra e se tiver qualquer um dos tipos de dados positivo ele entra no if.
  if(userExist){
    return response.status(409).json({ error: "User already exists" })
  }

  const user = await User.create({ // create' Cria os dados se condizerem...
    id:v4(),
    name,
    email,
    password,
    admin,

  })

 return response.status(201).json( { id : user.id,
 name,
 email, })
  }
}
export default new Usercontroller()  // new Usercontroller = instanciando( Cria ralmente para poder ser usado ). e com () = garante  que so poderam manipular essa instancia sem criar ou modificala novamente.
// Quando A expotaçao é por default Podemos definir qualquer nome na importaçao. e se ta dando so um export dev por {nome} e o nome por q seja so uma coisa.
