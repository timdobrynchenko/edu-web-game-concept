import Warrior from './Warrior';
import Axe from '../weapons/Axe';
import Knife from '../weapons/Knife';
import Arm from '../weapons/Arm';

export default class Dwarf extends Warrior {
  constructor(position, name) {
    super(position, name);
    this.life = 130;
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';
    this.weapon = new Axe();
    this.weaponList = [this.weapon, new Knife(), new Arm()];
    this.hitCount = 0;
  }

  takeDamage(damage) {
    this.hitCount += 1;
    if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
      this.life = Math.max(0, this.life - damage / 2);
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
