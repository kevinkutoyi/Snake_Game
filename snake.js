(function () {
  var size = 500;
  // var measure = 100;
  var grid_size = size / 50;
  var field = document.getElementById("field");
  field.height = field.width = size * 2;
  field.style.alignItems = "center";
  // field.height = size * 2;
  // field.width = size / 1;
  field.style.width = field.style.height = size + "px";
  var ctx = field.getContext("2d");
  ctx.scale(2, 2);

  var direction = (newDirection = 1);
  var snakeLength = 1;
  var snake = [{ x: size / 2, y: size / 2 }];
  var food = null;
  var end = false;
  var score = 0;

  function randomFood() {
    return Math.floor((Math.random() * size) / grid_size) * grid_size;
  }

  function coordToString(obj) {
    return [obj.x, obj.y].join(",");
  }

  function tick() {
    var snakePart = { x: snake[0].x, y: snake[0].y };
    if (Math.abs(direction) !== Math.abs(newDirection)) {
      direction = newDirection;
    }
    var axis = Math.abs(direction) === 1 ? "x" : "y";
    if (direction < 0) {
      snakePart[axis] -= grid_size;
    } else {
      snakePart[axis] += grid_size;
    }

    if (food && food.x === snakePart.x && food.y === snakePart.y) {
      food = null;
      snakeLength += 1;
      score += 3;
    }

    ctx.fillStyle = "#224241";
    ctx.fillRect(0, 0, size, size);
    if (end) {
      ctx.fillStyle = "#e8dbb0";
      ctx.font = "15px Monospace";
      // ctx.alignItems = "center"
      ctx.fillText("Game Over - Score: " + score, size / 2, size / 2);
      ctx.fillText("REFRESH to continue", size / 2, 300);
      if (newDirection == 5) {
        location.reload();
      }
    } else {
      snake.unshift(snakePart);
      snake = snake.slice(0, snakeLength);
      ctx.fillStyle = "#e8dbb0";
      ctx.font = "20px Monospace";
      ctx.fillText("Score: " + score, 5, 20);
    }

    if (
      snakePart.x < 0 ||
      snakePart.x >= size ||
      snakePart.y < 0 ||
      snakePart.y >= size
    ) {
      end = true;
    }

    ctx.fillStyle = "#15b31b";
    var snakeObj = {};
    for (var i = 0; i < snake.length; i++) {
      var a = snake[i];
      ctx.fillRect(a.x, a.y, grid_size - 1, grid_size - 1);
      if (i > 0) snakeObj[coordToString(a)] = true;
    }
    if (snakeObj[coordToString(snakePart)]) end = true;
    while (!food || snakeObj[coordToString(food)]) {
      food = { x: randomFood(), y: randomFood() };
    }
    ctx.fillStyle = "#f2d729";
    ctx.fillRect(food.x, food.y, grid_size, grid_size);
    ctx.drawEllipse(3, 10, 10, 100, 60);
  }
  window.onload = function () {
    setInterval(tick, 100);
    window.onkeydown = function (e) {
      newDirection =
        { 37: -1, 38: -2, 39: 1, 40: 2, 32: 5 }[e.keyCode] || newDirection;
    };
  };
})();
