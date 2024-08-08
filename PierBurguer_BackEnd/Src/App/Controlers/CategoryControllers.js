import * as yup from 'yup'
import Category from '../Models/Category.js'
import User from '../Models/User.js'

class CategorysControllers {
  async store(request,response){
    const schema = yup.object().shape({
      name: yup.string().required(),
    })

    try{
      await schema.validateSync(request.body), { abortEarly: false }  // abortEarly: false diz que ele deve acumular todos os erros
    } catch(err) {
      return response.status(400).json({error: err.errors})
    }
    // filename È  basicamente o nome do arquivo
    
    const { admin : isAdmin} = await User.findByPk(request.userId)  // 'findByPk(request.userId)' encontra o user pelo id

   if(!isAdmin){
    return response.status(401).json()
   }

    const { name } = request.body

    const { filename:path } = request.file // recebendo o arquivo file

     const categoryExist = await Category.findOne({
      where: {
        name,
      }
    })

    if(categoryExist){
      return response.status(400).json({ error: "category already exist" })
    }

    const { id } = await Category.create({ name, path })

     return response.json({ name, id })
  }
  async index(request,response){
    const category = await Category.findAll() // findAll Procura e lista todos os itens da lista
    console.log(request.userId)
    return response.json(category)
  }
  async update(request,response){
    const schema = yup.object().shape({
      name: yup.string(),
    })

    try{
      await schema.validateSync(request.body), { abortEarly: false }  // abortEarly: false diz que ele deve acular todos os erros
    } catch(err) {
      return response.status(400).json({error: err.errors})
    }
    // filename È  basicamente o nome do arquivo
    
    const { admin : isAdmin} = await User.findByPk(request.userId)  // 'findByPk(request.userId)' 

   if(!isAdmin){
    return response.status(401).json()
   }

    const { name } = request.body

    const { id } = request.params

    const category = await Category.findByPk(id)

    if(!category){
      return response.status(401).json({ error : "Make sure if your ID is Correct" })
    }

    let path

    if(request.file){
      path = request.file.filename  // pegando o Nome do arquivo 
    }

    await Category.update({ name, path }, { where: { id } })

     return response.status(200).json()
  }
}

export default new CategorysControllers()


// Posso colocar o await e o response em qualquer nivel abaixo dos mesmos.