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
