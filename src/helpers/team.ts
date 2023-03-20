import { prisma } from '../common';
import { getOrCreateNewSeason } from './season';

export const createNewTeam = async (
  franchiseId: number,
  location: string,
  seasonStartYear: string | number,
  nhlId: number,
  name: string | null = null
) => {
  const season = await getOrCreateNewSeason(seasonStartYear);
  if (!name) {
    const franchise = await prisma.franchise.findUnique({
      where: { id: franchiseId },
    });
    if (!franchise) return null;
    name = franchise.name;
  }
  return prisma.team.create({
    data: {
      franchiseId,
      seasonId: season.id,
      location,
      name,
      nhlId,
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

export const getTeamWithStatsById = (id: number) => {
  return prisma.team.findUnique({ where: { id }, include: { stats: true } });
};

export const getTeamNoStatsById = (id: number) => {
  return prisma.team.findUnique({ where: { id } });
};
