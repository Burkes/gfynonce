import ANIMALS from '../data/animals.json';
import ADJECTIVES from '../data/adjectives.json';
import { DEFAULT_OPTIONS } from '../definitions/constants';

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

// set some ground rules to prevent it from breaking
const safeSize = (size, max) => {
  if (size <= 0) return 1;

  if (size >= max) return max;

  return size;
};

export default function gfynonce(options = {}) {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  return (
    getRandomArraySlice(ANIMALS, safeSize(options.animals, ANIMALS.length))
      .map((animal) => [
          ...getRandomArraySlice(
            ADJECTIVES,
            safeSize(options.adjectives, ADJECTIVES.length)
          ),
          animal,
        ].join(options.separator))
      // TODO - maybe a custom phrase separator
      .join("\n")
  );
}
