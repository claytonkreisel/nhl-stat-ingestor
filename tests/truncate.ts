import { PrismaClient } from '@prisma/client';
export const truncate = async () => {
  const prisma = new PrismaClient();
  const deleteGameStatLines = prisma.gameStatLine.deleteMany();
  const deleteGames = prisma.game.deleteMany();
  const deleteTeamPlayerStatLines = prisma.teamPlayerStatLine.deleteMany();
  const deleteTeamPlayers = prisma.teamPlayer.deleteMany();
  const deleteTeamStatLines = prisma.teamStatLine.deleteMany();
  const deleteTeam = prisma.team.deleteMany();
  const deleteSeasonStatLines = prisma.seasonStatLine.deleteMany();
  const deleteSeason = prisma.season.deleteMany();
  const deleteFranchiseStatLines = prisma.franchiseStatLine.deleteMany();
  const deleteFranchises = prisma.franchise.deleteMany();
  const deletePlayerStatLines = prisma.playerStatLine.deleteMany();
  const deletePlayers = prisma.player.deleteMany();
  await prisma.$transaction([
    deleteGameStatLines,
    deleteGames,
    deleteTeamPlayerStatLines,
    deleteTeamPlayers,
    deleteTeamStatLines,
    deleteTeam,
    deleteSeasonStatLines,
    deleteSeason,
    deleteFranchiseStatLines,
    deleteFranchises,
    deletePlayerStatLines,
    deletePlayers,
  ]);
  await prisma.$disconnect();
};
