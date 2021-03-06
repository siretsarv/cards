'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Decks extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Decks.init({
        uuid: DataTypes.STRING,
        type: DataTypes.STRING,
        shuffled: DataTypes.BOOLEAN,
        remaining: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Decks',
    });
    return Decks;
};
