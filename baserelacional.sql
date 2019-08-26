create database goodreads;
use goodreads;

show tables;
insert into libro values ("123465789","El color que cayo del cielo",9.3);
insert into usuario values("093222222","Juan","Piguabe","piguabe@espol.edu.ec","01-09-1996");
insert into autor values("0123","H.P. Lovecraft");
insert into autor_libro values(1,"123465789","0123");
insert into calificacion values(1,"123465789","093222222",8.3);