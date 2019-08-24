const app = new Vue({
    el: '#app',
    data: {
        encontrado: false,
        objeto : [],
        titulo :"",
        calificacion:"",
        postData: 'valor='
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
                if (arr.titulo != undefined){
                    app.encontrado = true
                    console.log(app.encontrado)
                }
                
                    Vue.set(app.objeto,0,{titulo: arr.titulo, autores: arr.autores , isbn: arr.isbn, calificacion_promedio: arr.calificacion_promedio } )
                
            })
            .catch(function(error){
                console.log(error)
                
            })
        },

        postScore(){

            var app = this
            tmp = []
            axios.post('http://localhost:3000/calificacion/',this.postData +app.calificacion  ,{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then(function(response){
                console.log(response.data)
                
             
               
                var arr = response.data
                //console.log(arr)
                /*for (let index = 0; index < arr.length; index++) {
                    Vue.set(app.objeto,index,{titulo: arr[index].titulo, autores: arr[index].autores , isbn: arr[index].isbn, calificacion_promedio: arr[index].calificacion_promedio } )
                }*/
            })
            .catch(function(error){
                
            })
        }
        

    }
  })
