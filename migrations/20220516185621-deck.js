'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('decks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shuffled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      remaining: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('decks');
  }
};
