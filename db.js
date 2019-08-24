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
},{ sequelize, freezeTableName: true, modelName: 'usuario'});
Usuario.sync();

class Libro extends Model{}
Libro.init({
	ISBN: {type: Sequelize.STRING, primaryKey: true},
	titulo: Sequelize.STRING,
	promedio: Sequelize.DECIMAL(10,2)
},{ sequelize, freezeTableName: true, modelName: 'libro'});
Libro.sync();

class Autor extends Model{}
Autor.init({
	idAutor: {type: Sequelize.STRING, primaryKey: true},
	nombre: Sequelize.STRING
},{sequelize, freezeTableName: true, modelName: 'autor'});
Autor.sync();

class Autor_Libro extends Model{}
Autor_Libro.init({
	libro: { type:Sequelize.STRING, references: {
		model: Libro, key: 'ISBN'
	}},
	autor: { type: Sequelize.STRING, references:{
		model: Autor, key: 'idAutor'
	}}
},{sequelize, freezeTableName: true,modelName: 'autor_libro'});
Autor_Libro.sync();

class Calificacion extends Model{}
Calificacion.init({
	idCal: {type: Sequelize.INTEGER, primaryKey: true},
	libro: { type:Sequelize.STRING, references: {
		model: Libro, key: 'ISBN'
	}},
	usuario: { type:Sequelize.STRING, references: {
		model: Usuario, key: 'cedula'
	}},
	valor: Sequelize.DECIMAL(10,2),
},{ sequelize, freezeTableName: true, modelName: 'calificacion'});
Calificacion.sync();

module.exports = {Usuario, Libro, Calificacion, Autor, Autor_Libro};
