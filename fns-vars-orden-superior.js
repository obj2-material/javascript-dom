// manejo de Strings 
let ele = "hola".length
// uppercase, algun otro


/*
 * Una funcion sencilla
 */
function max_verbose(n1,n2) {
  if (n1 >= n2) {
    return n1
  } else {
    return n2
  }
}

// recordamos el operador ternario
function max(n1,n2) {
  return (n1 >= n2) ? n1 : n2
}

// una aun mas sencilla
function triple(n) { return n * 3 }

// las funciones se pueden asignar a variables
let triple1 = triple
let triple2 = function(n) { return n * 3 }

// notacion "arrow function", parecida a los bloques de Java 8, Smalltalk, Wollok, etc..
let triple3 = ((n) => n * 3)

let a = max(3,4)
let b = max(a, 28)
let c = triple(9)
let d = max(triple(c), 50)

let theArray = [a,b]

/*
 * Metodos de Array que reciben funciones
 */

// todos los triples, en dos variantes
function triples_verbose(numeros) { return numeros.map((n) => n * 3) }
function triples(numeros) { return numeros.map(triple) }
function triples_super_verbose(numeros) { 
  return numeros.map(function(n) { return n * 3 } ) 
}

// otras
function mayoresA(numeros,n) { return numeros.filter((nro) => nro > n) }
function esListaAcotada(numeros,min,max) {
  return numeros.every((n) => (n >= min) && (n <= max) )
}

// suma de un array, en dos variantes
function suma_forEach(numeros) {
  let suma = 0
  numeros.forEach((n) => suma += n)
  return suma
}
function suma_reduce(numeros) {
  return numeros.reduce((a,n) => a + n, 0)
}

// no nos achicamos con las listas de listas
function sumaDeCada(listas) { return listas.map((l) => suma_reduce(l)) }

// para practicar el for: secuencia, p.ej. secuencia(2,5) debe devolver [2,3,4,5]

/* es muy fácil definir funciones que esperan una función como parámetro */
function applyToInc(fn, n) { return fn(n+1) }
let r1 = applyToInc(triple, 4)
let r2 = applyToInc((n) => n ^ 2, 3)

