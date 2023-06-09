import axios from 'axios';
import sinon from 'sinon';
import { expect } from 'chai';
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
      name: 'pikachu',
      variations: [
        {
          name: 'raichu',
          variations: [],
        },
      ],
    };

    sinon.stub(axios, 'get')
      .onFirstCall().resolves({ data: { species: { url: 'species-url' } } })
      .onSecondCall().resolves({ data: { evolution_chain: { url: 'evolution-chain-url' } } })
      .onThirdCall().resolves({ data: { chain: evolutionChain } });

    await getEvolutionChain(req, res);

    sinon.assert.notCalled(res.status);
    sinon.assert.calledWith(res.json, evolutionChain);
  });

  it('should return an error message for an invalid Pokemon', async () => {
    sinon.stub(axios, 'get').rejects({ response: { status: 404 } });

    await getEvolutionChain(req, res);

    sinon.assert.notCalled(res.json);
    sinon.assert.notCalled(res.status);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { error: 'Pokemon not found.' });
  });

  // Add more test cases for different scenarios

});
