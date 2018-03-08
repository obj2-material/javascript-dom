/*
 * Metodos de Array que reciben funciones
 */
const triple = (n) => n * 3

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
function mandarElPrimeroAtras(arr) {
    let newArray = arr.slice(1)
    newArray.push(arr[0])
    return newArray
}
function mandarElUltimoAdelante(arr) {
    let newArray = arr.slice(0, arr.length - 1)
    newArray.unshift(arr[arr.length-1])
    return newArray
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

