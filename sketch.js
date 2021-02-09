var PLAY=1;
var OVER=0;
var gameState=PLAY;

var orangeImg,appleImg,pearImg, bananaImg,enemy1Img,enemy2Img,gameOverImg;
var fruit;
var mon1,mon2;
var sword_,sword,gameOver;

function preload(){
  sword_=loadImage("sword.png");
  enemy1Img=loadAnimation('alien1.png','alien2.png');
  orangeImg=loadImage("fruit1.png");
  appleImg=loadImage("fruit2.png");
  bananaImg=loadImage("fruit3.png");
  pearImg=loadImage("fruit4.png");
  gameOverImg=loadImage("gameover.png");  
}

function setup(){
  createCanvas(600,600);
  
  //sword is created 
  sword=createSprite(40,200,20,20);
  sword.addImage(sword_);
  sword.scale=0.7;
  sword.setCollider("rectangle",0,0,40,40);
  
  score=0;  
  
  //groups are created
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw(){
  background("purple");
  
      if(gameState === PLAY){
        fruits(); 
        enemies();
        
        sword.y = World.mouseY;
        sword.x = World.mouseX;

        if (fruitGroup.isTouching(sword)){
          fruitGroup.destroyEach();
          score=score+2
        }

  else
      {
        if (enemyGroup.isTouching(sword)){ 
          gameState = OVER;
          fruitGroup.destroyEach(); 
          enemyGroup.destroyEach();
          fruitGroup.setVelocityXEach(0);
          enemyGroup.setVelocityXEach(0);
          sword.addImage(gameOverImg);
          sword.scale=1
          sword.x=300;
          sword.y=300;
        }
      }
    }
  
  drawSprites();
  
  fill("red");
  stroke("black");
  textSize(24);
  text("Score: " + score,250,30);
}

function fruits(){ 
    if (World.frameCount % 80 ===0){
      fruit=createSprite(400,200,20,20);
      fruit.scale=0.2;
      var r=Math.round(random(1,4));
      if(r===1){
        fruit.addImage(pearImg);
      }
      else if(r===2){
        fruit.addImage(appleImg);
      }
      else if(r===3){
        fruit.addImage(bananaImg);
      }
      else {
        fruit.addImage(orangeImg);
      }
    
     fruit.y = Math.round(random(50,340));
     fruit.velocityX=-5;
     fruit.setlifetime=100;
     fruitGroup.add(fruit);
    }
  }

function enemies(){
  if(World.frameCount % 80===0){
    mon1=createSprite(400,200,20,20);
    mon1.addAnimation("moving",enemy1Img);
    mon1.y = Math.round(random(100,300));
    mon1.velocityX = -8;
    mon1.lifetime = 50;
    enemyGroup.add(mon1);        
    } 
}