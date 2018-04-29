// eslint-disable-next-line prefer-destructuring
import { expect } from 'chai';
import uniq from 'lodash.uniq';
import gfynonce from '../';

import ADJECTIVES from '../data/adjectives.json';

const nonceRegexBuilder = (adjCount = 2, separator = '') => new RegExp(`^([A-Z][a-z]+${separator}){${adjCount}}([A-z]+)$`);
// ugly way of extracting each capitalized word from a nonce..
const getAdjectivesArrayFromNonce = (nonce) =>
  nonce.split('')
    .map((l, i) =>
      l + nonce.substr(i + 1, nonce.substr(i + 1).search(/[A-Z]/) !== -1 ? nonce.substr(i + 1).search(/[A-Z]/) : nonce.length))
    .filter(word => word.charAt(0).match(/[A-Z]/) && word.length > 1);

describe('gfynonce', () => {
  describe('default nonce generation', () => {
    it('should generate a nonce with the default 2 adjectives and no separator', () => {
      expect(gfynonce())
        .to.match(nonceRegexBuilder());
    });

    describe('fallback to the minimum', () => {
      it('when requesting to generate a nonce with insufficient adjective count', () => {
        const adjectives = 0;

        expect(gfynonce({ adjectives }))
          .to.satisfy((result) => {
            const pieces = getAdjectivesArrayFromNonce(result).slice(0, 1);

            if (!Array.isArray(pieces) || !pieces.length) return false;

            if (pieces.length === 1) return true;

            return false;
          });
      });

      it('when requesting to generate a nonce with insufficient adjective count and "." as a separator', () => {
        const adjectives = 0;
        const separator = '.';

        expect(gfynonce({ adjectives, separator }))
          .to.satisfy((result) => {
            const pieces = result.split(separator).slice(0, 1);

            if (!Array.isArray(pieces) || !pieces.length) return false;

            if (pieces.length === 1) return true;

            return false;
          });
      });
    });

    describe('fallback to the maximum available', () => {
      it('when requesting to generate a nonce with exceeding adjective count', () => {
        const adjectives = ADJECTIVES.length + 100;

        expect(gfynonce({ adjectives }))
          .to.satisfy((result) => {
            const pieces = getAdjectivesArrayFromNonce(result).slice(0, ADJECTIVES.length);

            if (!Array.isArray(pieces) || !pieces.length) return false;

            if (pieces.length === ADJECTIVES.length) return true;

            return false;
          });
      });

      it('when requesting to generate a nonce with exceeding adjective count and "." as a separator', () => {
        const adjectives = ADJECTIVES.length + 100;
        const separator = '.';

        expect(gfynonce({ adjectives, separator }))
          .to.satisfy((result) => {
            const pieces = result.split(separator).slice(0, ADJECTIVES.length);

            if (!Array.isArray(pieces) || !pieces.length) return false;

            if (pieces.length === ADJECTIVES.length) return true;

            return false;
          });
      });
    });
  });

  describe('custom nonce generation', () => {
    it('should generate a nonce with 4 adjectives and no separator (default)', () => {
      const adjectives = 4;

      expect(gfynonce({ adjectives }))
        .to.match(nonceRegexBuilder(adjectives));
    });

    it('should generate a nonce with 2 (default) adjectives and "." as separator', () => {
      const adjectives = 2;
      const separator = '.';

      expect(gfynonce({ separator }))
        .to.match(nonceRegexBuilder(adjectives, separator));
    });

    it('should generate a nonce with 6 adjectives and "-" as separator', () => {
      const adjectives = 6;
      const separator = '-';

      expect(gfynonce({ separator, adjectives }))
        .to.match(nonceRegexBuilder(adjectives, separator));
    });

    describe('adjective uniqueness', () => {
      it('should generate a nonce with the most adjectives available without repeating any', () => {
        const adjectives = ADJECTIVES.length;

        expect(gfynonce({ adjectives }))
          .to.satisfy((result) => {
            const pieces = getAdjectivesArrayFromNonce(result).slice(0, adjectives);

            if (!Array.isArray(pieces) || !pieces.length) return false;

            if (uniq(pieces).length === adjectives) return true;

            return false;
          });
      });

      it('should generate a nonce with the most adjectives available without repeating any and "." as a separator', () => {
        const adjectives = ADJECTIVES.length;
        const separator = '.';

        expect(gfynonce({ adjectives, separator }))
          .to.satisfy((result) => {
            const pieces = result.split(separator).slice(0, adjectives);

            if (!Array.isArray(pieces) || !pieces.length) return false;

            if (uniq(pieces).length === adjectives) return true;

            return false;
          });
      });
    });
  });
});