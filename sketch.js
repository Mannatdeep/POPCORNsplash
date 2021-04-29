var PLAY = 1;
var END = 0;
var gameState = PLAY;

var popcorn, happyPopcorn, popcornMeal, sadPopcorn;
var  obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var gameOver, restart,gameOverImg,restartImg, background1, backgroundImg;
var score=0;
//localStorage["HighestScore"] = 0;

function preload(){
  popcornMeal = loadImage("popcornmeal.jpg");
  happyPopcorn = loadImage("happypopcorn.png");
  sadPopcorn = loadAnimation("sadpopcorn.jpg");
  obstacle1 = loadImage("choco_mon.png");
  obstacle2 = loadImage("monster2.png");
  obstacle3 = loadImage("mouse1.png");
  obstacle4 = loadImage("monster1.png");
  obstacle5 = loadImage("spider.png");
  obstacle6 = loadImage("burger1.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameover.png")
  backgroundImg = loadImage("Tunnel.webp")
}
  
function setup() {
  createCanvas(1200, 800);
  textSize(30);
  fill("black");
  text("Score: "+ score, 600,450);
  background1 = createSprite(0,0,1200,800);
  background1.addImage(backgroundImg);
  background1.scale = 6.5;


  popcorn = createSprite(810,780,10,10);
  
  popcorn.addImage("running", happyPopcorn);
 // popcorn.addAnimation("sad", sadPopcorn);
  
 popcorn.scale = 0.2;
  
  ground = createSprite(600,780,1200,20);
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 );
  ground.visible = false;
  
  gameOver = createSprite(550,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,200);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(600,790,1200,20);
  invisibleGround.visible = false;
 
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(0);
  
  if(keyDown(LEFT_ARROW) && popcorn.x>0){
    popcorn.x -=10; 
   // console.log(popcorn.x);
   }

   if(keyDown(RIGHT_ARROW) && popcorn.x<1200){
     popcorn.x +=10;
    // console.log(popcorn.x);
   }
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6);
  
    if(keyDown("space") && popcorn.y >= 780) {
      popcorn.velocityY = -12;
    }

  
    popcorn.velocityY = popcorn.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  popcorn.collide(invisibleGround);
   
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(popcorn)){
        gameState = END;
    }
  }
  else if (gameState === END) {


    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    popcorn.velocityY = 0;
    obstaclesGroup.setVelocityYEach(0);
    
    
  
  //popcorn.changeAnimation("sad",sadPopcorn);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}




function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(Math.round(random(100,900)),-10,10,40);
    //obstacle.debug = true;
    obstacle.velocityY = 3 + frameCount/100;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.scale=1;
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale=1;
              break;
      case 3: obstacle.addImage(obstacle3);
      obstacle.scale=1.0;
              break;
      case 4: obstacle.addImage(obstacle4);
      obstacle.scale=1;
              break;
      case 5: obstacle.addImage(obstacle5);
      obstacle.scale=0.5;
              break;
      case 6: obstacle.addImage(obstacle6);
      obstacle.scale=1;
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
   // obstacle.scale = 0.25;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
 
  
}