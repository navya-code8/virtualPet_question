
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;
var ground;
var gameState = "play"
var feedDog, feed, addFood
var fedTime, lastFed;
var foodObj;


function preload()
{
  dogImg = loadAnimation("dogImg.png")
  happyDogImg = loadAnimation("dogImg1.png")

}


function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  ground = createSprite(250,480, 500, 40)
  ground.shapeColor = "Gainsboro"

  dog = createSprite(250,390, 100, 100);
  dog.addAnimation("dog", dogImg);
  dog.addAnimation("happydog", happyDogImg)
  dog.scale = 0.25

  foodStock=database.ref('food'); 
  foodStock.on("value",readStock); 

  feed = createButton("Feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog)


}


function draw() {  
  background("skyblue");

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeAnimation("happydog",happyDogImg)
  }

  if(keyWentUp(DOWN_ARROW)){
    dog.changeAnimation("dog",dogImg)
  }

  drawSprites();
  if (foodS === 0){
    gameState = "end";
    fill("black")
    text("Press R key to get more food", 160, 50);
  }

  if (gameState === "end" && keyDown("r")){
    database.ref('/').update({ food: 20 });
    gameState = "play"
  }
  

  fill("black");
  text("Food remaining: "+foodS, 200, 200);
  text("NOTE: Press up-arrow key to feed your dog!", 140, 100)
}

function readStock(data){
  foodS = data.val();
  console.log(data.val())
}

function writeStock(x){

  if(x<=0){
    x=0
  }

  else{
    x=x-1
  }


  database.ref('/').update({
    food:x
  })

 
}
