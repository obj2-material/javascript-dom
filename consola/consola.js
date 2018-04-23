//----------------------------- Funciones de la miniconsola ---------------------------
// Defino un objecto llamado "c", por consola que puede

var c = {
  interline : true,
  init(titulo){  // Init the console
    document.getElementById("idTitulo").innerHTML = titulo
    document.getElementById("idTextarea").value = ""
  },
  innerSureEval(expr, continuation, initialTextIfError) {
    try {
      let result = eval(expr)
      continuation(result, expr)
    } catch(err) {
      this.showText("")
      if (initialTextIfError) { this.showText(initialTextIfError) }
      this.showText("=================   ATENCION   =================")
      this.showText(expr + "    -----  la evaluación cortó con error ")
      this.showText(err.message)
      this.showText("================================================")
      this.showText("")
    }
  },
  showText(texto){  //Show a text
    let textarea = document.getElementById("idTextarea")
    textarea.value = textarea.value + texto + "\n" + (this._interline ? "\n" : "")
  },

  eval(expresion){ // Eval an expresion, just show the expression
    this.innerSureEval(expresion, (res,exp) => this.showText(exp))
  }, 
  show(expresion) {  // evaluate an expression and show its result
    this.innerSureEval(expresion, (res,exp) => 
      this.showText("SHOW " + exp + " = " + JSON.stringify(res))
    , "SHOW")
  },
  test(expresionValorEsperado, expresion){ // Test if an expresion has the given value
    this.innerSureEval(expresion, 
      (valIzq, exp) => this.innerSureEval(expresionValorEsperado,
        (valDer, expEsperado) => 
          this.showText(
            "TEST " +exp+ " = " + expEsperado + "  -->  " +((valIzq == valDer) ? "Sí" : "No, "+valIzq)
          )
      , "TEST")
    , "TEST")
  },

  mostrarTests() {
    try {
      mostrarResultados()
    } catch (err) {
      this.showText("")
      this.showText("=========================================================")
      this.showText("Error en mostrarResultados() que impide seguir procesando")
      this.showText(err.message)
      this.showText("=========================================================")
    }
  }

}

