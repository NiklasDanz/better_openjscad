# better_openjscad
## OpenJSCAD Wrapper with Objects
A library that wraps shapes inside of objects so their properties can be accessed and changed at any time

```javascript
// Example:

let myCube = new Cube(2,10,50)
myCube.width = 30
console.log(myCube)

// CONSOLE =>
// {
//    width: 30,
//    length: 10,
//    depth: 50,
//    shape: CSG.cube({radius: [30,10,50]}) <-- Regular OPENJSCAD shape
// }
```

## The Problem
As a programmer I find OPENJSCAD a really neat solution in order to programmatically do CAD work. However as great as OPENJSCAD is, it misses an important part in programming
and that is the greatness of objects. When you create a shape in OPENJSCAD you can set lots of parameters. But since shapes in OPENJSCAD are just functions, they just return
what they expected to: a shitload of polygons.
When I programm however, I often need to review the parameters I inputed earlier and make changes to them.

## The Solution
This basically screams for the use of objects. So I created this script which contains wrapper objects for basic shapes and operations.
And now if you create say a cube and want to access it's length property, you can just call it like this:

```javascript
let myCube = new Cube(2,3,4)
console.log(cube.length) // => 3
```

"So how do I access my regular old cube-shape?" you ask. It's super simple:
```javascript
let regularOldCubeShape = myCube.shape
// CSG.Cube gets called with the properties you specified in myCube and returns a sweet polygon mesh
```

## Documentation

### Basic shapes
#### Cube
```javascript
new Cube(width, length, depth) // Example: new Cube(3,3,3)
```
#### Cylinder
```javascript
// Create cylinder
new Cylinder(radius,height) // Example: new Cylinder(3,4)
// or
new Cylinder(radius,height, direction) // Example: new Cylinder(3,6,[0,0,1])
```

### Basic operations
#### Union
Takes an array of objects and connects their shape properties
```javascript
new Union([Shape1,Shape2,...]) // Add as many shapes as you like but at least two
```
All the objects are still accessable through the properties
```javascript
let cube1 = new Cube(1,1,1)
let cube2 = new Cube(2,2,2)
let myUnitedShapes = new Union([cube1, cube2])

let myCubes = myUnitedShapes.objects // [cube1, cube2]
```
#### Difference
Takes an array of objects and subtracts their shape properties **from the first one** in the array
```javascript
new Difference([ShapeToCutFrom,ShapeToUseForCutting,...]) // supply at least two
```
All the objects are still accessable through the properties just like in the Union example.


### Getting the shapes back
You're done working with objects?
Just call .shape to get back the polygon mesh you're already used to work with.
```javascript
let myCube = new Cube(2,3,4)
let myCubeShape = myCube.shape // regular OPENJSCAD polygon mesh
```
You can also do translations (or any other feature of OPENJSCAD) this way!
```javascript
let translatedCubeShape = myCube.shape.translate([0,0,1]) // regular OPENJSCAD polygon mesh
```
"But wait! I want to make my transformation stick to my object!". No problem, just overwrite the shape!
```javascript
myCube.shape = myCube.shape.translate([0,0,1]) // Now changes are made to the myCube object
```

## Examples
There are two example codes in this library.
- LEGO - A basic lego brick that you can scale on the X and Y
- AirSprayer - A pump head for an air freshener you can buy at the store (WIP)

I tried to keep up with the commenting, but when I created them the intention wasn't really to make perfect example code, but rather have some proof that the library works.
So feel free to have a look. The examples also contain the full library code, so you can just copy them into the OPENJSCAD.org coding window and they will work!

## The Future
This library is far from being finished. There are so many things to add. Starting with implementing a way of letting the objects know where they are placed at.
