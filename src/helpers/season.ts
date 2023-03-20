import { prisma } from '../common';

export const createNewSeason = async (startYear: string | number) => {
  if (typeof startYear == 'string') {
    startYear = parseInt(startYear);
  }
  return await prisma.season.create({
    data: {
      startYear,
    },
  });
};

export const getSeasonByStartingYear = async (startYear: string | number) => {
  if (typeof startYear == 'string') {
    startYear = parseInt(startYear);
  }
  return await prisma.season.findUnique({
    where: {
      startYear,
    },
  });
};

export const getOrCreateNewSeason = async (startYear: string | number) => {
  if (typeof startYear == 'string') {
    startYear = parseInt(startYear);
  }
  const season = await getSeasonByStartingYear(startYear);
  if (season) return season;
  return await createNewSeason(startYear);
};
