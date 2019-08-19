const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize('goodreads','root','root',{
	host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false 
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexion exitosa');
  })
  .catch(err => {
    console.error('Erro al abrir la base de datos', err);
  });

class Usuario extends Model{}
Usuario.init({
	cedula: { type: Sequelize.STRING, primaryKey: true },
	nombre: Sequelize.STRING,
	apellido: Sequelize.STRING,
	mail: Sequelize.STRING,
	fecha: Sequelize.STRING
},{ sequelize, modelName: 'usuario'});

class Libro extends Model{}
Libro.init({
	ISBN: {type: Sequelize.STRING, primaryKey: true},
	titulo: Sequelize.STRING,
	autor: Sequelize.STRING,
	promedio: Sequelize.DECIMAL
},{ sequelize, modelName: 'libro'});

class Calificacion extends Model{}
Calificacion.init({
	idCal: {type: Sequelize.INTEGER, primaryKey: true},
	libro: { type:Sequelize.STRING, references: {
		model: Libro, key: 'ISBN'
	}},
	usuario: { type:Sequelize.STRING, references: {
		model: Usuario, key: 'cedula'
	}},
	valor: Sequelize.DECIMAL,
},{ sequelize, modelName: 'calificacion'});

module.exports = {Usuario, Libro, Calificacion};