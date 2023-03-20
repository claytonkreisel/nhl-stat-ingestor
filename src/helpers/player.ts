import { prisma } from '../common';

export const createNewPlayer = async (
  firstName: string,
  lastName: string,
  nhlId: number
) => {
  const player = await prisma.player.create({
    data: {
      firstName,
      lastName,
      nhlId,
      stats: {
        create: {
          goals: 0,
          assists: 0,
          hits: 0,
          points: 0,
          penaltyMinutes: 0,
        },
      },
    },
  });
  return player;
};

export const getPlayerWithStatsById = async (id: number) => {
  const player = prisma.player.findUnique({
    where: { id },
    include: { stats: true },
  });
  return player;
};

export const getPlayerWithNoStatsById = async (id: number) => {
  const player = prisma.player.findUnique({
    where: { id },
  });
  return player;
};
