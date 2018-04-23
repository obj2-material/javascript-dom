var pepita   = new Golondrina(200)
var juanita   = new Golondrina(40)

function mostrarResultados(){
  c.init("Ejercicios Clases: Golondrina simple")

  c.show("pepita")
  c.eval("pepita.comer(30)")
  c.eval("pepita.volar(80)")
  c.test(230, "pepita.energia()")
  c.test(false, "pepita.estaFeliz()")
  c.showText("")

  c.show("juanita")
  c.eval("juanita.comer(8)")
  c.test(72, "juanita.energia()")
  c.test(true, "juanita.estaFeliz()")
  c.eval("juanita.volar(50)")
  c.test(13, "juanita.energia()")
  c.test(false, "juanita.estaFeliz()")
  c.eval("juanita.comer(400)")
  c.show("juanita.energia()")
}


