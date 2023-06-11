import { expect } from 'chai';
import { extractEvolutionChain } from '../utils/evolutionUtils.js';

describe('extractEvolutionChain', () => {
  it('should extract the evolution chain correctly', () => {
    const chainData = {
      species: { name: 'pikachu' },
      evolves_to: [
        {
          species: { name: 'raichu' },
          evolves_to: [
            {
              species: { name: 'alolan-raichu' },
              evolves_to: []
            }
          ]
        },
        {
          species: { name: 'pichu' },
          evolves_to: []
        }
      ]
    };

    const expectedEvolutionChain = {
      name: 'pikachu',
      variations: [
        {
          name: 'raichu',
          variations: [
            {
              name: 'alolan-raichu',
              variations: []
            }
          ]
        },
        {
          name: 'pichu',
          variations: []
        }
      ]
    };

    const result = extractEvolutionChain(chainData);
    expect(result).to.deep.equal(expectedEvolutionChain);
  });

  it('should handle empty evolution chain data', () => {
    const chainData = {};

    const expectedEvolutionChain = {
      name: undefined,
      variations: []
    };

    const result = extractEvolutionChain(chainData);
    expect(result).to.deep.equal(expectedEvolutionChain);
  });

  it('should handle evolution chain with no variations', () => {
    const chainData = {
      species: { name: 'pikachu' },
      evolves_to: []
    };

    const expectedEvolutionChain = {
      name: 'pikachu',
      variations: []
    };

    const result = extractEvolutionChain(chainData);
    expect(result).to.deep.equal(expectedEvolutionChain);
  });
});
