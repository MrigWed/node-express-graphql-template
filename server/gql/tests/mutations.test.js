import get from 'lodash/get';
import includes from 'lodash/includes';
import pluralize from 'pluralize';
import { graphql, GraphQLSchema } from 'graphql';

import { QueryRoot } from '../queries';
import { MutationRoot } from '../mutations';

const schema = new GraphQLSchema({ query: QueryRoot, mutation: MutationRoot });

const allModels = [
  'createProduct',
  'updateProduct',
  'deleteProduct',
  'createPurchasedProduct',
  'updatePurchasedProduct',
  'deletePurchasedProduct',
  'createAddress',
  'updateAddress',
  'deleteAddress',
  'createStoreProduct',
  'deleteStoreProduct',
  'updateStoreProduct',
  'createStore',
  'deleteStore',
  'updateStore',
  'createSupplier',
  'deleteSupplier',
  'updateSupplier',
  'createSupplierProduct',
  'deleteSupplierProduct',
  'updateSupplierProduct'
];

allModels.forEach(model => allModels.push(pluralize(model)));

describe('mutation tests', () => {
  it('should create mutation for all the models', async () => {
    const source = `
    query {
      __schema {
        mutationType {
          fields {
            name
          }
        }
      }
    }
`;
    const result = await graphql({ schema, source });
    const queryRoot = get(result, 'data.__schema.nutationType.fields', []);
    const allMutations = [];
    queryRoot.forEach(query => allMutations.push(query.name));
    const hasModelWithoutQuery = allModels.some(model => includes(allMutations, model));
    expect(hasModelWithoutQuery).toBeFalsy();
  });
});
