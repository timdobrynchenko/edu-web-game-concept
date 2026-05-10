import Weapon from './Weapon';

export default class Bow extends Weapon {
  constructor(name = 'Лук', attack = 10, durability = 200, range = 3) {
    super(name, attack, durability, range);
  }
}
