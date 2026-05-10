import Player from './Player';
import Staff from '../weapons/Staff';
import Knife from '../weapons/Knife';
import Arm from '../weapons/Arm';

export default class Mage extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.magic = 100;
    this.maxMagic = 100;
    this.attack = 5;
    this.agility = 8;
    this.description = 'Маг';
    this.weapon = new Staff();
    this.weaponList = [this.weapon, new Knife(), new Arm()];
  }

  takeDamage(damage) {
    if (this.magic > this.maxMagic * 0.5) {
      this.life = Math.max(0, this.life - (damage / 2));
      this.magic = Math.max(0, this.magic - 12);
      if (this.life === 0) {
        console.log(`💀 ${this.name} (${this.description}) погиб`);
      }
    } else {
      this.life = Math.max(0, this.life - damage);
      if (this.life === 0) {
        console.log(`💀 ${this.name} (${this.description}) погиб`);
      }
    }
  }
}
