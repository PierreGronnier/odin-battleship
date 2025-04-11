import { Player } from "./player.js";
import { renderGameboard } from "./domManager.js";

const player = new Player("Human", true);
const computer = new Player("Computer");

placeShipsRandomly(computer.gameboard);

renderGameboard(player.gameboard, "playerBoard");
renderGameboard(computer.gameboard, "computerBoard");

document.getElementById("computerBoard").addEventListener("click", (event) => {
  if (
    event.target.classList.contains("cell") &&
    !event.target.classList.contains("disabled")
  ) {
    const x = parseInt(event.target.dataset.x, 10);
    const y = parseInt(event.target.dataset.y, 10);
    const coords = [x, y];

    if (!computer.gameboard.isAlreadyAttacked(coords)) {
      computer.gameboard.receiveAttack(coords);
      renderGameboard(computer.gameboard, "computerBoard");

      if (computer.gameboard.allShipsSunk()) {
        alert("You win! All computer ships are sunk.");
      } else {
        computerAttack();
      }
    }
  }
});

document.getElementById("randomPlaceButton").addEventListener("click", () => {
  player.gameboard.resetGameboard();
  placeShipsRandomly(player.gameboard);
  renderGameboard(player.gameboard, "playerBoard");
});

function computerAttack() {
  let attacked = false;
  while (!attacked) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const coords = [x, y];

    if (!player.gameboard.isAlreadyAttacked(coords)) {
      player.gameboard.receiveAttack(coords);
      renderGameboard(player.gameboard, "playerBoard");
      attacked = true;

      if (player.gameboard.allShipsSunk()) {
        alert("Computer wins! All your ships are sunk.");
      }
    }
  }
}

function placeShipsRandomly(gameboard) {
  const ships = [5, 4, 3, 3, 2];
  for (const length of ships) {
    let placed = false;
    while (!placed) {
      const isHorizontal = Math.random() > 0.5;
      const startX = Math.floor(Math.random() * 10);
      const startY = Math.floor(Math.random() * 10);
      try {
        gameboard.placeShip(length, [startX, startY], isHorizontal);
        placed = true;
      } catch (e) {}
    }
  }
}
