import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

describe("Gameboard", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("places a ship horizontally", () => {
    gameboard.placeShip(3, [0, 0], true);
    expect(gameboard.grid[0][0].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[0][1].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[0][2].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[0][3]).toBeNull();
  });

  test("places a ship vertically", () => {
    gameboard.placeShip(3, [0, 0], false);
    expect(gameboard.grid[0][0].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[1][0].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[2][0].ship).toBeInstanceOf(Ship);
    expect(gameboard.grid[3][0]).toBeNull();
  });

  test("throws error for invalid ship placement", () => {
    expect(() => gameboard.placeShip(5, [9, 9], true)).toThrow(
      "Invalid placement"
    );
    expect(() => gameboard.placeShip(5, [9, 9], false)).toThrow(
      "Invalid placement"
    );
  });

  test("receives attack and hits ship", () => {
    gameboard.placeShip(3, [0, 0], true);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.grid[0][0].ship.nbhit).toBe(1);
  });

  test("receives attack and misses", () => {
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
  });

  test("reports all ships sunk", () => {
    gameboard.placeShip(1, [0, 0], true);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test("reports not all ships sunk", () => {
    gameboard.placeShip(2, [0, 0], true);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.allShipsSunk()).toBe(false);
  });
});
