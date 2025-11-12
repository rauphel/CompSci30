// Basic OOP syntax

class Dog {
  constructor(name) {
    this.age = 0;
    this.name = name;
  }

  bark() {
    console.log(this.name + " says Woof");
  }
}

let fido = new Dog("fido");

function setup() {
  createCanvas(windowWidth, windowHeight);
  fido.bark();
}

function draw() {
  background(220);
}
