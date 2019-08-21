const {Usuario, Libro, Calificacion, Autor, Autor_Libro} = require('./db');

/*Libro.create({ ISBN: "9123564856", titulo: "Harry Potter y el prisionero de askaban" , promedio: 9.2}).then(libro => {
  console.log("ID:", libro.ISBN);
}).catch(err => {
	console.log(err)
});*/

Libro.findAll().then(books => {
	console.log("Libros:", JSON.stringify(books, null, 4));
});
Usuario.findAll().then(users => {
	console.log("Usuario:", JSON.stringify(users, null, 4));
});
Calificacion.findAll().then(rates => {
	console.log("Calificacion:", JSON.stringify(rates, null, 4));
});
Autor.findAll().then(autors => {
	console.log("Autor:", JSON.stringify(autors, null, 4));
});
Autor_Libro.findAll().then(autlib => {
	console.log("Libros con autor:", JSON.stringify(autlib, null, 4));
});
