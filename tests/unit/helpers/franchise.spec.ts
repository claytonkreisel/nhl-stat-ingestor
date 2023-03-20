import {
  createNewFranchise,
  getFranchiseWithStatsByName,
  getFranchiseNoStatsByName,
} from '../../../src/helpers/franchise';
import { truncate } from '../../truncate';

describe('Test franchise creation', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Test creation and get with good data', async () => {
    const creation = await createNewFranchise('Blues', 1);
    const franchise = await getFranchiseWithStatsByName('Blues');
    expect(creation.id).toStrictEqual(franchise?.id);
    expect(creation.nhlId).toStrictEqual(franchise?.nhlId);
    expect(creation.name).toStrictEqual(franchise?.name);
    expect(franchise?.stats?.franchiseId).toStrictEqual(creation.id);
    expect(franchise?.stats?.goals).toStrictEqual(0);
    expect(franchise?.stats?.assists).toStrictEqual(0);
  });
});

describe('Test get franchises', () => {
  beforeEach(async () => {
    await truncate();
    await createNewFranchise('Blues', 1);
  });
  it('Get by franchise name', async () => {
    const franchise = await getFranchiseNoStatsByName('Blues');
    expect(franchise?.name).toStrictEqual('Blues');
    expect(franchise?.nhlId).toStrictEqual(1);
  });
});
