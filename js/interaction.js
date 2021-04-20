//Interaction begins here
document.onkeydown = checkKey;
document.onkeyup = rest;

// Marie is resting
function rest() {
  if (!isJumping) {
    marie.render.sprite.texture = restImage;
  }
  jumpStep = 0;
  walkStep = 0;
}

// Marie is walking
function callWalkSprite() {
  if (walkStep < walkArray.length - 1) {
    // Increase frame number
    walkStep += 1;
  } else {
    // Set frame to 0 when it gets to the end of walkArray
    walkStep = 0;
  }
  marie.render.sprite.texture = walkArray[walkStep];
}

// Marie is jumping
function jumping() {
  if (jumpStep < jumpArray.length - 1) {
    jumpStep += 1;
  } else {
    jumpStep = 0;
  }
  marie.render.sprite.texture = jumpArray[jumpStep];
  // Check if Marie is back to the ground
  if (jumpStep == walkArray.length) {
    isJumping = false;
    clearInterval(jumpInterval);
    rest();
  }
}

// Call jump interval
function jump() {
  jumpInterval = setInterval(function () {
    jumping();
  }, JUMP_INTERVAL_TIME);
}

console.log(marie);

// Check which key was pressed
function checkKey(e) {
  e = e || window.event;
  // UP
  if (!isJumping && e.keyCode == "38" || e.keyCode == "32") {
    isJumping = true;
    jump();
    Matter.Body.applyForce(
      marie,
      { x: marie.position.x, y: marie.position.y },
      { x: 0, y: -0.2 }
    );
  }
  // DOWN
  if (e.keyCode == "40") {
    marie.render.sprite.texture = downImage;
  }
  // LEFT
  if (e.keyCode == "37") {
    Matter.Body.translate(marie, { x: -10, y: 0 });
    //TO DO: Turn sprite to the left
    callWalkSprite();
  }
  // RIGHT
  if (e.keyCode == "39") {
    Matter.Body.translate(marie, { x: 10, y: 0 });
    callWalkSprite();
  }
}
