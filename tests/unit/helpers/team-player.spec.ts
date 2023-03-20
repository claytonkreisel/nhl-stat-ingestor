import {
  createNewTeamPlayer,
  getTeamPlayerByTeamAndPlayerWithStats,
  // getTeamPlayerByTeamAndPlayerNoStats,
} from '../../../src/helpers/team-player';
import { truncate } from '../../truncate';
import { Player, Team } from '@prisma/client';
import { createNewPlayer } from '../../../src/helpers/player';
import { createNewTeam } from '../../../src/helpers/team';
import { createNewFranchise } from '../../../src/helpers/franchise';

describe('Test creation of new Team Player', () => {
  let player1: Player;
  let team1: Team | null;
  beforeAll(async () => {
    await truncate();
    const franchise1 = await createNewFranchise('Blues', 1);
    player1 = await createNewPlayer('Clayton', 'Kreisel', 1);
    team1 = await createNewTeam(franchise1.id, 'St. Louis', 2010, 1);
  });

  it('Test creation with createNewTeamPlayer', async () => {
    expect(team1).toBeTruthy();
    if (!team1) return;
    const creation = await createNewTeamPlayer(player1.id, team1.id);
    const teamPlayer = await getTeamPlayerByTeamAndPlayerWithStats(
      player1.id,
      team1.id
    );
    expect(teamPlayer).toBeTruthy();
    if (!teamPlayer) return;
    expect(teamPlayer.id).toStrictEqual(creation.id);
    expect(teamPlayer.player.firstName).toStrictEqual('Clayton');
    expect(teamPlayer.team.name).toStrictEqual('Blues');
    expect(teamPlayer.team.location).toStrictEqual('St. Louis');
    expect(teamPlayer.stats).toBeTruthy();
    if (!teamPlayer.stats) return;
    expect(teamPlayer.stats?.goals).toStrictEqual(0);
  });
});
