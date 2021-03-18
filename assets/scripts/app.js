const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 20;

const PLAYER_ATTACK = 'ATTACK';
const PLAYER_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_PLAYERS_HEALTH = 'PLAYERS_HEALTH';
const LOG_MONSTERS_HEALTH = 'MONSTERS_HEALTH';
const LOG_GAME_OVER = 'GAME_OVER';

const enteredNumber = prompt('Enter monsters and your max life', '100');

let chosenMaxLife = parseInt(enteredNumber);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonstersHealth = chosenMaxLife;
let currentPlayersHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        monsterHealth: monsterHealth,
        playerHealth: playerHealth,
    }
    //    Switch case:

        switch (event) {
            case LOG_PLAYER_ATTACK:
                logEntry.target = 'MONSTER';
                break;
            case LOG_PLAYER_STRONG_ATTACK:
                logEntry.target = 'MONSTER';
                break;
            case LOG_PLAYER_HEAL:
                logEntry.target = 'PLAYER';
                break;
            case LOG_MONSTER_ATTACK:
                logEntry.target = 'PLAYER';
                break;
            case LOG_PLAYERS_HEALTH:
                logEntry;
                break;
            case LOG_MONSTERS_HEALTH:
                logEntry;
                break;
            case LOG_GAME_OVER:
                logEntry;
                break;
            default:
                logEntry = {};
        }
        battleLog.push(logEntry);
}

function gameReset() {
    currentPlayersHealth = chosenMaxLife;
    currentMonstersHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function attackPlayer() {
    initialPlayersHealth = currentPlayersHealth;

    const monsterAttackValue = playerDamage(MONSTER_ATTACK_VALUE);
    currentPlayersHealth -= monsterAttackValue;

    writeToLog(
        LOG_MONSTER_ATTACK, 
        monsterAttackValue, 
        currentMonstersHealth, 
        currentPlayersHealth
        );

 if (currentPlayersHealth <= 0 && hasBonusLife) {
     hasBonusLife = false;
     removeBonusLife();
     currentPlayersHealth = initialPlayersHealth;
     setPlayerHealth(initialPlayersHealth);
     alert('You would be dead but your bonus life saved you!')
 }

    if (currentMonstersHealth <= 0 && currentPlayersHealth > 0) {
        alert('You win!')
        writeToLog(LOG_GAME_OVER, 
            'THE WINNER', 
            currentMonstersHealth, 
            currentPlayersHealth
            );
    } else if (currentMonstersHealth > 0 && currentPlayersHealth <= 0) {
        alert('You lose.')
        writeToLog(LOG_GAME_OVER, 
            'THE MONSTER WON', 
            currentMonstersHealth, 
            currentPlayersHealth
            );
    } else if (currentMonstersHealth <= 0 && currentPlayersHealth <= 0) {
        alert('You have a draw!')
        writeToLog(LOG_GAME_OVER, 
            'THE DRAW', 
            currentMonstersHealth, 
            currentPlayersHealth
            );
    }

    if (currentMonstersHealth <= 0 || currentPlayersHealth <= 0) {
        gameReset();
    }
}

function attackMonster(player) {
    // Turnary Operator:
    let maxDamage = player === PLAYER_ATTACK ? ATTACK_VALUE: STRONG_ATTACK_VALUE;
    let logEvent = player === PLAYER_ATTACK ? LOG_PLAYER_ATTACK: LOG_PLAYER_STRONG_ATTACK;

    const playerAttackValue = monsterDamage(maxDamage);
    currentMonstersHealth -= playerAttackValue;

    writeToLog(
        logEvent, 
        playerAttackValue, 
        currentMonstersHealth, 
        currentPlayersHealth
        );

    attackPlayer(); 
}

function attackHandler() {
    attackMonster(PLAYER_ATTACK);
}

function strongAttackHandler() {
    attackMonster(PLAYER_STRONG_ATTACK);
}

function healHandler() {
    let healValue; 
    if (currentPlayersHealth = chosenMaxLife - HEAL_VALUE) {
        healValue = chosenMaxLife - currentPlayersHealth;
    } else {
        chosenMaxLife = HEAL_VALUE;
    }

    increasePlayerHealth(healValue);
    currentPlayersHealth += healValue;

    writeToLog(
        LOG_PLAYER_HEAL, 
        healValue, 
        currentMonstersHealth, 
        currentPlayersHealth
        );

    attackPlayer(); 
}

function logHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', logHandler);