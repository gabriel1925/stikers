let nremito
let nfactura
let empresa
let provedores
let fcompra
let skus
let sku
let nombre
let cantidad
let pedido
const app = new Vue({
    el:"#app",
    methods:{
      agregar:function(){
        if(this.sku != null && this.sku != "" ){
          if(this.cantidad != null && this.cantidad != 0 && this.cantidad !=""  ){
            if(this.cantidad<0){
              alert("el numero es negativo")
            }else{
                this.pedido.push({
                sku:this.sku,
                nombre:this.nombre,
                cantidad:parseInt(this.cantidad)
                }) 
                this.sku = null
                this.cantidad = null
            }
          }else{
            alert("coloque la cantidad")
          }
        }else{
          alert("coloque el sku")
        }
      },
      borrar:function(index){
        this.pedido.splice(index,1)

      },
      buscarProvedor:async function(){
        if(this.empresa.length >= 3 && this.empresa != null){
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


          let urlencoded = new URLSearchParams();
          urlencoded.append("provedor", this.empresa);

          let requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
          };

          fetch("/busquedaProvedores", requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log()
              if(result.length===0 || result.length === null ){
                this.empresa = null
              }else{
                this.provedores= result
                if(result.length===1){
                  console.log(result[0].provedor)
                }
              }
            })
            // .catch(error => console.log('error', error));
                  }else{
                    this.provedores = null
                  }
      },
      buscarProductoNombre:async function(){
        if(this.sku.length >= 3 && this.sku != null){
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


          let urlencoded = new URLSearchParams();
          urlencoded.append("sku", this.sku);

          let requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
          };

          fetch("/busquedasnombre", requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log()
              if(result.length===0 || result.length === null ){
                this.sku = null
              }else{
                this.skus = result
                if(result.length===1){
                  this.skus= null
                  this.sku = result[0].sku
                  this.nombre = result[0].nombre
                  console.log(result[0])
                }
              }
            })
            // .catch(error => console.log('error', error));
                  }else{
                    this.provedores = null
                  }
      },
      buscarProductoSku:async function(){
        if(this.sku.length >= 3 && this.sku != null){
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


          let urlencoded = new URLSearchParams();
          urlencoded.append("sku", this.sku);

          let requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
          };

          fetch("/busquedasku", requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log()
              if(result.length===0 || result.length === null ){
                this.sku = null
              }else{
                this.skus = result.splice(0,10)
                if(result.length===1){
                  this.skus= null
                  this.sku = result[0].sku
                  this.nombre = result[0].nombre
                  console.log(result[0])
                }
              }
            })
            // .catch(error => console.log('error', error));
                  }else{
                    this.provedores = null
                  }
      },
      buscarProducto: async function(){
        if(this.sku.length >= 3 || this.sku == null){

          if(!isNaN(this.sku)){
            // console.log('pase')
            await this.buscarProductoSku()
          }else{
            await this.buscarProductoNombre()
            // console.log('pase2')
          }
        }
      }


    },
    data:{
      nremito,
      nfactura,
      empresa,
      provedores,
      fcompra,
      skus,
      sku,
      nombre,
      cantidad,
      pedido
      
    },
    delimiters: ['${', '}']
  })
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type=text]').forEach( node => node.addEventListener('keypress', e => {
      if(e.keyCode == 13) {
        console.log(this)
        e.preventDefault();
      }
    }))
  });