const POSITION_SCALE = 90;
const TURN_DELAY = 600;

const AVATAR_COLORS = {
  Воин: '#c44569',
  Лучник: '#4ecca3',
  Маг: '#5b8def',
  Гном: '#b76935',
  Арбалетчик: '#2e7d4f',
  Демиург: '#8b5cf6',
  Игрок: '#888888',
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
}

function getAvatarColor(description) {
  return AVATAR_COLORS[description] || '#888888';
}

function createCard(player, maxLife) {
  const card = document.createElement('div');
  card.className = 'player-card';
  card.dataset.name = player.name;

  const initials = getInitials(player.name);
  const color = getAvatarColor(player.description);

  card.innerHTML = `
    <div class="hp-bar"><div class="fill" style="width: 100%"></div></div>
    <div class="hp-value">${player.life}/${maxLife}</div>
    <div class="avatar" style="background: ${color}">${initials}</div>
    <div class="name">${player.name}</div>
    <div class="class">${player.description}</div>
    <div class="weapon">⚔ ${player.weapon.name}</div>
  `;
  return card;
}

export default function createRenderer(players) {
  const battlefield = document.getElementById('battlefield');
  const logEntries = document.getElementById('log-entries');
  const roundIndicator = document.getElementById('round-indicator');

  const maxLifeMap = new Map(players.map((p) => [p, p.life]));
  const cardMap = new Map();
  let cancelled = false;

  players.forEach((p) => {
    const card = createCard(p, maxLifeMap.get(p));
    card.style.transform = `translateX(${p.position * POSITION_SCALE}px)`;
    battlefield.appendChild(card);
    cardMap.set(p, card);
  });

  const origLog = console.log.bind(console);
  console.log = (...args) => {
    origLog(...args);
    const text = args.map((a) => String(a)).join(' ');
    const entry = document.createElement('div');
    entry.className = 'entry';
    if (text.includes('Раунд')) entry.classList.add('round');
    if (text.includes('💀') || text.includes('погиб')) entry.classList.add('death');
    if (text.includes('🏆') || text.includes('Победитель')) entry.classList.add('winner');
    entry.textContent = text;
    logEntries.appendChild(entry);
    logEntries.scrollTop = logEntries.scrollHeight;
  };

  function updateCard(p) {
    const card = cardMap.get(p);
    if (!card) return;
    const maxLife = maxLifeMap.get(p);
    card.style.transform = `translateX(${p.position * POSITION_SCALE}px)`;
    card.querySelector('.weapon').textContent = `⚔ ${p.weapon.name}`;
    card.querySelector('.fill').style.width = `${(p.life / maxLife) * 100}%`;
    card.querySelector('.hp-value').textContent = `${p.life.toFixed(0)}/${maxLife}`;
    if (p.isDead()) card.classList.add('dead');
  }

  return {
    setRound(n) {
      if (cancelled) return;
      roundIndicator.textContent = `Раунд ${n}`;
    },
    async afterTurn() {
      if (cancelled) return false;
      players.forEach(updateCard);
      await sleep(TURN_DELAY);
      return !cancelled;
    },
    destroy() {
      cancelled = true;
      cardMap.forEach((card) => card.remove());
      cardMap.clear();
      logEntries.innerHTML = '';
      roundIndicator.textContent = 'Подготовка к бою...';
      console.log = origLog;
    },
  };
}
