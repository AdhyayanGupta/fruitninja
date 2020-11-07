var sword, swordImg;

var backGround, backGroundImg;

var fruit, fruit1, fruit2, fruit3, fruit4, fruit1Img, fruit2Img, fruit3Img, fruit4Img;

var monster, monsterIMg;

var gameover, gameoverImg;

var restart, restartImg;

var fruitGroup;
var monsterGroup;

var PLAY= 1;
var END = 0;
var gameState = 1;
var score = 0;

function preload(){
  swordImg = loadImage("sword.png");
  backGroundImg = loadImage("backGround.jpg");
  
  
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  
  monsterImg = loadImage("alien1.png");
  
  gameoverImg = loadImage("gameover.png");
  
  restartImg = loadImage("restart.jpg");


}

function setup() {
  createCanvas(600, 600);

  backGround = createSprite(300,300,600,600);
  backGround.scale = 2;
  backGround.addImage("background",backGroundImg);
  
  sword = createSprite(50,200,20,20);
  sword.addImage("adding sword",swordImg)
  sword.scale = 0.7;
  
  fruitsGroup = createGroup();
  monsterGroup = createGroup();
  
}

function draw() {
   background(20);
  
  
  
 if(gameState === PLAY){
  fruits();
   Enemy();
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
  if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
    score = score+2;
  
  }
    
   if(monsterGroup.isTouching(sword)){
      gameover = createSprite(300,300,600,600);
      gameover.addImage("gameover",gameoverImg);
     monsterGroup.destroyEach();
     
    if(mousePressedOver(restartImg)){
      score = score+1000000;
      }
     
     gameState = END;
    }
   
   
  }
  
  else if(gameState === END){
    
   
    restart();
    
    fruitsGroup.velocityX = 0;
    monsterGroup.velocityX = 0;
    
    fruitsGroup.setLifetimeEach(-1);
    monsterGroup.setLifetimeEach(-1);
    
    
     
    
  }
  
  drawSprites();
  textSize(22);
   stroke("black");
  text("Score: "+ score, 500,50);
}


  function fruits(){
  if(World.frameCount%80 === 0){
    fruit = createSprite(400,200,20,20);
    fruit.scale= 0.2;
    //fruit1.debug= true;
    r= Math.round(random(1,4))
    if(r == 1){
      fruit.addImage(fruit1Img);
    } else if (r == 2){
      fruit.addImage(fruit2Img);
    } else if(r == 3){
      fruit.addImage(fruit3Img);
    } else if(r == 4){
      fruit.addImage(fruit4Img);
    }
    
    fruit.y=Math.round(random(50,400));
    
    fruit.velocityX = -6
    fruit.lifetime = 100;
    
    fruitsGroup.add(fruit);
     
  }
  
}

function Enemy(){
  if(World.frameCount%200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImg);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -6;
    monster.lifeTime = 100;
    
    monsterGroup.add(monster);
  }
}

function restart(){
  if(fruitsGroup.isTouching(sword)){
   restart = createSprite(200,300,20,20);
  }
    
}



