const app = new Vue({
    el: '#app',
    data: {
        search: "",
        objeto : [],
        autor :"",
        postData: 'autor='
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
            axios.post('http://localhost:3000/api/autor/',this.postData +app.autor  ,{
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
