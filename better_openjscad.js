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
  this.shape = CSG.cylinder({
    start: [0, 0, 0],
    end: this.direction,
    radius: radius,
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
