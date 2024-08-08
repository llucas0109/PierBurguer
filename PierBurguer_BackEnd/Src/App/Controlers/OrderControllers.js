import * as yup from "yup" // Tudo que for so export sera juntado em um yup so.
import { response } from "express"
import Product from "../Models/Products.js";
import Category from "../Models/Category.js";
import Order from "../schemas/Order.js";
import User from "../Models/User.js";

class Ordercontroller { 
 async store(request,response){
  // const schena = yup.object().shape({  // 'yup.object()' Define que é um objeto, E 'shape' Verifica se o formato.
  //   products: yup.string().required()
  //   .of(yup.object().shape({
  //      id: yup.number().required(),
  //      quantity: yup.number().required(),
  //     })),
  // })
  const schena = yup.object().shape({
    products: yup
      .array() // determina que é um array
      .of( // Determina que deve verificar os dados do objeto dentro do array
        yup.object().shape({
          id: yup.number().required(),
          quantity: yup.number().required(),
        })
      )
      .required(),
  });


  await schena.isValid(request.body) //  schema.isValid Testa se é valido com os dados de schema se é objeto e se o formato e seus 
  // console.log(request)
  try{ 
    // abortEarly: false  faz aparecer todos os erros invez de somente um
    await schena.validateSync(request.body,{ abortEarly: false }) // 'schena.validateSync' ve se é valido e se nao for dá como returna os erros que aparareceram
  } 
  catch(err){
    return response.status(400).json({error: err.errors})
  }
 
  const productsId = request.body.products.map((product) => product.id);  // pega os ids de cada produto e coloca em um array.
   console.log(productsId);
  const updatedProducts = await Product.findAll({ // 'Product.findAll'  Le a tabela inteira
    where: {  //
      id: productsId, // Pega o que tem esses id
    },
    include: [  // inclui tambem
      {
        model: Category, // da tabela Category
        as: 'category',  // que esta em Product, associado como 'category' 
        attributes: ['name'],  // qual attributos vai pegar.
      },
    ],
  });

  const editedProduct = updatedProducts.map( product => {

     // 'products.findIndex()' Pega o array de nome products que esta no body  e joga para requestProduct onde comparamos o id do body ao do product e armazenamos a posiçao do Index de array na variavel productIndex
    const productIndex = request.body.products.findIndex(
      (requestProduct) => requestProduct.id == product.id
    )

    const newProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category. name,
    url: product.url,
    quantity: request.body.products[ productIndex ].quantity, // Procura no array product no index e retorna e definimos o quantity.
    }
    return newProduct
  })

  const order = {  // pegando os dados que fica em request que criamos em auhMi.js
    user: {
      id: request.userId,
      name: request.userName,
    },
    products: editedProduct,
    status: 'Pedido Realizado',
  }

  const orderResponse = await Order.create(order)

 return response.status(201).json(orderResponse)

  }
  async index(request,response) {
    const orders = await Order.find() // find() retorna todas as ocorrencia da tabela

    return response.json(orders)
  }

  async update(request,response) {
    const schena = yup.object().shape({
      status: yup.string().required() 
    })
  
    try{ 
      // abortEarly: false  faz aparecer todos os erros invez de somente um
      await schena.validateSync(request.body,{ abortEarly: false }) // 'schena.validateSync' ve se é valido e se nao for dá como returna os erros que aparareceram
    } 
    catch(err){
      return response.status(400).json({error: err.errors})
    }
    // :id na url de rota é mesma coisa que declarar uma variavel
    const { id } = request.params // 'requets.params' recebe os Dados De uma variavel Criada quando se coloca '/:algo' na url
    const { status } = request.body
    
    try {
      await Order.updateOne({ _id:id }, { status }) // 'updateOnee(Parametro que quer encontrar, O que vai ser ataulizado)' 
      } catch (error) {
      return response.status(400).json({ error: error.message })
      }
      const { admin : isAdmin} = await User.findByPk(request.userId)  // 'findByPk(request.userId)' 

      if(!isAdmin){
       return response.status(401).json()
      }

    return response.json({ message: "status was updated" })
  }
}
export default new Ordercontroller() 