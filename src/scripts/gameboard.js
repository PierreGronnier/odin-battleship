import { Ship } from "./ship";

export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.grid = this.createGrid();
    this.missedAttacks = [];
    this.ships = [];
  }

  createGrid() {
    return Array.from({ length: this.size }, () => Array(this.size).fill(null));
  }

  placeShip(length, startCoords, isHorizontal) {
    const [startX, startY] = startCoords;
    const ship = new Ship(length);
    this.ships.push(ship);

    for (let i = 0; i < length; i++) {
      const x = isHorizontal ? startX : startX + i;
      const y = isHorizontal ? startY + i : startY;

      if (x >= this.size || y >= this.size || this.grid[x][y] !== null) {
        throw new Error("Invalid placement");
      }

      this.grid[x][y] = { ship };
    }
  }

  receiveAttack(coords) {
    const [x, y] = coords;
    const cell = this.grid[x][y];

    if (cell && cell.ship) {
      cell.ship.hit();
      if (cell.ship.isSunk()) {
        this.markSunkShip(cell.ship);
      }
    } else {
      this.missedAttacks.push(coords);
    }
  }

  markSunkShip(ship) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.grid[x][y] && this.grid[x][y].ship === ship) {
          this.grid[x][y].sunk = true;
        }
      }
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
