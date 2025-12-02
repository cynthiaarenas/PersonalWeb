let fragments = [];
let plant;
let bg;
let y = 0;

let font1;
let font2;
let font3;
let font4;
// let font5;
// let font7;

let activePopup = null; // will hold the index of the clicked memory


function preload() {
  font1 = loadFont("fonts/font.ttf");   // first font
  font2 = loadFont("fonts/font2.ttf");   // second font
  font3 = loadFont("fonts/font3.ttf");
  font4 = loadFont("fonts/font4.ttf");
  // font5 = loadFont("font5.ttf");
  // font7 = loadFont("Orbitron-VariableFont_wght.ttf");
}

function setup() {
  bg = loadImage('images/hello-kitty-heart-pattern-bslk2qzd8cgpwpcr.jpg');
  // createCanvas(720, 400);
  createCanvas(800, 800);

  // textSize(100);

  plant = new Plant(width * 0.5, height - 50);

  // make boxes going upward for memories
  let numFragments = 5;
  let spacing = 100;
  let startY = height - 100; // bottom-most memory

  // bottom-up
  for (let i = 0; i < numFragments; i++) {
    let y = startY - i * spacing;
    let label = "core memory " + (i + 1);
    fragments.push(new Fragment(100, y, 150, 50, label));
  }
}

function draw() {
  background(bg);

  // timeline
  stroke(242, 0, 157);
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
  textSize(28);
  

  // Draw "i" with font1
  textFont(font4);
  fill(232, 19, 157);
  text("click memories to grow the plant!", width / 2, 40);

   // draw popup if active
  if (activePopup !== null) {
    drawPopup(activePopup);
  }

}

function mousePressed() {
  //if the popup is open, clicking anywhere closes it
  if (activePopup !== null) {
    activePopup = null;
    return;
  }

  for (let i = 0; i < fragments.length; i++) {
    let frag = fragments[i];
    if (frag.isClicked(mouseX, mouseY)) {
      plant.grow();
      activePopup = i;
      return;
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
    fill(226, 242, 0);
    stroke(0);
    rect(this.x, this.y, this.w, this.h, 5);
    fill(3, 53, 255); // core memory
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
    // text()
    text("me", this.x, this.baseY - this.height - 10);
  }

  grow() {
    this.height += 20; // grows taller every time you click
  }
}

function drawPopup(index) {
  //attempting popup box
  fill(255, 240);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);

  let popupW = 400;
  let popupH = 250;

  rect(width / 2, height / 2, popupW, popupH, 20);

  //text inside popup
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);

  // basic content for now
  text("placeholder xxx " + fragments[index].label, width / 2, height / 2);

}
