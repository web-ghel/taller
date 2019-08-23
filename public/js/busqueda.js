const app = new Vue({
    el: '#app',
    data: {
        search: "",
        objeto : [],
        titulo :"",
        calificacion:"",
        postData: 'titulo='
    },
    created: function(){
        this.loadJson();
    },

    /*computed :{
        filtered: function(){
            return this.objeto.filter((prod)=> {
                return prod.descripcion.match(this.search);
            })

        }

    },*/
    methods :{

        loadJson (){

            var app = this
            tmp = []
            axios.get('http://localhost:3000/api/result')
            .then(function(response){
                
                var arr = response.data
                console.log(arr.titulo)
                //console.log(arr)
                
                    Vue.set(app.objeto,0,{titulo: arr.titulo, autores: arr.autores , isbn: arr.isbn, calificacion_promedio: arr.calificacion_promedio } )
                
            })
            .catch(function(error){
                console.log(error)
                
            })
        }
        

    }
  })
