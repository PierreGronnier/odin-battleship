import { Player } from "./player.js";
import { renderGameboard } from "./domManager.js";

const player = new Player("Human", true);
const computer = new Player("Computer");

player.gameboard.placeShip(3, [0, 0], true);
computer.gameboard.placeShip(3, [0, 0], true);

renderGameboard(player.gameboard, "playerBoard");
renderGameboard(computer.gameboard, "computerBoard");

document.getElementById("computerBoard").addEventListener("click", (event) => {
  if (event.target.classList.contains("cell")) {
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
