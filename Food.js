class Food{

    constructor(){

        this.image = loadImage('Milk.png');
        this.foodStock = 20
        this.lastFed
    }

    getFoodStock(){

        var dataFood = database.ref("food")
        dataFood.on("value", function(data){
            foodStock = data.val();
        })

    }

    updateFoodStock(food){

        database.ref("/").update({food:food})

    }

    deductFood(){

    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y+=50
                }
            }
        }

    }
}