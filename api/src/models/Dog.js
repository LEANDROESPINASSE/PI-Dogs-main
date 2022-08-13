const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weightMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    heightMax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    heightMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lifeSpanMax: {
      type: DataTypes.INTEGER,
      allowNUll: false
    },
    lifeSpanMin: {
      type: DataTypes.INTEGER,
      allowNUll: false
    },
    image: {
      type: DataTypes.TEXT,//cant ilimitada de caracteres para imagenes
      allowNull: true
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  },
  {
    timestamps: false,
  });
};
