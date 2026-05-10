import './css/style.css';
import play from './js/game';
import createRenderer from './js/renderer';
import Warrior from './js/characters/Warrior';
import Archer from './js/characters/Archer';
import Mage from './js/characters/Mage';
import Dwarf from './js/characters/Dwarf';

let currentRenderer = null;

function createPlayers() {
  return [
    new Warrior(0, 'Алёша'),
    new Archer(5, 'Леголас'),
    new Mage(10, 'Гендальф'),
    new Dwarf(15, 'Гимли'),
  ];
}

function startBattle() {
  if (currentRenderer) {
    currentRenderer.destroy();
  }
  const players = createPlayers();
  currentRenderer = createRenderer(players);
  play(players, currentRenderer);
}

window.addEventListener('DOMContentLoaded', () => {
  const restartBtn = document.getElementById('restart-btn');
  restartBtn.addEventListener('click', startBattle);
  startBattle();
});
