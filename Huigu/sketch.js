let stars = [];
let numStars = 500;
let stones = [];
let numStones = 50;
let numDots = 20;
let dots = [];
let startScreen = true;
let planets = [];
let shuttleY = 300;
let direction = 1;
let showCookie = false;
let clickEnded = false;

function setup() {
//createCanvas(800, 600);
let cnv = createCanvas(800, 600);
cnv.parent("p5-canvas-container");

  noStroke();

  for (let i = 0; i < numStars; i++) {
    stars[i] = { x: random(width), y: random(height) };
  }

  for (let i = 0; i < numStones; i++) {
    stones[i] = {
      x: random(width),
      y: random(height - 200, height - 50),
      size: random(10, 30),
    };
  }

  for (let i = 0; i < numDots; i++) {
    dots[i] = {
      x: random(width),
      y: random(height - 220, height - 50),
      exploded: false,
      color: [66, 158, 157],
      scatter: 0,
    };
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
  if (clickEnded) {
    background(0);
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER);
    text("These are creatures", width / 2, height / 2 - 80);
    text("that can help fight climate change.", width / 2, height / 2 - 40);
    text("When they turn into", width / 2, height / 2);
    text("colorful dusts it means they're dead.", width / 2, height / 2 + 40);
    text("As expected,", width / 2, height / 2 + 80);
    text("humans always cause EXTINCTION.", width / 2, height / 2 + 120);
  } else if (startScreen) {
    background(0);
    
     for (let star of stars) {
      fill(255);
      noStroke();
      ellipse(star.x, star.y, 2, 2);
    }

    fill(0, 102, 204);
    ellipse(width / 2, height / 2, 300, 300);

    for (let j = 0; j < 10; j++) {
      let angle = random(TWO_PI);
      let radius = 150;
      fill(random(255), random(255), random(255), 150);
      ellipse(
        width / 2 + cos(angle) * radius,
        height / 2 + sin(angle) * radius,
        10,
        10
      );
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

    //grund - maybe make an circle
    fill(100);
    rect(0, height - 220, width, 250);

    fill(80);
    noStroke();
    for (let stone of stones) {
      ellipse(stone.x, stone.y, stone.size, stone.size);
    }

    fill(255, 204, 0);
    for (let planet of planets) {
      ellipse(planet.x, planet.y, planet.size, planet.size);
    }

    for (let dot of dots) {
      if (!dot.exploded) {
        if (showCookie) {
          let dx = 60 - dot.x;
          let dy = height - 80 - dot.y;
          let distance = dist(dot.x, dot.y, 60, height - 80);

          if (distance < 10) {
            dot.exploded = true;
            dot.color = [random(255), random(255), random(255)];
            dot.scatter = random(TWO_PI);
            showCookie = false;
          } else {
            dot.x += (dx / distance) * 2;
            dot.y += (dy / distance) * 2;
          }
        }
      } else {
        dot.x += cos(dot.scatter) * 2;
        dot.y += sin(dot.scatter) * 2;
      }
    }

    if (dots.every((dot) => dot.exploded)) {
      clickEnded = true;
    }

    for (let dot of dots) {
      fill(dot.color[0], dot.color[1], dot.color[2]);
      noStroke();
      ellipse(dot.x, dot.y, 10, 10);
    }

    shuttleY += direction * 0.5;

    if (shuttleY > 310) {
      direction = -1;
    } else if (shuttleY < 290) {
      direction = 1;
    }

    // Body of my ship shuttle
    fill(255);
    rect(100, shuttleY, 60, 120, 10);

    // Top of my ship shuttle
    fill(255);
    triangle(100, shuttleY, 160, shuttleY, 130, shuttleY - 50);

    // Window
    fill(0, 153, 255);
    rect(115, shuttleY + 20, 30, 15, 5);

    // FIREEE
    fill(255, 165, 0);
    triangle(130, shuttleY + 120, 100, shuttleY + 170, 160, shuttleY + 170);
    fill(255, 0, 0);
    triangle(130, shuttleY + 120, 120, shuttleY + 150, 140, shuttleY + 150);

    if (showCookie) {
      fill(194, 142, 80);
      noStroke();
      ellipse(60, height - 80, 50, 50);
      fill(80, 50, 20);
      ellipse(60 - 10, height - 70 - 25, 10, 10);
      ellipse(60 + 15, height - 70 - 20, 10, 10);
      ellipse(60 - 15, height - 90 + 15, 10, 10);
      ellipse(60 + 10, height - 90 + 25, 10, 10);
      ellipse(60, height - 80, 10, 10);
    }
  }
}

function mousePressed() {
  if (startScreen) {
    startScreen = false;
  } else if (showCookie) {
  } else {
    showCookie = true;
  }
}
