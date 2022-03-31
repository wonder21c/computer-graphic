**light**
```p5.js
function setup() {
  createCanvas(400, 400, WEBGL);
}
function draw() {
  background(0);
  lights();
  rotateX(millis() / 1000);
  rotateY(millis() / 1000);
  rotateZ(millis() / 1000);
  box();
}
```
##
**spotLight**
```p5.js
function setup() {
  createCanvas(400, 400, WEBGL);
}
function draw() {
  background(0);
  //move your mouse to change light position
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  // to set the light position,
  // think of the world's coordinate as:
  // -width/2,-height/2 -------- width/2,-height/2
  //                |            |
  //                |     0,0    |
  //                |            |
  // -width/2,height/2--------width/2,height/2
  ambientLight(50); //캔버스의 모든 영역에서 나오는 조명
  spotLight(0, 250, 0, locX, locY, 200, 0, 0, -1, Math.PI / 16); //spotLight(r,g,b,x축,y축,z축,조명의 x축 방향,조명의 y축 방향, 조명의 z축 방향,각도)
  noStroke();
  sphere(100);
}
```
##
**createCamera**
```p5.js
let camera;
function setup() {
  createCanvas(400, 400, WEBGL);
  background(0);
  camera = createCamera();
}

function draw() {
  background(0);
  camera.lookAt(0, 40, 0); //카메라 위치
  camera.setPosition(sin(frameCount / 60) * 100, 0, 100); //카메라 각도
  box(20);
}
```
##
**perspective();,ortho();**
```p5.js
let camera;
function setup() {
  createCanvas(500, 500, WEBGL);
  background(0);
  camera = createCamera();
 // camera.perspective(PI / 6.0, width / height, 0.1, 500 ; //투시 투영법(흔히 우리가 생각하는 입체)
  //camera.ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500)} //직교 투영법(우리가 수학시간에 보는 입체 정사각형)
}

function draw() {
  background(0);
  rotateX(-0.2);
  rotateY(-0.2);
  push();
  //translate(-10, 0, sin(frameCount / 30) * 55);
  box(30);
  pop();
}
```
##
**3차원 지형**
```p5.js
var cols, rows;
var scl = 20;
var w = 1000; 
var h = 1000;

var flying = 0;

var terrain = [];
let camera;

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;
  camera = createCamera();

  for (var x = 0; x < cols; x++) {
    terrain[x] = []; //1D
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now //2D
    }
  }
  
}

function draw() {
  normalMaterial();
  flying -= 0.009;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  background(0);
  translate(0, 50);
  rotateX(PI / 3);
  //fill(200, 200, 200, 150);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      let v = terrain[x][y];
      v = map(v, -100,100,0,255);
      fill(v-64,v-32,v);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
    
    translate(500, -2000);
   translate(mouseX-width/2, (mouseY-height/2)*6);
    rotate(PI/5);
    push();
    camera.lookAt(10, -150, -100);
    camera.setPosition(sin(millis() / 1000) * 100, -10, 100);

 
    noStroke();
    fill(270,330,0);
    sphere(200);  
    pop();
    pointLight(2500, 250, 250, mouseX, mouseY, 50);
  
}
```

