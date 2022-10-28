const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span: {
      type: DataTypes.STRING
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    timestamps: false
  });
};

/* 
ID *
Nombre *
Altura *
Peso *
Años de vida
*/

/* 
{
  "weight":{
    "imperial":"6 - 13",
    "metric":"3 - 6"
  },
  "height":{
    "imperial":"9 - 11.5",
    "metric":"23 - 29"
  },
  "id":1,
  "name":"Affenpinscher",
  "bred_for":"Small rodent hunting, lapdog",
  "breed_group":"Toy",
  "life_span":"10 - 12 years",
  "temperament":"Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
  "origin":"Germany, France",
  "reference_image_id":"BJa4kxc4X",
  "image":{
    "id":"BJa4kxc4X",
    "width":1600,
    "height":1199,
    "url":"https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
  }
}
*/
