class Person{
    constructor(name){
        this.name = name;
    }
    updateName(newName){
        this.name = newName;
    }
}
let name = 'jessy';
let shaw = new Person('shaw');
console.log(shaw.name); //shaw
shaw.updateName('jack');
console.log(shaw.name); //jack

let updateName = shaw.updateName;
updateName('a new name');
console.log(shaw.name, name);