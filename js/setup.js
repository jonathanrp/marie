// Define variables
const WORLD_WIDTH = 1000;
const WORLD_HEIGHT = 500;
const GROUND_HEIGHT = 80;
const JUMP_INTERVAL_TIME = 200;
let engine = Matter.Engine.create();
let walkStep = 0;
let jumpStep = 0;
let isJumping = false;
let jumpInterval;

// TO DO: make preloader
const walkArray = [
  "./images/character-01-walking-01.svg",
  "./images/character-01-walking-02.svg",
  "./images/character-01-walking-03.svg",
  "./images/character-01-walking-04.svg",
];
const jumpArray = [
  "./images/character-01-jump-01.svg",
  "./images/character-01-jump-02.svg",
  "./images/character-01-jump-03.svg",
  "./images/character-01-jump-04.svg",
  "./images/character-01-jump-05.svg",
  "./images/character-01-jump-06.svg",
  "./images/character-01-jump-07.svg",
];
const restImage = "./images/character-01-resting.svg";
const downImage = "./images/down.svg";

// Create World
let render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    wireframes: false,
    background: "#618DFF",
  },
});

// Create Ground
let ground = Matter.Bodies.rectangle(
  WORLD_WIDTH / 2,
  WORLD_HEIGHT - GROUND_HEIGHT / 2,
  WORLD_WIDTH,
  GROUND_HEIGHT,
  {
    isStatic: true,
    render: {
      sprite: {
        texture: "./images/ground.png",
      },
    },
  }
);

// Add limits
let limitLeft = Matter.Bodies.rectangle(0, WORLD_HEIGHT / 2, 1, WORLD_HEIGHT, {isStatic: true});
let limitRight = Matter.Bodies.rectangle(WORLD_WIDTH, WORLD_HEIGHT / 2, 1, WORLD_HEIGHT, {isStatic: true});

// Add tube To DO: Add boxes dynamically
let tube = Matter.Bodies.rectangle(750, 370, 110, 110, {
  isStatic: true,
  render: {
    sprite: {
      texture: "./images/tube.png",
    },
  },
});

// Add bricks
let bricks = Matter.Bodies.rectangle(350, 300, 353, 45, {
  isStatic: true,
  render: {
    sprite: {
      texture: "./images/bricks.png",
    },
  },
});

// Add Marie
let marie = Matter.Bodies.rectangle(90, 350, 30, 140, {
  inertia: Infinity,
  render: {
    sprite: {
      texture: restImage,
    },
  },
});

// Run engine
Matter.World.add(engine.world, [limitLeft, limitRight, tube, marie, ground, bricks]);
Matter.Runner.run(engine);
Matter.Render.run(render);
