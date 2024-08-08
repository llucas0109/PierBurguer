import Sequelize from 'sequelize';
import pkg from 'sequelize';
const { Model } = pkg; // Model fica dentro de pkg que fica dentro de sequelize

class Product extends Model{
  static init(sequelize){
    super.init({
      // Todo da ves que for querer gravar devo mandar os seguintes dados nos seguintes formatos exeto virtual
      name: Sequelize.STRING, 
      price: Sequelize.INTEGER,
      path: Sequelize.STRING, // o path tem o nome do arquivo de imagem
      offer: Sequelize.BOOLEAN,
      url: { // Os metodos virtuais nao sao gravados no banco de dados so aparecem quando chamaos a lista.
        type: Sequelize.VIRTUAL, // Os metodos virtuais nao sao gravados no banco de dados so aparecem quando chamaos a lista.
        get(){
          return `http://localhost:3001/product-file/${this.path}`
        }
      }
  
    },{
      sequelize,
    })
    return this
  }
  static associate(models){  // Vai criar um campo
    // foreignkey = migration que relaciona no nosso caso products a category.
    this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' }) // diz que esse modulo pertence ao campo category-id do Model category.
  }
}

export default Product 