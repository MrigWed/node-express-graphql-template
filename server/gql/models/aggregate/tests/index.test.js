import get from 'lodash/get';
import { mockQueryResults } from 'server/utils/testUtils';
import { testApp } from 'server/utils/testUtils/testApp';
var request = require('supertest');

beforeEach(() => {
  const mockDBClient = require('database');
  const client = mockDBClient.client;
  client.$queueQueryResult([{}, { rows: [{ ...mockQueryResults.addressesTable }] }]);
  jest.doMock('database', () => ({ client, getClient: () => client }));
});

describe('Aggregate graphQL-server-DB query tests', () => {
  const maxQuery = `
    query {
      aggregate {
        max {
          purchasedProductsPrice
        }
      }
    }
  `;

  it('should return the max fields mentioned in the query', async done => {
    await request(testApp)
      .post('/graphql')
      .type('form')
      .send({ query: maxQuery })
      .set('Accept', 'application/json')
      .then(response => {
        const result = get(response, 'body.data.aggregate');
        console.log(response.body.data.aggregate);
        const resultFields = Object.keys(result);
        expect(resultFields).toEqual(['max']);
        done();
      });
  });

  const SumQuery = `
    query {
      aggregate {
        total {
          purchasedProductsPrice
        }
      }
    }
  `;

  it('should return the total fields mentioned in the query', async done => {
    await request(testApp)
      .post('/graphql')
      .type('form')
      .send({ query: SumQuery })
      .set('Accept', 'application/json')
      .then(response => {
        const result = get(response, 'body.data.aggregate');
        console.log(response);
        console.log(response.body.data.aggregate);
        const resultFields = Object.keys(result);
        expect(resultFields).toEqual(['total']);
        done();
      });
  });

  const countQuery = `
    query {
      aggregate {
        count {
          purchasedProducts
        }
      }
    }
  `;

  it('should return the count fields mentioned in the query', async done => {
    await request(testApp)
      .post('/graphql')
      .type('form')
      .send({ query: countQuery })
      .set('Accept', 'application/json')
      .then(response => {
        const result = get(response, 'body.data.aggregate');
        console.log(response.body.data.aggregate);
        const resultFields = Object.keys(result);
        expect(resultFields).toEqual(['count']);
        done();
      });
  });
});
