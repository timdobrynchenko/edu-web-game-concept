import Weapon from './Weapon';

export default class Staff extends Weapon {
  constructor(name = 'Посох', attack = 8, durability = 300, range = 2) {
    super(name, attack, durability, range);
  }
}
