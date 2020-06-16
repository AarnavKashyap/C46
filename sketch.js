
var backgroundImg,canvas,playerImg,groundImg,ground,player,invisibleGround;
var enemyGroup,enemy,enemyAnim,pipesImg,cloudsimg,coinimg;
var score = 0;
var pipes;
var coinCount = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
    backgroundImg = loadImage("bg.png");
    playerImg = loadAnimation("mario2.png","mario1.png");
    //playerdeadImg = loadImage("mario_dead.png");
    groundImg = loadImage("ground.png");
enemyAnim = loadAnimation("enemy1.png", "enemy2.png");
pipesImg = loadImage("pipes.png");
cloudsimg = loadImage("cloud.png");
coinimg = loadImage("coin.png");
bulletImg = loadImage("bullet.png");
}



function setup(){
    player = createSprite(50,displayHeight-200,50,50);
ground = createSprite(displayWidth/2-30,displayHeight - 145,displayWidth,20);
canvas = createCanvas(displayWidth-60,displayHeight-115);

player.addAnimation("mario",playerImg);
player.scale = 0.4;
ground.addImage(groundImg);

invisibleGround = createSprite(displayWidth/2-30,displayHeight-158,displayWidth,20);
invisibleGround.visible = false;

enemyGroup = createGroup();
pipesGroup = createGroup();
coinGroup = createGroup();
cloudsGroup = createGroup();
bulletGroup = createGroup();


}
function draw(){
    background(backgroundImg);
    fill("black");
    textSize(26);
    text("SCORE : " + score, 40,25);
    if(gameState == PLAY){
        ground.velocityX = -4;
        if(ground.x < 0 ){
            ground.x = ground.width/2;
        }
        if(keyDown(UP_ARROW) && player.isTouching(ground)){
            player.velocityY = -15;
        }
        player.velocityY = player.velocityY + 0.8;
        if(enemyGroup.isTouching(player)){
            score -= 1;
            gameState = END;
          }
          if(keyDown("space")){
            bullet = createSprite(player.x,player.y,20,10);
            bullet.addImage(bulletImg);
            bullet.velocityX = 4;
    bulletGroup.add(bullet);
          }
          if(bulletGroup.isTouching(enemyGroup)){
            bulletGroup.destroyEach();
            enemyGroup.destroyEach();
        }
        for(var j = 0;j<coinGroup.length;j++){
            if(coinGroup.isTouching(player)){
                coinGroup.get(j).destroy();
                coinCount += 1;
                
            }
        }
        if(pipeGroup.isTouching(player)){
            score -= 2;
            gameState = END;
        }
        spawnPipes();
    spawnClouds();
    spawnCoins();
    spawnEnemy();
    }

    if(gameState == END){
        ground.velocityX = 0;
        cloudsGroup.setVelocityXEach(0);
        pipesGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);

        cloudsGroup.setLifetimeEach(-1);
        coinGroup.setLifetimeEach(-1);
        enemyGroup.destroyEach();
        pipeGroup.setLifetimeEach(-1);

        player.velocityY = 0;


    }
    
    
    
    
   
    player.collide(invisibleGround);
    
   
    
      
      
      
      
   
    
    drawSprites();
    text("YOUR COIN COUNT : "+ coinCount,displayWidth/2,50);

}
function spawnEnemy(){
    if(frameCount % 300 === 0){
        var enemy = createSprite(displayWidth, displayHeight-200, 50,50);
        enemy.velocityX = -4;
        enemy.addAnimation("enemy",enemyAnim);
        enemy.scale = 0.15;
        enemyGroup.add(enemy);
        enemy.lifetime = 342
    }


}
function spawnPipes(){ 
    if(frameCount %90 === 0){ 
        pipes = createSprite(displayWidth,displayHeight-220,10,10); 
        pipes.addImage("pipes",pipesImg); 
        pipes.velocityX = -5; 
        pipes.scale = 0.5; 
        pipes.lifetime = 342; 
        pipesGroup.add(pipes); 
    } 
}
function spawnClouds(){ 
    if(frameCount %100 === 0){ 
        clouds = createSprite(1200,random(50,150),10,10); 
        clouds.addImage("clouds",cloudsimg); 
        clouds.velocityX = -3; 
        clouds.scale = 2; 
        clouds.lifetime = 342; 
        cloudsGroup.add(clouds); 
    } 
}
function spawnCoins(){ 
    if(frameCount%200 === 0){ 
        for(var i=0 ; i<5 ;i++){ 
            coin = createSprite(displayWidth+i*20,displayHeight/2+30 ,10,10); 
            coin.addImage("coin",coinimg); 
            coin.velocityX = -4; 
            coin.lifetime = 432; 
            coinGroup.add(coin); 
        } 
    } 
}