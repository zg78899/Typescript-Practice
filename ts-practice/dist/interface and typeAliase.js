"use strict";
class Circle {
    // radius:number;
    constructor(radius) {
        this.radius = radius;
        this.radius = radius;
    }
    getArea() {
        return this.radius * this.radius * Math.PI;
    }
}
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
const circle = new Circle(5);
const rectangle = new Rectangle(10, 20);
const shapes = [circle, rectangle];
shapes.forEach(shape => {
    console.log(shape.getArea());
});
// function getCircleArea(circle:Circle){
//   return circle.getArea();
// }
