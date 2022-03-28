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
