import { Gameboard } from "./gameboard";

export class Player {
  constructor(name = "Computer", isHuman = false) {
    this.name = name;
    this.isHuman = isHuman;
    this.gameboard = new Gameboard();
  }
}
