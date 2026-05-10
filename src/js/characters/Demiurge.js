import Mage from './Mage';
import StormStaff from '../weapons/StormStaff';
import Knife from '../weapons/Knife';
import Arm from '../weapons/Arm';

export default class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 120;
    this.maxMagic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
    this.weapon = new StormStaff();
    this.weaponList = [this.weapon, new Knife(), new Arm()];
  }

  getDamage(distance) {
    if (distance > this.weapon.range) return 0;
    const luck = this.getLuck();
    if (this.magic > 0 && luck > 0.6) {
      return (((this.attack + this.weapon.getDamage()) * luck) / distance) * 1.5;
    }
    return ((this.attack + this.weapon.getDamage()) * luck) / distance;
  }
}
