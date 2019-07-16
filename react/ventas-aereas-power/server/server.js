const express = require('express')                   //El modulo para facilitar crear el server
const app = express()                                //El objeto por defecto del modulo
const ventas = require('./ventas-aereas-dominio.js') // Me importo el modulo dominio

const cors = require('cors')  // Ignorar por ahora
app.use(cors())

// las tres líneas que siguen son necesarias
// para poder recibir JSON en el request de un POST
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Respondo a los pedidos GET que lleguen a la ruta /datosAvion
app.get('/datosAvion', (req,res) =>{
  let nombreAvion = req.query.nombre
  let elAvion = ventas.store.avionConNombre(nombreAvion)  //esta es mi consulta a la DB

  if (elAvion) {
    res.json(elAvion)
  	console.log("Alquien preguntó por el avion"+nombreAvion)
  } else {
    res.status(400) // Comunico al cliente que hizo un BAD REQUEST (podria ser un 404)
    res.send("Pruebe con: http://localhost:7777/datosAvion?nombre=Airbus 330")
  }
})

app.post('/aviones', (request, response) => {
  console.log(request.body)
  console.log(request.body.nombre)
  const nuevoAvion = new ventas.Avion(
    Number(request.body.cantidadAsientos), Number(request.body.alturaCabina), request.body.nombre
  )
  ventas.store.agregarAviones([nuevoAvion])
  console.log(JSON.stringify(nuevoAvion))
  console.log(nuevoAvion.nombre())
  response.json({ cantidadAviones: ventas.store.aviones().length })
})

// Creo el servidor y en el puerto 7777
var myServer = app.listen(7777, () => console.log("Escuchando en el puerto "+ myServer.address().port))
