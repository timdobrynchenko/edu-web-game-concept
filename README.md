# RPG Game

Учебный проект — браузерная пошаговая RPG-игра «королевская битва», в которой бойцы разных классов автоматически сражаются между собой. Реализована в рамках курса по JavaScript: от настройки рабочего окружения и сборки до итоговой игры с тестами и условным UI.

## Стек

- **npm** — управление зависимостями и скриптами.
- **webpack 5** + **HtmlWebpackPlugin** + **MiniCssExtractPlugin** — сборка бандла, CSS и HTML.
- **Babel** (`@babel/preset-env` + `core-js@3`) — трансформация ES2022+ в код, понятный для целевых браузеров.
- **ESLint** + `eslint-config-airbnb-extended` + `eslint-plugin-jest` — статический анализ.
- **Jest** + `babel-jest` — модульные тесты.
- **http-server** — отдача собранного `dist/` локально.

## Структура

```
src/
├── index.html           — шаблон страницы (поле боя + журнал)
├── index.js             — entry-point: создаёт игроков и запускает бой
├── css/
│   └── style.css        — стили UI
└── js/
    ├── game.js          — функция play(players), управляющая раундами
    ├── renderer.js      — модуль визуализации (DOM, анимации, перехват console.log)
    ├── characters/      — иерархия персонажей
    │   ├── Player.js
    │   ├── Warrior.js, Archer.js, Mage.js
    │   └── Dwarf.js, Crossbowman.js, Demiurge.js
    └── weapons/         — иерархия оружия
        ├── Weapon.js
        ├── Arm.js, Bow.js, Sword.js, Knife.js, Staff.js
        ├── LongBow.js, Axe.js, StormStaff.js
        └── weapons.test.js — тесты на все классы оружия
```

## Игровая модель

### Оружие

Базовый класс `Weapon` со свойствами `name`, `attack`, `durability`, `initDurability`, `range`. Методы:
- `takeDamage(damage)` — уменьшает прочность (минимум 0).
- `getDamage()` — урон удара: полный `attack` если прочность ≥ 30% от исходной, иначе `attack / 2`, при 0 — 0.
- `isBroken()` — оружие сломано (`durability === 0`).

Наследники: `Arm`, `Bow`, `Sword`, `Knife`, `Staff` и усиленные `LongBow`, `Axe`, `StormStaff`.

### Персонажи

Базовый класс `Player` со свойствами `life`, `magic`, `speed`, `attack`, `agility`, `luck`, `description`, `weapon`, `position`, `name`. Иерархия:

| Класс | Наследует | Особенность |
|---|---|---|
| `Warrior` | `Player` | при life < 50% и luck > 0.8 урон уходит в магию |
| `Archer` | `Player` | `getDamage` зависит от `distance / range` |
| `Mage` | `Player` | при magic > 50% урон в 2 раза меньше, magic −= 12 |
| `Dwarf` | `Warrior` | каждый 6-й удар при luck > 0.5 → урон ÷ 2 |
| `Crossbowman` | `Archer` | (наследует особенности) |
| `Demiurge` | `Mage` | при magic > 0 и luck > 0.6 урон × 1.5 |

### Бой

Каждый ход игрок:
1. Выбирает врага с минимальным `life` (`chooseEnemy`).
2. Двигается к нему в пределах `speed` (`moveToEnemy`).
3. Атакует (`tryAttack`) — урон считается с учётом расстояния и дальности оружия; при коллизии позиций враг отскакивает на +1 и получает удвоенный урон.

Когда оружие ломается, игрок переходит на следующее по цепочке (`weaponList`). Например, Warrior: `Sword → Knife → Arm`.

Функция `play(players)` гоняет раунды, пока в живых не останется один.

## Команды

```bash
npm install            # установить зависимости

npm run build          # webpack-сборка в dist/
npm run dev            # webpack-dev-server с авто-перезагрузкой
npm start              # запустить http-server для dist/ (после build)

npm test               # прогнать Jest-тесты
npm run test:coverage  # с отчётом о покрытии

npm run lint           # проверка ESLint
npm run lint:fix       # авто-исправление
```

## Запуск игры

```bash
npm install
npm run build
npm start
```

Открыть `http://localhost:8080` (если кэш отдаёт старую версию — `Cmd+Shift+R`).

### Управление в браузере

- На странице — поле боя слева (карточки бойцов с аватарами и HP-барами) и журнал справа с прокруткой.
- Бой запускается автоматически при загрузке страницы.
- Кнопка **🔄 Рестарт** в шапке — запускает новый бой с свежими бойцами без перезагрузки страницы.
- Все события боя дублируются в DevTools console.

## Тесты

Покрытие на классах оружия — 100% по строкам, для классов персонажей тесты не подготовлены.

```bash
npm run test:coverage
```

## Лицензия

ISC
