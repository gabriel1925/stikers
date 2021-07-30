const app = new Vue({
  el: "#app",
  methods: {
    enviar: async function (e) {
      let remitos = {}
      let npedido
      let urlencoded = new URLSearchParams();
      remitos.nfactura = this.nfactura
      remitos.empresa = this.empresa
      remitos.fcompra = this.fcompra
      remitos.sku = this.sku
      remitos.cantidad = this.cantidad
      remitos.pedido = JSON.stringify(this.pedido)
      // console.log(typeof(remitos.pedido))
      urlencoded.append("nfactura", remitos.nfactura)
      urlencoded.append("empresa", remitos.empresa)
      urlencoded.append("fcompra", remitos.fcompra)
      urlencoded.append("sku", remitos.sku)
      urlencoded.append("cantidad", remitos.cantidad)
      urlencoded.append("pedido", remitos.pedido)

      let requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
      };
      fetch("/cargarRemito", requestOptions)
        .then(response => response.json())
        .then(result => {
          npedido = result.nremito
          console.log(npedido)
          setTimeout(() => {
            window.location.href = '/impresiones/' + npedido
          }, 1000)
          // window.location.href = '/impresiones/'+npedido
        })
        .catch(error => alert("ya existe"));


    }
    ,
    agregar: function () {
      if (this.sku != null && this.sku != "") {
        if (this.cantidad != null && this.cantidad != 0 && this.cantidad != "") {
          if (this.cantidad < 0) {
            alert("el numero es negativo")
          } else {
            this.pedido.push({
              sku: this.sku,
              nombre: this.nombre,
              cantidad: parseInt(this.cantidad)
            })
            this.sku = null
            this.cantidad = null
          }
        } else {
          alert("coloque la cantidad")
        }
      } else {
        alert("coloque el sku")
      }
    },
    borrar: function (index) {
      this.pedido.splice(index, 1)

    },
    buscarProvedor: async function () {
      if (this.empresa.length >= 3 && this.empresa != null) {
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
            if (result.length === 0 || result.length === null) {
              this.empresa = null
            } else {
              this.provedores = result
              if (result.length === 1) {
                console.log(result[0].provedor)
              }
            }
          })
        // .catch(error => console.log('error', error));
      } else {
        this.provedores = null
      }
    },
    buscarProductoNombre: async function () {
      if (this.sku.length >= 3 && this.sku != null) {
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
            if (result.length === 0 || result.length === null) {
              this.sku = null
            } else {
              this.skus = result
              if (result.length === 1) {
                this.skus = null
                this.sku = result[0].sku
                this.nombre = result[0].nombre
                console.log(result[0])
              }
            }
          })
        // .catch(error => console.log('error', error));
      } else {
        this.provedores = null
      }
    },
    buscarProductoSku: async function () {
      if (this.sku.length >= 3 && this.sku != null) {
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
            if (result.length === 0 || result.length === null) {
              this.sku = null
            } else {
              this.skus = result.splice(0, 10)
              if (result.length === 1) {
                this.skus = null
                this.sku = result[0].sku
                this.nombre = result[0].nombre
                console.log(result[0])
              }
            }
          })
        // .catch(error => console.log('error', error));
      } else {
        this.provedores = null
      }
      if(this.sku.length ==0){
       console.log(this.skus)
      }
    },
    buscarProducto: async function () {
      if(this.sku.length < 3){
        this.skus = null
      }
      if (this.sku.length >= 3 || this.sku == null) {

        if (!isNaN(this.sku)) {
          // console.log('pase')
          await this.buscarProductoSku()
        } else {
          await this.buscarProductoNombre()
          // console.log('pase2')
        }
      }
    }


  },
  data: {
    nremito: null,
    nfactura: null,
    empresa: null,
    provedores: null,
    fcompra: null,
    skus: null,
    sku: null,
    nombre: null,
    cantidad: null,
    pedido: []

  },
  delimiters: ['${', '}']
})
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input').forEach(node => node.addEventListener('keypress', e => {
    if (e.keyCode == 13) {
      //console.log(this)
      e.preventDefault();
    }

  }))
});
