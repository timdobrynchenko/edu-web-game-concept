import Archer from './characters/Archer';
import Warrior from './characters/Warrior';
import Mage from './characters/Mage';
import Dwarf from './characters/Dwarf';
import Crossbowman from './characters/Crossbowman';
import Demiurge from './characters/Demiurge';

const MAX_ROUNDS = 1000;

export default async function play(players, renderer) {
  let round = 0;
  while (players.filter((p) => !p.isDead()).length > 1 && round < MAX_ROUNDS) {
    round += 1;
    if (renderer) renderer.setRound(round);
    console.log(`=== Раунд ${round} ===`);

    const aliveAtStart = players.filter((p) => !p.isDead());
    for (let i = 0; i < aliveAtStart.length; i += 1) {
      const p = aliveAtStart[i];
      if (!p.isDead()) {
        p.turn(players);
        if (renderer) {
          // eslint-disable-next-line no-await-in-loop
          const stillRunning = await renderer.afterTurn(p);
          if (stillRunning === false) return null;
        }
      }
    }
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
