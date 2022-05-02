  function Bird() {
  this.y = height/2; //weight/2;
  this.x =64;

  this.score = 0;
  this.gravity = 0.5;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }
  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.vaelocity *= 0.8;
    this.y += this.velocity;


    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
  this.scoreCount = function(bird) { 
    this.score = this.score + 1;
   
  }

  this.printScore = function() {
    
    textSize(60);
    textAlign(CENTER);
    text('score: '+this.score, 200,100);
  }
  
  this.resetScore = function(){
    this.score = 0 ;
  }
}

var bird;
var pipes = [];
function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new pipe());
}


function draw() {
  background(0);

  for (var i = pipes.length-1; i>= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
      bird.resetScore();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();
  bird.scoreCount(bird);
  bird.printScore();
  if (frameCount % 100 == 0) {
    pipes.push(new pipe());
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}

function pipe() {
  var spacing = random(50, height/2);
  var centery = random(spacing, height - spacing);

  //this.score = 0;
  this.top = centery - spacing/2;
  this.bottom =height -(centery + spacing/2);
  this.x = width;
  this.w = 40;
  this.speed = 2;

  this.highligth = false;

  this.hits = function(bird) {
    if (bird.y <this.top || bird.y > height - this.bottom) {
      if (bird.x>this.x && bird.x< this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    return false;
  }

  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
