/*
 * Una funcion sencilla
 */
function max_verbose(n1, n2) {
    if (n1 >= n2) {
        return n1
    } else {
        return n2
    }
}

// recordamos el operador ternario
function max(n1, n2) {
    return (n1 >= n2) ? n1 : n2
}

// una aun mas sencilla
function triple(n) { return n * 3 }

let a = max(3, 4)
let b = max(a, 28)
let c = triple(9) 
let d = max(triple(c), 50)

/* es muy fácil definir funciones que esperan una función como parámetro */
function applyToInc(fn, n) { return fn(n + 1) }
let r1 = applyToInc(triple, 4)
let r2 = applyToInc((n) => n ^ 2, 3)

