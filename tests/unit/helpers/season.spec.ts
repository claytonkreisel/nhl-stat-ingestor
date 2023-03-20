import { prisma } from '../../../src/common';
import { truncate } from '../../truncate';
import {
  createNewSeason,
  getSeasonByStartingYear,
  getOrCreateNewSeason,
} from '../../../src/helpers/season';

describe('Test season creation', () => {
  afterEach(async () => {
    await truncate();
  });

  it('Test creation with createNewSeason() with integer', async () => {
    const season = await createNewSeason(2010);
    const fetchSeason = await getSeasonByStartingYear(2010);
    expect(fetchSeason?.id).toStrictEqual(season.id);
    expect(fetchSeason?.startYear).toStrictEqual(season.startYear);
  });

  it('Test creation with createNewSeason() with string', async () => {
    const season = await createNewSeason('2010');
    const fetchSeason = await getSeasonByStartingYear(2010);
    expect(fetchSeason?.id).toStrictEqual(season.id);
    expect(fetchSeason?.startYear).toStrictEqual(season.startYear);
  });

  it('Test creation with getOrCreateNewSeason() with integer', async () => {
    const season = await getOrCreateNewSeason(2010);
    const fetchSeason = await getSeasonByStartingYear(2010);
    expect(fetchSeason?.id).toStrictEqual(season.id);
    expect(fetchSeason?.startYear).toStrictEqual(season.startYear);
  });

  it('Test creation with getOrCreateNewSeason() with string', async () => {
    const season = await getOrCreateNewSeason('2010');
    const fetchSeason = await getSeasonByStartingYear(2010);
    expect(fetchSeason?.id).toStrictEqual(season.id);
    expect(fetchSeason?.startYear).toStrictEqual(season.startYear);
  });
});

describe('Test getting season', () => {
  beforeEach(async () => {
    await prisma.season.create({ data: { startYear: 2014 } });
    await prisma.season.create({ data: { startYear: 2015 } });
  });

  afterEach(async () => {
    await truncate();
  });

  it('Test get existing season using getSeasonByStartingYear() with integer', async () => {
    const season = await getSeasonByStartingYear(2014);
    expect(season?.startYear).toStrictEqual(2014);
  });

  it('Test get existing season using getSeasonByStartingYear() with string', async () => {
    const season = await getSeasonByStartingYear('2015');
    expect(season?.startYear).toStrictEqual(2015);
  });

  it('Test get non-existing season using getSeasonByStartingYear()', async () => {
    const season = await getSeasonByStartingYear(2016);
    expect(season).toBeNull();
  });
});
