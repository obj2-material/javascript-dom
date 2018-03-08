carlosData = {
  name: 'Carlos',
  age: 48,
  country: 'Argentina'
}
ghostRecord = {}

luisaData = {
  name: 'Luisa',
  age: 24,
  country: 'Peru',
  someMoreAge: function() { return this.age + 4 }
}

/*
See what happens by trying out each of the following lines of code

carlosData.age * 4
carlosData.surname = "Funes"
carlosData.fullName = function() { return this.name + " " + this.surname }
carlosData.someMoreAge = luisaData.someMoreAge
*/

// ahora lista de records
let gente = [carlosData, luisaData, 
  {name: 'Tomasa', age: 15, country: 'Argentina'},
  { name: 'Juana', age: 29, country: 'Chile' },
  { name: 'Mariel', age: 31, country: 'Argentina' },
  { name: 'Mario', age: 52, country: 'Chile' }
]

/*
Para probar

gente.map(pers => pers.name)
gente.filter(pers => pers.age > 30)
gente.some(pers => pers.country == "Ecuador")
gente[3].age
gente.filter(pers => pers.country == "Argentina").length
gente.unshift({name: 'Ariel', age: 21, country: 'Argentina'})
["Roque", "Carlos", "Julia", "Tomasa", "Noemí"].filter(nombre => gente.map(pers => pers.name).includes(nombre))
*/

/*
Algo sobre Strings

gente.filter(pers => pers.name.startsWith("M"))
gente.map(pers => pers.name.toUpperCase())
gente.some(pers => pers.name.substr(1,3) == "ari")  
    // ver la diferencia entre substr y substring
*/
