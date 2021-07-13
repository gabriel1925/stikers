const sequelize = require("../sequelize");
const provedordb = require('../models/provedores.models')
const remitodb = require('../models/remitos.models')
const busqueda = {};

const prueba = [
  {
    sku: "1001",
    nombre: "INTEL I7-9700",
  },
  {
    sku: "1002",
    nombre: "INTEL I3-9100 F",
  },
  {
    sku: "1497",
    nombre: "COOLER INTEL 1150",
  },
  {
    sku: "1133",
    nombre: "CONTROL REMOTO INTELIGENTE GRALF WIFI GF-S1000",
  },
  {
    sku: "1164",
    nombre: "SOPORTE INTELAID MONITORS IT-TS010V 13/27",
  },
  {
    sku: "1575",
    nombre: "SOPORTE INTELAID MONITORS IT-DB92V 13/27",
  },
  {
    sku: "1483",
    nombre: "COOLER INTEL 1151",
  },
  {
    sku: "1085",
    nombre: "INTEL PENTIUM E5300 SOCKET 775",
  },
  {
    sku: "1109",
    nombre: "INTEL PENTIUM E5200 SOCKET 775",
  },
  {
    sku: "1563",
    nombre: "INTEL CORE 2 DUO E4600 SOCKET LGA 775",
  },
  {
    sku: "1570",
    nombre: "INTEL PENTIUM 4 531 SOCKET PLGA 775",
  },
  {
    sku: "1600",
    nombre: "INTEL PENTIUM D 915 SOCKET 775",
  },
  {
    sku: "1355",
    nombre: "INTEL I5-2400 SOCKET 1150",
  },
  {
    sku: "1039",
    nombre: "INTEL I5-8400",
  },
  {
    sku: "1159",
    nombre: "INTEL I5-9400",
  },
  {
    sku: "1367",
    nombre: "Intel Celeron G4930",
  },
  {
    sku: "1511",
    nombre: "INTEL I3-8100",
  },
  {
    sku: "1518",
    nombre: "Intel Celeron G4900",
  },
  {
    sku: "1652",
    nombre: "INTEL PENTIUM G5400",
  },
  {
    sku: "1163",
    nombre: "INTEL I5-650 SOCKET 1156",
  },
  {
    sku: "1546",
    nombre: "INTEL I3-540 SOCKET 1156",
  },
  {
    sku: "1016",
    nombre: "INTEL I3-4160 socket 1150",
  },
  {
    sku: "1024",
    nombre: "ROUTER INTELLINET 150N ADSL2+ MODEM ROUTER WIRELESS",
  },
  {
    sku: "1772",
    nombre: "Intel I7-10700",
  },
  {
    sku: "1889",
    nombre: "INTEL I3-9100",
  },
  {
    sku: "2059",
    nombre: "INTEL I5-10400",
  },
  {
    sku: "2177",
    nombre: "INTEL PENTIUM G5420",
  },
  {
    sku: "2235",
    nombre: "Soporte universal SmartGrip para teléfono inteligente",
  },
  {
    sku: "2266",
    nombre: "INTEL I3-10100 - (*)",
  },
  {
    sku: "2268",
    nombre: "INTEL I3-9100F BOX + VGA 1GB G210",
  },
  {
    sku: "1479",
    nombre: "INTEL I5-9400F",
  },
  {
    sku: "2310",
    nombre: "INTEL I5-10400F",
  },
  {
    sku: "2311",
    nombre: "Intel Celeron G5905",
  },
  {
    sku: "2334",
    nombre: "INTEL I3-10100F",
  },
  {
    sku: "2354",
    nombre: 'SOPORTE INTELAID MONITORS 10" - 27"',
  },
  {
    sku: "2355",
    nombre: 'SOPORTE INTELAID MONITORS 37" - 70"',
  },
  {
    sku: "2389",
    nombre: "INTEL PENTIUM G6400",
  },
  {
    sku: "2402",
    nombre: "Intel I7-10700F",
  },
  {
    sku: "2425",
    nombre: "PC Electrosof GAMEMAX INTEL I3 9100F+8G+SSD480+VGA2G+500W",
  },
];

busqueda.sku = async function (pedido) {
  const users = await sequelize.query(
    'SELECT wp_postmeta.meta_value as `sku`,wp_posts.post_title as `nombre` FROM wp_posts inner join wp_postmeta on wp_posts.ID = wp_postmeta.post_id where wp_postmeta.meta_key= "_sku" and wp_postmeta.meta_value like "' +
      pedido +
      '%"'
  );
  // console.log(users[0])
  for (let i = 0; i < users[0].length; i++) {
    const element = users[0][i];
    // console.log(element.nombre_curso)
  }
  return users[0];

// if(pedido.length >=5){
//   return [{    sku: "1001",    nombre: "INTEL I7-9700"  }]
// }else{

//   return prueba
// }
};
busqueda.nombre = async function (pedido) {
  const users = await sequelize.query(
    'SELECT wp_postmeta.meta_value as `sku`,wp_posts.post_title as `nombre` FROM wp_posts inner join wp_postmeta on wp_posts.ID = wp_postmeta.post_id where wp_postmeta.meta_key= "_sku" and wp_posts.post_title like "%' +
      pedido +
      '%"'
  );
  // console.log(users[0])
  for (let i = 0; i < users[0].length; i++) {
    const element = users[0][i];
    // console.log(element.nombre_curso)
  }
  return users[0];
// console.log(pedido.length)


// if(pedido.length >=5){
//   let arra =  [ {    sku: "1001",    nombre: "INTEL I7-9700"  }]
//   return arra
// }else{

//   return prueba
// }
};
busqueda.provedor = async function(pedido){
  // console.log(pedido)
  let expReg = new RegExp(pedido,"i")
  let pregunta = provedordb.find({provedor:expReg},(err,docs)=>{
    // console.log(docs)
    // console.log(err)
    return docs
  })
  // console.log(pregunta)
  return pregunta
}
busqueda.remito = async function(pedido){
  return remitodb.findById(pedido)
}
busqueda.remitos = async function(){
  return remitodb.find()
}
module.exports = busqueda;
