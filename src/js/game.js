import Archer from './characters/Archer';
import Warrior from './characters/Warrior';
import Mage from './characters/Mage';
import Dwarf from './characters/Dwarf';
import Crossbowman from './characters/Crossbowman';
import Demiurge from './characters/Demiurge';

const MAX_ROUNDS = 1000;

export default function play(players) {
  let round = 0;
  while (players.filter((p) => !p.isDead()).length > 1 && round < MAX_ROUNDS) {
    round += 1;
    console.log(`=== Раунд ${round} ===`);
    players.filter((p) => !p.isDead()).forEach((p) => p.turn(players));
  }

  const survivors = players.filter((p) => !p.isDead());
  if (survivors.length === 1) {
    const w = survivors[0];
    console.log(`🏆 Победитель: ${w.description} ${w.name} (life=${w.life})`);
    return w;
  }
  console.log('Ничья — никто не выжил или превышен лимит раундов');
  return null;
}
