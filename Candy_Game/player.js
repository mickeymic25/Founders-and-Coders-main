class Player {
  constructor(game) {
    this.game = game;
    this.height = 133.33;
    this.width = 160;
    this.x = 0;
    this.y = 100;
    this.image = document.getElementById("player");
  }

  update() {}

  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
