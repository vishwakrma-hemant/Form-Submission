const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize('schooldb', 'root', 'Hemant@123', {
  host: 'localhost',
  dialect: 'mysql',
});
const school = sequelize.define("school", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    contact: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING , allowNull: false},
    term: { type: DataTypes.BOOLEAN },
}
);

module.exports = school;
