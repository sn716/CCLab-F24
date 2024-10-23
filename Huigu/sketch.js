let stars = [];
let numStars = 500;
let stones = [];
let numStones = 50; 
let numDots = 50;  
let xArray = []; 
let yArray = []; 
let moveX = 1;  
let moveY = 1;  
let startScreen = true;
let planets = [];s

function setup(){
//   createCanvas(800, 600);
let cnv = createCanvas(800, 600);
cnv.parent("p5-canvas-container");
  
  for (let i = 0; i < numStars; i++) {
    stars[i] = createVector(random(width), random(height));
  }

  for (let i = 0; i < numStones; i++) {
    stones[i] = {
      x: random(width),
      y: random(height - 200, height - 50),
      size: random(10, 30),
    };
  }

  for (let i = 0; i < numDots; i++) {
    xArray[i] = random(100, 300); 
    yArray[i] = random(100, 300); 
  }

  for (let i = 0; i < 3; i++) {
    planets[i] = {
      x: random(width),
      y: random(height - 300),
      size: random(30, 70),
    };
  }
}

function draw() {
  if (startScreen) {
    background(0);
    
    fill(0, 102, 204);
    ellipse(width / 2, height / 2, 300, 300); 

    for (let j = 0; j < 10; j++) { 
      let angle = random(TWO_PI);
      let radius = 150; 
     
      fill(random(255), random(255), random(255), 150); 
      ellipse(width / 2 + cos(angle) * radius, height / 2 + sin(angle) * radius, 10, 10); 
    }

    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Click to Start", width / 2, height - 50);
  } else {
    background(0);
  
    for (let star of stars) {
      star.x += 0.1; 
      if (star.x > width) {
        star.x = 0; 
      }
      fill(255);
      noStroke();
      ellipse(star.x, star.y, 2, 2); 
    }
    
    fill(100);
    rect(0, height - 250, width, 250); 
    
    fill(80);
    noStroke();
    for (let stone of stones) {
      ellipse(stone.x, stone.y, stone.size, stone.size);
    }

    fill(255, 204, 0);
    for (let planet of planets) {
      ellipse(planet.x, planet.y, planet.size, planet.size);
    }

    for (let i = 0; i < numDots; i++) {
      xArray[i] += moveX * 1;  
      yArray[i] += moveY * 1;  

      if (xArray[i] < 0 || xArray[i] > width) {
        moveX *= -1;
      }
      if (yArray[i] < 0 || yArray[i] > height) {
        moveY *= -1;
      }

      fill(66, 158, 157);  
      noStroke();
      ellipse(xArray[i], yArray[i], 10, 10);  
      
//my cookieeee
//   fill(194, 142, 80);  
//   noStroke();
//   ellipse(60, height - 80, 50, 50);  

//   fill(80, 50, 20);  
//   ellipse(60 - 10, height - 70 - 25, 10, 10);  
//   ellipse(60 + 15, height - 70 - 20, 10, 10);  
//   ellipse(60 - 15, height - 90 + 15, 10, 10);  
//   ellipse(60 + 10, height - 90 + 25, 10, 10);  
//   ellipse(60, height - 80, 10, 10);
      
    }
  }
}

function mousePressed() {
  startScreen = false; 
}