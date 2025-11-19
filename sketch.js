let fragments = [];
let plant;

function setup() {
  createCanvas(800, 600);

  plant = new Plant(width * 0.5, height - 50);

  // make boxes going upward for memories
  let numFragments = 5;
  let spacing = 100;
  let startY = height - 100; // bottom-most memory

  // bottom-up
  for (let i = 0; i < numFragments; i++) {
    let y = startY - i * spacing;
    let label = "Core Memory " + (i + 1);
    fragments.push(new Fragment(100, y, 150, 50, label));
  }
}

function draw() {
  background(220);

  // timeline
  stroke(100);
  line(175, 80, 175, height - 50);
  noStroke();

  // draw boxes
  for (let i = 0; i < fragments.length; i++) {
    fragments[i].display();
  }

  // draw plant
  plant.display();

  fill(0);
  textAlign(CENTER);
  textSize(16);
  text("Click memories to grow the plant!", width / 2, 40);
}

function mousePressed() {
  // when you click a box, the plant grows
  for (let i = 0; i < fragments.length; i++) {
    let frag = fragments[i];
    if (frag.isClicked(mouseX, mouseY)) {
      plant.grow();
    }
  }
}

class Fragment {
  constructor(x, y, w, h, label) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
  }

  display() {
    fill(255);
    stroke(0);
    rect(this.x, this.y, this.w, this.h, 5);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
  }

  isClicked(mx, my) {
    return (
      mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h
    );
  }
}

class Plant {
  constructor(x, baseY) {
    this.x = x;
    this.baseY = baseY;
    this.height = 50;
  }

  display() {
    stroke(80);
    strokeWeight(4);
    line(this.x, this.baseY, this.x, this.baseY - this.height);
    fill(0);
    noStroke();
    textSize(16);
    text("🌱", this.x, this.baseY - this.height - 10);
  }

  grow() {
    this.height += 20; // grows taller every time you click
  }
}
