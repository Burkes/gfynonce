import ANIMALS from '../data/animals.json';
import ADJECTIVES from '../data/adjectives.json';

function shuffleArray(arr) {
  let array = [...arr];

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const randomIndex = array => Math.floor(Math.random() * array.length);
const getRandomArraySliceStart = (array, size) => Math.max(0, randomIndex(array) - size);
const getRandomArraySlice = (array, size, start = getRandomArraySliceStart(array, size)) => shuffleArray(array).slice(start, start + size);

const defaultOptions = {
  separator: '',
  adjectives: 2,
};

export default function gfynonce(options = {}) {
  options = Object.assign({}, defaultOptions, options);

  // set some ground rules to prevent it from breaking
  if (options.adjectives <= 0) {
    options.adjectives = 1;
  } else if (options.adjectives >= ADJECTIVES.length) {
    options.adjectives = ADJECTIVES.length;
  }

  const randomAdjectives = getRandomArraySlice(ADJECTIVES, options.adjectives);
  // TO-DO: More complicated tests are required to allow more than one animal
  const randomAnimals = getRandomArraySlice(ANIMALS, 1);

  const pieces = [...randomAdjectives, ...randomAnimals];

  return pieces.join(options.separator);
}