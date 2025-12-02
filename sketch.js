let fragments = [];
let plant;
let bg;
let y = 0;
let activePopup = null; //holds the index of the clicked memory
let mem1;
let mem2;
let mem3;

function preload() {
  mem1 = loadImage("images/mem1.jpg")
  mem2 = loadImage("images/mem2.jpg")
  mem3 = loadImage("images/mem3.jpg")
}

function setup() {
  background(214, 214, 214);
  createCanvas(856, 2000);

  plant = new Plant(width * 0.5, height - 50);

  // make boxes going upward for memories
  let numFragments = 20;
  let spacing = 120;
  let startY = height - 150; // bottom-most memory

  // bottom-up
  for (let i = 0; i < numFragments; i++) {
    let y = startY - i * spacing;
    let label = "core memory " + (i + 1);
    fragments.push(new Fragment(100, y, 150, 50, label));
  }
}

function draw() {
  background(224);

  // timeline
  stroke(223, 181, 247);
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
  
   // draw popup if active
  if (activePopup !== null) {
    drawPopup(activePopup);
  }
}

function mousePressed() {
  //if popup is open, check if click is outside popup
  if (activePopup !== null) {

    let popupW = width * 0.6;
    let popupH = height * 0.4;
    let cx = width / 2;
    let cy = height / 2;

    let inside =
      mouseX > cx - popupW/2 &&
      mouseX < cx + popupW/2 &&
      mouseY > cy - popupH/2 &&
      mouseY < cy + popupH/2;

    if (!inside) {
      activePopup = null;
    }
    return;
  }

  //else check if a fragment was clicked
  for (let i = 0; i < fragments.length; i++) {
    if (fragments[i].isClicked(mouseX, mouseY)) {
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
  //button style
  stroke(4);
  strokeWeight(3);
  fill(255, 112, 191);
  rect(this.x, this.y, this.w, this.h, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textFont("Comic Sans MS"); 
  textSize(16);
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
    this.height += 20; //grows taller every time you click
  }
}

function drawPopup(index) {
  push();
  rectMode(CENTER);

  let popupW = width * 0.8;
  let popupH = height * 0.35;
  let cx = width / 2;
  let cy = height / 2;

  //shadow layer
  fill(0, 0, 0, 40);
  noStroke();
  rect(cx + 6, cy + 6, popupW, popupH, 8);

  //main window
  fill(255);
  stroke(0);
  strokeWeight(3);
  rect(cx, cy, popupW, popupH, 8);

  noStroke();
  textAlign(CENTER, CENTER);
  textFont("Comic Sans MS");

  //memory 1 clicked
  if (index === 0) {
    //draw the image
    let imgW = popupW * 0.95;
    let imgH = popupH * 0.6;
    imageMode(CENTER);
    image(mem1, cx, cy - 20, imgW, imgH);

    //draw the caption
    fill(252, 186, 3);
    textSize(22);
    text("where it all started", cx, cy + popupH * 0.35);

  } 
  else if (index === 1) {
  let imgW = popupW * 0.95;
  let imgH = popupH * 0.6;
  imageMode(CENTER);
  image(mem2, cx, cy - 20, imgW, imgH);

  fill(3, 223, 252);
  textSize(22);
  text("brother, my bestfriend, 11yr age gap", cx, cy + popupH * .35);
}
  pop();
}
