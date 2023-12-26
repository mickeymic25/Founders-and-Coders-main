const canvas = document.getElementById("canvas-1");
const context = canvas.getContext("2d");
const canvas_width = (canvas.width = 1920);
const canvas_height = (canvas.height = 1080);

/************************ANIMATION PLAYER**************************** */
/*
  1.player will be running
  2.Player will be jumping
  3. wins points by hitting normal candy
  4.loses points for hitting stipped candy?
  5.Total width of sprite sheet = 800
  total height of sprite shheet = 400
  
  total player width =800/6 = 133.33px
  total player height =700/3 = 233.33
  
  ****ENTIRE GAME CLASS
   * 
   * 'this' in new player is referring to the game class, because hwo else can player class pass through the player constructer
   * */

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
  }

  update() {}
  draw(context) {
    this.player.draw(context);
  }
}
/*x: 204, y: 178,
{ x: 228, y: 181, width: 64, height: 96 },
  { x: 276, y: 178, width: 64, height: 96 },
  { x: 182, y: 313, width: 65, height: 89 }*/
const ANIMATION_FRAMES = [
  { x: 205, y: 202, width: 64, height: 96 },
  { x: 271, y: 181, width: 64, height: 96 },
  { x: 340, y: 179, width: 65, height: 89 },
];

class Player {
  constructor(game) {
    this.game = game;
    this.height = 700;
    this.width = 800;
    this.x = 0;
    this.y = 800;
    this.image = document.getElementById("player");
    this.animationFrame = 0;
  }

  update() {}

  draw(context) {
    //context.fillStyle = "red";
    //context.fillRect(this.x, this.y, this.width, this.height);

    this.animationFrame += 1;
    if (this.animationFrame >= ANIMATION_FRAMES.length) {
      this.animationFrame = 0;
    }
    const cell = ANIMATION_FRAMES[this.animationFrame];
    context.drawImage(
      this.image,
      cell.x,
      cell.y,
      cell.width,
      cell.height,
      this.x,
      this.y,
      cell.width,
      cell.height
    );
  }
}
const game = new Game(canvas_width, canvas_height);

/***PROBLEMS TO FIX
 *
 * 1.images stacking up over each other: reorganised in array
 * 2. stretched out: correctly set width and height
 * 3. glitches in next frame
 */

//const backgroundLayer1 = new Image();
//backgroundLayer1.src = "images/layer01_ground.png";
/*backgroundLayer1.onload = function () {
  animate();
};*/

/**************THE DOM ********************/

/*************************Javascript classes blueprint for background laeyrs*/

class LayerPlan {
  constructor(layerimage, gamespeed, y_position) {
    this.layerimage = layerimage;
    this.x = 0;
    this.y = y_position;
    this.width = 1920;
    this.x2 = this.width;
    this.height = 1080;
    this.speedLevel = gamespeed;
  }

  update() {
    if (this.x < -1920) {
      this.x = 1920 - this.speedLevel + this.x2;
    } else {
      this.x -= this.speedLevel;
    }

    if (this.x2 < -1920) {
      this.x2 = 1920 - this.speedLevel + this.x;
    } else {
      this.x2 -= this.speedLevel;
    }
  }

  draw() {
    context.drawImage(this.layerimage, this.x, this.y);
    context.drawImage(this.layerimage, this.x2, this.y);
  }
}
/*******************INITIALIZE OBJECTS**************************** */

const groundLayer = new LayerPlan(ground, 2, 0);
const rockLayer = new LayerPlan(rocks, 2, 0);
const cakeLayer = new LayerPlan(cake, 2, 0);
const treeLayer = new LayerPlan(trees, 2, 0);
const cloudsLayer = new LayerPlan(clouds, 2, 0);

const objectsToLoopThrough = [
  rockLayer,
  cloudsLayer,
  treeLayer,
  cakeLayer,
  groundLayer,
];

/************************ANIMATION FRAME**************************** */
function animate() {
  context.clearRect(0, 0, canvas_width, canvas_height);
  objectsToLoopThrough.forEach((object) => {
    object.draw();
    object.update();
  });
  game.draw(context);
  requestAnimationFrame(animate);
}
animate();
