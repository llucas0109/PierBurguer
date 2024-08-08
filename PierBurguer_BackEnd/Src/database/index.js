
// Arquivo: src/database/Database.js
import Sequelize from 'sequelize';
import User from '../App/Models/User.js';
import conflog from '../../config/config.json' assert{type:'json'}
import Product from '../App/Models/Products.js';
import Category from '../App/Models/Category.js';
import mongoose from 'mongoose';

  //fetch('../../config/config.json').then((response) => console.log(response)) //.then(response => response.json()) Assim que os dados 

  const models = [ User, Product, Category];

  class Database {
    constructor() {
      this.init();
      this.mongo();
    }
  // Se Voce passar o uma classe estanciada voce podera usar os metodos da instancia inveze de somente os staticos.
    init() {
      this.connection = new Sequelize(conflog); // instancia com new para poder usar metodos de classe
      models.map((model) => model.init(this.connection)) // Conecta o modulo
      models.map( (model) => model.associate && model.associate(this.connection.models) ); // this.connection.models Contem todos os modulos executados previamente 
    }
    mongo(){
      this.mongoConnection = mongoose.connect('mongodb://localhost:27017/codeburguer',
      {}
      )
    }
  }
  
  export default new Database();
  // Comando criar migrate npx ssequelize db:migrate e para excluir fica npx sequelize db:migrate:undo or undo:all

/*import { Sequelize } from "sequelize";

import User from "../App/Models/User.js";

const dbconfig = require('../Config/database.js')

const models = [User]

class Database{
  constructor(){
    this.init
  }
  init(){
    this.connection = new Sequelize(dbconfig)
    models.map( (model) => model.init(this.connection) )
  }
}

export default new Database() // 'new Database' Exporta Database Ja Instanciado com new e tambem chamamos o Database pq Usamos 'Database()' ou seja intanciada por ter um new e instanciada por ter ().  */