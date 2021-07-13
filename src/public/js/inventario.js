let pedido = []

function limpiarcampo(id){
  document.getElementById(id).value = ""
}
function verificar(id){
  if (document.getElementById(id).value != '') {
      return true
  } else {
      return false
  }
}
function traer(id){
    return document.getElementById(id).value
}
function crearitem(){
    $("#sku").value(3)
}

// agrego y verifica sku y cantidad
const carptarclick = document.getElementById("agregar").addEventListener("click",(e)=>{
  if (verificar("sku") && verificar("cantidad")){
  }
  else{
    if (verificar("sku")===false){
        alert("coloque el sku")
    }
    if (verificar("cantidad")===false){
        alert("coloque la cantidad")
    }
  }

//   console.log(pedido)
})

