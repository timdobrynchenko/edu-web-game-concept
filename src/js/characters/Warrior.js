import Player from './Player';
import Sword from '../weapons/Sword';
import Knife from '../weapons/Knife';
import Arm from '../weapons/Arm';

export default class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.maxLife = 120;
    this.speed = 2;
    this.attack = 10;
    this.description = 'Воин';
    this.weapon = new Sword();
    this.weaponList = [this.weapon, new Knife(), new Arm()];
  }

  takeDamage(damage) {
    if (this.life < this.maxLife / 2 && this.magic > 0 && this.getLuck() > 0.8) {
      this.magic = Math.max(0, this.magic - damage);
    } else {
      this.life = Math.max(0, this.life - damage);
      if (this.life === 0) {
        console.log(`💀 ${this.name} (${this.description}) погиб`);
      }
    }
  }
}
