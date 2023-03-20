import {
  createNewPlayer,
  getPlayerWithStatsById,
  getPlayerWithNoStatsById,
} from '../../../src/helpers/player';
import { truncate } from '../../truncate';

describe('Test franchise creation', () => {
  afterEach(async () => {
    await truncate();
  });

  it('Test creation and get with good data', async () => {
    const creation = await createNewPlayer('Clayton', 'Kreisel', 1);
    expect(creation).toBeTruthy();
    if (!creation) return;
    const player = await getPlayerWithStatsById(creation.id);
    expect(player).toBeTruthy();
    if (!player) return;
    expect(creation).not.toBeNull();
    expect(player.id).toStrictEqual(creation.id);
    expect(player.nhlId).toStrictEqual(creation.nhlId);
    expect(player.firstName).toStrictEqual(creation.firstName);
    expect(player.lastName).toStrictEqual(creation.lastName);
    expect(player.stats).toBeTruthy();
    if (!player.stats) return;
    expect(player.stats.playerId).toStrictEqual(creation.id);
    expect(player.stats.goals).toStrictEqual(0);
    expect(player.stats.assists).toStrictEqual(0);
  });

  it('Test creation and get with good data', async () => {
    const creation = await createNewPlayer('Clayton', 'Kreisel', 1);
    expect(creation).toBeTruthy();
    if (!creation) return;
    const player = await getPlayerWithNoStatsById(creation.id);
    expect(player).toBeTruthy();
    if (!player) return;
    expect(creation).not.toBeNull();
    expect(player.id).toStrictEqual(creation.id);
    expect(player.nhlId).toStrictEqual(creation.nhlId);
    expect(player.firstName).toStrictEqual(creation.firstName);
    expect(player.lastName).toStrictEqual(creation.lastName);
  });
});
