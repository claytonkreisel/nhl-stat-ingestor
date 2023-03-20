import { prisma } from '../common';

export const createNewFranchise = async (name: string, nhlId: number) => {
  const franchise = await prisma.franchise.create({
    data: {
      name,
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
  return franchise;
};

export const getFranchiseWithStatsByName = async (name: string) => {
  const franchise = await prisma.franchise.findUnique({
    where: {
      name,
    },
    include: { stats: true },
  });
  return franchise;
};

export const getFranchiseNoStatsByName = async (name: string) => {
  const franchise = await prisma.franchise.findUnique({
    where: {
      name,
    },
  });
  return franchise;
};

export const getFranchiseTeams = async (franchiseId: number) => {
  const teams = await prisma.team.findMany({
    where: {
      franchiseId,
    },
  });
  return teams;
};

export const updateFranchiseStats = async (franchiseId: number) => {
  const teams = (await getFranchiseTeams(franchiseId)).map(team => {
    return team.id;
  });
  const games = await prisma.game.findMany({
    where: {
      OR: {
        homeTeamId: {
          in: teams,
        },
        awayTeamId: {
          in: teams,
        },
      },
    },
    include: {
      stats: true,
    },
  });
  const franchiseStatLine = {
    goals: 0,
    assists: 0,
    hits: 0,
    penaltyMinutes: 0.0,
    points: 0,
  };
  games.forEach(game => {
    franchiseStatLine.assists += game.stats?.assists || 0;
    franchiseStatLine.goals += game.stats?.goals || 0;
    franchiseStatLine.hits += game.stats?.hits || 0;
    franchiseStatLine.points += game.stats?.points || 0;
    franchiseStatLine.penaltyMinutes += game.stats?.penaltyMinutes || 0;
  });
  return await prisma.franchiseStatLine.update({
    where: {
      franchiseId,
    },
    data: franchiseStatLine,
  });
};
