import './css/style.css';
import play from './js/game';
import Warrior from './js/characters/Warrior';
import Archer from './js/characters/Archer';
import Mage from './js/characters/Mage';
import Dwarf from './js/characters/Dwarf';

play([
  new Warrior(0, 'Алёша'),
  new Archer(5, 'Леголас'),
  new Mage(10, 'Гендальф'),
  new Dwarf(15, 'Гимли'),
]);
