import { WELCOME, WINNER_TEXT, WELCOME_TEXT } from './constants.js';

export function getRandomSecret() {
  const max = 6;
  const min = 3;
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomIntArr = [];

  for (let i = 0; i < length; i++) {
    const int = Math.floor(Math.random() * 10);
    randomIntArr.push(int);
  }

  return randomIntArr;
}

export function sayHi() {
  process.stdout.write(WELCOME);
  process.stdout.write(WELCOME_TEXT);
}

export function isMatchNumber(line, secret) {
  const userNums = line.trim().split('');
  userNums.length = secret.length;
  const numsOnPlaces = [], numsIncludes = [];

  if (isNaN(+line)) return 'Incorrect input\n';

  for (let i = 0; i < secret.length; i++) {
    if (+userNums[i] === secret[i]) {
      numsOnPlaces.push(secret[i]);
    } else if (secret.includes(+userNums[i])) {
      numsIncludes.push(userNums[i]);
    }
  }

  return numsOnPlaces.length === secret.length
    ? WINNER_TEXT
    : `${writeNumsCounts(numsOnPlaces, numsIncludes)}`;
}

export function writeNumsCounts(inPlace, notPlace) {

  const placeCount = inPlace.join(' ');
  const notPlaceCount = notPlace.join(' ');

  const notPlaces = 'Цифр не на своих местах ' +
   `\x1b[33m${notPlace.length}\x1b[0m (${notPlaceCount})`;

  const inPlaces = 'Цифр на своих местах: ' +
  `\x1b[32m${inPlace.length}\x1b[0m (${placeCount})`;

  return `${notPlaces}\n${inPlaces}\n`;
}

export function getAttempts(secret) {
  return secret.length >= 5 ? 8 : 6;
}

