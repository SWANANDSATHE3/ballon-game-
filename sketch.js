//Game states
var Play=1;
var End=0;
var gameState=1;

var sword;
var f1,f2,f3,f4;
var a1;

var score;

var knifeSound;

var monsterImage;

var gameOverSound;
var gameOverImage, gameOver;

function preload(){
  
 swordImage= loadImage("sword.png")
  f1 = loadImage("fruit1.png")
  f2 = loadImage("fruit2.png")
  f3 = loadImage("fruit3.png")
  f4 = loadImage("fruit4.png")
  a1 = loadImage("alien1.png")
  
  knifeSound=loadSound("knifeSwooshSound.mp3")
  
  monsterImage=loadImage("alien1.png")
  
  gameOverSound=loadSound("gameover.mp3")
  
  gameOverImage=loadImage("gameover.png")
  
}


function setup(){
     createCanvas(600,600);
  
 sword= createSprite(40,200,20,20)
  sword.addImage(swordImage)
  sword.scale=0.7;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
  
  sword.setCollider("rectangle",0,0,40,40)
  
  score=0;
  
  gameOver=createSprite(300,300);
  gameOver.visible=false;
}


function draw(){
   background("lightblue");
  
  
  if(gameState === Play){
    
 sword.y=mouseY;
  sword.x=mouseX;
   spawnFruits();
    
   Enemy();
     if(enemyGroup.isTouching(sword)){
     gameState=End;
     //gameOver sound
     gameOverSound.play();
       
     
   }
    if (sword.isTouching(fruitGroup)){
     fruitGroup.destroyEach();
     score=score+1
     
    knifeSound.play();
     score=score+2;
 }
    
}
  if(gameState===End){
    
    gameOver.visible=true;
    gameOver.addImage(gameOverImage)
    
    
    
    
  }
  
  
  
  text("Score :"+ score,220,11);
    
  drawSprites();
}
 function spawnFruits(){
  if(World.frameCount%80===0){
    var fruit= createSprite(400,200,20,20)
    fruit.scale=0.2;
    //fruit.debug=true;
    r = Math.round(random(1,4))
    if (r == 1) {
      fruit.addImage(f1);
    }  else if (r == 2){
      fruit.addImage(f2);
    } else if (r == 3){
      fruit.addImage(f3);
    } else {
      fruit.addImage(f4);
    }
    
   fruit.y=Math.round(random(50,340));
    
    //fruit.velocityX=-7;
    fruit.setlifetime=100;
    
    fruitGroup.add(fruit);
     
   
   
   
  
   position = Math.round(random(1,2));
 // fruit=createSprite(40,200,20,20);

  if(position==1)
  {
    fruit.x=600;
    fruit.velocityX=-(7+(score/4));
  }
   else
 {
   if(position==2){
     fruit.x=0;
     
     //Increse the velocity of the fruit after score 4 or10
     fruit.velocityX=(7+score/4)
   }
  }
  }
 }

    function Enemy (){
    if(World.frameCount%200===0) {
      monster=createSprite(400,200,20,20);
      monster.addAnimation("moving", monsterImage);
      monster.y=Math.round(random(100,300))
      monster.velocityX=-(8+(score/10));
      monster.setLifetime=50;
      
      enemyGroup.add(monster);
    } 
       } 

       if(gameState === End){
     
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
      
         sword.addImage(gameOverImage);
         sword.x=200;
         sword.y=200;
     
     
     }
