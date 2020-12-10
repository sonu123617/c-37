class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  start(){
    if(gameState === 0){
      player = new Player();
      player.getCount();
      form = new Form()
      form.display();
    }
  }
  async start(){
    if(gameState===0){
      player=new Player()
      var Playercountref=await database.ref('playerCount').once("value")
      if(Playercountref.exists()){
        playerCount = Playercountref.val();
        player.getCount();
      }
      form=new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(30)
    text("gamestart",120,100)
    Player.getplayerinfo();   
    if(allplayers!==undefined){
      var display_position=130;
      for(var plr in allplayers){
        if(plr==="player"+player.index)
        fill("red")
        else 
        fill(0)
        display_position+=20
        text(allplayers[plr].name+":"+allplayers[plr].distance,120,display_position)
      }
    }
    if(keyIsDown(UP_ARROW)&&player.index!==null){
      player.distance+=50
      player.update();
    }
    
  }
}
