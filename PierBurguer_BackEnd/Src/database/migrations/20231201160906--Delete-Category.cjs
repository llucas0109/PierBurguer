'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'category'); // removeColumn('de Qual tabela quer deletar', 'Qual campo vai deletar')
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('products',{ // Adiciona uma coluna
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }); 
  }
};
