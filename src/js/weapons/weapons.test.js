import Weapon from './Weapon';
import Arm from './Arm';
import Axe from './Axe';
import Bow from './Bow';
import Knife from './Knife';
import Sword from './Sword';
import Staff from './Staff';
import LongBow from './LongBow';
import StormStaff from './StormStaff';

describe('Weapon', () => {
  test('конструктор задаёт свойства', () => {
    const w = new Weapon('Тест', 20, 10, 1);
    expect(w).toEqual({
      name: 'Тест', attack: 20, durability: 10, initDurability: 10, range: 1,
    });
  });

  test('takeDamage уменьшает durability', () => {
    const w = new Weapon('Тест', 20, 10, 1);
    w.takeDamage(5);
    expect(w.durability).toBe(5);
  });

  test('takeDamage не уходит ниже 0', () => {
    const w = new Weapon('Тест', 20, 10, 1);
    w.takeDamage(50);
    expect(w.durability).toBe(0);
  });

  test('getDamage возвращает attack при durability >= 30%', () => {
    const w = new Weapon('Тест', 20, 100, 1);
    expect(w.getDamage()).toBe(20);
    w.takeDamage(70); // durability = 30
    expect(w.getDamage()).toBe(20);
  });

  test('getDamage возвращает attack/2 при durability < 30%', () => {
    const w = new Weapon('Тест', 20, 100, 1);
    w.takeDamage(75); // durability = 25
    expect(w.getDamage()).toBe(10);
  });

  test('getDamage возвращает 0 при durability = 0', () => {
    const w = new Weapon('Тест', 20, 100, 1);
    w.takeDamage(100);
    expect(w.getDamage()).toBe(0);
  });

  test('isBroken: true только при durability = 0', () => {
    const w = new Weapon('Тест', 20, 10, 1);
    expect(w.isBroken()).toBe(false);
    w.takeDamage(10);
    expect(w.isBroken()).toBe(true);
  });
});

describe('Arm', () => {
  test('конструктор задаёт табличные значения', () => {
    const arm = new Arm();
    expect(arm).toEqual({
      name: 'Рука',
      attack: 1,
      durability: Infinity,
      initDurability: Infinity,
      range: 1,
    });
  });

  test('takeDamage не уменьшает Infinity', () => {
    const arm = new Arm();
    arm.takeDamage(20);
    expect(arm.durability).toBe(Infinity);
  });

  test('isBroken всегда false', () => {
    const arm = new Arm();
    expect(arm.isBroken()).toBe(false);
    arm.takeDamage(99999);
    expect(arm.isBroken()).toBe(false);
  });
});

describe('Bow', () => {
  test('конструктор задаёт табличные значения', () => {
    const bow = new Bow();
    expect(bow).toEqual({
      name: 'Лук',
      attack: 10,
      durability: 200,
      initDurability: 200,
      range: 3,
    });
  });

  test('Полный сценарий износа', () => {
    const bow = new Bow();
    expect(bow.getDamage()).toBe(10);
    expect(bow.durability).toBe(200);

    bow.takeDamage(100); // 100 >= 60 (30% от 200)
    expect(bow.getDamage()).toBe(10);
    expect(bow.durability).toBe(100);

    bow.takeDamage(50); // 50 < 60
    expect(bow.getDamage()).toBe(5);
    expect(bow.durability).toBe(50);

    bow.takeDamage(150); // 0
    expect(bow.getDamage()).toBe(0);
    expect(bow.durability).toBe(0);
  });
});

describe('Sword', () => {
  test('конструктор задаёт табличные значения', () => {
    const sword = new Sword();
    expect(sword).toEqual({
      name: 'Меч',
      attack: 25,
      durability: 500,
      initDurability: 500,
      range: 1,
    });
  });

  test('takeDamage уменьшает durability', () => {
    const sword = new Sword();
    sword.takeDamage(20);
    expect(sword.durability).toBe(480);
    sword.takeDamage(100);
    expect(sword.durability).toBe(380);
  });
});

describe('Knife', () => {
  test('конструктор задаёт табличные значения', () => {
    const knife = new Knife();
    expect(knife).toEqual({
      name: 'Нож',
      attack: 5,
      durability: 300,
      initDurability: 300,
      range: 1,
    });
  });
});

describe('Staff', () => {
  test('конструктор задаёт табличные значения', () => {
    const staff = new Staff();
    expect(staff).toEqual({
      name: 'Посох',
      attack: 8,
      durability: 300,
      initDurability: 300,
      range: 2,
    });
  });
});

describe('LongBow', () => {
  test('конструктор задаёт табличные значения', () => {
    const longBow = new LongBow();
    expect(longBow).toEqual({
      name: 'Длинный лук',
      attack: 15,
      durability: 200,
      initDurability: 200,
      range: 4,
    });
  });

  test('наследуется от Bow и Weapon', () => {
    const longBow = new LongBow();
    expect(longBow).toBeInstanceOf(Bow);
    expect(longBow).toBeInstanceOf(Weapon);
  });
});

describe('Axe', () => {
  test('конструктор задаёт табличные значения', () => {
    const axe = new Axe();
    expect(axe).toEqual({
      name: 'Секира',
      attack: 27,
      durability: 800,
      initDurability: 800,
      range: 1,
    });
  });

  test('наследуется от Sword и Weapon', () => {
    const axe = new Axe();
    expect(axe).toBeInstanceOf(Sword);
    expect(axe).toBeInstanceOf(Weapon);
  });
});

describe('StormStaff', () => {
  test('конструктор задаёт табличные значения', () => {
    const storm = new StormStaff();
    expect(storm).toEqual({
      name: 'Посох Бури',
      attack: 10,
      durability: 300,
      initDurability: 300,
      range: 3,
    });
  });

  test('наследуется от Staff и Weapon', () => {
    const storm = new StormStaff();
    expect(storm).toBeInstanceOf(Staff);
    expect(storm).toBeInstanceOf(Weapon);
  });
});
