// TN OPENJS WRAPPER
// 2018 by Niklas Danz & Tom Freckem
// WRAPPER OBJECTS FOR OPENJSCAD FUNCTIONS
// use "new" Keyword to create Object and .shape to access it's OPENJSCAD shape
//


// Example: Cube(3,4,3)
function Cube(width, length, depth) {
  this.width = width
  this.length = length
  this.depth = depth
  this.shape = CSG.cube({radius: [width,length,depth]})
}

// Example: Cylinder(2,3) or Cylinder(2,3,[0,0,1])
function Cylinder(radius,height,direction) {
  this.radius = radius
  this.height = height
  if (direction === undefined) {
    this.direction = [0,0,this.height]
  } else {
    this.direction = direction
  }
  this.shape = CSG.cylinder({                      //using the CSG primitives
    start: [0, 0, 0],
    end: this.direction,
    radius: radius,                        // true cylinder
    resolution: 16
  });
}

// Example: Union([Shape1,Shape2,...])
// Behavior: Unions all shapes
function Union(objects){
  this.objects = objects
  var finalShape = this.objects[0].shape
  for (var i = 1; i < objects.length; i++) {
    finalShape = union(finalShape, this.objects[i].shape)
  }
  this.shape = finalShape
}

// Example: Difference([Shape1,Shape2,...])
// Behavior: Subtracts all shapes from Shape1
function Difference(objects){
    this.objects = objects
    var finalShape = this.objects[0].shape
    for (var i = 1; i < objects.length; i++) {
      finalShape = difference(finalShape, this.objects[i].shape)
    }
    this.shape = finalShape
}

function Brick(x, y, wallThickness, object){
  this.wallThickness = wallThickness
  this.object = object
  this.cube = object.objects[0]
  // get cube from input object
  /*
  for (var i = 0; i < object.length; i++) {
    if (checkIfCube(object[i])) {
      this.cube = object.objects[i]
      break
    }
  }*/
  // create cube for subtraction
  let cubeWidth = this.cube.width*(x) - wallThickness*2
  let cubeLength = this.cube.length*(y) - wallThickness*2
  let cubeDepth = this.cube.depth - wallThickness
  let cube = new Cube(cubeWidth, cubeLength, cubeDepth)
  cube.shape = cube.shape.translate([(cubeWidth + wallThickness*2) - this.cube.width, cubeLength + wallThickness*2 - this.cube.length, -wallThickness])

  // create many object from object
  var objectCollection = []
  for (var i = 0; i < x; i++) {
      for (var j = 0; j < y; j++) {
        var temp = Object.assign({}, this.object)//Object.create(this.object)
        temp.shape = temp.shape.translate([i*this.cube.width*2, j*this.cube.length*2, 0])
        objectCollection.push(temp)
        //temp = undefined
      }
  }
  var brickBody = new Union(objectCollection)
/*
  var brickRow = this.object
  for (var i = 1; i <= x; i++){
      let temp = this.object
      temp.shape.translate([x*cubeWidth, 0, 0])
      brickRow = new Union([brickRow, temp])
  }
  var brickCol = brickRow
  for (var j = 0; j < y; j++){
      brickCol = new Union([brickRow, brickCol])
  }*/

  let brick = new Difference([brickBody, cube])
  this.shape = brick.shape
}

function checkIfCube(object){
  if (object.name === "Cube") {
    return true
  }
  return false
}










function main() {
  /*
  let cylinderObj = new Cylinder(2,3)
  let cubeObj = new Cube(1,3,2)
  let cubeObj2 = new Cube(3,1,2)
  let union = new Difference([cylinderObj, cubeObj, cubeObj2])
  return union.shape
  */
  let cubeObj = new Cube(1,1,1)
  let noppenObj = new Cylinder(0.6,1.25)
  let union = new Union([cubeObj, noppenObj])
  let brick = new Brick(7,5,0.18, union)
  return brick.shape
}
