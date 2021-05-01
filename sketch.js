var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage, obstacleImage;
var FoodGroup, ObstacleGroup;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;



function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  FoodGroup = new Group();
  ObstacleGroup = new Group();

  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width/2;
  backgr.velocityX = -4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

}

function draw() { 
  background(0);


  if(gameState === PLAY) {
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

   if(FoodGroup.isTouching(player)) {
     FoodGroup.destroyEach();
     score += 2;
     player.scale += 0.1;
   } 

   if(ObstacleGroup.isTouching(player)) {
     gameState = END;
   } 
   
  
    player.collide(ground);
    spawnFood();
    spawnObstacle();
  }

 
  drawSprites();
  fill("white");
  stroke("black");
  textSize(20);
  text("Score: " + score, player.x, 50);
  if(gameState === END) {
    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    ObstacleGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over!", 300, 220);
  }
}

function spawnFood() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(1000, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 2500;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacle() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(1000, 325, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -4;

    obstacle.lifetime = 2500;
    player.depth = obstacle.depth + 1;
    ObstacleGroup.add(obstacle);
  }
}

