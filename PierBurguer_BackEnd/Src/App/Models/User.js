// Os models serve para gravar os dados no servidor
// O nome do arquivo deve ter a primeira letra maiuscula porque é uma classe.
//import Sequelize, { Model } from 'sequelize' //Model é uma classe
import Sequelize from 'sequelize';
import pkg from 'sequelize';
const { Model } = pkg; // Model fica dentro de pkg que fica dentro de sequelize
 //Model permite manipular os modelos
// Existe o datatypes para determinar tipos de dados
import bcrypt from 'bcrypt'
console.log('user')
// Restante do seu código aqui
 
class User extends Model { // Extends Model Faz com quee User tenha como usar os objetos de  Model.
  static init(sequelize){  //  static init permite ser usado fora da class leia em baixo
    // Percebe que aqui so declaramos a tabela e o tipo de dados que deve receber aqui. Repare que em migration so pede esses dados
    super.init({  // 'super.' Permite Erdar Da classe Model O metodo 'init' 
      name: Sequelize.STRING, //Sequelize.STRING, Sao juntos um tipo de dado.
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL, // Recebe o Valor Mas nao grava no banco de dados.
      password_hash: Sequelize.STRING, //Sequelize.STRING, Sao juntos um tipo de dado.
      admin: Sequelize.BOOLEAN,
    },{
      sequelize, // Faz a conecçao ao servidor
      //modelName: 'user',
      //freezeTableName: true,
    })
    // 'this.addHook' conseque tabela inteira das migration. Ele esta pegando as informaçoes e passando para sua segnda Propriedade. 
    // beforeSave é um tipo de dado
    this.addHook('beforeSave', async(user) => { // addHook executa coisas antes ou depois de gravar os dados no banco de dados 
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 10 )  // hash( OqueQuerCriptografar, ONivelDeCriPtografia 0 To 150 ) 
      }
    }) 
    
  }
   checkPassword(password){ 
    return bcrypt.compare(password, this.password_hash) //  Compara se as duas senhas sejam as mesmas ele me retorna um true   
    
  } 
}

export default User

// Metodo de classe funcionam igual uma function com a diferença que nao precisamos declaras mas quando tem funçoes dentro desses metodos precisamos declarar

/* 
//Metodo de instancia de classe
class exemplo {
  andar(){}

  correr(){}
}
const obtençao = new exemplo; // Para Criar um objeto Para usar os metodos da class precisamos usar o new antes do nome da class o Nome disso é instanciamento.
obtençao.andar

// Metodo estatico de classe
class exemplo2 {
  // Uma funçao é declarada ao ser colocado o '()'
  static andar(){} //static possibilita o uso desse metodo usando caminho simple da class ate esse metodo em qualquer lugar do noss codigo

  static correr(){}
}
exemplo2.andar() // No Metodo Estatico Simplemente chamos a classe e o metodo para ter acesso 
exemplo2.correr()

 */
// Instancias sao classes