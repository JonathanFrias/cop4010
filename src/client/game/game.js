var width = 900, height = (21 * 32) - 8;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'meatpocalypse', { preload: preload, create: create, update: update});

var map, layer, player;

function preload() {
  map = new Map(game);
  map.preLoad();
  player = new Player(game);
  player.preLoad();
  enemy = new Enemy(game);
  enemy.preLoad();
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  bg = game.add.tileSprite(0, 0, width, height, 'background');
  bg.fixedToCamera = true;

  map.create();
//  var carrotLayer = map.objects['Carrot'];
//  var carrotSprite = [];
//
//  carrotLayer.forEach(function(carrot, index) {
//    carrotSprite[index] = game.add.tileSprite(carrot.x, carrot.y, 32, 32, 'carrots');
//  });

  pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
  pauseKey.onDown.add(pauseFunction, this);

  player.create(0, 32 * 15);
  enemy.create(20, 32 * 15);
  game.physics.arcade.gravity.y = 500;
}

function update() {
  player.setCollision(map.layers['First']);

  // set collisions with game objects (tofu, animals, carrots, trash cans)
  map.setCollision(player);

  player.update();
}

function pauseFunction() {
  game.paused = !game.paused;
}
