var i = 0;

var rainbowEffect;
var shootingEffect;

function setup() {
   var canvas = createCanvas(1024,768); 
  canvas.parent('sketch-holder2');
  //눈의 초기갑 셋팅
  snowInit();
}

function draw() {
  image(backgroundImg, 0, 0);
 // fill(255);
  //rect(0,0,120,150);
  //fill(100);
 // text("drop_Count : " + drop_Count, 20, 50);
  //text("X "+ mouseX, 20, 80);
  //text("Y "+ mouseY, 20, 110);

  drawStar();

  drawSnow();
  
  if(bigSnowDelay == false) {
    drawBigSnow();
  }
  //포탄
  push();
  scale(1.2);
  image(bomb, 670,400);
  pop();
  
  if(frameCount%90 == 0) {
    bigSnowDelay = true;
    BigSnow_X = 845;
    BigSnow_Y = 510;
  }
}







function mousePressed() {
  if(true) 

  if(mouseX > 470 && mouseX < 570 && mouseY > 70 && mouseY < 150) {
    if(rainbow == false) {
    rainbow = true; 
    rainbowEffect.play();
    }
    else
    rainbow = false;
    
    changeRainbow();
  }
  if (mouseX > 814 && mouseX < 888 && mouseY > 495 &&
  mouseY < 608 ) {
    if(bigSnowDelay == true){
    shootingEffect.play();
    bigSnowDelay = false;
    snow_enable = true;
    if(drop_Count < drop_MAX) 
    drop_Count += 5;
    }

  }
  
  if(drop_Count == drop_MAX) {
    if(snow_r_max < 500) {
      snow_r_max += 30;
      snow_r_min += 30;
    }
    else {
      drop_Count = -15;
      snow_r_max = 30;
      snow_r_min = 10;
      snowInit();
      snow_enable = false;
    }
  }
  

}





function drawStar() {
  push();
 fill(240,240,80);
translate(470,70);
noStroke();
beginShape();
vertex(50, 1.2);
vertex(65.1, 32.3);
vertex(99.3, 37.1);
vertex(74.4, 61.1);
vertex(80.5, 95.1);
vertex(50, 78.8);
vertex(19.5, 95.1);
vertex(25.6, 61.1);
vertex(0.7, 37.1);
vertex(34.9, 32.3);
endShape(CLOSE);
pop();
 
}




var drop_X = new Array();
var drop_Y = new Array();
var drop_R = new Array();
var drop_V = new Array();
var drop_r = new Array();
var drop_g = new Array();
var drop_b = new Array();

var drop_MAX = 100;
var snow_enable = false;
var index_d = 0;
var drop_Count = 0;
var rainbow = false;

var snow_r_max = 30;
var snow_r_min = 10;
var snow_v_max = 2;
var snow_v_min = 5;
var BigSnow_X = 845;
var BigSnow_Y = 510;

var bigSnowDelay = true;


function drawBigSnow() {
  push();
  translate(BigSnow_X,BigSnow_Y);
  fill(255);
  stroke(180);
  ellipse(10,10,70,70);
  pop();
  BigSnow_X -= 10/2;
  BigSnow_Y -= 38.4/2;
  
}

function drawSnow() {
  if(snow_enable == true) {
   for(var i = 0; i < drop_Count; i++) {
         if(drop_Y[i] < 768) {
           index_d = i;
           drawDrop();
         }
         else {
           //땅에 도달하면 새로운 값을 셋팅 해준다!
           drop_Y[i] = -50;
           drop_R[i] = random(snow_r_min,snow_r_max);
           drop_X[i] = random(0,width);
           drop_V[i] = random(snow_v_min,snow_v_max);

       }
    }
  }
}

function drawDrop() {
  var x = drop_X[index_d];
  var y = drop_Y[index_d];
  var R = drop_R[index_d];
  var v = drop_V[index_d];
  var r = drop_r[index_d];
  var g = drop_g[index_d];
  var b = drop_b[index_d];
  
  push();
  translate(x,y);
  fill(r,g,b);
  stroke(180);
  ellipse(10,10,R,R);
  pop();
  
  drop_Y[index_d] += v;


}

function changeRainbow() {
    var r = [255,255,255,225,190,165,165,165,190,255];
    var g = [165,195,225,225,255,255,230,190,165,165];
    var b = [165,165,165,165,165,200,255,255,255,235];
    var p = 0;
    
    
    if(rainbow == true) {
     for(var i = 0; i < drop_MAX; i++) {
       drop_r[i] = r[p];
       drop_g[i] = g[p];
       drop_b[i] = b[p];
       p++;
       if(p == 10) 
       p = 0;
     } 
    }
    else {
      for(var i = 0; i < drop_MAX; i++) {
       drop_r[i] = 255;
       drop_g[i] = 255;
       drop_b[i] = 255;
     } 
    }
    
    
    
}

function snowInit() {
    for(var i = 0; i < drop_MAX; i++ ){
       index_d = i;
       drop_X[index_d] = random(0,width);
       drop_Y[index_d] = -300;
       drop_R[i] = random(snow_r_min, snow_r_max);
       drop_V[i] = random(snow_v_min,snow_v_max);
       drop_r[i] = 255;
       drop_g[i] = 255;
       drop_b[i] = 255;
    }
}

var backgroundImg;
var bomb;
function preload() {
  backgroundImg = loadImage('images/ChristmasTree.jpg');
  bomb = loadImage('images/bomb.png');
  soundFormats('mp3', 'ogg', 'wav');
  
  rainbowEffect = loadSound('data/rainbowEffect.wav'); 
  shootingEffect = loadSound('data/shooting.wav');
  
}
