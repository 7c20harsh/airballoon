var balloon;
var bg;
var airBalloon;
var database;

function preload(){
 bg=loadImage("pro-C35 images/Hot Air Ballon-01.png");
airBalloon=loadAnimation("pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-03.png",
"pro-C35 images/Hot Air Ballon-04.png");
airballoon1=loadImage("pro-C35 images/Hot Air Ballon-02.png");
}


function setup() {
  createCanvas(1500,700);
    database=firebase.database();
  balloon=createSprite(400, 200, 50, 50);
  balloon.addAnimation("hot air balloon",airBalloon);

  
  var balloonposition=database.ref('balloon/position');
  balloonposition.on("value",readPosition,showError);
  textSize("20");


}

function draw() {
  background(bg);  

  if(keyDown("Left_Arrow")){
    balloon.x=balloon.x-10
    updatePosition(-10,0);
    balloon.addAnimation("hot air balloon",airBalloon);
  }
  else if(keyDown("Right_Arrow")){
    balloon.x=balloon.x+10;
    updatePosition(+10,0);
    balloon.addAnimation("hot air balloon",airBalloon);
  }
  else if(keyDown("Up_Arrow")){
    balloon.y=balloon.y-10;
    updatePosition(0,-10);
    balloon.addAnimation("hot air balloon",airBalloon);
  }
  else if(keyDown("Down_Arrow")){
    balloon.y=balloon.y+10;
    updatePosition(0,+10);
    balloon.addAnimation("hot air balloon",airBalloon);
  }

  
  drawSprites();
  stroke("Blue");
  textSize(20);
  text("Press Arrow Keys To Move The Balloon",40,40);
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x':position.x+x,
    'y':position.y+y
  });
}

function readPosition(data){
  position=data.val();
  console.log(position.x);
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
  console.log("error in writing to the database");
}