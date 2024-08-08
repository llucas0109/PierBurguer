import { Router } from 'express';
import  express from 'express';
import cors from 'cors';
import UserController from './App/Controlers/UserController.js';
import SessionController from './App/Controlers/SessionController.js';
import ProductControllers from './App/Controlers/ProductControllers.js';
 import multer from 'multer';
 import multerConfig from '../config/multerConfig.js';
 import authMiddlewares from './App/Controlers/middlewares/authMi.js';
 import CategoryControllers from './App/Controlers/CategoryControllers.js';
 import OrderControllers from './App/Controlers/OrderControllers.js';

const app = express()
app.use(cors())
const rota = new Router()
 const upload = multer(multerConfig)

rota.post('/users', UserController.store)

rota.post('/sessions', SessionController.store)

rota.use(authMiddlewares) // Sera chamado por todas as rotas abaixo

// upload.single('file') |Um arquivo com nome do campo que envia como file
rota.post('/products', upload.single('file'), ProductControllers.store)  //  upload.single('file') Pega a imagem que È inviada.

rota.get('/products', ProductControllers.index)
rota.put('/products/:id', upload.single('file'), ProductControllers.update)

rota.post('/categories',upload.single('file'), CategoryControllers.store)
rota.get('/categories', CategoryControllers.index)
rota.put('/categories/:id',upload.single('file'), CategoryControllers.update)

rota.post('/orders', OrderControllers.store)
rota.get('/orders', OrderControllers.index)    
rota.put('/orders/:id', OrderControllers.update)  // :id na url de rota é mesma coisa que declarar uma variavel


export default rota
