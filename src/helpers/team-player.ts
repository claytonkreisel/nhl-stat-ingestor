import { prisma } from '../common';

export const createNewTeamPlayer = async (playerId: number, teamId: number) => {
  return await prisma.teamPlayer.create({
    data: {
      teamId,
      playerId,
      stats: {
        create: {
          goals: 0,
          hits: 0,
          penaltyMinutes: 0.0,
          assists: 0,
          points: 0,
        },
      },
    },
  });
};

export const getTeamPlayerByTeamAndPlayerWithStats = async (
  playerId: number,
  teamId: number
) => {
  return await prisma.teamPlayer.findUnique({
    where: {
      playerId_teamId: {
        playerId,
        teamId,
      },
    },
    include: {
      stats: true,
      team: true,
      player: true,
    },
  });
};

export const getTeamPlayerByTeamAndPlayerNoStats = async (
  playerId: number,
  teamId: number
) => {
  return await prisma.teamPlayer.findUnique({
    where: {
      playerId_teamId: {
        playerId,
        teamId,
      },
    },
    include: {
      team: true,
      player: true,
    },
  });
};
