import Arm from '../weapons/Arm';
import Knife from '../weapons/Knife';

export default class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.position = position;
    this.name = name;
  }

  getLuck() {
    return (Math.random() * 100 + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) return 0;
    return ((this.attack + this.weapon.getDamage()) * this.getLuck()) / distance;
  }

  takeDamage(damage) {
    this.life = Math.max(0, this.life - damage);
    if (this.life === 0) {
      console.log(`💀 ${this.name} (${this.description}) погиб`);
    }
  }

  isDead() {
    return this.life === 0;
  }

  moveLeft(distance) {
    this.position -= Math.min(distance, this.speed);
  }

  moveRight(distance) {
    this.position += Math.min(distance, this.speed);
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(-distance);
    } else {
      this.moveRight(distance);
    }
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      console.log(`${this.name} заблокировал атаку (оружие получает урон)`);
      this.weapon.takeDamage(damage);
    } else if (this.dodged()) {
      console.log(`${this.name} уклонился`);
    } else {
      console.log(`${this.name} получил ${damage.toFixed(2)} урона`);
      this.takeDamage(damage);
    }
  }

  checkWeapon() {
    if (!this.weapon.isBroken()) return;
    const idx = this.weaponList.indexOf(this.weapon);
    if (idx >= 0 && idx + 1 < this.weaponList.length) {
      this.weapon = this.weaponList[idx + 1];
    }
  }

  tryAttack(enemy) {
    const distance = Math.abs(this.position - enemy.position);
    if (this.weapon.range < distance) return;
    this.weapon.takeDamage(10 * this.getLuck());
    console.log(`${this.name} (${this.description}) атакует ${enemy.name}`);
    if (this.position === enemy.position) {
      enemy.moveRight(1);
      enemy.takeAttack(this.getDamage(1) * 2);
    } else {
      enemy.takeAttack(this.getDamage(distance));
    }
    this.checkWeapon();
  }

  chooseEnemy(players) {
    const enemies = players.filter((p) => p !== this && !p.isDead());
    if (enemies.length === 0) return null;
    return enemies.reduce((min, p) => (p.life < min.life ? p : min));
  }

  moveToEnemy(enemy) {
    this.move(enemy.position - this.position);
  }

  turn(players) {
    const enemy = this.chooseEnemy(players);
    if (!enemy) return;
    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }
}
