'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Criando a chave estrangeira
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      references: { model: 'categories', key: 'id' },  // faz o relacionamento A tabela categories apartir de uma key ou seja relaciona o Dado dessa coluna com a do outra Dado de outra coluna de outra tabela, apartir do id desse outro 'Dado'.
      onUpdate: 'CASCADE', // ao atualizar a tabela de products ele atualiza aqui tambem
      onDelete: 'SET NULL', // fica nulo em caso da outra tabela ser deletada 
      allowNull: true,
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products','category_id'); // De qual tabela e qual coluna
     
  }
};
