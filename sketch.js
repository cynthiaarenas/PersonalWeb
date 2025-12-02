let fragments = [];
let plant;
let bg;
let y = 0;
let activePopup = null; //holds the index of the clicked memory
let mem1;
let mem2;
let mem3;
let mem4;
let mem5;
let mem6;
let mem7; 
let mem8;
let mem9;
let mem10;
let mem11;
let mem12;
let mem13;
var showVideo = true;
var myVideo;
let mem14;
let mem15;

function preload() {
  mem1 = loadImage("images/mem1.jpg")
  mem2 = loadImage("images/mem2.jpg")
  mem3 = loadImage("images/mem3.jpg")
  mem4 = loadImage("images/mem4.jpg")
  mem5 = loadImage("images/mem5.jpg")
  mem6 = loadImage("images/mem6.jpg")
  mem7 = loadImage("images/mem7.jpg")
  mem8 = loadImage("images/mem8.jpg")
  mem9 = loadImage("images/mem9.jpeg")
  mem10 = loadImage("images/mem10.jpg")
  mem11 = loadImage("images/mem11.jpg")
  mem12 = loadImage("images/mem12.jpg")
  mem13 = loadImage("images/mem13_imgupscaler.ai_Beta_2K.jpg")
  mem14 = loadImage("images/mem14.jpg");
  mem15 = loadImage("images/mem15.jpg");
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

  myVideo = createDiv('  <iframe width="560" height="315" src="https://www.youtube.com/embed/fa49r2k2Igc" title="a 2000s baddie playlist to boost your confidence | y2k playlist" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
  // <iframe width="560" height="315" src="https://www.youtube.com/embed/fa49r2k2Igc" title="a 2000s baddie playlist to boost your confidence | y2k playlist" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  myVideo.position(0, 0);
  myVideo.hide(); //start hidden 
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
      myVideo.hide();
    }
    return;
  }

  //else check if a fragment was clicked
  for (let i = 0; i < fragments.length; i++) {
    if (fragments[i].isClicked(mouseX, mouseY)) {
      if (activePopup !== 13) myVideo.hide(); // Hide if not video popup
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
    fill(235, 52, 198);
    textSize(22);
    text("where it all started", cx, cy + popupH * 0.35);

  } 
  else if (index === 1) {
  let imgW = popupW * 0.95;
  let imgH = popupH * 0.6;
  imageMode(CENTER);
  image(mem2, cx, cy - 20, imgW, imgH);

  fill(18, 17, 18);
  textSize(22);
  text("brother, my bestfriend, 11yr age gap", cx, cy + popupH * .35);
}
else if (index === 2) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;

  imageMode(CENTER);
  image(mem3, cx, cy - 20, imgW, imgH);
  fill(color(random(255), random(255), random(255)));

  textSize(22);
  text("headstart, was the kid who cried the most :(", cx, cy + popupH * 0.4);
}
else if (index === 3) {
  let imgW = popupW * 0.95;
  let imgH = popupH * 0.5;
  imageMode(CENTER);
  image(mem4, cx, cy - 20, imgW, imgH);

  fill(255, 255, 38);

  textSize(22);
  text("TIME JUMP -> same us just aged?...also first time in NYC!", cx, cy + popupH * 0.35);
}
else if (index === 4) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem5, cx, cy - 20, imgW, imgH);

  fill(250, 254, 255);

  textSize(22);
  text("i fear i still love stuffies", cx, cy + popupH * 0.35);
}
else if (index === 5) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem6, cx, cy - 20, imgW, imgH);

  fill(0, 104, 71);

  textSize(22);
  text("Popsicles playing pacman--says it's from his days?", cx, cy + popupH * 0.4);
}
else if (index === 6) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem7, cx, cy - 20, imgW, imgH);

  fill(40, 75, 201);

  textSize(22);
  text("forgot to mention → transferred high schools", cx, cy + popupH * 0.4);
  text("→ extreme culture shock. nothing like it", cx, cy + popupH * 0.43);
  text("→ tbh… changed trajectory of my life ._.", cx, cy + popupH * 0.46);
}
else if (index === 7) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem8, cx, cy - 20, imgW, imgH);

  fill(255, 167, 36);

  textSize(22);
  text("sunset", cx, cy + popupH * 0.4);
}
else if (index === 8) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem9, cx, cy - 20, imgW, imgH);

  fill(255, 200, 18);

  textSize(22);
  text("got into college, yay!", cx, cy + popupH * 0.4);
}
else if (index === 9) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem10, cx, cy - 20, imgW, imgH);

  fill(189, 187, 181);

  textSize(22);
  text("homesick, very homesick (some regrets here)", cx, cy + popupH * 0.4);
}
else if (index === 10) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem11, cx, cy - 20, imgW, imgH);

  fill(110, 94, 79);

  textSize(22);
  text("milkshake", cx, cy + popupH * 0.4);
}

else if (index === 11) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem12, cx, cy - 20, imgW, imgH);

  fill(255, 19, 3);

  textSize(22);
  text("bittersweet", cx, cy + popupH * 0.4);
}
else if (index === 12) {
  let imgW = popupW * 0.8;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem13, cx, cy - 20, imgW, imgH);

  fill(252, 3, 173);

  textSize(22);
  text("looking forward to the future", cx, cy + popupH * 0.4);
}

else if (index === 13) {
  let videoW = popupW * 0.7;
  let videoH = popupH * 1.65;
  
  myVideo.position(videoW, videoH);
  myVideo.size(videoW, videoH);
  myVideo.show();
}
else if (index === 14) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem14, cx, cy - 20, imgW, imgH);

  fill(110, 94, 79);

  textSize(22);
  text("life recently", cx, cy + popupH * 0.45);
}
else if (index === 14) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem14, cx, cy - 20, imgW, imgH);

  fill(110, 94, 79);

  textSize(22);
  text("life recently", cx, cy + popupH * 0.45);
}
else if (index === 15) {
  let imgW = popupW * 0.5;
  let imgH = popupH * 0.8;
  imageMode(CENTER);
  image(mem15, cx, cy - 20, imgW, imgH);

  fill(34, 46, 39);

  textSize(22);
  text("☆⋆｡𖦹°‧★end of 19☆⋆｡𖦹°‧★.", cx, cy + popupH * 0.45);
}

  pop();
}
