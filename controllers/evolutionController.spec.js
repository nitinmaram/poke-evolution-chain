import axios from 'axios';
import sinon from 'sinon';
import { getEvolutionChain } from './evolutionController.js';

describe('getEvolutionChain', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        pokemonName: 'pikachu',
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return the evolution chain for a valid Pokemon', async () => {
    const evolutionChain = {
      evolution_details: [], evolves_to: [{ evolution_details: [{ gender: null, held_item: null, item: null, known_move: null, known_move_type: null, location: null, min_affection: null, min_beauty: null, min_happiness: 160, min_level: null, needs_overworld_rain: false, party_species: null, party_type: null, relative_physical_stats: null, time_of_day: "", trade_species: null, trigger: { name: "level-up", url: "https://pokeapi.co/api/v2/evolution-trigger/1/" }, turn_upside_down: false }], evolves_to: [{ evolution_details: [{ gender: null, held_item: null, item: { name: "thunder-stone", url: "https://pokeapi.co/api/v2/item/83/" }, known_move: null, known_move_type: null, location: null, min_affection: null, min_beauty: null, min_happiness: null, min_level: null, needs_overworld_rain: false, party_species: null, party_type: null, relative_physical_stats: null, time_of_day: "", trade_species: null, trigger: { name: "use-item", "url": "https://pokeapi.co/api/v2/evolution-trigger/3/" }, "turn_upside_down": false }], evolves_to: [], is_baby: false, "species": { "name": "raichu", "url": "https://pokeapi.co/api/v2/pokemon-species/26/" } }], is_baby: false, species: { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon-species/25/" } }], is_baby: true, "species": { name: "pichu", url: "https://pokeapi.co/api/v2/pokemon-species/172/" }
    };
    const finalEvolutionChainRes = { name: "pichu", variations: [{ name: "pikachu", variations: [{ name: "raichu", variations: [] }] }] }
    sinon.stub(axios, 'get')
      .onFirstCall().resolves({ data: { species: { url: 'species-url' } } })
      .onSecondCall().resolves({ data: { evolution_chain: { url: 'evolution-chain-url' } } })
      .onThirdCall().resolves({ data: { chain: evolutionChain } });

    await getEvolutionChain(req, res);
    sinon.assert.notCalled(res.status);
    sinon.assert.calledWith(res.json, finalEvolutionChainRes);
  });

  it('should return an error message for an invalid Pokemon', async () => {
    sinon.stub(axios, 'get').rejects({ response: { status: 404 } });
    await getEvolutionChain(req, res);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { error: 'Pokemon not found.' });
  });

  it('should return an error message if evolution chain data is missing', async () => {
    sinon.stub(axios, 'get')
      .onFirstCall().resolves({ data: { species: { url: 'species-url' } } })
      .onSecondCall().resolves({ data: { evolution_chain: { url: 'evolution-chain-url' } } })
      .onThirdCall().resolves({ data: {} });
    await getEvolutionChain(req, res);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { error: 'Pokemon not found.' });
  });

  it('should return an empty evolution chain for a Pokemon with no evolutions', async () => {
    const evolutionChain = { species: { name: 'pikachu', url: 'pokemon-url' }, evolves_to: [] };
    sinon.stub(axios, 'get')
      .onFirstCall().resolves({ data: { species: { url: 'species-url' } } })
      .onSecondCall().resolves({ data: { evolution_chain: { url: 'evolution-chain-url' } } })
      .onThirdCall().resolves({ data: { chain: evolutionChain } });
    await getEvolutionChain(req, res);
    sinon.assert.notCalled(res.status);
    sinon.assert.calledWith(res.json, { name: 'pikachu', variations: [] });
  });

  it('should return an error message for an invalid Pokemon name', async () => {
    req.params.pokemonName = 'invalid';
    sinon.stub(axios, 'get').rejects({ response: { status: 404 } });
    await getEvolutionChain(req, res);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { error: 'Pokemon not found.' });
  });
});
