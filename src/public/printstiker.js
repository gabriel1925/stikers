const vue = new Vue({
    el:"#appp",
    methods: {
        imprimir:(id,cantidad)=>{
            id= id+1
            let tamaño = document.getElementById("tamPedido").value
            console.log(tamaño)
            
            for (let index = 1; index <= tamaño; index++) {
                console.log(document.getElementById("qrprint"+index))
                document.getElementById("qrprint"+index).classList.remove("d-print-block")
                document.getElementById("qrprint"+index).classList.remove("d-print-grid")
                document.getElementById("qrprint"+index).classList.remove("d-print-none")
                document.getElementById("qrprint"+index).classList.add("d-print-none")
            }
            document.getElementById("qrprint"+id).classList.remove("d-print-none")
            document.getElementById("qrprint"+id).classList.add("d-print-block")
            document.getElementById("qrprint"+id).classList.add("d-print-grid")

            
            window.print(cantidad)

        }
    },
    data:{
        llamada:{}
    },
    created: async function () {
        const id = document.getElementById('id').value 
            let urlencoded = new URLSearchParams();
            urlencoded.append("id", id);
            
            let requestOptions = {
                method: 'POST',
                body: urlencoded,
                redirect: 'follow'
            };
            let valor 
            await fetch("/busquedaStiker", requestOptions)
            .then(response => response.json())
            .then(result => valor= result)
            .catch(error => console.log('error', error));
            // console.log(valor.pedido.length)
            this.llamada = valor
            setTimeout(function(){
                console.log(valor.pedido.length)
                    for (let index = 0; index < valor.pedido.length; index++) {
                        new QRCode(document.getElementById("qr"+index), {
                            text:document.getElementById("nremito").value,
                            width: 80,
                            height: 80,
                            colorDark : "#000000",
                            colorLight : "#ffffff",
                            correctLevel : QRCode.CorrectLevel.H
                        });
                    }
            },200)
            
    },
    delimiters: ['${', '}']
})