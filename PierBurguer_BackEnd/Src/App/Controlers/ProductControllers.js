import * as yup from 'yup'
import Product from '../Models/Products.js'
import Category from '../Models/Category.js'
import User from '../Models/User.js'

class ProductsControllers {
  async store(request,response){
    const schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      category_id: yup.number().required(),
      offer: yup.boolean()
    })
    
    try{
      await schema.validateSync(request.body), { abortEarly: false } // abortEarly: false diz que ele deve acumular todos os erros
    } catch(err) {
      return response.status(400).json({error: err.errors})
    }
     
    const { admin : isAdmin} = await User.findByPk(request.userId)  // 'findByPk(request.userId)' 

    if(!isAdmin){
     return response.status(401).json()
    }
    //  filename È  basicamente o nome do arquivo
    const { filename:path } = request.file // Pega o arquivo com nome do campo de file e ´pega um sub dado Chamado filename e muda o nome para path .
      // const file = request.file
      // console.log(file); 
    const { name, price, category_id, offer } = request.body
     
    const products = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    })
    console.log("Aqui Products",products);
    return response.json(products)
  }
  async index(request,response){
    const products = await Product.findAll({
      include: [  // include é para incluir um dado aqui em products
        {
          model: Category,  // Pega o modulo Category
          as: 'category',  // em qual coluna vai pegar o dado e incluir aqui,  no caso sera na category_id que esta com apelido de category
          attributes: ['id','name'] , // o que vai pegar dela e incluir em products
        },
      ]
    }) // findAll Procura e lista todos os itens da lista
    return response.json(products)
  }
  async update(request,response){
    const schema = yup.object().shape({
      name: yup.string(),
      price: yup.number(),
      category_id: yup.number(),
      offer: yup.boolean()
    })
    
    try{
      await schema.validateSync(request.body), { abortEarly: false } // abortEarly: false diz que ele deve acumular todos os erros
    } catch(err) {
      return response.status(400).json({error: err.errors})
    }
    
    const { admin : isAdmin} = await User.findByPk(request.userId)  // 'findByPk(request.userId)' 

    if(!isAdmin){
     return response.status(401).json()
    }

    const { id } = request.params

    const product = await Product.findByPk(id)

    if(!product){
      return response.status(401).json({ error : "Make sure if your ID is correct" })
    }
    let  path
    if(request.file){
      path = request.file.filename
    }
    //  filename È  basicamente o nome do arquivo
      // const file = request.file
      // console.log(file); 
    const { name, price, category_id, offer } = request.body

      await Product.update({  // Atualiza Os campos
      name,
      price,
      category_id,
      path,
      offer,
    },
    {
      where: {id}  // Diz que é para atualizar os dados acima Na row que possui esse id.
    }
    )

      return response.status(200).json()
  }
}

export default new ProductsControllers()


// Posso colocar o await e o response em qualquer nivel abaixo dos mesmos.