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


function main() {
  /*
  let cylinderObj = new Cylinder(2,3)
  let cubeObj = new Cube(1,3,2)
  let cubeObj2 = new Cube(3,1,2)
  let union = new Difference([cylinderObj, cubeObj, cubeObj2])
  return union.shape
  */
  let ring = new Cylinder(1,1);
  let ring2 = new Cylinder(2,4);
  ring2.shape = ring2.shape.translate([0, 0, -ring2.height+ring.height])
  let cap = new Difference([ring2,ring]);
  let hole2 = new Cylinder(1.5,3);
  hole2.shape = hole2.shape.translate([0, 0, -ring2.height+ring.height])
  let capWithHole = new Difference([cap,hole2]);
  return capWithHole.shape
}
