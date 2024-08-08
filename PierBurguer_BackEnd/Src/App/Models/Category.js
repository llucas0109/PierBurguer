import Sequelize from 'sequelize';
import pkg from 'sequelize';
const { Model } = pkg; // Model fica dentro de pkg que fica dentro de sequelize

class Category extends Model{
  static init(sequelize){
    super.init({
      name: Sequelize.STRING, 
      path: Sequelize.STRING,
      url: { // Os metodos virtuais nao sao gravados no banco de dados so aparecem quando chamaos a lista.
        type: Sequelize.VIRTUAL, // Os metodos virtuais nao sao gravados no banco de dados so aparecem quando chamaos a lista.
        get(){
          return `http://localhost:3001/category-file/${this.path}`
        },
      },
    },
    {
      sequelize,
    }
    )
    return this 
  }
}

export default Category