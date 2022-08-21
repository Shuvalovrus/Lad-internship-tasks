import * as readline from 'node:readline';
import { getAttempts, getRandomSecret, isMatchNumber, sayHi } from './utils.js';
import { LOOSER_TEXT, WINNER_TEXT } from "./constants.js";

const { stdin, stdout } = process;
const readLineInterface = readline.createInterface({ input: stdin, output: stdout });

let randomNumbers = getRandomSecret();
let attempts = getAttempts(randomNumbers);

sayHi();

readLineInterface.on('line', async (line) => {
  let result = await isMatchNumber(line, randomNumbers);

  stdout.write(result);
  stdout.write(`Попыток осталось ${attempts--}\n`);

  if (result === WINNER_TEXT || result === LOOSER_TEXT || !attempts) {
    readLineInterface.question('Do you want play again? [y / n]\n', (answer) => questionCallback(answer));
  }
})

function questionCallback(answer) {
  if (answer === 'n') process.exit();
  if (answer === 'y') {
    randomNumbers = getRandomSecret();
    attempts = getAttempts(randomNumbers);
    sayHi()
  } else {
    return readLineInterface.question('Do you want play again? [y / n]\n', (answer) => questionCallback(answer));
  }
}

process.on('exit', () => process.stdout.write(`Thank you for playing!`));
process.on('SIGINT', () => process.exit())


