import { prisma } from '../../../src/common';
import { createNewTeam } from '../../../src/helpers/team';
import { createNewFranchise } from '../../../src/helpers/franchise';
import { createNewSeason } from '../../../src/helpers/season';
import { truncate } from '../../truncate';
import { Franchise } from '@prisma/client';

beforeAll(async () => {
  await truncate();
});

describe('Test creation of new team', () => {
  let franchise1: Franchise;

  beforeEach(async () => {
    await truncate();
    franchise1 = await createNewFranchise('Blues', 1);
    await createNewSeason(2010);
  });

  it('Create new team for existing season and franchise', async () => {
    const team = await createNewTeam(franchise1.id, 'St. Louis', 2010, 1);
    expect(team).not.toBeNull();
    if (!team) return;
    const getTeam = await prisma.team.findUnique({ where: { id: team.id } });
    expect(getTeam).not.toBeNull();
    if (!getTeam) return;
    expect(getTeam.id).toStrictEqual(team.id);
    expect(getTeam.name).toStrictEqual('Blues');
  });
});
