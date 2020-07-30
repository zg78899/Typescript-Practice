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
    // width:number;
    // height:number;
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
const circle = new Circle(5);
circle.radius = 5;
const rectangle = new Rectangle(10, 20);
const shapes = [circle, rectangle];
shapes.forEach(shape => {
    console.log(shape.getArea());
});
;
const person = {
    name: 'rlawogjs',
    age: 20
};
