// app.js
//import express from 'express';
//import rota from './route.js';
//import './database/index.js';
import express from 'express';
import './database/index.js'; 
import path, { resolve } from 'path';
import rota from './route.js'; 
import { fileURLToPath } from 'url';
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url); // Replicando funcionalidade do dirname para um modulo
const __dirname = path.dirname(__filename);  // Replicando funcionalidade do dirname para um modulo

//import port from './index.js'; // Tem que por o 'js'
class App{ 
  constructor(){
    this.app = express()
    this.app.use(cors())
    this.middleware()
    this.route()
  } 
  middleware() {
    this.app.use(express.json()) 
    this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads',))) // express.static Cria uma rota Web, resolve indica a pasta. E /product-file da o nome da url para acessar a pasta com os arquivos de imagen por ex
    this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads',)))
  }
  route(){
    this.app.use(rota) 
  }

}

//module.exports = { App } 

export default new App() // new cria um novo App() onde sera importado podendo por suas proprias configuraçoes
